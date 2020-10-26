<template lang="html">
   <v-overlay v-if="loading" :value="overlay">
    <v-progress-circular
      indeterminate
      size="64"
      color="primary"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    overlay: false,
  }),
  methods: {
    start() {
      this.loading = true;
      this.overlay = true;
    },
    finish() {
      this.loading = false;
      this.overlay = false;
    },
    fail(error) {
      console.log(error);
    },
    increase(num) {
      // console.log(num)
    },
  },
};
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>