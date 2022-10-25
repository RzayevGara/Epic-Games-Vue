import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

export default {
    state:{
       cartItemCount: 0,
       addCartStatus: false,
       cartDetail: null,
    },
    mutations: {
        setCartCount(state, item) {
          state.cartItemCount = item
        },
        setAddCartStatus(state, item) {
          state.addCartStatus = item
        },
        setCartDetail(state, item) {
          state.cartDetail = item
        },
        setDeleteItemStatus(state, item) {
          state.deleteItemStatus = item
        }
       
    },
    actions: {
        addToCart({commit, state}, id) {
            commit("setAddCartStatus", true)
            let checkItems = state.cartDetail?.line_items.some(item=>item.product_id===id)
            if(!checkItems){
              commerce.cart.add(id).
              then((response) =>{
                  commit("setCartCount", response.total_unique_items)
                  commit("setCartDetail", response)
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
              commit("setCartDetail", cart)
            });
          },
        checkoutItem({commit}, data){
          commerce.checkout.generateTokenFrom('permalink', data.permalink)
          .then(response => {
            commerce.checkout.capture(response.id, {
              customer: {
                firstname: 'John',
                lastname: 'Doe',
                email: 'john.doe@example.com',
              },
              shipping: {
                name: 'John Doe',
                street: '123 Fake St',
                town_city: 'San Francisco',
                county_state: 'CA',
                postal_zip_code: '94103',
                country: 'US',
              },
              fulfillment: {
                shipping_method: 'ship_1ypbroE658n4ea',
              },
              payment: {
                gateway: 'test_gateway',
                card: {
                  number: '4242 4242 4242 4242',
                  expiry_month: '01',
                  expiry_year: '2023',
                  cvc: '123',
                  postal_zip_code: '94103',
                },
              },
            })
              .then(response => {
                console.log('Great, your checkout was captured successfully! Checkout the response object for receipt info.');
              })
              .catch(error => console.error(error));
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
      getCartDetail(state){
        return state.cartDetail
      },
    }
}