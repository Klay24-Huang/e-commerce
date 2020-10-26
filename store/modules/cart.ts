import { Action, Mutation, State, Getter } from "vuex-simple";
import { ICartProd } from "../models/cartProdModel";
import { ICookieCart } from "@/store/models/cookieCartModel";
import { IProdDetail} from "@/store/models/prodDetailModel"
import axios from "axios";
import backendUrl from "@/assets/json/apiUrl.json";

export class CartModule {
  @State()
  public count: number = 0;

  @State()
  public prods: ICartProd[] = [];

  @State()
  public cookieCart: ICookieCart[] = [];

  @State()
  public dbCart: ICookieCart[] =[]
  

  @State()
  public subtotal: number = 0

  @Mutation()
  public logout(){
    this.count = 0
    this.prods = []
    this.cookieCart = []
    this.dbCart = []
    this.subtotal = 0
  }

  @Mutation()
  public setProds(prods: ICartProd[]) {
    this.prods = prods;
  }

  @Mutation()
  public SetSubtotal(prods: ICartProd[]){
    let subtotal = 0
    prods.forEach(prod => {
      subtotal += prod.quantity* prod.price
    });
    this.subtotal = subtotal
  }

  @Mutation()
  public setCart(_params: any) {
    console.log('setCart')
    let cart = []
    let count = 0;

    if (_params.isLogin) {
      cart = _params.dbCart
    }else{
      cart = _params.cookie;
    }
    // count cart items from cookies or db
    if (cart.length > 0) {
      cart.forEach((element: any) => {
        count += element.quantity;
      });
    }
    this.count = count;

    if (_params.isLogin) {
      this.dbCart = _params.dbCart  
      return
    }

    this.cookieCart = _params.cookie;
  }


  //products info of cart
  public async axiosCart(_params: any) {
    console.log('axiosCart')
    let idArr =[]
    let cart:ICookieCart[] = []
    if (_params.isLogin) {
      idArr = this.dbCart.map((x: any) => x._id);
      cart = this.dbCart
    }else{
      idArr = this.cookieCart.map((x: any) => x._id);
      cart = this.cookieCart
    }

    axios
      .post(`${backendUrl.url}/api/product/cart`, { productsId: idArr })
      .then((result: any) => {
        const prods =  result.data
        prods.forEach((prod:ICartProd) => {
          cart.forEach((cartProd => {
            if (prod._id === cartProd._id) {
              prod.quantity = cartProd.quantity
            }
          }))
        });
        this.setProds(prods);
        this.SetSubtotal(prods)
      });
  }

  //get member's cart info from db
  public axiosDbCart(_params:any){
    console.log('axiosDbCart')
    axios.get(`${backendUrl.url}/api/account/cart`,{params:{_id: _params._id}}).then(success => {
      _params.dbCart = success.data
      this.setCart(_params)
    })
  }
}
