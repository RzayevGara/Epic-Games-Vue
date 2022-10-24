<template>
  <div class="list-container">
    <div class="item-detail">
      <router-link :to="`p/${item.permalink}`" class="img-click">
        <img :src="item.image.url" alt="image" />
      </router-link>
      <div class="item-info">
        <p class="base-game">base game</p>
        <h2 class="item-name">{{ item.name }}</h2>
      </div>
    </div>
    <div class="item-price">
      <p class="price">{{ item.price.formatted_with_symbol }}</p>
      <removeItem :item="item"/>
    </div>
  </div>
</template>

<script setup>
    import removeItem from './removeItem.vue'
    import {useStore} from 'vuex'

    const store = useStore()

    defineProps({item: Object})
</script>