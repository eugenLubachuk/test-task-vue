<template>
  <v-app>
    <router-view/>
    <div class="alert-wrapper" >
      <transition name="scale-transition">
        <v-alert
          v-if="alert"
          :type="alert.type"
          :dismissible="false"
          border="left"
        >
          {{alert.message}}
        </v-alert>
      </transition>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters({ alert: 'alerts/alert' }),
  },
};
</script>
<style scoped lang="scss">
  .alert-wrapper {
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
