import { createStore } from 'vuex'
import category from './modules/category'
import product from './modules/product'
import browse from './modules/browse'
import auth from './modules/auth'
import cart from './modules/cart'
import checkout from './modules/checkout'

export default createStore({
  modules: {
    category,
    product,
    browse,
    auth,
    cart,
    checkout
  },
  // state(){
  //   return{
  //     count: 0
  //   }
  // }
})