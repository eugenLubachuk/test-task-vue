<template>
  <div class="auth-wrapper fill-height">
    <v-container fluid fill-height>
      <router-view/>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'index',
};
</script>

<style lang="scss">
  .auth-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    background: 25% 75% url('~@/assets/background-auth.jpeg');
  }
</style>
