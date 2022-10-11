import { createStore } from 'vuex'
import category from './modules/category'
import product from './modules/product'

export default createStore({
  modules: {
    category,
    product
  },
  // state(){
  //   return{
  //     count: 0
  //   }
  // }
})