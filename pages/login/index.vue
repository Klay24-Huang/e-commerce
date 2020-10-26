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
                      <v-text-field
                        :error-messages="errorMsg.login.email"
                        :change="resetErrMsg('login.email')"
                        v-model="login.email"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="3">Password</v-col>
                    <v-col cols="9">
                      <v-text-field
                        :error-messages="errorMsg.login.password"
                        :input="resetErrMsg('login.password')"
                        type="password"
                        v-model="login.password"
                      >
                      </v-text-field>
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
            <v-col class="d-flex align-center" cols="4"
              ><div class="hr"></div
            ></v-col>
            <v-col cols="4" class="text-center">New to Bazzar?</v-col>
            <v-col class="d-flex align-center" cols="4"
              ><div class="hr"></div
            ></v-col>
            <v-col
              cols="6"
              offset="3"
              class="text-center"
              @click="signInSwitch"
            >
              <MyButton class="btn">
                <div slot="text">Create your account</div>
              </MyButton>
            </v-col>
          </v-row>
        </div>
        <!-- create account -->
        <v-card elevation="2" class="pa-6" v-show="newAccount">
          <v-card-title>Create account</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="3" class="d-flex align-center">Your name</v-col>
                  <v-col cols="9">
                    <v-text-field
                      :input="resetErrMsg('create.name')"
                      :error-messages="errorMsg.create.name"
                      v-model="newAccountInfo.name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="3" class="d-flex align-center">Email</v-col>
                  <v-col cols="9">
                    <v-text-field
                      :input="resetErrMsg('create.email')"
                      :error-messages="errorMsg.create.email"
                      v-model="newAccountInfo.email"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="3" class="d-flex align-center">Password</v-col>
                  <v-col cols="9">
                    <v-text-field
                      :input="resetErrMsg('create.password')"
                      :error-messages="errorMsg.create.password"
                      v-model="newAccountInfo.password"
                      type="password"
                      placeholder="At least six letters and contain one number"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="3" class="d-flex align-center">Re-enter Password</v-col>
                  <v-col cols="9">
                    <v-text-field
                      :input="resetErrMsg('create.confirmPassword')"
                      v-model="newAccountInfo.confirmPassword"
                      :error-messages="errorMsg.create.confirmPassword"
                      :error="error.create.confirmPassword"
                      type="password"
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
            <span
              class="ml-3 blue--text text--darken-2 cursor"
              @click="signInSwitch"
              >Sign-in</span
            >
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
head(){
    return{
      title:'Login'
    }
  }
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

  private rules: any = {
    login: {
      email: [],
      password: [],
    },
  };

  private error = {
    login: {
      email: false,
      password: false,
    },
    create: {
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    },
  };

  private errorMsg = {
    login: {
      email: "",
      password: "",
    },
    create: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };

  private ruleMethods = {
    required: (value: string) => !!value || "Required.",
  };

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
    if (this.checkError("login")) {
      return;
    }
    const loginResult: any = await this.store.main.account.axiosOriginalLogin(
      this.login
    );

    if (loginResult.message === "login") {
      this.afterLogin(loginResult.token, loginResult._id);
      return;
    }

    alert(loginResult.message);
  }

  private checkError(_condition: string) {
    switch (_condition) {
      case "login":
        if (this.login.email.length === 0) {
          this.errorMsg.login.email = "Requied";

          this.error.login.email = true;
        }

        if (this.login.password.length === 0) {
          this.errorMsg.login.password = "Requied";
          this.error.login.password = true;
        }
        for (let [key, value] of Object.entries(this.error.login)) {
          if (value) {
            // has error
            return true;
          }
        }
        break;
      case "create":
        //check empty
        if (this.newAccountInfo.name.length === 0) {
          this.errorMsg.create.name = "Requied";

          this.error.create.name = true;
        }
        if (this.newAccountInfo.password.length === 0) {
          this.errorMsg.create.password = "Requied";

          this.error.create.password = true;
        }
        if (this.newAccountInfo.confirmPassword.length === 0) {
          this.errorMsg.create.confirmPassword = "Requied";

          this.error.create.confirmPassword = true;
        }
        // check confirm password
        if (
          this.newAccountInfo.password !== this.newAccountInfo.confirmPassword
        ) {
          this.errorMsg.create.confirmPassword = "Passwords not match";
          this.errorMsg.create.password = "Passwords not match";
          this.error.create.confirmPassword = true;
        }
        //check email
        if (!this.checkEmail(this.newAccountInfo.email)) {
          this.errorMsg.create.email = "Email not correct";
          this.error.create.email = true;
        }
        if (this.newAccountInfo.email.length === 0) {
          this.errorMsg.create.email = "Requied";

          this.error.create.email = true;
        }
        //check password
        if (!this.checkPassword(this.newAccountInfo.password)) {
          this.errorMsg.create.password = "Incorrect password format";
        }

        for (let [key, value] of Object.entries(this.error.create)) {
          if (value) {
            // has error
            return true;
          }
        }
        break;
      default:
        break;
    }
    return false;
  }

  private checkPassword(_pwd: string) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[0-9]).{6,}$/;
    return re.test(_pwd);
  }

  private checkEmail(_email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(_email).toLowerCase());
  }

  private resetErrMsg(_condition: string) {
    switch (_condition) {
      case "login.email":
        if (this.login.email.length > 0) {
          this.errorMsg.login.email = "";
          this.error.login.email = false;
          return;
        }

        break;
      case "login.password":
        if (this.login.password.length > 0) {
          this.errorMsg.login.password = "";
          this.error.login.password = false;
          return;
        }
        break;
      case "create.name":
        if (this.newAccountInfo.name.length > 0) {
          this.errorMsg.create.name = "";
          this.error.create.name = false;
          return;
        }
        break;
      case "create.email":
        const email = {
          message: this.errorMsg.create.email,
          length: this.newAccountInfo.email.length,
        };
        if (email.length > 0 && email.message === "Required") {
          this.errorMsg.create.email = "";
          this.error.create.email = false;
          return;
        }
        if (this.checkEmail(this.newAccountInfo.email)) {
          this.errorMsg.create.email = "";
          this.error.create.email = false;
          return;
        }
        break;
      case "create.password":
        const password = {
          message: this.errorMsg.create.password,
          length: this.newAccountInfo.password.length,
        };
        if (password.length > 0 && password.message === "Required") {
          this.errorMsg.create.password = "";
          this.error.create.password = false;
          return;
        }
        if (this.checkPassword(this.newAccountInfo.password)) {
          this.errorMsg.create.password = "";
          this.error.create.password = false;
          return;
        }
        break;
      case "create.confirmPassword":
        const message = this.errorMsg.create.confirmPassword;
        const length = this.newAccountInfo.confirmPassword.length;
        if (length > 0 && message === "Required") {
          this.errorMsg.create.confirmPassword = "";
          this.error.create.confirmPassword = false;
          return;
        }
        if (
          this.newAccountInfo.password === this.newAccountInfo.confirmPassword
        ) {
          this.errorMsg.create.confirmPassword = "";
          this.error.create.confirmPassword = false;
        }
        break;
      default:
        break;
    }
  }

  private createAccount() {
    if (this.checkError("create")) {
      return;
    }
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
    // const redirectUrl = this.store.main.redirectUrl;
    // const cookie:any = this.$cookies.get('redirectUrl');
    // const redirectUrl = cookie.url
    //reset
    this.store.main.cart.prods = [];
    this.dealWithCartCookie();
    this.$router.push("/");
    // this.store.main.setRedirect("/")
    // this.$cookies.set("redirectUrl", JSON.stringify({url:'/'}));
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
.cursor {
  &:hover {
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