<template>
  <div class="filter-item_name" @click="showFilterChild">
    <p>{{ item.name }}</p>
    <ArrowIcon :class="filterChild===true && 'active-arrow'"/>
  </div>
  <ul class="filter-item_child" v-if="filterChild">
    <li v-for="child in item.children" :key="child.id" @click="selectOption(item.name, child.slug)" 
    :class="filterQuery.includes(child.slug)?'active-list':undefined"
    >
      {{ child.name }}
      <CheckedIcon/>
    </li>
  </ul>
</template>

<script setup>
    import { useRoute, useRouter } from "vue-router";
    import ArrowIcon from '../../../assets/image/svg/arrow-up.svg'
    import CheckedIcon from '../../../assets/image/svg/checked.svg'
    import {ref, watch} from 'vue'
    import {useStore}from 'vuex'
    const route = useRoute()
    const store= useStore()
    const filterChild = ref(false)
    let filterQuery = ref(store.state.browse.filterQuery )
    defineProps({ item: Object})

    function showFilterChild(){
        filterChild.value = !filterChild.value
    } 

    function selectOption(item, child){
        store.commit("setFilterQuery", {item, child})
    }

</script>