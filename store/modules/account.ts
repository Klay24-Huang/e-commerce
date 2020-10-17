import { Action, Mutation, State, Getter } from "vuex-simple";
import * as queryString from "query-string";
import axios from "axios";
import backendUrl from "@/assets/json/apiUrl.json";

const stringifiedParams = queryString.stringify({
  client_id:
    "435073218601-p2jpokl54gub8235838gdgi69hhucc28.apps.googleusercontent.com",
  redirect_uri: "http://localhost:3000/login",
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ].join(" "), // space separated string
  response_type: "code",
  access_type: "offline",
  prompt: "consent"
});

export class AccountModule {
  @State()
  public isLogin: boolean = false;

  @State()
  public token: string = "";

  @State()
  public _id: string = "";

  @State()
  public googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

  @Mutation()
  public setLoginAndToken(_token: string) {
    this.isLogin = true;
    this.token = _token;
  }

  @Mutation()
  public setId(_id: string) {
    this._id = _id;
  }

  public axiosOriginalLogin(_params: any) {
    return new Promise(async (resolve, reject) => {
      const loginResult: any = await axios.get(
        `${backendUrl.url}/api/account/original-login/`,
        {params:_params}
      );

      if (loginResult.message === "login") {
        this.setLoginAndToken(loginResult.token);
        this.setId(loginResult._id)
      }
      resolve(loginResult.data);
    });
  }

  public axiosSaveCartToDb(_params: any) {
    return new Promise(async (resolve, reject)=>{
      if (_params.cart.length === 0) {
        resolve()
      }
      await axios.patch(`${backendUrl.url}/api/account/save-cart/`, _params);
      resolve()
    })
  }
}
