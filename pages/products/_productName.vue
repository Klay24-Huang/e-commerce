<template>
  <v-container id="ProdContent">
    <v-row>
      <!-- title -->
      <v-col cols="12">
        <h3>{{ getProdDetail.title }}</h3>
      </v-col>
      <!-- brand -->
      <v-col cols="12">
        {{ getProdDetail.brand }}
      </v-col>
      <v-col cols="4">
        <v-img :src="getProdDetail.picUrl[0]" alt="product pic"></v-img>
      </v-col>
      <v-col cols="4">
        <!-- price -->
        <h3>${{ getProdDetail.price }}</h3>
        <!-- quantity -->
        <v-row>
          <v-col cols="3">QTY</v-col>
          <v-col cols="9">
            <v-row>
              <v-btn @click="qtySubtract">-</v-btn>
              <input type="text" v-model="quatity">
              <v-btn @click="qtyAdd">+</v-btn>
            </v-row>
          </v-col>
        </v-row>
        <!-- add cart -->
        <v-btn color="accent" elevation="2" outlined block>ADD TO CART</v-btn>
      </v-col>
      <!-- description -->
      <v-col cols="4">
        <ul>
          <li v-for="item in getProdDetail.description" :key="item">
            {{item}}
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
#ProdContent {
  margin-top: 135px;
}

input {
  width: 64px;
}
</style>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { useStore, useModule } from "vuex-simple";
import { MyStore } from "@/store/store";
import { IProdDetail } from "@/store/models/prodDetailModel";

@Component
export default class ProductDetail extends Vue {
  public mounted() {
    this.axiosProdDetail();
  }

  @Watch("getProdDetail")
  watch() {
    console.log("watch");
  }

  //store
  public store: MyStore = useStore(this.$store);

  public axiosProdDetail() {
    this.store.main.prodDetail.axiosProd();
  }

  public get getProdDetail() {
    return this.store.main.prodDetail.prod;
  }

  //data
  public quatity: number = 0;

  //method
  private qtyAdd(){
    this.quatity++
  }

  private qtySubtract(){
    if(this.quatity === 0){
      return
    }
    this.quatity--
  }
}
</script>

<style lang='scss' scoped>
.test {
  margin-top: 200px;
}
</style>