<template>
    <section id="browse">
        <div class="browse-container">
            <SwiperGenre :genre="genres" title="Popular Genres"/>
            <div class="browse-content">
                <BrowseProduct/>
                <BrowseFilter/>
            </div>
        </div>
    </section>
</template>

<script setup>
    import {useStore} from 'vuex'
    import {useRouter, useRoute} from 'vue-router'
    import { ref, watch, onMounted, computed } from "vue";
    import SwiperGenre from '../../components/browse/swiper-genre/SwiperGenre.vue'
    import BrowseProduct from  '../../components/browse/browse-product/BrowseProduct.vue'
    import BrowseFilter from '../../components/browse/browse-filter/BrowseFilter.vue'
    const store = useStore()
    const genres = ref(store.getters.getGenreList);
    const router = useRouter()
    const route = useRoute()
    store.dispatch('fetchGenreList')

    // const query = ref(route.query)
    
    watch(store.state.browse, (to)=>{
        genres.value = to.genreList
    })

    const fetchSort = function(){
        console.log("fetch oldu ...")
        const sortBy = computed(()=>{
            let query = route.query.sortBy
            if(query==="releaseDate"){
                return "created_at"
            }else if(query==="title"){
                return "name"
            }else if(query==="currentPrice"){
                return "price"
            }
        })
    
        store.dispatch('fetchBrowse',{
            category_slug: 'browse',
            limit: 20,
            sortBy: sortBy.value,
            sortDirection: route.query.sortDir==="DESC"?"desc":"asc"
        })
    }


    
    onMounted(()=>{
        if(Object.keys(route.query).length === 0){
            router.push({query: {sortBy: 'releaseDate', sortDir: 'DESC'}})
        }
        fetchSort()
    })
    
    watch(()=>route.query ,fetchSort)

</script>