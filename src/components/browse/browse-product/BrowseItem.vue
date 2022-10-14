<template>
  <div class="browse-product_item">
    <div class="product-item_container">
        <ul v-if="items">
            <li v-for="item in items" :key="item.id">
                <router-link :to="`p/${item.permalink}`">
                    <img :src="item.image.url"/>
                    <p class="title">base game</p>
                    <h3 class="name">{{item.name}}</h3>
                    <p class="price">{{item.price.formatted_with_symbol}}</p>
                </router-link>
            </li>
        </ul>
        <BrowseItemSkeleton v-else/>
    </div>
  </div>
</template>

<script setup>
    import {ref, watch} from 'vue'
    import {useStore} from 'vuex'
    import BrowseItemSkeleton from './browse-item-skeleton/BrowseItemSkeleton.vue'
    const store= useStore()
    const items = ref()

    watch(store.state.browse, (to)=>{
        items.value = to.browse?.data
    })
</script>