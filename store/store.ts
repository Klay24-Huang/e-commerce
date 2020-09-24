import Vue from 'vue';
import Vuex from 'vuex';
import {FakeData} from '../assets/fakeData/all'
// import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        homePage:{
            prods:Array
        }
    },

    mutations: {
        AJAXHomeProdsSuccess(state, data){
            state.homePage.prods = data
        }
    },
    actions: {
        AJAXHomeProds({commit}){
            // axios()
            let fakeData = new FakeData()
            commit('AJAXHomeProdsSuccess', fakeData.homeProds)
        }
    },
    getters:{
        getHomeProds ( state: object):Array { state.homePage.prods}
    }
});