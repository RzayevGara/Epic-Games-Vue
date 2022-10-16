<template>
  <swiper
    :slidesPerView="2"
    :spaceBetween="20"
    class="swiper-genre"
    :breakpoints="{
      768: {
        slidesPerView: 4,
        allowTouchMove: false,
      },
      1920: {
        slidesPerView: 5,
        allowTouchMove: false,
      },
    }"
  >
    <div class="swiper-genre_title">
      <h3 class="skeleton-genre-title"></h3>
      <Buttons />
    </div>
    <swiper-slide class="skeleton-genre-slide" v-for="item in Array(7).fill()" :key="item">
        <img class="skeleton-genre-img" src="../../../../assets/image/png/skeleton-img-pc.png" alt="image" />
        <h2 class="skeleton-genre-name"></h2>
    </swiper-slide>
  </swiper>
</template>


<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide} from "swiper/vue";
// Import Swiper styles
import Buttons from '../../../home/swiper-category/Buttons.vue'
import "swiper/css";

</script>