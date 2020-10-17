<template>
  <v-container class="marginOfTop">
    <v-row>
      <!-- left side: category list -->
      <v-col cols="4"
        ><v-row>
          <!-- category title -->
          <v-col class="text-h4" cols="12">{{category}}</v-col> 
          <v-col class="text-h6" cols="12"><div v-for="item in subCategoryList" :key="item">{{item}}</div></v-col>
          </v-row
      ></v-col>
      <!-- product unit -->
      <v-col cols="8">
        <v-row>
          <v-col class="text-h2" cols="12">{{category}}</v-col>
          <v-col cols="6" v-for="(product, index) in products" :key="index">
            <HoverProd :home-prod="product" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { useStore } from "vuex-simple"
import { MyStore } from "@/store/store"
import { ICategory } from "@/store/models/categoryModel"
import { IProdDetail } from "@/store/models/prodDetailModel"

@Component({
  name: "",
  components: {},
})
export default class Category extends Vue {
  public mounted() {
    const category = this.$route.params.category
    const subCategory = this.$route.params.subCategory
    this.axiosGetOneCategory(category)
    this.axiosGetProducts({category: category, subCategory: subCategory})
  }

  //store
  public store: MyStore = useStore(this.$store)

  public axiosGetOneCategory(_category: string) {
    this.store.main.category.axiosGetOneCategory({ category: _category })
  }

  public axiosGetProducts(condition: object){
    this.store.main.category.axiosGetProducts(condition)
  }

  // computed
  public get getCategory() {
    return this.store.main.category.category
  }

  public get getProducts(){
    return this.store.main.category.products
  }

  // data
  public category: string = ""
  public subCategoryList: string[] = []
  public products : IProdDetail[] = []

  //watch
  @Watch("getCategory")
  watchCategory() {
    this.category = this.getCategory.title
    this.subCategoryList = [`All ${this.category}`]
    let subCategoryList = this.getCategory.subCategory

    if(subCategoryList.length > 0){
      this.subCategoryList.push(...subCategoryList)
    }
  }

   @Watch("getProducts")
  watchProducts() {
    this.products = this.getProducts
  }
}
</script>

<style lang='scss' scoped>
</style>