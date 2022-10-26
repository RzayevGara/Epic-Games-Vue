import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

export default {
    state:{
        liveObject: null,
        checkoutToken: null,
        loadingCheckout: false
    },
    mutations: {
        setLiveObject(state, item) {
          state.liveObject = item
        },
        setCheckoutToken(state, item) {
          state.checkoutToken = item
        },
        setLoadigCheckout(state, item) {
          state.loadingCheckout = item
        }
    },
    actions: {
        checkoutToken({commit}, data){
            commit("setLoadigCheckout", true)
          commerce.checkout.generateTokenFrom('permalink', data.permalink)
          .then(response => {
            commit("setCheckoutToken", response.id)
            commerce.checkout.getLive(response.id)
            .then((liveObject) => {
                commit("setLiveObject", liveObject)
                commit("setLoadigCheckout", false)
            });
          });
        },
        checkDiscountCode({commit, state},data){
          commerce.checkout.checkDiscount(state.checkoutToken, {
            code: data,
          }).then((response) => {
            commit("setLiveObject", response)
          });
        },
        checkoutItem({commit}, data){
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
        }
    },
    getters: {
      getLoadingCheckout(state){
        return state.loadingCheckout
      },
      getLiveObject(state){
        return state.liveObject
      },
    }
}