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
          <div @click="fetchCategories(item.slug)">
              <img :src="item.assets[0].url" alt="image" />
              <h2 class="swiper-genre-content_name">{{ item.name }} Games</h2>
          </div>
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
      import {inject} from 'vue'
      import {useRouter, useRoute}from 'vue-router'
      import {useStore} from 'vuex'

      const route = useRoute()
      const router = useRouter()
      const store = useStore()

      const fetchSort = inject('fetch')
  
      const props = defineProps({ genre: Object, title: String });

      function fetchCategories(slug){
        let queryNew =JSON.parse(JSON.stringify(route.query))
        queryNew.query = slug
        store.commit("setFilterQueryByCategory", slug)
        router.push({ query: queryNew })
        .then(()=>{
            fetchSort()
        })
      }
  </script>