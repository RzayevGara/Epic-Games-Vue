<template>
  <section id="home">
    <div class="home-container">
      <SwiperTitle />
      <SwiperCategory :product="productList?.mostPopular" title="Most Popular" />
      <SwiperCategory :product="productList?.topPlayerRated" title="Top Player Rated" />
    </div>
    <SwiperCarousel />
    <div class="home-container">
      <SwiperCategory :product="productList?.mostPlayedGames" title="Most Played" />
    </div>
    <FreeGames :product="productList?.freeGames"/>
    <SwiperCarousel />
    <div class="home-container">
      <SwiperCategory :product="productList?.topSellers" title="Top Sellers" />
    </div>
    <div class="home-container">
      <Catalog/>
    </div>
  </section>
</template>


<script setup>
import SwiperTitle from "../../components/home/swiper-title/SwiperTitle.vue";
import SwiperCategory from "../../components/home/swiper-category/SwiperCategory.vue";
import SwiperCarousel from "../../components/home/swiper-carousel/SwiperCarousel.vue";
import FreeGames from '../../components/home/free-games/FreeGames.vue'
import Catalog from '../../components/home/home-catalog/Catalog.vue'
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();

store.dispatch("fetchNewRelease");
store.dispatch("fetchMostPopular");
store.dispatch("fetchTopPlayerRated");
store.dispatch("fetchMostPlayedGames");
store.dispatch("fetchTopSellers");
store.dispatch("fetchFreeGames")

const productList = ref(store.getters.listProducts);
</script>