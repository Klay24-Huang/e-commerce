import { Getter, Module } from 'vuex-simple';
import { HomePageModule } from './homePage'
import { ProdDetailModule } from './prodDetail'
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
    @Module()
    public homePage = new HomePageModule()

    @Module()
    public prodDetail = new ProdDetailModule()
}