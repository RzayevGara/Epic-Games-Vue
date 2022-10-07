<template>
    <div class="swiper-title-pc">
        <SwiperPcContent/>
        <SwiperPcItem :product="product"/>
    </div>
</template>

<script setup>
    import SwiperPcContent from './SwiperPcContent.vue'
    import SwiperPcItem from './SwiperPcItem.vue'
    defineProps({product: Object})
</script>