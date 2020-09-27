// import { IResponse } from '@/store/models/responseModel'

import homeProducts from './homeProducts.json'
import prod from './prod.json'

export class FakeData {
    public homeProds: any
    public prodDetail: any

    constructor(){
        this.homeProds = homeProducts
        this.prodDetail = prod
    }
}
