<template>
  <v-container>
    <v-row justify="center">
      <v-carousel hide-delimiters height="auto">
        <v-carousel-item v-for="prod in prods" :key="prod.title">
          <v-sheet class="black--text" color="white">
            <v-row class="px-8">
              <v-col cols="12" sm="6">
                <div class="pic">
                  <img :src="prod.picUrl" :alt="prod.title" />
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="pt-md-10 pt-lg-16">
                <div class="text-subtitle-2 text-center text-sm-left">
                  {{ prod.brand }}
                </div>
                <div  class="text-h5 text-center text-sm-left">
                  {{ prod.title }}
                </div>
                <v-row>
                  <v-col cols="6" offset="3" sm="6" offset-sm="0">
                    <MyButton class="carousel-btn">
                      <div class="text-center" slot="text">BROWSE</div>
                    </MyButton>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </v-container>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { IHomeProds } from "@/store/models/homeProdModel";

@Component({
  name: "",
  components: {},
})
export default class Carousel extends Vue {
  @Prop(Array) prods: IHomeProds[] | undefined;
}
</script>

<style lang='scss' scoped>
.pic {
  margin-top: -80px;
  img {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}

.carousel-btn {
  outline-style: solid;
  outline-width: thin;
}

.text-h5 {
  font-weight: 700;
}
</style>