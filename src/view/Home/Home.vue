<template>
    <section id="home">
        <div class="home-container">
          <SwiperTitle/>
        </div>
    </section>
</template>


<script setup>
    import SwiperTitle from '../../components/home/swiper-title/SwiperTitle.vue' 
    import { useStore } from 'vuex';
    import { ref } from 'vue';

    const store = useStore()

    store.dispatch("fetchNewRelease")
    store.dispatch("fetchMostPopular")
    store.dispatch("fetchTopPlayerRated")
    store.dispatch("fetchMostPlayedGames")
    store.dispatch("fetchTopSellers")
    // store.dispatch("test")
  
</script>