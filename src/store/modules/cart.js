import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

export default {
    state:{
       cartItemCount: 0,
       addCartStatus: false,
       cartItems: []
    },
    mutations: {
        setCartCount(state, item) {
          state.cartItemCount = item
        },
        setAddCartStatus(state, item) {
          state.addCartStatus = item
        },
        setCartItems(state, item) {
          state.cartItems = item
        }
       
    },
    actions: {
        addToCart({commit, state}, id) {
            commit("setAddCartStatus", true)
            let checkItems = state.cartItems.some(item=>item.product_id===id)
            if(!checkItems){
              commerce.cart.add(id).
              then((response) =>{
                  commit("setCartCount", response.total_unique_items)
                  commit("setCartItems", response.line_items)
                  commit("setAddCartStatus", false)
              });
            }else{
              commit("setAddCartStatus", false)
            }
        },
        retrieveCart({commit}){
            commerce.cart.retrieve()
            .then((cart) =>{
              commit("setCartCount", cart.total_unique_items)
              commit("setCartItems", cart.line_items)
            });
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