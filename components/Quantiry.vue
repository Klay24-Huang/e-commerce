<template>
  <!-- for product Quantity -->
  <v-row>
      <v-text-field @click="qtyClick" v-model="quantity">
      <v-icon slot="prepend-inner"  @click="plus" v-show="isClick">{{ icon.plus }}</v-icon>
      <v-icon slot="append" @click="minus" v-show="isClick">{{ icon.minus }}</v-icon>
      </v-text-field>
  </v-row>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mdiPlus, mdiMinus } from "@mdi/js";

@Component({
  name: "",
  components: {},
})
export default class Quantity extends Vue {
  //data
  private icon = {
    plus: mdiPlus,
    minus: mdiMinus,
  };

@Prop()
  private quantity !: number ;

  private isClick: boolean = false;
  //methoods

  private plus() {
    this.quantity++;
  }

  private minus() {
    this.quantity--;
  }

  private qtyClick() {
    this.isClick = !this.isClick;
  }
}
</script>

<style lang='scss' scoped>
.v-input{
    max-width: 148px;
}
</style>