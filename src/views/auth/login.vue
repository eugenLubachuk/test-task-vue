<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 lg4>
      <v-card>
        <v-toolbar dark color="purple darken-1" :absolute="true" class="elevation-6">
          <v-spacer/>
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer/>
        </v-toolbar>
        <v-card-text class="pt-6">
          <v-form v-model="valid" ref="form" validation>
            <v-text-field
              :rules="emailRules"
              prepend-icon="mail"
              name="login"
              v-model="email"
              label="Email"
              type="email"
            />

            <v-text-field
              :rules="passwordRules"
              id="password"
              prepend-icon="lock"
              v-model="password"
              name="password"
              label="Password"
              v-on:keyup.enter="onSubmit"
              type="password"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            @click="onSubmit"
            :disabled="!valid"
            :text="true"
            :color="'purple'"
            class="red--text mb-5"
          >
            LETS GO
          </v-btn>
          <v-btn
            :text="true"
            :color="'primary'"
            :to="{name: 'register'}"
            class="mb-5 ml-5"
          >
            Go to register
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import formReset from '@/mixins/form-reset';
import { emailRules, passwordRules } from '../../assets/rules/validation';

export default {
  name: 'login',
  mixins: [formReset],
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      emailRules,
      passwordRules,
    };
  },
  methods: {
    ...mapActions({ login: 'auth/login' }),
    onSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      const user = {
        email: this.email,
        password: this.password,
      };
      this.login(user).then(() => {
        this.reset();
        this.resetValidation();
        this.$router.push({ path: '/' });
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style scoped lang="scss">
  .auth-wrapper {
    header {
      top: -50px;
      right: 9%;
      border-radius: 7px;
      width: 80%;
    }
  }

</style>
