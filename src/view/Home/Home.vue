<template>
    <section id="home">
        <div class="home-container">
          <MySwiper :product="products.newReleases"/>
        </div>
    </section>
</template>


<script setup>
    import MySwiper from '../../components/home/swiper/mySwiper.vue'
    import { useStore } from 'vuex';
    import { ref } from 'vue';


    const store = useStore()
    const products = ref(store.getters.listProducts)



    store.dispatch("fetchNewRelease")
    store.dispatch("fetchMostPopular")
    store.dispatch("fetchTopPlayerRated")
    store.dispatch("fetchMostPlayedGames")
    store.dispatch("fetchTopSellers")
  
</script>