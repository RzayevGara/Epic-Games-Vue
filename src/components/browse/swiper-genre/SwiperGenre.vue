<template>
    <div class="swiper-genre_container">
      <swiper
        :slidesPerView="2"
        :spaceBetween="20"
        v-if="genre"
        class="swiper-genre"
        :breakpoints="{
          768: {
              slidesPerView: 4,
              allowTouchMove: false
          },
          1920: {
              slidesPerView: 5,
              allowTouchMove: false
          },
        }"
      >
      <div class="swiper-genre_title">
          <h3>{{ title }}</h3>
          <Buttons/>
      </div>
        <swiper-slide v-for="item in genre" :key="item.id" >
          <router-link :to="`/`">
              <img :src="item.assets[0].url" alt="image" />
              <h2 class="swiper-genre-content_name">{{ item.name }} Games</h2>
          </router-link>
        </swiper-slide>
      </swiper>
    <SwiperGenreSkeleton v-else/>
    </div>
  </template>
  
  
  <script setup>
      // Import Swiper Vue.js components
      import { Swiper, SwiperSlide} from "swiper/vue";
      import SwiperGenreSkeleton from './swiper-genre-skeleton/SwiperGenreSkeleton.vue'
      // Import Swiper styles
      import Buttons from '../../home/swiper-category/Buttons.vue'
      import "swiper/css";
  
      const props = defineProps({ genre: Object, title: String });
  </script>