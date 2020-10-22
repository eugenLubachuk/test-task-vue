<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 lg4>
      <v-card>
        <v-toolbar class="elevation-0">
          <v-spacer />
          <v-toolbar-title>Register</v-toolbar-title>
          <v-spacer />
        </v-toolbar>

        <v-card-text class="pt-6">
          <v-form v-model="valid" ref="form" validation :lazy-validation="true">
            <v-text-field
              :rules="rules.name"
              :error-messages="errors.name"
              prepend-icon="face"
              name="name"
              v-model="data.name"
              label="Name"
              type="text"
            />

            <v-text-field
              :rules="rules.email"
              :error-messages="errors.email"
              prepend-icon="mail"
              name="email"
              v-model="data.email"
              label="Email"
              type="email"
            />

            <v-menu
              ref="menuStart"
              v-model="menuStart"
              :close-on-content-click="false"
              :return-value.sync="data.educationStartDate"
              transition="scale-transition"
              offset-y
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="data.educationStartDate"
                  :rules="rules.educationStartDate"
                  :error-messages="errors.educationStartDate"
                  label="Education Start Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="data.educationStartDate" no-title scrollable>
                <v-spacer/>
                <v-btn text color="primary" @click="menuStart = false">Cancel</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menuStart.save(data.educationStartDate)"
                >OK</v-btn>
              </v-date-picker>
            </v-menu>

            <v-menu
              ref="menuEnd"
              v-model="menuEnd"
              :close-on-content-click="false"
              :return-value.sync="data.educationEndDate"
              transition="scale-transition"
              offset-y
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="data.educationEndDate"
                  :rules="rules.educationEndDate"
                  :error-messages="errors.educationEndDate"
                  label="Education End Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="data.educationEndDate" no-title scrollable>
                <v-spacer/>
                <v-btn text color="primary" @click="menuEnd = false">Cancel</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menuEnd.save(data.educationEndDate)"
                >OK</v-btn>
              </v-date-picker>
            </v-menu>

            <v-text-field
              :rules="rules.password"
              :error-messages="errors.password"
              id="password"
              prepend-icon="lock"
              v-model="data.password"
              name="password"
              label="Password"
              type="password"/>

            <v-text-field
              :rules="rules.passwordConfirmation"
              :error-messages="errors.password"
              id="password-rules"
              prepend-icon="lock"
              v-model="data.passwordConfirmation"
              name="password_confirmation"
              label="Password confirmation"
              type="password"/>

            <div class="checkbox-wrapper">
              <v-checkbox
                v-model="data.terms"
                id="terms"
                :rules="rules.terms"
                :error-messages="errors.terms"
                required
              >
                <template v-slot:label>
                  I agree to the
                  <router-link :to="{name: 'terms'}" class="pink--text ml-1">
                    terms and conditions
                  </router-link>
                </template>
              </v-checkbox>
            </div>

            <v-card-actions>
              <v-spacer />
              <v-btn
                @click="onSubmit"
                class="mb-5"
                large
                color="deep-purple"
                style="color: white"
                :rounded="true"
              >GET STARTED</v-btn>
              <v-btn
                :to="{name: 'login'}"
                :rounded="true"
                :color="'primary'"
                large
                style="color: white"
                class="mb-5 ml-5"
              >
                Go to login
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { emailRules, passwordRules, requiredRule } from '@/assets/rules/validation';
import formReset from '@/mixins/form-reset';

export default {
  name: 'register',
  mixins: [formReset],
  data() {
    return {
      data: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        educationStartDate: '',
        educationEndDate: '',
        terms: false,
      },
      menuStart: false,
      menuEnd: false,
      valid: false,
      rules: {
        name: [
          requiredRule,
          (v) => v.length >= 2 || 'Name must be more than or equal 2 characters',
        ],
        email: emailRules,
        educationStartDate: [
          requiredRule,
          (v) => !this.data.educationEndDate || v < this.data.educationEndDate || 'Education end date should be greater than education start date',
        ],
        educationEndDate: [
          requiredRule,
          (v) => !this.data.educationStartDate || v > this.data.educationStartDate || 'Education end date should be greater than education start date',
        ],
        password: [
          ...passwordRules,
          (v) => ((v && /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(v))
            || 'Password must be more or at least one uppercase letter, one lowercase letter and one number'),
        ],
        passwordConfirmation: [
          requiredRule,
          (v) => (v && v === this.data.password) || 'Password must match',
        ],
        terms: [(v) => !!v || 'You must agree to continue!'],
      },
    };
  },
  computed: {
    ...mapGetters({ errors: 'auth/errors' }),
  },
  methods: {
    ...mapActions({ register: 'auth/register' }),
    onSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.register(this.data).then(() => {
        this.reset();
        this.resetValidation();
        this.$router.push('/');
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>
