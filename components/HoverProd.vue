<template>
  <v-col cols="12" >
    <!-- //show small card -->
    <div class="hoverCard" v-if="windowWidth > 1264">
      <nuxt-link :to="`/products/${homeProd.params}`">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card max-width="350">
              <v-row justify="center">
                <img :src="homeProd.picUrl" />
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute opacity="0.7" color="black">
                    <!-- <div class="category">{{ homeProd.category }}</div> -->
                    <div class="product text-center">{{ homeProd.title }}</div>
                    <div class="brand">{{ homeProd.brand }}</div>
                    <div class="price">${{ homeProd.price }}.00</div>
                  </v-overlay>
                </v-fade-transition>
              </v-row>
            </v-card>
          </template>
        </v-hover>
      </nuxt-link>
    </div>
    <!-- // show large card -->
    <div v-else class="large-card">
      <v-row>
        <v-col cols="5" sm="3" class="product-info pl-10">
          <div class="text-subtitle-2">{{ homeProd.brand }}</div>
          <div class="text-h6 text-sm-h4 pt-2">{{ homeProd.title }}</div>
          <div class="text-h5 py-4">${{ homeProd.price }}.00</div>
          <nuxt-link :to="`/products/${homeProd.params}`">
            <MyButton class="btn">
              <div class="text-center" slot="text">SHOP</div>
            </MyButton>
          </nuxt-link>
        </v-col>
        <v-col cols="7" sm="9">
          <nuxt-link :to="`/products/${homeProd.params}`">
            <img :src="homeProd.picUrl" />
          </nuxt-link>
        </v-col>
      </v-row>
    </div>
  </v-col>
</template>

<style lang="scss">
.hoverCard {
  .v-overlay__content {
    width: 250px;
    height: 300px;
  }
}

.v-application a {
  text-decoration: none;
  color: black !important;
}
</style>

<style scoped lang="scss">
.btn {
  outline-style: solid;
  outline-width: thin;
}

.hoverCard {
  img {
    width: 350px;
  }
}

.large-card {
  overflow: hidden;

  img {
    width: 100%;
    margin-top: -150px;

    @media screen and (max-width: 600px) {
      margin-top: 0px;
    }
  }

  .text-h6 {
    // line-height: 1.5rem;
    max-width: 300%;
    width: 300%;

    @media screen and (max-width: 960px) {
      line-height: 2rem;
    }

    @media screen and (max-width: 600px) {
      max-width: 150%;
      width: 150%;
      line-height: 1.5rem;
    }
  }
}

.category {
  position: absolute;
  top: 0;
  left: 0;
}

.product {
  position: absolute;
  width: 85%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  &::after {
    text-decoration: underline;
  }
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

.product-info {
  z-index: 1;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { IHomeProds } from "@/store/models/homeProdModel";

@Component
export default class ProductCard extends Vue {
  // the product of this card to show
  @Prop(Object) homeProd: IHomeProds | undefined;

  private mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  }
  //data
  private windowWidth = window.innerWidth;
}
</script>