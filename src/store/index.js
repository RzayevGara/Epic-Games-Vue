import { createStore } from 'vuex'
import product from './modules/products'

export default createStore({
  modules: {
    product
  },
  // state(){
  //   return{
  //     count: 0
  //   }
  // }
})