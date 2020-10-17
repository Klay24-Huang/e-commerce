<template>
  <div id="List">
    <v-container>
      <v-row>
          <v-col cols="12" v-for="(item, index) in list" :key="index">
              {{item}}
              <v-divider></v-divider>
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "",
  components: {},
})
export default class List extends Vue {
  // data
  private list = ["New", "Shop", "Login", "Logout"];

  private categoryList = ['Makeup', 'Hait Care']
}
</script>

<style lang='scss' scoped>
#List {
  margin-top: 135px;
}
</style>