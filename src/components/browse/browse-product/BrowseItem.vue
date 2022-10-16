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
    import BrowseItemSkeleton from './browse-item-skeleton/BrowseItemSkeleton.vue'
    defineProps({items: Object})
</script>