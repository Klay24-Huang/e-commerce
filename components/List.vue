<template>
  <div id="List">
    <v-container>
      <v-row>
        <v-col cols="12" v-for="(item, index) in list" :key="index">

          <nuxt-link v-if="item.title !== 'Shop'" :to="item.link" >
          <div  @click="hideList">
            {{ item.title }}
          </div>
          </nuxt-link>

          <div v-else @click="shopSwitch">
            <div class="d-flex">
              <div>
                {{ item.title }}
              </div>
              <span class="ml-auto">
                <v-icon v-show="!showShop">{{ icon.plus }}</v-icon>
                <v-icon v-show="showShop">{{ icon.minus }}</v-icon>
              </span>
            </div>
            <v-row v-show="showShop">
              <v-col cols="6" v-for="category in categoryList" :key="category.title">
                <nuxt-link :to="`${category.link}/all`">
                <div  @click="hideList">
                {{ category.title }}
                </div>
                </nuxt-link>
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>
        </v-col>
        <v-col v-if="!isLogin"> Login </v-col>
        <v-col v-else> Logout </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { useStore } from "vuex-simple";
import { MyStore } from "@/store/store";
import { mdiPlus, mdiMinus } from "@mdi/js";

@Component({
  name: "",
  components: {},
})
export default class List extends Vue {
  //store
  private store: MyStore = useStore(this.$store);

  // data
  private icon = {
    plus: mdiPlus,
    minus: mdiMinus,
  };

  private list = [{title:'New',link:'/'}, {title:'Shop',link:''}, {title:'Cart',link:'/cart'}];

  private categoryList = [{title:'Makeup',link:'/makeup'},{title:'Hair Care',link:'/hair-care'},{title:'Bath+Body',link:'/bath-body'}];

  private showShop = false;

  private get isLogin() {
    return this.store.main.account.isLogin;
  }

  //methods
  private shopSwitch(){
    this.showShop =!this.showShop
  }

  private hideList(){
    this.$emit('childMethod')
  }
}
</script>

<style lang='scss' scoped>
#List {
  margin-top: 135px;
}
</style>