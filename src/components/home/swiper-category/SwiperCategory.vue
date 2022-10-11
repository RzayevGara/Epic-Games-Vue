<template>
  <div class="swiper-category_container">
    <swiper
      :slidesPerView="1.5"
      :spaceBetween="20"
      v-if="product"
      class="swiper-category"
      :breakpoints="{
        768: {
            slidesPerView: 4,
            spaceBetween: 15,
            allowTouchMove: false
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 16,
            allowTouchMove: false
        },
        1440: {
            slidesPerView: 5,
            spaceBetween: 20,
            allowTouchMove: false
        },
        1600: {
            slidesPerView: 5,
            spaceBetween: 32,
            allowTouchMove: false
        },
      }"
    >
    <div class="swiper-category_title">
        <h3>
          {{ title }}
          <span>
          <ArrowIcon/>
        </span>
        </h3>
        <Buttons/>
    </div>
      <swiper-slide v-for="item in product" :key="item.id" >
        <router-link :to="`p/${item.permalink}`">
          <div class="swiper-category_content">
            <img :src="item.image.url" alt="image" />
            <p class="swiper-category-content_title">base game</p>
            <h2 class="swiper-category-content_name">{{ item.name }}</h2>
            <p class="swiper-category-content_price">{{ item.price.formatted_with_symbol }}</p>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  <SwiperCategorySkeleton v-else :title="title"/>
  </div>
</template>


<script setup>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide} from "swiper/vue";
    // Import Swiper styles
    import Buttons from './Buttons.vue'
    import SwiperCategorySkeleton from './swiper-category-skeleton/SwiperCategorySkeleton.vue'
    import "swiper/css";
    import ArrowIcon from '../../../assets/image/svg/arrow-up.svg'

    defineProps({ product: Object, title: String });
</script>