<template>
  <v-app>
    <SideBar :showList="showList" @hideList="hideList"></SideBar>
    <v-overlay
      :absolute="true"
      :value="showList"
      @click.native="hideList"
    ></v-overlay>
    <!-- top bar -->
    <v-container id="top" fluid pt-0>
      <v-row align="center">
        <!-- shipping text -->
        <v-col
          id="ShippingText"
          class="col-12 col-lg-3 text-lg-right text-center"
          order-lg="2"
          >
          <span class="animate__animated animate__fadeInLeft">
            <span class="subtitle-2 text">FREE SHIPPING</span>
            <span class="cart">
              <span class="mx-2">--</span>
              <span class="text-caption">on all orders over $35*</span>
            </span>
          </span>
        </v-col>
        <!-- search and list icon -->
        <v-col class="col-3 col-lg-4" order-lg="0">
          <v-icon class="ml-md-9 ml-3" @click="switchList">{{
            icon.list
          }}</v-icon>
          <v-icon class="ml-md-9 ml-3 icon-hide">{{ icon.search }}</v-icon>
        </v-col>
        <!-- logo -->
        <v-col
          class="col-6 text-center col-lg-4 animate__animated animate__fadeInLeft"
          order-lg="1"
        >
          <nuxt-link to="/">
            <img id="logo" src="~/assets/pic/logo.png" alt="logo" />
          </nuxt-link>
        </v-col>
        <v-col class="col-3 text-right col-lg-1" order-lg="3">
          <!-- account or orders -->
          <nuxt-link to="/login" v-if="!getIsLogin">
            <v-icon class="mr-3 mr-md-7 icon-hide">{{ icon.account }}</v-icon>
          </nuxt-link>
           <nuxt-link to="/orders" v-else>
            <v-icon class="mr-3 mr-md-7 icon-hide">{{ icon.order }}</v-icon>
          </nuxt-link>
          <!-- cart -->
          <nuxt-link id="cartItems" to="/cart">
            <span>{{ getCartCount }}</span>
            <v-icon class="mr-3 mr-md-0">{{ icon.cart }}</v-icon>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
    <!-- view or List -->
    <nuxt />
    <!-- <List v-show="showList" v-on:childMethod="hideList"></List> -->
    <!-- footer -->
    <v-container id="Footer">
      <v-row>
        <v-col class="d-flex align-center">
          <div class="hr"></div>
        </v-col>
        <v-col class="text-center text-h4">BAZZAR</v-col>
        <v-col class="d-flex align-center">
          <div class="hr"></div>
        </v-col>
      </v-row>
      <v-row>
        <!-- left -->
        <v-col cols="12" sm="4" order="2" order-sm="1">
          <div class="d-flex justify-center flex-column text-center">
            <a href="#">
              PRIVACY POLICY</a>
            <a href="#">TERMS & CONDITIONS</a>
            <a href="#">ABOUT</a>
          </div>
        </v-col>
        <!-- center -->
        <v-col
          cols="12"
          sm="4"
          order="1"
          order-sm="2"
          class="d-flex align-center justify-space-around animate__animated animate__fadeInLeft"
        >
          <v-icon>{{ icon.twitter }}</v-icon>
          <v-icon>{{ icon.facebook }}</v-icon>
          <v-icon>{{ icon.instagram }}</v-icon>
        </v-col>
        <!-- right -->
        <v-col cols="12" sm="4" order="3" order-sm="3">
          <div class="d-flex justify-center flex-column text-center">
            <a href="#">SHIPPING INFO</a>
            <a href="#">RETURNS / EXCHANGES</a>
            <a href="#">CONTACT</a>
          </div>
        </v-col>
        <v-col order="4" cols="12 d-flex justify-center">
          <span class="text--center"
            >&copy; {{ new Date().getFullYear() }}</span
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style lang="scss">
$animate: all 0.2s ease-in-out;

.marginOfTop {
  margin-top: 135px;
}

.hr {
  width: 100%;
  background-color: black;
  height: 1px;
}

.hover {
  transition: $animate;
  position: relative;
  &:before,
  &:after {
    content: "";
    position: absolute;
    bottom: 0px;
    width: 0px;
    height: 1px;
    margin: 5px 0 0;
    transition: $animate;
    transition-duration: 0.3s;
    opacity: 1;
    background-color: black;
  }
  &.hover-1 {
    &:before,
    &:after {
      left: 0;
    }
  }

  &:hover {
    cursor: pointer;
    &:before,
    &:after {
      width: 100%;
      opacity: 1;
    }
  }
}
</style>

<style scoped lang="scss">
#cartItems {
  color: black;
  text-decoration: none;
}

#top {
  position: fixed;
  z-index: 2;
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

.icon-hide {
  @media screen and (max-width: 600px) {
    display: none;
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
  mdiTwitter,
  mdiFacebook,
  mdiInstagram,
  mdiBorderColor
} from "@mdi/js";
import List from "@/components/List.vue";
import SideBar from "@/components/SideBar.vue";
import VueCookies from "vue-cookies-ts";
import { useStore } from "vuex-simple";
import { MyStore } from "@/store/store";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import cookies from "~/plugins/cookies";
import { getCartCookies } from "@/assets/script/cookies.ts";
import "animate.css";

Vue.use(VueCookies);

@Component({
  components: {
    List,
    SideBar,
  },
})
export default class Layout extends Vue {
  public mounted() {
    // this.getCartCookies();
    getCartCookies(this.store, this.$cookies.get("cart"));
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
    twitter: mdiTwitter,
    facebook: mdiFacebook,
    instagram: mdiInstagram,
    order:mdiBorderColor
  };

  private showList = false;

  // computed
  private get getCartCount() {
    return this.store.main.cart.count;
  }

  private get getIsLogin(){
    return this.store.main.account.isLogin
  }

  //methods
  private switchList() {
    this.showList = !this.showList;
  }

  private hideList() {
    this.showList = false;
  }

  //check does cookie has cart items and add to store
  private getCartCookies() {
    // if already get cookies
    if (this.store.main.cart.cookieCart.length > 0) {
      return;
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
