<template>
  <v-col class="hoverCard">
    <nuxt-link to="/products/A">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card max-width="350">
            <v-row justify="center">
              <img :src="homeProd.picUrl" />
              <v-fade-transition>
                <v-overlay v-if="hover" absolute opacity="0.7" color="black">
                  <div class="category">{{ homeProd.category }}</div>
                  <div class="product">{{ homeProd.product }}</div>
                  <div class="brand">{{ homeProd.brand }}</div>
                  <div class="price">{{ homeProd.price }}</div>
                </v-overlay>
              </v-fade-transition>
            </v-row>
          </v-card>
        </template>
      </v-hover>
    </nuxt-link>
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { IHomeProds } from "@/store/models/homeProdModel";

@Component
export default class VHomeProd extends Vue {
  // the product of this card to show
  @Prop(Object) homeProd: IHomeProds | undefined;
}
</script>