<template>
  <div class="mySwiper-container">
    <swiper
      :slidesPerView="1.2"
      :spaceBetween="15"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="mySwiper"
      v-if="product"
    > 
      <swiper-slide v-for="items in product" :key="items.id">
        <router-link :to="`p/${item.permalink}`">
          <img :src="items.image.url" alt="">
          <div class="swiper-content">
              <p class="swiper-content_title">out now</p>
              <p class="swiper-content_description">
                  {{items.description.replace(/<[^>]*>?/gm, '')}}
              </p>
              <p class="swiper-content_price">
                  Starting at
                  <span>{{items.price.formatted_with_symbol}}</span>
              </p>
          </div>
        </router-link>
    </swiper-slide>
  </swiper>

    <swiper
      :slidesPerView="1.2"
      :spaceBetween="15"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="mySwiper"
      v-else
    > 
    <swiper-slide v-for="item in Array(7).fill()" :key="item">
        <Skeleton/>
      </swiper-slide>
  </swiper>
  </div>
</template>


<script setup>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from "swiper/vue";
    import { Pagination } from "swiper";
    import { ref } from 'vue';
    import Skeleton from '../swiper-skeleton/Skeleton.vue'
    
    // Import Swiper styles
    import "swiper/css";
    
    import "swiper/css/pagination";
    
    
    // import required modules
    const modules=  [Pagination]

    defineProps({product: Object})

    </script>