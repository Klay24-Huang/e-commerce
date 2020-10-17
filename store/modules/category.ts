import { Mutation, State } from 'vuex-simple';
import { ICategory } from '../models/categoryModel'
import axios from 'axios'
import backendUrl from '@/assets/json/apiUrl.json'
import {IProdDetail} from '@/store/models/prodDetailModel'

export class CategoryModule {

    @State()
    public category: any = {}

    @State()
    public products: IProdDetail[] = []

    @Mutation()
    public setCategory(_category: ICategory[]) {
        this.category = _category;
    }

    @Mutation()
    public setOneCategory(_category: any) {
        this.category = _category
    }

    @Mutation()
    public setProducts(_products: IProdDetail[]){
        this.products = _products
    }

    //action
    public axiosGetCategory() {
        axios.get(`${backendUrl.url}/api/category`).then((result: any) => {
            this.setCategory(result.data)
        })
    }

    public axiosGetOneCategory(_params: any) {
        axios.get(`${backendUrl.url}/api/category/${_params.category}`).then((result: any) => {
            this.setOneCategory (result.data)
        })
    }

    public axiosGetProducts(_params: any){
        axios.get(`${backendUrl.url}/api/product/${_params.category}/${_params.subCategory}`).then((result: any) => {
            this.setProducts (result.data)
        })
    }
}
