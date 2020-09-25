<template>
  <div id="HomePage">
    <v-container>
      <v-row>
        <HoverProd/>
      </v-row>
    </v-container>
    <p>readState is {{readState}}</p>
    <p>readGetter is {{readGetter}}</p>
  </div>
</template>

<style scoped lang="scss">
#HomePage {
  margin-top: 135px;
  background-image: url("../assets/pic/home.jpg");
  background-size: 85%;
  background-position: right top;
  height: 600px;
}

img {
  width: 350px;
}
</style>

<script lang="ts">
import {Component,Vue} from 'vue-property-decorator';
import fakeData from "../assets/fakeData/homeProducts.json";
// import fakeData from "../assets/fakeData/homeProducts.json"
import { useStore,  useModule} from 'vuex-simple';
import { MyStore } from '@/store/store';
import { FooModule } from '@/store/modules/foo';

@Component
export default class MyComponent extends Vue {
 
  // get the module instance from the created store
  public store: MyStore = useStore(this.$store);
 
  // get the module instance with the given namespace
  public foo1?: FooModule = useModule(this.$store, ['bar', 'foo1']);
 
  public get readState() {
    // access state like a property
    return this.store.version;
  }
 
  public get readGetter() {
    // access getter like a property
    return this.store.bar.total;
  }
 
  public commitIncrement() {
    // call mutation like a function
    this.store.bar.foo1.increment();
  }
 
  public commitIncrementBy(id: number) {
    // call with parameter / payload
    this.store.bar.foo2.incrementBy(10);
  }
 
  public callAction() {
    this.store.bar.foo1.asyncIncrement();
  }
}
</script>
