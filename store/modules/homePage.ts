import { Mutation, State } from 'vuex-simple';
import { IHomeProds } from '../models/homeProdModel'
import axios from "axios";
import backendUrl from "@/assets/json/apiUrl.json";

export class HomePageModule {
    // some example here
    // @State()
    // public counter: number;

    // constructor(nb: number = 0) {
    //     this.counter = nb;
    // }

    // @Mutation()
    // public increment() {
    //     this.counter++;
    // }

    // @Mutation()
    // public incrementBy(nb: number) {
    //     this.counter += nb;
    // }

    // public async asyncIncrement() {
    //     await new Promise(r => setTimeout(r, 200));
    //     // call mutation function like you would any other function
    //     this.increment();
    // }

    @State()
    public prods: IHomeProds[]

    constructor() {
        this.prods = []
    }

    @Mutation()
    public setProds(prods: IHomeProds[]) {
        this.prods = prods;
    }

    public axiosProds() {
        axios.get(`${backendUrl.url}/api/product/makeup/all`).then((result: any) => {
           this.setProds(result.data)
        })

        // let fakeData = new FakeData()
        // myPromise(fakeData.homeProds).then((success:any) => {
        //     this.setProds(success.data.result.results)
        // })
    }
}