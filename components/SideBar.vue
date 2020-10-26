<template>
  <v-navigation-drawer
    :clipped="clipped"
    enable-resize-watcher
    app
    light
    hide-overlay
    v-model="isShowList"
  >
    <v-list>
      <v-subheader @click.stop="hideList" class="pointer"><v-icon class="ml-auto">{{icon.close}}</v-icon></v-subheader>
      <v-list-item-group v-model="selection">
        <template v-for="item in items">
          <nuxt-link
            v-if="item.title !== 'Shop'"
            :key="item.title"
            :to="item.link"
            @click.native="clearShopSelectioo"
          >
            <v-list-item>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <v-list-group color="black" v-else :key="item.title">
            <template v-slot:activator>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </template>

            <v-list-item-group v-model="shopSelection">
              <nuxt-link
                v-for="subItem in categoryList"
                :key="subItem.title"
                :to="subItem.link"
                @click.native="clearSelection"
              >
                <v-list-item>
                  <v-list-item-title class="ml-4">{{
                    subItem.title
                  }}</v-list-item-title>
                </v-list-item>
              </nuxt-link>
            </v-list-item-group>
          </v-list-group>
        </template>
        <nuxt-link to="/orders" v-show="isLogin" @click.native="clearShopSelectioo">
          <v-list-item>
            <v-list-item-title>Order</v-list-item-title>
          </v-list-item>
        </nuxt-link>
        <nuxt-link
          to="/login"
          v-show="!isLogin"
          @click.native="clearShopSelectioo"
        >
          <v-list-item>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/" v-show="isLogin" @click.native="logout">
          <v-list-item>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </nuxt-link>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { MyStore } from "@/store/store";
import { useStore } from "vuex-simple";
import { mdiClose } from '@mdi/js'

@Component({
  name: "",
  components: {},
})
export default class SideBar extends Vue {
  @Prop(Boolean) showList: Boolean | undefined;
  //data
  private icon = {close: mdiClose}
  private clipped = false;
  private items = [
    { title: "Home", link: "/" },
    { title: "New", link: "/" },
    { title: "Shop", link: "" },
    { title: "Cart", link: "/cart" },
  ];
  private categoryList = [
    { title: "Hair Care", link: "/hair-care/all" },
    { title: "Makeup", link: "/makeup/all" },
    { title: "Bath+Body", link: "/bath-body/all" },
  ];

  //computed
  private get isShowList() {
    return this.showList;
  }
  //prevent erro mention
  private set isShowList(_a:any) {
    
  }

  private get isLogin(){
    return this.store.main.account.isLogin
  }

  //store
  private store: MyStore = useStore(this.$store);
  //data
  // private isLogin = this.store.main.account.isLogin;
  private selection = "";
  private shopSelection = "";

  //methods
  private clearSelection() {
    this.selection = "";
    this.hideList()
  }

  private clearShopSelectioo() {
    this.shopSelection = "";
    this.hideList()
  }

  private logout(){
    this.clearShopSelectioo()
    this.store.main.logout()
  }

  @Emit('hideList')
  private hideList(){
  }
}
</script>

<style lang='scss'>
.pointer {
  cursor: pointer;
}
</style>