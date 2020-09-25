// import { IResponse } from '@/store/models/responseModel'

import homeProducts from './homeProducts.json'

export class FakeData {
    public homeProds: any

    constructor(){
        this.homeProds = homeProducts
    }
}
