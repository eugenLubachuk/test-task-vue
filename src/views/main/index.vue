<template>
  <div class="wrapper">
    <ui-header/>
    <main>
      <router-view class="router-content"/>
    </main>
  </div>
</template>

<script>
import UiHeader from '@/components/ui-header';

export default {
  components: { UiHeader },
  name: 'index',
};
</script>
<style lang="scss">
  /*initialize main styles*/
  /*todo temporary*/
  .wrapper {
    min-height: inherit;
    & > main {
      height: inherit;
    }
  }
</style>
