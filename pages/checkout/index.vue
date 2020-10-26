<template>
  <v-container class="marginOfTop">
    <v-row>
      <!-- order info -->
      <v-col cols="7">
        <v-row v-if="!isCheckout">
          <v-col cols="12"> Exprss checkout </v-col>
          <v-col cols="12"> Shipping address </v-col>
          <v-col cols="12">
            <v-text-field
              solo
              placeholder="Name"
              v-model="information.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              solo
              placeholder="Address"
              v-model="information.address"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              solo
              placeholder="Phone"
              v-model="information.phone"
            ></v-text-field>
          </v-col>
          <v-col cols="3"
            >
            <MyButton @click.native="axiosCreateOrder" class="btn text-center"><div slot="text">Continue</div></MyButton>
            </v-col
          >
        </v-row>
        <!-- //after checkout -->
        <v-row v-else>
          <v-col cols="12" class="text-h4">
            Your order has been established
          </v-col>
          <!-- <v-col cols="12">
            <div class="text-h5">continue to payment</div>
          </v-col> -->
          <v-col cols="4" class="text-h5">
            <nuxt-link to="/orders">
            <MyButton class="btn"><div slot="text">check your orders</div></MyButton>
            </nuxt-link>
          </v-col>
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
 head(){
    return{
      title:'Checkout'
    }
  }
})
export default class Checkout extends Vue {
  public mounted() {
    this.axiosCartProducts();
  }
  // store
  public store: MyStore = useStore(this.$store);

  //data
  public cartItem: ICartProd[] = this.store.main.cart.prods;

  public total: number = this.store.main.cart.subtotal;

  private isCheckout = false;

  private information = {
    name: "",
    address: "",
    phone: "",
  };

  // computed
  public get getProductsFromStore() {
    return this.store.main.cart.prods;
  }

  public get getTotal() {
    return this.store.main.cart.subtotal;
  }

  @Watch("getProductsFromStore")
  watchStoreProducts() {
    this.cartItem = this.store.main.cart.prods;
  }

  @Watch("getTotal")
  watchStoreTotal() {
    this.total = this.store.main.cart.subtotal;
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

  private async axiosCreateOrder() {
    let params: any = Object.assign({}, this.information);
    params.memberId = this.store.main.account._id;
    await axios
      .post(`${backendUrl.url}/api/order/`, params)
      .then((success) => {
        console.log("create order ok");
      })
      .catch((error) => {
        console.log("error");
      });
      this.isCheckout = true
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