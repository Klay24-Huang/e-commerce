<template>
  <v-container id="ProdContent">
    <v-row>
      <!-- title -->
      <v-col cols="12" class="text-h3">
        {{ getProdDetail.title }}
      </v-col>
      <!-- brand -->
      <v-col cols="12" class="text-h6">
        {{ getProdDetail.brand }}
      </v-col>
      <v-col cols="4">
        <v-img :src="getProdDetail.picUrl[0]" alt="product pic"></v-img>
      </v-col>
      <v-col cols="4">
        <!-- price -->
        <h3>${{ getProdDetail.price }}.00</h3>
        <!-- quantity -->
        <v-row>
          <v-col cols="3" class="text-subtitle-2 my-auto">QTY</v-col>
          <v-col cols="9" class="pr-6">
            <v-row>
              <v-text-field class="input-center" v-model="quatity">
                <v-icon slot="prepend-inner" @click="qtyAdd">{{
                  icon.plus
                }}</v-icon>
                <v-icon slot="append" @click="qtySubtract">{{
                  icon.minus
                }}</v-icon>
              </v-text-field>
            </v-row>
          </v-col>
        </v-row>
        <!-- add cart -->
        <div class="btn" @click="addToCart">
          <MyButton>
            <div class="text-center" slot="text">ADD TO CART</div>
          </MyButton>
        </div>
      </v-col>
      <!-- description -->
      <v-col cols="4">
        <ul>
          <li v-for="item in prodDescript" :key="item" class="pt-4">
            {{ item }}
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.btn {
  outline-style: solid;
  outline-width: thin;
}

#ProdContent {
  margin-top: 135px;
}

ul {
  list-style-type: none;
}
</style>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { useStore, useModule } from "vuex-simple";
import { MyStore } from "@/store/store";
import { IProdDetail } from "@/store/models/prodDetailModel";
import VueCookies from "vue-cookies-ts";
import { mdiPlus, mdiMinus } from "@mdi/js";

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

  private icon = {
    plus: mdiPlus,
    minus: mdiMinus,
  };

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

  private async addToCart() {
    const isLogin = this.store.main.account.isLogin;
    const quantity = this.quatity;
    const item = { _id: this.getProdDetail._id, quantity: quantity };
    const _id = this.store.main.account._id

    if (quantity === 0) {
      return;
    }

    // add cart info to db
    if (isLogin) {
      let dbCart = this.store.main.cart.dbCart;
      let find = dbCart.findIndex((x) => x._id === item._id);

      if (find !== -1) {
        dbCart[find].quantity += quantity;
      } else {
        dbCart.push(item);
      }

      await this.store.main.account.axiosUpdateCartToDb({
        _id: _id,
        cart: dbCart,
      });

      this.store.main.cart.axiosDbCart({ _id: _id, isLogin: true });
      
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

