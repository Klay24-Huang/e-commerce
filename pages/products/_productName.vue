<template>
  <div class="test">
    <!-- <img src="https://i.imgur.com/XYWWwFN.jpg" alt="" /> -->
    <!-- <div>price is {{ prodDetail.price }}</div> -->
    <div>price is {{ this.store.main.prodDetail.prod.price }}</div>
    <!-- <div>{{ge:tHomeProds[0].id}}</div> -->
    <!-- <button @click="">test</button> -->
    <!-- <div>{{test}}</div>
    <button @click="changeTest">change test</button> -->

  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { useStore, useModule } from "vuex-simple";
import { MyStore } from "@/store/store";
import { IProdDetail } from "@/store/models/prodDetailModel";

@Component
export default class ProductDetail extends Vue {
  public mounted() {
    console.log(this.prodDetail)
    this.axiosProdDetail();
    // this.dataReady = true
    setTimeout(() => {  console.log(this.store.main.prodDetail.prod.price);
    console.log(this.prodDetail) 
    // this.prodDetail.price = 2000
    }
    , 2000);
  }

@Watch('getProdDetail')
watch(){
  console.log('watch')
}

  //store
  public store: MyStore = useStore(this.$store);

  public axiosProdDetail() {
    this.store.main.prodDetail.axiosProd();
  }

  public get getProdDetail() {
    return this.store.main.prodDetail.prod
  }

  //data
  public prodDetail = this.store.main.prodDetail.prod
  // public test = "test"
  
  // public changeTest(){
  //   this.test = 'change'
  // }

  // public test (){
  //   this.prodDetail 
  // }
}
</script>

<style lang='scss' scoped>
.test {
  margin-top: 200px;
}
</style>