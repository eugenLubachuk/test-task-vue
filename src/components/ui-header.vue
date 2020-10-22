<template>
  <v-toolbar class="elevation-0" color="pink">

    <v-toolbar-title class="white--text">Vue test</v-toolbar-title>

    <v-spacer/>

    <v-btn @click="onLogout">
      Logout
      <v-icon>exit_to_app</v-icon>
    </v-btn>

  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ui-header',
  methods: {
    ...mapActions({ logout: 'auth/logout' }),
    onLogout() {
      this.logout().then(() => {
        this.$router.push({ path: '/auth' });
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
