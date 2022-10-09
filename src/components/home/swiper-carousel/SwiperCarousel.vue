<template>
    <div class="swiper-carousel_container">
        <swiper
        :slidesPerView="'auto'"
        :spaceBetween="15"
        :pagination="{
            clickable: true,
        }"
        :modules="modules"
        class="swiper-carousel"
        :breakpoints="{
        768: {
            slidesPerView: 3,
            allowTouchMove: false
        },
      }"
        > 
            <swiper-slide>
                <SwiperCarouselItem :product="productList?.mostPlayedGames" title="Most Played"/>
            </swiper-slide>
            <swiper-slide>
                <SwiperCarouselItem :product="productList?.topSellers" title="Top Sellers"/>
            </swiper-slide>
            <swiper-slide>
                <SwiperCarouselItem :product="productList?.newReleases" title="New Releases"/>
            </swiper-slide>
        </swiper>
    </div>
</template>


<script setup>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from "swiper/vue";
    import { Pagination } from "swiper";
    import { ref } from 'vue';
    import SwiperCarouselItem from './SwiperCarouselItem.vue'
    
    // Import Swiper styles
    import "swiper/css";
    
    import "swiper/css/pagination";
    import { useStore } from 'vuex';

    const store = useStore()

    const productList = ref(store.getters.listProducts)
    
    // import required modules
    const modules=  [Pagination]


</script>