<template>
  <v-container id="content" ref="test" class="marginOfTop">
    <v-row>
      <!-- left side: category list -->
      <v-col cols="4"
        ><v-row>
          <!-- category title -->
          <v-col
            class="text-h4 animate__animated animate__slideInLeft"
            cols="12"
            >{{ category }}</v-col
          >
          <v-col
            class="text-h6 animate__animated animate__slideInLeft"
            cols="12"
            ><div v-for="item in subCategoryList" :key="item.title">
              <nuxt-link :to="item.link" class="hover hover-1">
                {{ item.title }}
              </nuxt-link>
            </div></v-col
          >
        </v-row></v-col
      >
      <!-- product unit -->
      <v-col cols="8">
        <v-row>
          <v-col
            class="text-h2 animate__animated animate__slideInLeft"
            cols="6"
            >{{ category }}</v-col
          >
          <v-col cols="4" offset="2">
            <v-select
              class="animate__animated animate__slideInLeft"
              v-bind:items="sort"
              label="Sort by"
              v-model="sortValue"
              @change="sortChange"
            ></v-select>
          </v-col>
          <v-col
            cols="6"
            v-for="(product, index) in products[page - 1]"
            :key="index"
            class="animate__animated animate__slideInUp"
          >
            <HoverProd :home-prod="product" />
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <!-- <v-btn
              id="AddProduct"
              fab
              dark
              color="dark"
              @click="AddProduct"
              v-show="showButton"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn> -->
            <div class="text-xs-center">
              <v-pagination
                v-model="page"
                :length="products.length"
                color="black"
                @click="scrollTop"
              ></v-pagination>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { useStore } from "vuex-simple";
import { MyStore } from "@/store/store";
import { ICategory } from "@/store/models/categoryModel";
import { IProdDetail } from "@/store/models/prodDetailModel";
import { loading } from "@/assets/script/loading";

@Component({
  head() {
    return {
      title: "Category",
    };
  },
})
export default class Category extends Vue {
  public mounted() {
    const category = this.$route.params.category;
    const subCategory = this.$route.params.subCategory;
    this.axiosGetOneCategory(category);
    this.axiosGetProducts({ category: category, subCategory: subCategory });
    loading(this);
  }

  //store
  public store: MyStore = useStore(this.$store);

  public axiosGetOneCategory(_category: string) {
    this.store.main.category.axiosGetOneCategory({ category: _category });
  }

  public axiosGetProducts(condition: object) {
    this.store.main.category.axiosGetProducts(condition);
  }

  // computed
  public get getCategory() {
    return this.store.main.category.category;
  }

  public get getProducts() {
    return this.store.main.category.products;
  }

  // data
  public category: string = "";
  public subCategoryList: object[] = [];
  //products by page
  public products: any = [];
  //current product to show
  public pageProduct: IProdDetail[] = [];
  //current page
  public page = 1;
  public showButton = true;
  public sort = [
    { text: "price (low to hight)", value: "lth" },
    { text: "price (hight to low)", value: "htl" },
  ];
  public sortValue = "";

  //watch
  @Watch("getCategory")
  watchCategory() {
    this.category = this.getCategory.title;
    this.subCategoryList = [{ title: `All ${this.category}`, link: "all" }];
    let subCategoryList = this.getCategory.subCategory;

    if (subCategoryList.length > 0) {
      this.subCategoryList.push(...subCategoryList);
    }
  }

  @Watch("getProducts")
  watchProducts() {
    this.pageProductMethod(this.getProducts);
  }

  @Watch("page")
  scrollTop() {
    window.scrollTo(0, 0);
  }

  //methods
  //add first page product
  private setDefaultProduct() {
    this.pageProduct = this.products[0];
  }

  //add next page products
  private AddProduct() {
    const currPage = this.pageProduct.length / 8;
    const allPages = this.products.length;

    const text: any = this.$refs.test;
    console.log(text.scrollHeight);

    if (currPage < allPages) {
      const nextPage = this.products[currPage];
      for (let index = 0; index < nextPage.length; index++) {
        const element = nextPage[index];
        this.pageProduct.push(element);
      }
    }

    this.scrollToNew(text.scrollHeight);

    if (currPage + 1 === allPages) {
      this.showButton = false;
    }
  }

  //not use
  private scrollToNew(_preHeight: number | undefined) {
    const content: any = this.$refs.test;
    if (content !== null && _preHeight) {
      console.log("in");
      this.$nextTick(() => {
        // content.scrollTop = 0
        let a = document.getElementById("#content");
        if (a !== null) {
          a.scrollTop = 0;
        }
      });
    }
  }

  private sortChange() {
    let products = JSON.parse(JSON.stringify(this.getProducts));
    products.sort(this.compare);
    this.pageProductMethod(products);
  }

  private compare(a: IProdDetail, b: IProdDetail) {
    const sort = this.sortValue;
    switch (sort) {
      case "htl":
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        return 0;
        break;
      case "lth":
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
        break;
      default:
        break;
    }
  }

  private pageProductMethod(_products: IProdDetail[]) {
    this.products = [];
    let count = 0;
    let pageArr = [];
    for (let index = 0; index < _products.length; index++) {
      const element = _products[index];
      pageArr.push(element);
      count++;
      if (count === 8) {
        count = 0;
        this.products.push(pageArr);
        pageArr = [];
      }
    }
    if (pageArr.length > 0) {
      this.products.push(pageArr);
    }

    this.setDefaultProduct();
  }
}
</script>

<style lang='scss' scoped>
#AddProduct {
  width: 30px;
  height: 30px;
}
</style>