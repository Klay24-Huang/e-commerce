<template>
  <div id="HomePage">
    <div class="d-flex flex-column flex-md-row pl-10 pt-5">
      <div class="text-md-h1 text-h2 slogan animate__animated animate__fadeInLeft">Bazaar</div>
      <div class="text-md-h1 text-h2 slogan pl-md-10 pl-16 animate__animated animate__fadeInLeft">Beauty</div>
    </div>
    <img id="HomePic" class="animate__animated animate__fadeInLeft" src="~/assets/pic/home.jpg" />
    <MyButton id="Btn" class="animate__animated animate__fadeInLeft">
      <div slot="header">Summer Picks</div>
      <div slot="text">2020 SHOPPING GUIDE</div>
    </MyButton>
    <v-container>
      <!-- product cards -->
      <v-row class="prods">
          <v-col cols="12" lg="4" v-for="(prod, index) in productsToShow" :key="index">
          <HoverProd :home-prod="prod" :key="index" />
          </v-col>
      </v-row>
      <!-- carousels -->
      <Carousel id="Carousel" class="mt-10" :prods="productsToShow"></Carousel>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
#Btn {
  margin: 50px 40px;
  outline-style: solid;
  outline-width: thin;
  background-color: white;
  max-width: 30%;
  top: -600px;

  @media (max-width: 1264px) {
    outline-color: rgba(0, 0, 0, 0);
    top: -200px;
    max-width: 50%;
    margin-left: auto;
    margin-right: 50px;
  }

  @media (max-width: 960px) {
    outline-color: black;
    max-width: 80%;
    margin: 50px auto;
    left: 0px;
    top: 0;
  }

  @media (max-width: 600px) {
    outline-color: black;
    max-width: 100%;
    margin: 50px 30px;
    top: 0;
  }
}

.slogan {
  font-weight: 500;
  z-index: 1;

  @media (max-width: 600px) {
    display: none;
  }
}

.prods {
  margin-top: 0px;
}

#HomePic {
  width: 85%;
  display: block;
  margin-left: auto;
  margin-top: -150px;
  @media (max-width: 1264px) {
    margin-top: -100px;
  }

  @media (max-width: 960px) {
    margin-top: -120px;
  }

  @media (max-width: 600px) {
    margin-top: -20px;
    width: 100%;
    margin-right: auto;
  }
}

#HomePage {
  margin-top: 135px;
}

img {
  width: 350px;
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
  head(){
    return{
      title:'Bazaar'
    }
  }
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
