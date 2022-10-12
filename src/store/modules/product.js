import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

export default {
    state:{
        product: null,
        activeImageID: null
    },
    mutations: {
        setProduct(state, item) {
          state.product = item
        },
        setActiveImageID(state, item) {
          state.activeImageID = item
        }
    },
    actions: {
        fetchProduct ({commit}, id) {
            commerce.products.retrieve(id, { type: 'permalink' })
            .then((products) => {
                commit("setProduct", products);
                commit("setActiveImageID", products.assets[1].id);
            })
            .catch((error) => {
              console.log('There is an error fetching products', error);
            });
        },
    },
    getters: {
      getProduct(state){
        return state.product
      },
      getActiveImageID(state){
        return state.activeImageID
      }
    }
}