import { Getter, Module } from 'vuex-simple';
import { FooModule } from './foo';

export class BarModule {

    // create submodule 'foo1'
    @Module()
    public foo1 = new FooModule(5);

    // create submodule 'foo2'
    @Module()
    public foo2 = new FooModule(0);

    @Getter()
    public get total() {
        return this.foo1.counter + this.foo2.counter;
    }
}