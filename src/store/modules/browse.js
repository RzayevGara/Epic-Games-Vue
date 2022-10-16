import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

export default {
    state:{
        browse: null,
        genreList: null
    },
    mutations: {
        setBrowse(state, item) {
          state.browse = item
        },
        setGenreList(state, item) {
          state.genreList = item
        },

    },
    actions: {
        fetchBrowse ({commit}, data) {
          commit("setBrowse", null);
            commerce.products.list(data)
            .then((products) => {
                commit("setBrowse", products);
            })
            .catch((error) => {
              console.log('There is an error fetching products', error);
            });
        },
        fetchGenreList ({commit}) {
            commerce.categories.list({
                parent_id: 'cat_O3bR5Xgdponzdj'
            })
            .then((products) => {
                commit("setGenreList", products.data);
            })
            .catch((error) => {
              console.log('There is an error fetching products', error);
            });
        },
    },
    getters: {
    getBrowse(state){
        return state.browse
    },
    getGenreList(state){
          return state.genreList

      }

    }
}