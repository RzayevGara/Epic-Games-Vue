<template>
    <div class="product-swiper">
        <div class="product-swiper_content">
            <div class="product-swiper-content_arrow">
                <div class="left-arrow" @click="leftClick">
                    <ArrowIcon/>
                </div>
                <div class="right-arrow" @click="rightClick">
                    <ArrowIcon/>
                </div>
            </div>
            <ul class="product-swiper-content_slider" ref="slider">
                <li v-for="(el, index) in item.assets" :key="el.id" v-show="index>0">
                    <div class="slider-image">
                        <img :src="el.url" alt="image"/>
                    </div>
                </li>
            </ul>
        </div>
        <div class="product-swiper_items">
            <div class="product-swiper-items-leftArrow">
                <ArrowIcon/>
            </div>
            <div class="product-swiper-items_slider">
                <ul>
                    <li v-for="(el, index) in item.assets" :key="el.id" v-show="index>0">
                        <div class="product-swiper-items_image">
                            <img :src="el.url" alt="image"/>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="product-swiper-items-rightArrow">
                <ArrowIcon/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import ArrowIcon from '../../../assets/image/svg/arrow-up.svg'
    import {ref} from 'vue'
    const slider = ref(null)
    const count = ref(0)
    const props = defineProps({item: Object})

    function rightClick(){
        if(count.value > -(props.item.assets.length-2)*100){
            count.value -= 100
            slider.value.style.transform = `translateX(${count.value}%)`
        }else{
            count.value = 0
            slider.value.style.transform = `translateX(${count.value}%)`
            
        }
    }
    function leftClick(){
        if(count.value < 0){
            count.value += 100
            slider.value.style.transform = `translateX(${count.value}%)`
        }
        else{
            count.value = -(props.item.assets.length-2)*100
            slider.value.style.transform = `translateX(${count.value}%)`
            
        }
    }
</script>