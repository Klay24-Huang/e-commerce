<template>
  <v-app>
    <!-- top bar -->
    <v-container fluid>
      <v-row class="">
        <span>
          <v-icon class="ml-9">{{ icon.list }}</v-icon>
          <v-icon class="ml-9">{{ icon.search }}</v-icon>
        </span>
        <div class="mx-auto">
          <img id="logo" src="~/assets/pic/logo.png" alt="logo" />
        </div>
        <span class="subtitle-2 ml-auto text-button">FREE SHIPPING</span>
        <span class="cart text-button">
          <span class="mx-2">--</span>
          <span class="text-caption">on all orders over $35*</span>
        </span>
        <span class="mx-9">
          <span class="mx-2">{{cart.items}}</span>
          <v-icon>{{ icon.cart }}</v-icon>
        </span>
      </v-row>
    </v-container>
    <nuxt />
  </v-app>
</template>

<style scoped lang="scss">
#logo {
  width: 200px;
  height: 70px;
}

.text-bottom {
    vertical-align: text-bottom;
}
</style>

<script lang="ts">
import { mdiFormatListBulleted, mdiMagnify, mdiCartVariant } from "@mdi/js";
import Vue from "vue";

export default Vue.extend({
  name: "index",
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
