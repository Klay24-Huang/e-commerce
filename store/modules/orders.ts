import { Action, Mutation, State, Getter } from 'vuex-simple';
import axios from 'axios'
import backendUrl from '@/assets/json/apiUrl.json'
import {IOrder} from '@/store/models/orderModel'

export class OrderModule {
    @State()
    public orders :IOrder[] = []

    @Mutation()
    public setOrders(_orders: IOrder[]){
        this.orders = _orders
    }
    
    @Mutation()
    public logout(){
        this.orders = []
    }

    public get getOrders(){
        return this.orders
    }

    public axiosGetOrders(_params: any){
        axios.get(`${backendUrl.url}/api/order/${_params._id}`).then((result: any) => {
            this.setOrders (result.data)
        })
    }
}