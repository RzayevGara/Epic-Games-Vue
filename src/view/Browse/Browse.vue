<template>
    <section id="browse">
        <div class="browse-container">
            <SwiperGenre :genre="genres" title="Popular Genres"/>
            <div class="browse-content">
                <BrowseProduct :product="product"/>
                <BrowseFilter :filter="filter"/>
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
    store.commit("setFilterRoute", route.query.query || [])
    store.dispatch('fetchGenreList')
    store.dispatch('fetchFilter')

    watch(store.state.browse, (to)=>{
        genres.value = to.genreList
    })

    if(Object.keys(route.query).length === 0){
        router.push({query: {sortBy: 'created_at', sortDir: 'desc', page: 1}})
    }

    onMounted(()=>{
        fetchSort()
    })

    
    const fetchSort = function(){
        store.dispatch('fetchBrowse',{
            category_slug: route.query.query?.length>0 && route.query.query || 'browse',
            limit: 20,
            page: route.query.page,
            sortBy: route.query.sortBy!==undefined?route.query.sortBy:"created_at",
            sortDirection: route.query.sortDir!==undefined?route.query.sortDir:"desc",
        })
    }

    provide("fetch",fetchSort )

    const product = ref()

    watch(store.state.browse, (to)=>{
        product.value = to.browse
    })


    const filter  = ref(store.getters.getFilter)
    watch(store.state.browse, (to)=>{
        filter.value =to.filter
    })
</script>