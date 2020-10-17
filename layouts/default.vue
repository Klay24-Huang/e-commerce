<template>
  <v-app>
    <!-- top bar -->
    <v-container id="top" fluid pt-0>
      <v-row align="center">
        <!-- shipping text -->
        <v-col
          id="ShippingText"
          class="col-12 col-lg-3 text-lg-right text-center"
          order-lg="2"
        >
          <span class="subtitle-2 text">FREE SHIPPING</span>
          <span class="cart">
            <span class="mx-2">--</span>
            <span class="text-caption">on all orders over $35*</span>
          </span>
        </v-col>
        <!-- search and list icon -->
        <v-col class="col-3 col-lg-4" order-lg="0">
          <v-icon v-show="!showList" class="ml-md-9 ml-3" @click="switchList">{{
            icon.list
          }}</v-icon>
          <v-icon v-show="showList" class="ml-md-9 ml-3" @click="switchList">{{
            icon.cancel
          }}</v-icon>
          <v-icon class="ml-md-9 ml-3">{{ icon.search }}</v-icon>
        </v-col>
        <!-- logo -->
        <v-col class="col-6 text-center col-lg-4" order-lg="1">
          <nuxt-link to="/">
            <img id="logo" src="~/assets/pic/logo.png" alt="logo" />
          </nuxt-link>
        </v-col>
        <v-col class="col-3 text-right col-lg-1" order-lg="3">
          <!-- account -->
          <nuxt-link to="/login">
            <v-icon class="mr-3 mr-md-9">{{ icon.account }}</v-icon>
          </nuxt-link>
          <!-- cart -->
          <nuxt-link id="cartItems" to="/cart">
            <span>{{ getCartCount }}</span>
            <v-icon class="mr-3 mr-md-9">{{ icon.cart }}</v-icon>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
    <!-- view or List -->
    <nuxt v-show="!showList" />
    <List v-show="showList"></List>

    <v-container id="Footer">
      <v-divider></v-divider>
      <v-row>
        <v-col cols="4">
          <v-row class="d-flex justify-center"
            ><a href="#">PRIVACY POLICY</a></v-row
          >
          <v-row class="d-flex justify-center"
            ><a href="#">TERMS & CONDITIONS</a></v-row
          >
          <v-row class="d-flex justify-center"><a href="#">ABOUT</a></v-row>
        </v-col>
        <v-col cols="4"></v-col>
        <v-col cols="4">
          <v-row class="d-flex justify-center"
            ><a href="#">SHIPPING INFO</a></v-row
          >
          <v-row class="d-flex justify-center"
            ><a href="#">RETURNS / EXCHANGES</a></v-row
          >
          <v-row class="d-flex justify-center"><a href="#">CONTACT</a></v-row>
        </v-col>
        <v-col cols="12 d-flex justify-center">
          <span class="text--center"
            >&copy; {{ new Date().getFullYear() }}</span
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style lang="scss">
.marginOfTop {
  margin-top: 135px;
}
</style>

<style scoped lang="scss">
#cartItems {
  color: black;
  text-decoration: none;
}

#top {
  position: fixed;
  z-index: 1;
}

#logo {
  width: calc(200px * 0.75);
  height: calc(70px * 0.75);
}

@media screen and (min-width: 600px) {
  #logo {
    width: 200px;
    height: 70px;
  }
}

#ShippingText {
  background-color: black;
  color: white;
}

@media screen and (min-width: 1264px) {
  #ShippingText {
    background-color: transparent;
    color: black;
  }
}

#Footer {
  a,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    color: inherit;
  }
}
</style>

<script lang="ts">
import {
  mdiFormatListBulleted,
  mdiMagnify,
  mdiCartVariant,
  mdiWindowClose,
  mdiAccount,
} from "@mdi/js";
import List from "@/components/List.vue";
import VueCookies from "vue-cookies-ts";
import { useStore } from "vuex-simple";
import { MyStore } from "@/store/store";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import cookies from "~/plugins/cookies";
import {getCartCookies} from '@/assets/script/cookies.ts'

Vue.use(VueCookies);

@Component({
  components: {
    List,
  },
})
export default class Layout extends Vue {
  public mounted() {
    // this.getCartCookies();
    getCartCookies(this.store, this.$cookies.get("cart"))
  }

  //store
  public store: MyStore = useStore(this.$store);

  public get getProdDetail() {
    return this.store.main.prodDetail.prod;
  }

  //data
  private icon = {
    list: mdiFormatListBulleted,
    search: mdiMagnify,
    cart: mdiCartVariant,
    cancel: mdiWindowClose,
    account: mdiAccount,
  };

  private showList = false;

  // computed
  private get getCartCount(){
    return this.store.main.cart.count
  }

  //methods
  private switchList() {
    this.showList = !this.showList;
  }

  //check does cookie has cart items and add to store
  private getCartCookies() {
    // if already get cookies
    if (this.store.main.cart.cookieCart.length > 0) {
      return
    }
    const rawCart: any = this.$cookies.get("cart");
    const cart = !rawCart ? [] : JSON.parse(rawCart);
    const isLogin = this.store.main.account.isLogin;
    this.store.main.cart.setCart({ isLogin: isLogin, cookie: cart });
  }
}

// export default Vue.extend({
//   name: "default",
//   mounted() {},
//   data() {
//     return {
//       icon: {
//         list: mdiFormatListBulleted,
//         search: mdiMagnify,
//         cart: mdiCartVariant,
//         cancel: mdiWindowClose,
//         account: mdiAccount,
//       },
//       store: this.$store,
//       cart: {
//         items: 0,
//       },
//       cookies: {},
//       showList: false,
//     };
//   },
//   components: {
//     List,
//   },
//   methods: {
//     switchList() {
//       this.$data.showList = !this.$data.showList;
//     },
//     getCartCookies() {
//       const rawCart: any = this.$cookies.get("cart");
//       const cart = !rawCart ? [] : JSON.parse(rawCart);
//       this.store.main
//     },
//   },
//   computed: {},
// });
</script>
