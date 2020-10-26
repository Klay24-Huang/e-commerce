<template>
  <v-container class="marginOfTop">
    <v-row>
      <v-card
        class="mt-8 animate__animated  animate__slideInUp"
        width="100%"
        v-for="order in orders"
        :key="order._id"
      >
        <v-card-title class="grey lighten-4 py-0">
          <v-row>
            <v-col cols="4">Recipient: {{ order.name }}</v-col>
            <v-col cols="4">Phone: {{ order.phone }}</v-col>
            <v-col cols="4">Address: {{ order.Address }}</v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="bg">
          <v-row >
            <v-col
              cols="6"
              v-for="product in order.productsInfo"
              :key="product._id"
            >
              <v-row>
                <v-col cols="3">
                  <nuxt-link :to="`products/${product.params}`">
                    <v-img :src="product.picUrl[0]" class="img"></v-img>
                  </nuxt-link>
                </v-col>
                <v-col cols="7">
                  <nuxt-link :to="`products/${product.params}`">
                    <div>{{ product.quantity }} x {{ product.title }}</div>
                  </nuxt-link>
                  <div>
                    {{ product.brand }}
                  </div>
                </v-col>
                <v-col cols="2">
                  $ {{ product.quantity * product.price }}.00
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="6" class="d-flex align-center">created at: {{createdAt(order.createdAt)}}</v-col>
            <v-col cols="6" class="text-h6">Total: ${{getTotal(order.productsInfo)}}.00</v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { useStore } from "vuex-simple";
import { MyStore } from "@/store/store";
import { IOrder } from "@/store/models/orderModel";

@Component({
head(){
    return{
      title:'Orders'
    }
  }
})
export default class Order extends Vue {
  private mounted() {
    console.log("mounted");
    this.store.main.orders.getOrders;
    this.axiosGetOrders();
  }

  //store
  private store: MyStore = useStore(this.$store);
  //watch
  @Watch("getOrders")
  watchOrders() {
    this.orders = this.getOrders;
  }
  //data
  private memberId: string = this.store.main.account._id;
  private orders: IOrder[] = [];
  //methods
  private axiosGetOrders() {
    this.store.main.orders.axiosGetOrders({ _id: this.memberId });
  }
  //computed
  private get getOrders() {
    return this.store.main.orders.orders;
  }
  //methods
  private createdAt(_row:string){
    return _row.substring(0,19).replace('T',' ')
  }

  private getTotal (_productsInfo: any){
    let total = 0
    for (let index = 0; index < _productsInfo.length; index++) {
      const product = _productsInfo[index];
      total += product.price * product.quantity
    }
    return total
  }
}
</script>

<style lang='scss' scoped>
.bg {
  background-color: #fafafa;
}

.img {
  width: 100px;
}
</style>