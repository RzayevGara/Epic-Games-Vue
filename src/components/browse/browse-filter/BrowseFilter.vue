<template>
    <!-- filter for mobile -->
    <div v-if="filterMenu && width<1024" class="browse-filter" >
        <div class="browse-filter_black" @click="clickMenuOutside"></div>
        <div class="browse-filter_container ">
            <div class="browse-filter_title">
                <p>Filters ({{filterQuery.length}})</p>
                <!-- <form>
                    <div>
                        <SearchIcon/>
                        <input type="text" placeholder="Keywords"/>
                    </div>
                </form> -->
            </div>
            <ul class="filter-category">
                <li class="filter-item" v-for="item in filter" :key="item.id">
                    <BrowseFilterItem :item="item"/>
                </li>
            </ul>
            <div class="filter-buttons">
                <div>
                    <button @click="clearFilter" class="clear-filter">clear</button>
                </div>
                <div>
                    <button @click="doneFilter" class="done-filter">done</button>
                </div>
            </div>
        </div>
    </div>

    <!-- filter for PC -->
    <div v-if="width>=1024" class="browse-filter">
        <div class="browse-filter_container">
            <div class="browse-filter_title">
                <p>Filters ({{filterQuery.length}})</p>
                <!-- <form>
                    <div>
                        <SearchIcon/>
                        <input type="text" placeholder="Keywords"/>
                    </div>
                </form> -->
            </div>
            <ul class="filter-category">
                <li class="filter-item" v-for="item in filter" :key="item.id">
                    <BrowseFilterItem :item="item" :doneFilterPC="debounceFilterPC"/>
                </li>
            </ul>
        </div>
    </div>
</template>


<script setup>
    import { useRoute, useRouter } from "vue-router";
    import {useStore} from 'vuex'
    import {ref, watch, inject} from 'vue'
    import SearchIcon from '../../../assets/image/svg/search-icon.svg'
    import BrowseFilterItem from './BrowseFilterItem.vue'
    import debounce from "lodash/debounce"
    const store = useStore()
    const filterMenu = ref(store.getters.getFilterMenu)
    let filterQuery = ref(store.getters.getFilterQuery)
    defineProps({filter: Array})
    const route = useRoute();
    const router = useRouter();

    watch(store.state.browse, (to)=>{
        filterMenu.value = to.filterMenuShow
    })

    watch(store.state.browse, (to)=>{
        filterQuery.value = to.filterQuery
    })

    const fetchSort = inject('fetch')

    function clickMenuOutside(){
        store.commit("setFilterMenu", false)
        document.getElementsByTagName('body')[0].classList.remove('active-body')
    }

    function doneFilter(){
        store.commit("setFilterMenu", false)
        document.getElementsByTagName('body')[0].classList.remove('active-body')
        let queryNew =JSON.parse(JSON.stringify(route.query))
        if(JSON.parse(JSON.stringify(filterQuery.value)).length>0){
            queryNew.query = filterQuery.value.map(el=>el)
        }else{
            if(route.query.query.length>0){
                queryNew.query = filterQuery.value.map(el=>el)
            }
        }
        if(Object.entries(queryNew).toString() !== Object.entries(route.query).toString()){
            router.push({ query: queryNew })
            .then(()=>{
                fetchSort()
            })
        }        
    }

    function clearFilter(){
        store.commit("setFilterMenu", false)
        document.getElementsByTagName('body')[0].classList.remove('active-body')
        let queryNew =JSON.parse(JSON.stringify(route.query))
        store.commit("setFilterRoute", [])

        if(queryNew?.query?.length>0){
            queryNew.query = []
            router.push({ query: queryNew })
            .then(()=>{
                fetchSort()
            })
        }
    }

    function doneFilterPC(){
        let queryNew =JSON.parse(JSON.stringify(route.query))
        queryNew.query = filterQuery.value.map(el=>el)
        router.push({ query: queryNew })
        .then(()=>{
            fetchSort()
        })
    }

    const debounceFilterPC = debounce(function(){doneFilterPC()}, 1300)


    const width = ref()

    
    function handleResize() {
        width.value = window.innerWidth;
    }

    window.addEventListener('resize', handleResize);
    handleResize()
</script>