<template>
    <SwiperTitleMB v-if="width<768" :product="products.newReleases"/>
    <SwiperTitlePC v-else :product="products.newReleases"/>
</template>

<script setup>
    import SwiperTitleMB from './swiper-title-MB/SwiperTitleMB.vue';
    import SwiperTitlePC from './swiper-title-PC/SwiperTitlePC.vue'
    import { useStore } from 'vuex';
    import { ref, onUnmounted } from 'vue';
    const width = ref()

    window.addEventListener('resize', handleResize);

    function handleResize() {
            width.value = window.innerWidth;
    }

    // onUnmounted(()=>{
    //     window.removeEventListener('resize', handleResize);
    // })


    const store = useStore()
    const products = ref(store.getters.listProducts)
</script>