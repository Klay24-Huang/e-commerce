import { Action, Mutation, State, Getter } from 'vuex-simple';
import { IProdDetail } from '../models/prodDetailModel'
import { FakeData } from '@/assets/fakeData/all'
import { myPromise } from '@/store/myPromise'
// import { IResponse } from '@/store/models/responseModel'

export class ProdDetailModule {
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
    public prod: IProdDetail

    constructor() {
        this.prod = {
            id: '',
            product: '',
            category: '',
            brand: '',
            picUrl: [],
            description: '',
            price: 0,
            discount: 0
        }
    }

    @Mutation()
    public setProd(prod: IProdDetail) {
        this.prod = prod;
    }

    @Getter()
    public getProd() {
        return this.prod
    }

    public axiosProd() {
            let fakeData = new FakeData()
            myPromise(fakeData.prodDetail).then((success: any) => {
                this.setProd(success.data.result.results)
            })
        // this.setProd(fakeData.prodDetail.data.result.results)
    }
}