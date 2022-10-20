import { createStore } from 'vuex'
import category from './modules/category'
import product from './modules/product'
import browse from './modules/browse'
import auth from './modules/auth'

export default createStore({
  modules: {
    category,
    product,
    browse,
    auth
  },
  // state(){
  //   return{
  //     count: 0
  //   }
  // }
})