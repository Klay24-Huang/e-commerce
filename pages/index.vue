<template>
  <div id="HomePage">
    <v-container>
      <v-row>
        <HoverProd/>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
#HomePage {
  margin-top: 135px;
  background-image: url("../assets/pic/home.jpg");
  background-size: 85%;
  background-position: right top;
  height: 600px;
}

img {
  width: 350px;
}
</style>

<script lang="ts">
import Vue from "vue";
import fakeData from "../assets/fakeData/homeProducts.json";
// import fakeData from "../assets/fakeData/homeProducts.json"

export default Vue.extend({
  name: "index",
  data() {
    return {
      homeProds: fakeData.data.result.results,
    };
  },
  created(){
      this.$store.dispatch('AJAXHomeProds')
    },
    computed: 
});
</script>
