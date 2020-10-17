<template >
  <v-container class="marginOfTop"
    ><v-row>
      <a :href="googleLoginUrl">test login</a>
      <v-col cols="6" offset="3">
        <!-- sign-in -->
        <div v-show="!newAccount">
          <v-card elevation="2" class="pa-6">
            <v-card-title>Sign-in</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="3">Email</v-col>
                    <v-col cols="9">
                      <v-text-field v-model="login.email"> </v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="3">Password</v-col>
                    <v-col cols="9">
                      <v-text-field v-model="login.password"> </v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-row>
                  <v-col offset="9" cols="3"
                    ><v-btn @click="originalLogin"> Continue </v-btn></v-col
                  >
                </v-row>
              </v-row>
            </v-card-text>
          </v-card>
          <v-row>
            <v-col cols="4"><v-divider></v-divider></v-col>
            <v-col cols="4" class="text-center">New to Bazzar?</v-col>
            <v-col cols="4"><v-divider></v-divider></v-col>
            <v-col cols="12">
              <v-btn @click="signInSwitch">Create your account</v-btn></v-col
            >
          </v-row>
        </div>
        <!-- create account -->
        <v-card elevation="2" class="pa-6" v-show="newAccount">
          <v-card-title>Sign-in</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="3">Your name</v-col>
                  <v-col cols="9">
                    <v-text-field v-model="newAccountInfo.name"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="3">Email</v-col>
                  <v-col cols="9">
                    <v-text-field v-model="newAccountInfo.email"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="3">Password</v-col>
                  <v-col cols="9">
                    <v-text-field
                      v-model="newAccountInfo.password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="3">Re-enter Password</v-col>
                  <v-col cols="9">
                    <v-text-field
                      v-model="newAccountInfo.confirmPassword"
                      :error-messages="confirmPasswordError"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-row>
                <v-col offset="9" cols="3"
                  ><v-btn @click="createAccount"> Continue </v-btn></v-col
                >
              </v-row>
            </v-row>
          </v-card-text>
          <v-card-actions>
            Already have an account?
            <span class="ml-3" @click="signInSwitch">Sign-in</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row></v-container
  >
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { useStore } from "vuex-simple";
import { MyStore } from "@/store/store";
import * as queryString from "query-string";
import axios from "axios";
import apiUrl from "@/assets/json/apiUrl.json";
import VueCookies from "vue-cookies-ts";
Vue.use(VueCookies);

@Component({
  name: "",
  components: {},
})
export default class login extends Vue {
  public mounted() {
    //google redirection
    const urlParams = queryString.parse(window.location.search);
  }

  //store
  public store: MyStore = useStore(this.$store);

  // data
  private newAccount = false;

  private newAccountInfo = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmPasswordError: "",
  };

  private login = { email: "", password: "" };

  private googleLoginUrl = this.store.main.account.googleLoginUrl;

  //computed
  private get confirmPasswordError() {
    return this.newAccountInfo.confirmPasswordError;
  }

  // method
  private signInSwitch() {
    this.newAccount = !this.newAccount;
  }

  private async originalLogin() {
    const loginResult: any = await this.store.main.account.axiosOriginalLogin(
      this.login
    );

    if (loginResult.message === "login") {
      this.afterLogin(loginResult.token,loginResult._id);
      return;
    }

    alert(loginResult.message);
  }

  private createAccount() {
    const confirmPassword =
      this.newAccountInfo.password === this.newAccountInfo.confirmPassword;

    if (!confirmPassword) {
      this.newAccountInfo.confirmPasswordError = "password error";
      return;
    }

    axios
      .post(`${apiUrl.url}/api/account/`, {
        name: this.newAccountInfo.name,
        email: this.newAccountInfo.email,
        password: this.newAccountInfo.password,
      })
      .then((res) => {
        this.newAccountInfo = {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          confirmPasswordError: "",
        };
        this.signInSwitch();
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private afterLogin(_token: string, _id:string) {
    this.store.main.account.setLoginAndToken(_token);
    this.store.main.account.setId(_id)
    const redirectUrl = this.store.main.redirectUrl;
    //reset
    this.store.main.cart.prods = []
    this.dealWithCartCookie()
    this.$router.push(redirectUrl);
    this.store.main.redirectUrl = "/";
  }

  // save cookie to db and clear local cookie
  private async dealWithCartCookie() {
    const rawCart: any = this.$cookies.get("cart");
    const cart = !rawCart ? [] : JSON.parse(rawCart);
    const _id =  this.store.main.account._id
    const params = { _id: _id, cart: cart };

    await this.store.main.account.axiosSaveCartToDb(params);
    //get cart from db
    this.store.main.cart.axiosDbCart({_id: _id, isLogin: true})

    this.$cookies.remove("cart");
  }
}
</script>

<style lang='scss' scoped>
</style>