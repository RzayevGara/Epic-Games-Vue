<template>
    <div class="slider-buttons">
        <button @click="swiper.slidePrev()" class="prev-button"><ArrowIcon/></button>
        <button @click="swiper.slideNext()" class="next-button"><ArrowIcon/></button>
    </div>
</template>


<script setup>
    // Import Swiper Vue.js components
    import { useSwiper} from "swiper/vue";
    // Import Swiper styles
    import ArrowIcon from '../../../assets/image/svg/arrow-up.svg'
    const swiper = useSwiper();

</script>