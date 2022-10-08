<template>
    <swiper
      :slidesPerView="1.5"
      :spaceBetween="20"
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
      <swiper-slide v-for="item in Array(7).fill()" :key="item">
        <div class="swiper-product_skeleton">
        <div>
            <img src="../../../../assets/image/png/skeleton-img.png" alt="image" />
        </div>
          <h2 class="swiper-product-content_name"></h2>
          <p class="swiper-product-content_price"></p>
        </div>
      </swiper-slide>
    </swiper>
</template>


<script setup>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide} from "swiper/vue";
    // Import Swiper styles
    import Buttons from '../Buttons.vue'
    import "swiper/css";
    import ArrowIcon from '../../../../assets/image/svg/arrow-up.svg'
    defineProps({title: String });

</script>