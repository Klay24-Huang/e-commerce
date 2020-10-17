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
              <input type="text" v-model="quatity" />
              <v-btn @click="qtyAdd">+</v-btn>
            </v-row>
          </v-col>
        </v-row>
        <!-- add cart -->
        <v-btn color="accent" elevation="2" outlined block @click="addToCart"
          >ADD TO CART</v-btn
        >
      </v-col>
      <!-- description -->
      <v-col cols="4">
        <ul>
          <li v-for="item in prodDescript" :key="item">
            {{ item }}
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
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
import VueCookies from "vue-cookies-ts";

Vue.use(VueCookies);

@Component
export default class ProductDetail extends Vue {
  public mounted() {
    const productParams = this.$route.params.productName;
    this.axiosProdDetail(productParams);
  }

  @Watch("getProdDetail")
  watch() {
    this.prodDescript = this.getProdDetail.description;
  }

  //store
  public store: MyStore = useStore(this.$store);

  public axiosProdDetail(_productParams: string) {
    this.store.main.prodDetail.axiosGetProductDetail({
      productParams: _productParams,
    });
  }

  public get getProdDetail() {
    return this.store.main.prodDetail.prod;
  }

  //data
  public quatity: number = 0;

  public prodDescript: string[] = [];

  //method
  private qtyAdd() {
    this.quatity++;
  }

  private qtySubtract() {
    if (this.quatity === 0) {
      return;
    }
    this.quatity--;
  }

  private addToCart() {
    const isLogin = this.store.main.account.isLogin;
    const quantity = this.quatity;
    const item = { _id: this.getProdDetail._id, quantity: quantity };

    if (quantity === 0) {
      return;
    }

    // add cart info to db
    if (isLogin) {
      return;
    }

    // add cart info to cookies
    let rawCart: any = this.$cookies.get("cart");
    let cart = !rawCart ? [] : JSON.parse(rawCart);
    const index = cart.findIndex((x: any) => x._id === item._id);
    
    if (index !== -1) {
      cart[index].quantity += quantity;
    } else {
      cart.push(item);
    }

    // save cookie
    this.$cookies.set("cart", JSON.stringify(cart));

    // update store
    this.store.main.cart.setCart({ isLogin: isLogin, cookie: cart });
  }
}
</script>

