import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

export default {
    state:{
        browse: null,
        genreList: null,
        filterMenuShow: false,
        filter: null,
        filterQuery: []
    },
    mutations: {
        setBrowse(state, item) {
          state.browse = item
        },
        setGenreList(state, item) {
          state.genreList = item
        },
        setFilterMenu(state, item) {
          state.filterMenuShow = item
        },
        setFilter(state, item){
          state.filter = item
        },
        setFilterQuery(state, data){
          if(data.item==="Genre" || data.item==="Platform"){
            if(!state.filterQuery.includes(data.child)){
              state.filterQuery.push(data.child)
            }else{
              const index = state.filterQuery.indexOf(data.child)
              if(index>-1){
                state.filterQuery.splice(index, 1)
              }
            }
          }else if(data.item==="Price"){
            let test = state.filterQuery.some(el=>el.includes("under") || el.includes("above"));
            if(!test){
              state.filterQuery.push(data.child)
            }
            else{
              if(state.filterQuery.includes(data.child)){
                const index = state.filterQuery.indexOf(state.filterQuery.find(el=>el.includes("under") || el.includes("above")))
                if(index>-1){
                  state.filterQuery.splice(index, 1)
                }
              }else{
                const index = state.filterQuery.indexOf(state.filterQuery.find(el=>el.includes("under") || el.includes("above")))
                if(index>-1){
                  state.filterQuery.splice(index, 1)
                }
                state.filterQuery.push(data.child)
              }
            }
        }
      },
      setFilterRoute(state, item){
        if(item){
          if(Array.isArray(item)){
            state.filterQuery = JSON.parse(JSON.stringify(item))
          }else{
            if(!state.filterQuery.includes(item)){
              state.filterQuery.push(item)
            }
          }
        }
      },
      setFilterQueryByCategory(state, item){
        state.filterQuery = []
        state.filterQuery.push(item)
      }

    },
    actions: {
        fetchBrowse ({commit}, data) {
          commit("setBrowse", null);
            commerce.products.list(data)
            .then((products) => {
              if(products.data){
                commit("setBrowse", products);
              }else{
                products.data = []
                commit("setBrowse", products);
              }
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
        fetchFilter ({commit}) {
            commerce.categories.list({
                parent_id: 'cat_aZWNoy1Z9o80JA'
            })
            .then((products) => {
                commit("setFilter", products.data.reverse());
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
    },
    getFilterMenu(state){
      return state.filterMenuShow
    },
    getFilter(state){
      return state.filter
    },
    getFilterQuery(state){
      return state.filterQuery
    }

    }
}