<template>
  <v-container class="marginOfTop">
    <v-row>
      <!-- order info -->
      <v-col cols="7">
        <v-row>
          <v-col cols="12"> Exprss checkout </v-col>
          <v-col cols="12"> Shipping address </v-col>
          <v-col cols="12">
            <v-text-field solo placeholder="Name" v-model="information.name"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field solo placeholder="Address" v-model="information.address"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field solo placeholder="Phone" v-model="information.phone"></v-text-field>
          </v-col>
          <v-col cols="12"><v-btn @click="axiosCreateOrder">Continue</v-btn></v-col>
        </v-row>
      </v-col>
      <v-col id="cartInfo" cols="5"
        ><v-row>
          <v-col cols="12">
            <v-row v-for="item in cartItem" :key="item.title">
              <v-col cols="2"><v-img :src="item.picUrl[0]"></v-img></v-col>
              <v-col cols="8">{{ item.quantity }} x {{ item.title }}</v-col>
              <v-col cols="2">$ {{ item.price * item.quantity }}</v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <span>Total</span>
            <span>USD</span>
            <span>${{ total }}</span>
          </v-col>
        </v-row></v-col
      ></v-row
    >
  </v-container>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { useStore } from "vuex-simple";
import { MyStore } from "@/store/store";
import { ICartProd } from "@/store/models/cartProdModel";
import axios from "axios";
import backendUrl from "@/assets/json/apiUrl.json";

@Component({
  name: "",
  components: {},
})
export default class Checkout extends Vue {
  public mounted() {
    this.axiosCartProducts()
  }
  // store
  public store: MyStore = useStore(this.$store);

  //data
  public cartItem: ICartProd[] = this.store.main.cart.prods;

  public total: number = this.store.main.cart.subtotal;

  private information = {
    name:'',
    address: '',
    phone:''
  }

  // computed
  public get getProductsFromStore(){
    return this.store.main.cart.prods
  }

  public get getTotal(){
    return this.store.main.cart.subtotal
  }

  @Watch("getProductsFromStore")
  watchStoreProducts(){
    this.cartItem = this.store.main.cart.prods
  }

    @Watch("getTotal")
  watchStoreTotal(){
    this.total = this.store.main.cart.subtotal
  }

  //method
  private axiosCartProducts() {
    if (this.store.main.cart.prods.length === 0) {
      const params = {
        isLogin: this.store.main.account.isLogin,
        _id: this.store.main.account._id,
      };
      this.store.main.cart.axiosCart(params);
    }
  }

  private async axiosCreateOrder(){
    let params:any = Object.assign({},this.information)
    params.memberId = this.store.main.account._id
    await axios.post(`${backendUrl.url}/api/order/`,params).then(success=>{
      console.log('ok')
    }).catch(error =>{
      console.log('error')
    })
  }
}
</script>

<style lang='scss' scoped>
#cartInfo {
  background-color: #fafafa;
}

v-img {
  width: 65px;
}
</style>