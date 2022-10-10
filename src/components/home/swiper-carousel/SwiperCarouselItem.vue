<template>
    <div class="swiper-carousel_item">
        <div class="swiper-carousel-item_title">
            <h2>{{title}}</h2>
            <ViewMore/>
        </div>
        <ul v-if="product">
            <li v-for="(item, index) in product" :key="item.id" v-show="index<6">
                <div class="swiper-carousel-item_container">
                    <div class="swiper-carousel-item_image">
                        <img :src="item.image.url" alt="image"/>
                    </div>
                    <div class="swiper-carousel-item_text">
                        <h3>{{item.name}}</h3>
                        <p>{{item.price.formatted_with_symbol}}</p>
                    </div>
                </div>
            </li>
        </ul>
        <SwiperCarouselSkeleton v-else/>
    </div>
</template>
    
<script setup>
    import SwiperCarouselSkeleton from './skeleton/SwiperCarouselSkeleton.vue'
    import ViewMore from '../../shared/button/ViewMore.vue'
    import {ref, computed, watch} from 'vue'
    const props = defineProps({product: Object, title: String})
</script>