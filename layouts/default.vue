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
          <v-icon class="ml-md-9 ml-3">{{ icon.list }}</v-icon>
          <v-icon class="ml-md-9 ml-3">{{ icon.search }}</v-icon>
        </v-col>
        <!-- logo -->
        <v-col class="col-6 text-center col-lg-4" order-lg="1">
          <nuxt-link to="/">
            <img id="logo" src="~/assets/pic/logo.png" alt="logo" />
          </nuxt-link>
        </v-col>
        <!-- cart -->
        <v-col class="col-3 text-right col-lg-1" order-lg="3">
          <span>{{ cart.items }}</span>
          <v-icon>{{ icon.cart }}</v-icon>
        </v-col>
      </v-row>
    </v-container>
    <nuxt />
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

<style scoped lang="scss">
#top {
  position: fixed;
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
import { mdiFormatListBulleted, mdiMagnify, mdiCartVariant } from "@mdi/js";
import Vue from "vue";

export default Vue.extend({
  name: "default",
  data() {
    return {
      icon: {
        list: mdiFormatListBulleted,
        search: mdiMagnify,
        cart: mdiCartVariant,
      },
      cart: {
        items: 0,
      },
    };
  },
});
</script>
