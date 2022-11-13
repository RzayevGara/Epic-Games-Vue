import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

export default {
    state:{
        liveObject: null,
        checkoutToken: null,
        loadingCheckout: false,
        loadingDiscount: false,
        discountMessage: null,
        discountSucceed: false,
        cardInfo: {
          cardNumber: null,
          cardNumberVal: false,
          cardDate: null,
          cardDateVal: false,
          cardCVC: null,
          cardCVCVal: false
        },
        checkoutErrorMsg: null,
        checkoutConfirmLoading: false,
        checkoutConfirmStatus: false
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
        },
        setLoadingDiscount(state, item) {
          state.loadingDiscount = item
        },
        setDiscountMessage(state, item) {
          state.discountMessage = item 
        },
        setDiscountSucceed(state, item) {
          state.discountSucceed = item 
        },
        setCardNumber(state, item){
          state.cardInfo.cardNumber = item.value
          state.cardInfo.cardNumberVal = item.status
        },
        setCardDate(state, item){
          state.cardInfo.cardDate = item.value
          state.cardInfo.cardDateVal = item.status
        },
        setCardCVC(state, item){
          state.cardInfo.cardCVC = item.value
          state.cardInfo.cardCVCVal = item.status
        },
        setCheckoutErrorMsg(state, item){
          state.checkoutErrorMsg = item
        },
        setCheckoutConfirmLoading(state, item){
          state.checkoutConfirmLoading = item
        },
        setCheckoutConfirmStatus(state, item){
          state.checkoutConfirmStatus = item
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
        checkoutTokenCart({commit}){
            commit("setLoadigCheckout", true)
          commerce.checkout.generateTokenFrom('cart', commerce.cart.id())
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
          commit("setLoadingDiscount", true)
          commerce.checkout.checkDiscount(state.checkoutToken, {
            code: data,
          }).then((response) => {
            commit("setLiveObject", response)
            commit("setDiscountMessage", null)
            commit("setLoadingDiscount", false)
            commit("setDiscountSucceed", true)
          })
          .catch((error)=>{
            commit("setLoadingDiscount", false)
            commit("setDiscountMessage", 'The provided discount code is not valid.')
            console.log(error)
          })
        },
        checkoutItem({commit, state}, data){
          const [month, year] = state.cardInfo.cardDate.split('/')
          commit("setCheckoutConfirmLoading", true)
            commerce.checkout.capture(state.checkoutToken, {
                customer: {
                  firstname: data.firstname,
                  lastname: data.lastname,
                  email: data.email
                },
                shipping: {
                  name:  data.firstname,
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
                    number: state.cardInfo.cardNumber,
                    expiry_month: `${month}`,
                    expiry_year: `${year}`,
                    cvc: state.cardInfo.cardCVC,
                    postal_zip_code: '94103',
                  },
                },
              })
                .then(response => {
                  response.line_items = []
                  response.total_unique_items = 0
                  commit("setCartDetail", response, { root: true })
                  commit("setCartCount", response.total_unique_items, { root: true })
                  commit("setCheckoutErrorMsg", null)
                  commit("setCheckoutConfirmLoading", false)
                  commit("setCheckoutConfirmStatus", true)
                })
                .catch(error => {
                  commit("setCheckoutErrorMsg", "Please enter a valid testing card number i.e. 4242 4242 4242 4242")
                  commit("setCheckoutConfirmLoading", false)
                });
        }
    },
    getters: {
      getLoadingCheckout(state){
        return state.loadingCheckout
      },
      getLoadingDiscount(state){
        return state.loadingDiscount
      },
      getLiveObject(state){
        return state.liveObject
      },
      getDiscountMessage(state){
        return state.discountMessage
      },
      getDiscountSucceed(state){
        return state.discountSucceed
      },
      getCardStatus(state){
        if(state.cardInfo.cardNumberVal && state.cardInfo.cardDateVal && state.cardInfo.cardCVCVal){
          return true
        }else{
          return false
        }
      },
      getCheckoutErrorMsg(state){
        return state.checkoutErrorMsg
      },
      getCheckoutConfirmLoading(state){
        return state.checkoutConfirmLoading
      },
      getCheckoutConfirmStatus(state){
        return state.checkoutConfirmStatus
      }
    }
}