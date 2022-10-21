import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

export default {
    state:{
       cartItemCount: 0,
       addCartStatus: false
    },
    mutations: {
        setCartCount(state, item) {
          state.cartItemCount = item
        },
        setAddCartStatus(state, item) {
          state.addCartStatus = item
        },
       
    },
    actions: {
        addToCart({commit}, id) {
            commit("setAddCartStatus", true)
            commerce.cart.add(id).
            then((response) =>{
                commit("setCartCount", response.total_unique_items)
                commit("setAddCartStatus", false)
            });
        },
        retrieveCart({commit}){
            commerce.cart.retrieve()
            .then((cart) =>commit("setCartCount", cart.total_unique_items));
        }
    },
    getters: {
      getCartItemCount(state){
        return state.cartItemCount
      },
      getAddCartStatus(state){
        return state.addCartStatus
      },
    }
}