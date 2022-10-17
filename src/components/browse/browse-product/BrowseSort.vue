<template>
  <div class="browse-product_sort">
    <div class="sort">
      <p class="sort-text" @click="sortMenu">
        Show: <span>{{ sortName }}</span>
      </p>
      <div v-if="showSort" class="sort-menu">
        <p @click="sortItem({ sortBy: 'created_at', sortDir: 'desc' })" :class="route.query.sortBy==='created_at'?'active-sort':undefined">
          New Release
        </p>
        <p @click="sortItem({ sortBy: 'name', sortDir: 'asc' })" :class="route.query.sortBy==='name'?'active-sort':undefined">
          Alphabetical
        </p>
        <p @click="sortItem({ sortBy: 'price', sortDir: 'desc' })" :class="route.query.sortBy==='price' && route.query.sortDir==='desc'?'active-sort':undefined">
          Price: High to Low
        </p>
        <p @click="sortItem({ sortBy: 'price', sortDir: 'asc' })" :class="route.query.sortBy==='price' && route.query.sortDir==='asc'?'active-sort':undefined">
          Price: Low to High
        </p>
      </div>
      <ArrowIcon @click="sortMenu" :class="showSort && 'showSVG'" />
    </div>
    <div class="filter" @click="filterMenu">
      <p>Filter</p>
      <FilterIcon />
    </div>
  </div>
</template>

<script setup>
import ArrowIcon from "../../../assets/image/svg/arrow-up.svg";
import FilterIcon from "../../../assets/image/svg/filter.svg";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, inject, watch  } from "vue";
import {useStore} from "vuex";
const store = useStore()
const route = useRoute();
const router = useRouter();
const fetchSort = inject('fetch')
const showSort = ref(false);

function sortMenu() {
  showSort.value = !showSort.value;
}

const sortName = computed(() => {
  let query = route.query.sortBy;
  if (query === "created_at") {
    return "New Release";
  } else if (query === "name") {
    return "Alphabetical";
  } else if (query === "price") {
    return route.query.sortDir === "desc"
      ? "Price: High to Low"
      : "Price: Low to High";
  }
});

function sortItem(queryData){
  let queryNew =JSON.parse(JSON.stringify(route.query)) ;
  queryNew.sortBy = queryData.sortBy
  queryNew.sortDir = queryData.sortDir
  router.push({ query: queryNew })
  .then(()=>{
    fetchSort()
  })
  showSort.value = false;
}

function filterMenu(){
  store.commit("setFilterMenu", !store.state.browse.filterMenuShow)
  if(store.state.browse.filterMenuShow){
      document.getElementsByTagName('body')[0].classList.add('active-body')
  }else{
      document.getElementsByTagName('body')[0].classList.remove('active-body')
  }
}

const width = ref()

    
function handleResize() {
    width.value = window.innerWidth;
}

window.addEventListener('resize', handleResize);
handleResize()

watch(width, (to)=>{
    if(to>768){
        document.getElementsByTagName('body')[0].classList.remove('active-body')
        // store.commit("setFilterMenu", false)
    }
})
</script>