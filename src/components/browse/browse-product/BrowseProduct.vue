<template>
    <div class="browse-product">
        <div class="browse-product_sort">
            <div class="sort">
                <p class="sort-text" @click="sortMenu">Show: <span>{{sortName}}</span> </p>
                <div v-if="showSort" class="sort-menu">
                    <p @click="sortItem({sortBy: 'releaseDate', sortDir: 'DESC'})">New Release</p>
                    <p @click="sortItem({sortBy: 'title', sortDir: 'ASC'})">Alphabetical</p>
                    <p @click="sortItem({sortBy: 'currentPrice', sortDir: 'DESC'})">Price: High to Low</p>
                    <p @click="sortItem({sortBy: 'currentPrice', sortDir: 'ASC'})">Price: Low to High</p>
                </div>
                <ArrowIcon @click="sortMenu" :class="showSort && 'showSVG'"/>
            </div>
            <div class="filter">
                <p>Filter</p>
                <FilterIcon/>
            </div>
        </div>
        <div class="browse-product_item"></div>
    </div>
</template>

<script setup>
    import ArrowIcon from '../../../assets/image/svg/arrow-up.svg'
    import FilterIcon from '../../../assets/image/svg/filter.svg'
    import {useRoute, useRouter} from 'vue-router'
    import {useStore} from 'vuex'
    import {ref, computed} from 'vue'
    const route = useRoute()
    const router = useRouter()

    const store = useStore()
    const showSort = ref(false)

    function sortMenu(){
        showSort.value = !showSort.value
    }

    const sortName = computed(()=>{
        let query = route.query.sortBy
        if(query==="releaseDate"){
            return "New Release"
        }else if(query==="title"){
            return "Alphabetical"
        }else if(query==="currentPrice"){
            return route.query.sortDir==="DESC"?"Price: High to Low":"Price: Low to High"
        }
    })

    function sortItem(query){
        router.push({query})
        showSort.value = false
        store.commit("setBrowse", null)
    }
</script>