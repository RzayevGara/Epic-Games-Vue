import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

export default {
    state:{
        products: {
            newReleases: null,
            mostPopular: null,
            topPlayerRated: null,
            mostPlayedGames: null,
            topSellers: null
        }
    },
    mutations: {
        newReleases(state, item) {
          state.products.newReleases = item
        },
        mostPopular(state, item) {
          state.products.mostPopular = item
        },
        topPlayerRated(state, item) {
          state.products.topPlayerRated = item
        },
        mostPlayedGames(state, item) {
          state.products.mostPlayedGames = item
        },
        topSellers(state, item) {
          state.products.topSellers = item
        },
    },
    actions: {
        fetchNewRelease ({commit}) {
            commerce.products.list({
                category_slug: 'new-release'})
            .then((products) => {
                commit("newReleases", products.data);
            })
            .catch((error) => {
              console.log('There is an error fetching products', error);
            });
        },
        fetchMostPopular ({commit}) {
            commerce.products.list({
                category_slug: 'most-popular'})
            .then((products) => {
                commit("mostPopular", products.data);
            })
            .catch((error) => {
              console.log('There is an error fetching products', error);
            });
        },
        fetchTopPlayerRated ({commit}) {
            commerce.products.list({
                category_slug: 'top-player-rated'})
            .then((products) => {
                commit("topPlayerRated", products.data);
            })
            .catch((error) => {
              console.log('There is an error fetching products', error);
            });
        },
        fetchMostPlayedGames ({commit}) {
            commerce.products.list({
                category_slug: 'most-played-games'})
            .then((products) => {
                commit("mostPlayedGames", products.data);
            })
            .catch((error) => {
              console.log('There is an error fetching products', error);
            });
        },
        fetchTopSellers ({commit}) {
            commerce.products.list({
                category_slug: 'top-sellers'})
            .then((products) => {
                commit("topSellers", products.data);
            })
            .catch((error) => {
              console.log('There is an error fetching products', error);
            });
        },
    },
    getters: {
      listProducts(state){
        return state.products
      }
    }

}