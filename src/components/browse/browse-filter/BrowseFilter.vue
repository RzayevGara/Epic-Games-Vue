<template>
    <div v-if="filterMenu" class="browse-filter">
        <div class="browse-filter_container">
            <div class="browse-filter_title">
                <p>Filters</p>
                <form>
                    <div>
                        <SearchIcon/>
                        <input type="text" placeholder="Keywords"/>
                    </div>
                </form>
            </div>
            <ul class="filter-category">
                <li class="filter-item" v-for="item in filter" :key="item.id">
                    <BrowseFilterItem :item="item"/>
                </li>
            </ul>
            <div class="filter-buttons">
                <div>
                    <button class="clear-filter">clear</button>
                </div>
                <div>
                    <button @click="doneFilter" class="done-filter">done</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
    import { useRoute, useRouter } from "vue-router";
    import {useStore} from 'vuex'
    import {ref, watch, inject} from 'vue'
    import SearchIcon from '../../../assets/image/svg/search-icon.svg'
    import BrowseFilterItem from './BrowseFilterItem.vue'
    const store = useStore()
    const filterMenu = ref(store.getters.getFilterMenu)
    let filterQuery = ref(store.getters.getFilterQuery)
    defineProps({filter: Array})
    const route = useRoute();
    const router = useRouter();

    watch(store.state.browse, (to)=>{
        filterMenu.value = to.filterMenuShow
    })

    const fetchSort = inject('fetch')


    function doneFilter(){
        filterMenu.value = false
        store.commit("setFilterMenu", false)
        document.getElementsByTagName('body')[0].classList.remove('active-body')
        let queryNew =JSON.parse(JSON.stringify(route.query))
        queryNew.query = filterQuery.value.map(el=>el)
        router.push({ query: queryNew })
        .then(()=>{
            fetchSort()
        })
    }
</script>