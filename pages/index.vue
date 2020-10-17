<template>
  <div id="HomePage">
    <div class="text-h1 slogan">Bazaar Beauty</div>
    <v-container>
      <v-row class="prods">
        <template v-for="(prod, index) in productsToShow">
          <HoverProd :home-prod="prod" :key="index" />
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.slogan{
  font-weight: 500;
}

.prods {
  margin-top: 950px;
}

#HomePage {
  margin-top: 135px;
  background-image: url("../assets/pic/home.jpg");
  background-position: right top;
  background-size: 85%;
  @media (max-width: 600px){
    background-size: 120%;
  }
}

img {
  width: 350px;
}

#test {
  height: 950px;
  width: 100%;
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import fakeData from "../assets/fakeData/homeProducts.json";
// import fakeData from "../assets/fakeData/homeProducts.json"
import { useStore, useModule } from "vuex-simple";
import { MyStore } from "@/store/store";
import { IHomeProds } from "@/store/models/homeProdModel";

// import { FooModule } from "@/store/modules/foo";

@Component({
  components: {},
})
export default class VHomePage extends Vue {
  public mounted() {
    this.axiosHomeProds();
    // this.axiosProdDetail();
  }

  public store: MyStore = useStore(this.$store);

  //data
  private productsToShow: IHomeProds[] = [];

  //how many products does current homepage has
  private productsIndex: number = 0;

  // computed
  public get getHomeProds() {
    return this.store.main.homePage.prods;
  }

  @Watch("getHomeProds")
  watchHomeProds() {
    const count = 9;
    const products = this.store.main.homePage.prods;
    //set 9 products for dault to show
    if (this.productsToShow.length === 0) {
      for (let index = 0; index < count; index++) {
        this.productsToShow.push(products[index]);
      }
      this.productsIndex = count;
    }
  }

  //method
  public axiosHomeProds() {
    this.store.main.homePage.axiosProds();
  }

  //  some example here
  // // get the module instance from the created store
  // public store: MyStore = useStore(this.$store);

  // // get the module instance with the given namespace
  // public foo1?: FooModule = useModule(this.$store, ['bar', 'foo1']);

  // public get readState() {
  //   // access state like a property
  //   return this.store.version;
  // }

  // public get readGetter() {
  //   // access getter like a property
  //   return this.store.bar.total;
  // }

  // public commitIncrement() {
  //   // call mutation like a function
  //   this.store.bar.foo1.increment();
  // }

  // public commitIncrementBy(id: number) {
  //   // call with parameter / payload
  //   this.store.bar.foo2.incrementBy(10);
  // }

  // public callAction() {
  //   this.store.bar.foo1.asyncIncrement();
  // }
}
</script>
