import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

export default {
    state:{
        product: null,
    },
    mutations: {
        setProduct(state, item) {
          state.product = item
        },
    },
    actions: {
        fetchProduct ({commit}, id) {
            commerce.products.retrieve(id, { type: 'permalink' })
            .then((products) => {
                commit("setProduct", products);
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
    }
}