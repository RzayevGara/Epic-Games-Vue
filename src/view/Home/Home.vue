<template>
  <section id="home">
    <div class="home-container">
      <SwiperTitle />
      <SwiperProduct :product="productList?.mostPopular" title="Most Popular" />
      <SwiperProduct
        :product="productList?.topPlayerRated"
        title="Top Player Rated"
      />
    </div>
    <SwiperCarousel />
    <div class="home-container">
      <SwiperProduct :product="productList?.mostPlayedGames" title="Most Played" />
    </div>
  </section>
</template>


<script setup>
import SwiperTitle from "../../components/home/swiper-title/SwiperTitle.vue";
import SwiperProduct from "../../components/home/swiper-product/SwiperProduct.vue";
import SwiperCarousel from "../../components/home/swiper-carousel/SwiperCarousel.vue";
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();

store.dispatch("fetchNewRelease");
store.dispatch("fetchMostPopular");
store.dispatch("fetchTopPlayerRated");
store.dispatch("fetchMostPlayedGames");
store.dispatch("fetchTopSellers");
// store.dispatch("test")

const productList = ref(store.getters.listProducts);
</script>