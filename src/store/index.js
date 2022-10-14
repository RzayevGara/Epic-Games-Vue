import { createStore } from 'vuex'
import category from './modules/category'
import product from './modules/product'
import browse from './modules/browse'

export default createStore({
  modules: {
    category,
    product,
    browse
  },
  // state(){
  //   return{
  //     count: 0
  //   }
  // }
})