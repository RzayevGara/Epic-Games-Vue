<template>
  <div class="swiper-product_container">
    <swiper
      :slidesPerView="1.5"
      :spaceBetween="20"
      v-if="product"
      class="swiper-product"
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
        }
      }"
    >
    <div class="swiper-product_title">
        <h3>
          {{ title }}
          <span>
          <ArrowIcon/>
        </span>
        </h3>
        <Buttons/>
    </div>
      <swiper-slide v-for="item in product" :key="item.id">
        <div class="swiper-product_content">
          <img :src="item.image.url" alt="image" />
          <p class="swiper-product-content_title">base game</p>
          <h2 class="swiper-product-content_name">{{ item.name }}</h2>
          <p class="swiper-product-content_price">{{ item.price.formatted_with_symbol }}</p>
        </div>
      </swiper-slide>
    </swiper>
  <SwiperProductSkeleton v-else :title="title"/>
  </div>
</template>


<script setup>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide} from "swiper/vue";
    // Import Swiper styles
    import Buttons from './Buttons.vue'
    import SwiperProductSkeleton from './swiper-product-skeleton/SwiperProductSkeleton.vue'
    import "swiper/css";
    import ArrowIcon from '../../../assets/image/svg/arrow-up.svg'

    defineProps({ product: Object, title: String });
</script>