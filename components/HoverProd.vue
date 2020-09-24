<template>
  <v-col class="hoverCard">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card max-width="350">
          <v-row justify="center">
            <img src="https://i.imgur.com/jMB0tvv.jpeg" />
            <v-fade-transition>
              <v-overlay v-if="hover" absolute opacity="0.7" color="black">
                <div class="category">1</div>
                <div class="product">OSdsfdsfdssfdsfHDHO</div>
                <div class="brand">3</div>
                <div class="price">4</div>
              </v-overlay>
            </v-fade-transition>
          </v-row>
        </v-card>
      </template>
    </v-hover>
  </v-col>
</template>

<style lang="scss">
.hoverCard {
  .v-overlay__content {
    width: 250px;
    height: 300px;
  }
}
</style>

<style scoped lang="scss">
img {
  width: 350px;
}

.category {
  position: absolute;
  top: 0;
  left: 0;
}

.product {
  position: absolute;
  left: 50%;
  top: 50%;
transform: translate(-50%, -50%);
}

.brand {
  position: absolute;
  bottom: 0;
  left: 0;
}

.price {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "index",
  data() {
    return {
      absolute: true,
      overlay: false,
    };
  },
});
</script>