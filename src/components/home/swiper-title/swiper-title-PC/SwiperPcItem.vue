<template>
  <div class="swiper-title-pc_item">
    <ul v-if="product">
      <li @click="activeList(item)" v-for="item in product" :key="item.id" :class="data.id===item.id?'active-list':''">
        <div class="image-container">
            <div class="image-container_second">
                <div class="image-container_third">
                    <img :src="item.image.url"/>
                </div>
            </div>
        </div>
        <p>{{ item.name }}</p>
        <div :class="data.id===item.id?'animation-box':''"></div>
      </li>
    </ul>
    <ul v-else>
      <li v-for="item in Array(6).fill()" :key="item" class="skeleton-list">
      </li>
    </ul>
  </div>
</template>

<script setup>
    import {useStore } from 'vuex'
    import {computed, watch, ref, onUpdated,onActivated} from 'vue'

    const store = useStore()
    const props = defineProps({product: Object})
    const data = ref(store.getters.getActiveList)
    const timerSwipe = ref()
    
    function activeList(item){
        store.commit("setActiveList", item)
        clearTimeout(timerSwipe.value)
    }

    const ActiveList = computed(()=>{
        return store.getters.getActiveList
    })

    watch(ActiveList, (to)=>{
        data.value = to
    })

    function ActiveListTimer(){
      props.product?.map((el, index)=>{
        if(el.id===data.value.id){
          props.product.length-1>index?store.commit("setActiveList", props.product[index+1]):store.commit("setActiveList", props.product[0])
        }
      })
    }

    onUpdated(()=>{
      timerSwipe.value = setTimeout(ActiveListTimer, 7000)
    })

</script>