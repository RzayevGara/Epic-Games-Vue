import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

export default {
    state:{
        category: {
            newReleases: null,
            mostPopular: null,
            topPlayerRated: null,
            mostPlayedGames: null,
            topSellers: null,
            freeGames: null,
        },
        activeList: null,
        search: null
    },
    mutations: {
        newReleases(state, item) {
          state.category.newReleases = item
        },
        mostPopular(state, item) {
          state.category.mostPopular = item
        },
        topPlayerRated(state, item) {
          state.category.topPlayerRated = item
        },
        mostPlayedGames(state, item) {
          state.category.mostPlayedGames = item
        },
        topSellers(state, item) {
          state.category.topSellers = item
        },
        freeGames(state, item) {
          state.category.freeGames = item
        },
        setActiveList(state, item) {
          state.activeList = item
        },
        setSearch(state, item) {
          state.search = item
        }
    },
    actions: {
        fetchNewRelease ({commit}) {
            commerce.products.list({
                category_slug: 'new-release',
                limit: 6
              })
            .then((products) => {
                commit("newReleases", products.data);
                commit("setActiveList", products.data[0])
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
        fetchFreeGames ({commit}) {
            commerce.products.list({
                category_slug: 'free-games'})
            .then((products) => {
                commit("freeGames", products.data);
            })
            .catch((error) => {
              console.log('There is an error fetching products', error);
            });
        },
        fetchSearch ({commit}, data) {
          commit("setSearch", []);
          commerce.products.list({
            category_slug: "browse",
            query: data
          })
          .then((products) => {
            commit("setSearch", products.data);
          })
          .catch((error) => {
            commit("setSearch", null); 
          });
      },
    },
    getters: {
      listProducts(state){
        return state.category
      },
      getActiveList(state){
        return state.activeList
      },
      getSearch(state){
        return state.search
      }
    }
}