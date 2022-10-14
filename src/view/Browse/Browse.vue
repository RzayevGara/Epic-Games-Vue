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
    import { ref, watch, onMounted, computed, provide } from "vue";
    import SwiperGenre from '../../components/browse/swiper-genre/SwiperGenre.vue'
    import BrowseProduct from  '../../components/browse/browse-product/BrowseProduct.vue'
    import BrowseFilter from '../../components/browse/browse-filter/BrowseFilter.vue'
    const store = useStore()
    const genres = ref(store.getters.getGenreList);
    const router = useRouter()
    const route = useRoute()
    store.commit("setBrowse", null)
    store.dispatch('fetchGenreList')

    watch(store.state.browse, (to)=>{
        genres.value = to.genreList
    })

    if(Object.keys(route.query).length === 0){
        console.log("object keys")
        router.push({query: {sortBy: 'created_at', sortDir: 'desc'}})
    }

    onMounted(()=>{
        console.log("fetch")
        fetchSort()
    })

    
    const fetchSort = function(){
        store.dispatch('fetchBrowse',{
            category_slug: 'browse',
            limit: 20,
            sortBy: route.query.sortBy!==undefined?route.query.sortBy:"created_at",
            sortDirection: route.query.sortDir!==undefined?route.query.sortDir:"desc"
        })
    }

    provide("fetch",fetchSort )

</script>