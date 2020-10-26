import { Getter, Module, Mutation, State } from "vuex-simple";
import { HomePageModule } from "./homePage";
import { ProdDetailModule } from "./prodDetail";
import { CartModule } from "./cart";
import { CategoryModule } from "./category";
import { AccountModule } from "./account";
import { OrderModule } from "./orders";

// import { FooModule } from './foo';

//this is a main module
export class MainModule {
  //some example here
  // // create submodule 'foo1'
  // @Module()
  // public foo1 = new FooModule(5);

  // // create submodule 'foo2'
  // @Module()
  // public foo2 = new FooModule(0);

  // @Getter()
  // public get total() {
  //     return this.foo1.counter + this.foo2.counter;
  // }

  @State()
  public redirectUrl: string = "/";

  @Mutation()
  public setRedirect(_url: string) {
    this.redirectUrl = _url;
  }

  @Mutation()
  public logout(){
    this.account.logout()
    this.cart.logout()
    this.orders.logout()
  }

  @Module()
  public homePage = new HomePageModule();

  @Module()
  public prodDetail = new ProdDetailModule();

  @Module()
  public cart = new CartModule();

  @Module()
  public category = new CategoryModule();

  @Module()
  public account = new AccountModule();

  @Module()
  public orders = new OrderModule();
}
