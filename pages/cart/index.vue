<template>
  <v-container id="CartContent">
    <v-row>
      <v-col cols="12">
        <div class="text-h2">Review cart</div>
      </v-col>
      <!--cart empty -->
      <v-col v-if="!showEmptyMsg" cols="12">
        <div class="text-h6 mt-16">
          It appears that your cart is currently empty!
        </div>
        <v-row>
          <v-col cols="3">
            <nuxt-link to="/hair-care/all">
              <MyButton class="btn text-center"
                ><div slot="text">CONTINUE BROWSING</div></MyButton
              >
            </nuxt-link>
          </v-col>
        </v-row>
      </v-col>
      <div v-else>
        <v-row>
          <v-col cols="2" offset="8">Quantity</v-col>
          <v-col cols="2">Total</v-col>
        </v-row>
        <v-divider></v-divider>
        <div v-for="(prod, index) in cartItem" :key="prod.title">
          <v-row>
            <!-- pic -->
            <v-col cols="2">
              <nuxt-link :to="`/products/${prod.params}`">
                <v-img :src="prod.picUrl[0]"></v-img>
              </nuxt-link>
            </v-col>
            <!-- prod info -->
            <v-col cols="6">
              <nuxt-link :to="`/products/${prod.params}`">
                <div>{{ prod.title }}</div>
              </nuxt-link>
              <div>{{ prod.brand }}</div>
              <div>${{ prod.price }}.00</div>
            </v-col>
            <!-- qty -->
            <v-col cols="2">
              <!-- <Quantity :quantity="prod.quantity" /> -->
              <v-text-field
                class="input-center"
                @blur="qtyClick(index)"
                @click="qtyClick(index)"
                v-model="prod.quantity"
              >
                <v-icon
                  slot="prepend-inner"
                  @click="changeQty(index, 'plus')"
                  v-show="modifyShow[index]"
                  >{{ icon.plus }}</v-icon
                >
                <v-icon
                  slot="append"
                  @click="changeQty(index, 'minus')"
                  v-if="modifyShow[index]"
                  >{{ icon.minus }}</v-icon
                >
              </v-text-field>
            </v-col>
            <!--total price -->
            <v-col cols="2">
              <div>${{ prod.price * prod.quantity }}.00</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
        <v-row>
          <v-col cols="12"
            ><span>SubTotal: </span><span>$ {{ getSubtotal }}.00</span></v-col
          >
          <v-col cols="2">
            <MyButton class="btn" @click.native="checkLogin"
              ><div class="text-center" slot="text">CKECK OUT</div></MyButton
            >
          </v-col>
        </v-row>
      </div>
    </v-row>
    <v-snackbar v-model="snackbar">
      Please login first
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style lang="scss" scoped>
#CartContent {
  margin-top: 135px;
}
</style>

<style lang="scss">
.input-center {
  .v-text-field__slot {
    input {
      text-align: center;
    }
  }
}
</style>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { useStore, useModule } from "vuex-simple";
import { MyStore } from "@/store/store";
import { ICartProd } from "@/store/models/cartProdModel";
import { mdiPlus, mdiMinus } from "@mdi/js";
import VueCookies from "vue-cookies-ts";
import cookies from "~/plugins/cookies";
import { getCartCookies } from "@/assets/script/cookies.ts";
import { loading } from "@/assets/script/loading";
Vue.use(VueCookies);

@Component({
  head(){
    return{
      title:'Cart'
    }
  }
})
export default class Cart extends Vue {
  public mounted() {
    loading(this)
    getCartCookies(this.store, this.$cookies.get("cart"));
    this.axiosCartProds();
  }

  // store
  public store: MyStore = useStore(this.$store);

  public axiosCartProds() {
    const isLogin = this.store.main.account.isLogin;
    const _id = this.store.main.account._id;
    this.store.main.cart.axiosCart({ isLogin: isLogin, _id: _id });
  }

  //compute
  public get showEmptyMsg() {
    if (this.store.main.cart.count > 0) {
      return true;
    }
    return false;
  }

  public get getCartProd() {
    return this.store.main.cart.prods;
  }

  public get getSubtotal() {
    return this.store.main.cart.subtotal;
  }

  //watch
  @Watch("getCartProd")
  watch() {
    for (let index = 0; index < this.store.main.cart.prods.length; index++) {
      this.modifyShow.push(false);
    }
    this.cartItem = this.store.main.cart.prods;
  }

  //data
  private icon = {
    plus: mdiPlus,
    minus: mdiMinus,
  };

  public cartItem: any = this.store.main.cart.prods;

  private modifyShow: boolean[] = [];

  private snackbar = false;
  //methods

  //change Product Quantity
  //_index is from cartItem
  private async changeQty(_index: number, type: string) {
    switch (type) {
      case "plus":
        this.cartItem[_index].quantity++;
        break;
      case "minus":
        this.cartItem[_index].quantity--;
      default:
        break;
    }

    const newCart = this.cartItem
      .filter((x: any) => {
        if (x.quantity === 0) {
          return false;
        }
        return true;
      })
      .map((x: any) => {
        return { _id: x._id, quantity: x.quantity };
      });

    const isLogin = this.store.main.account.isLogin;
    let params = {};

    if (isLogin) {
      await this.store.main.account.axiosUpdateCartToDb({
        _id: this.store.main.account._id,
        cart: newCart,
      });
      params = {
        isLogin: isLogin,
        dbCart: newCart,
      };
    } else {
      // save cookie
      this.$cookies.set("cart", JSON.stringify(newCart));
      params = {
        isLogin: isLogin,
        cookie: newCart,
      };
    }

    // update store
    this.store.main.cart.setCart(params);

    this.axiosCartProds();
  }

  //show plus and minus btn of quantity
  private qtyClick(_index: number) {
    Vue.set(this.modifyShow, _index, !this.modifyShow[_index]);
  }

  private checkLogin() {
    if (this.store.main.account.isLogin) {
      this.$router.push('/checkout')
      return;
    }

    // this.store.main.setRedirect("/checkout");
    //  this.$cookies.set("redirectUrl", JSON.stringify({url:'/cart'}));
    // this.$router.push("/login");
    this.snackbar = true;
  }
}
</script>