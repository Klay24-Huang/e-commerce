<template >
  <v-container class="marginOfTop"
    ><v-row>
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
                  <v-col offset="6" cols="6" class="text-right">
                    <a :href="googleLoginUrl">
                      <div class="google-btn">
                        <MyButton>
                          <div slot="text">
                            <v-row no-gutters>
                              <v-col cols="2">
                                <v-img
                                  width="20px"
                                  style="margin-right: 8px"
                                  alt="Google sign-in"
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                                ></v-img>
                              </v-col>
                              <v-col cols="10"> Login with Google </v-col>
                            </v-row>
                          </div>
                        </MyButton>
                      </div>
                    </a>
                    <a href="#">
                      <div @click="originalLogin" class="btn mt-4">
                        <MyButton>
                          <div class="text-center" slot="text">Continue</div>
                        </MyButton>
                      </div>
                    </a>
                  </v-col>
                </v-row>
              </v-row>
            </v-card-text>
          </v-card>
          <v-row>
            <v-col class="d-flex align-center" cols="4"><div class="hr"></div></v-col>
            <v-col cols="4" class="text-center">New to Bazzar?</v-col>
            <v-col class="d-flex align-center" cols="4"><div class="hr"></div></v-col>
            <v-col cols="6" offset="3" class="text-center" @click="signInSwitch">
              <MyButton class="btn">
                <div slot="text">Create your account</div>
              </MyButton>
              </v-col>
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
                <v-col offset="6" cols="6" @click="createAccount">
                  <MyButton class="btn text-center">
                    <div slot="text">Continue</div>
                  </MyButton>
                  </v-col>
              </v-row>
            </v-row>
          </v-card-text>
          <v-card-actions>
            Already have an account?
            <span class="ml-3 blue--text text--darken-2 cursor" @click="signInSwitch">Sign-in</span>
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
    const googleCode = this.$route.query.code;
    if (typeof googleCode === "string") {
      this.googleLogin(googleCode);
    }
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
    window.scrollTo(0, 0);
  }

  private async originalLogin() {
    const loginResult: any = await this.store.main.account.axiosOriginalLogin(
      this.login
    );

    if (loginResult.message === "login") {
      this.afterLogin(loginResult.token, loginResult._id);
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

  private afterLogin(_token: string, _id: string) {
    this.store.main.account.setLoginAndToken(_token);
    this.store.main.account.setId(_id);
    const redirectUrl = this.store.main.redirectUrl;
    //reset
    this.store.main.cart.prods = [];
    this.dealWithCartCookie();
    console.log(redirectUrl)
    this.$router.push(redirectUrl);
    this.store.main.redirectUrl = "/";
  }

  // save cookie to db and clear local cookie
  private async dealWithCartCookie() {
    const rawCart: any = this.$cookies.get("cart");
    const cart = !rawCart ? [] : JSON.parse(rawCart);
    const _id = this.store.main.account._id;
    const params = { _id: _id, cart: cart };

    await this.store.main.account.axiosSaveCartToDb(params);
    //get cart from db
    this.store.main.cart.axiosDbCart({ _id: _id, isLogin: true });

    this.$cookies.remove("cart");
  }

  private async googleLogin(_code: string | undefined) {
    if (_code === undefined) {
      return;
    }
    const loginResult: any = await this.store.main.account.axiosGoogleLogin({
      code: _code,
    });
    if (loginResult.message === "login") {
      this.afterLogin(loginResult.token, loginResult._id);
      return;
    }
  }
}
</script>

<style lang='scss' scope>
.cursor{
  &:hover{
    cursor: pointer;
  }
}

.google-btn {
  outline: solid;
  outline-width: thin;
}

.btn {
  outline: solid;
  outline-width: thin;
}
</style>