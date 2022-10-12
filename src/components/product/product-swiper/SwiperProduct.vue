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
            <div class="product-swiper-items-leftArrow" @click="leftSlide">
                <ArrowIcon/>
            </div>
            <div class="product-swiper-items_slider">
                <ul ref="smallSlider">
                    <li v-for="(el, index) in item.assets" :key="el.id" v-show="index>0" @click="imageClick(el.id)">
                        <div :class="el.id===activeImageID?  'product-swiper-items_image active-image': 'product-swiper-items_image'">
                            <img :src="el.url" alt="image"/>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="product-swiper-items-rightArrow" @click="rightSlide">
                <ArrowIcon/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import ArrowIcon from '../../../assets/image/svg/arrow-up.svg'
    import {ref, watch} from 'vue'
    import {useStore} from 'vuex'

    const store = useStore()
    const slider = ref(null)
    const countSlider = ref(0)
    const smallSlider = ref(null)
    const countSmallSlider = ref(0)
    const props = defineProps({item: Object})
    const activeImageID  = ref(store.state.product.activeImageID)

    watch(store.state.product, (to)=>{
        activeImageID.value = to.activeImageID
    })

    function rightClick(){
        if(countSlider.value > -(props.item.assets.length-2)*100){
            countSlider.value -= 100
            slider.value.style.transform = `translateX(${countSlider.value}%)`
            store.commit("setActiveImageID", props.item.assets[((countSlider.value/100)*-1)+1].id)
            
            props.item.assets.map((item, index)=>{
                if(item.id===activeImageID.value){
                    let count = Math.floor((index)/3)
                    smallSlider.value.style.transform = `translate3d(calc(${count * -25}% + ${count * -15}px), 0px, 0px)`
                }
            })
        }else{
            countSlider.value = 0
            slider.value.style.transform = `translateX(${countSlider.value}%)`
            store.commit("setActiveImageID", props.item.assets[1].id)
            let count = 0
            smallSlider.value.style.transform = `translate3d(calc(${count * -25}% + ${count * -15}px), 0px, 0px)`
        }

    }
    function leftClick(){
        if(countSlider.value < 0){
            countSlider.value += 100
            slider.value.style.transform = `translateX(${countSlider.value}%)`
            store.commit("setActiveImageID", props.item.assets[((countSlider.value/100)*-1)+1].id)
            props.item.assets.map((item, index)=>{
                if(item.id===activeImageID.value){
                    let count = Math.floor((index-2)/3)
                    smallSlider.value.style.transform = `translate3d(calc(${count * -25}% + ${count * -15}px), 0px, 0px)`
                }
            })
        }
        else{
            countSlider.value = -(props.item.assets.length-2)*100
            slider.value.style.transform = `translateX(${countSlider.value}%)`
            store.commit("setActiveImageID", props.item.assets[props.item.assets.length-1].id)
            
            let count = Math.floor((props.item.assets.length-2)/3)
            smallSlider.value.style.transform = `translate3d(calc(${count * -25}% + ${count * -15}px), 0px, 0px)`
        }
    }

    function imageClick(id){
        props.item.assets.map((el, index)=>{
            if(el.id===id){
                countSlider.value = (index-1)*-100
                slider.value.style.transform = `translateX(${countSlider.value}%)`
                store.commit("setActiveImageID", id)
            }
        })
    }

    function leftSlide(){
        let count = Math.ceil((props.item.assets.length-1)/3)-1
        if( countSmallSlider.value===0){
            countSmallSlider.value=count
            smallSlider.value.style.transform = `translate3d(calc(${countSmallSlider.value * -25}% + ${countSmallSlider.value * -15}px), 0px, 0px)`
        }
        else if (count>=countSmallSlider.value){
            countSmallSlider.value-=1
            smallSlider.value.style.transform = `translate3d(calc(${countSmallSlider.value * -25}% + ${countSmallSlider.value * -15}px), 0px, 0px)`
        }
    }

    function rightSlide(){
        let count = Math.ceil((props.item.assets.length-1)/3)-1
        if(count>countSmallSlider.value){
            countSmallSlider.value+=1
            smallSlider.value.style.transform = `translate3d(calc(${countSmallSlider.value * -25}% + ${countSmallSlider.value * -15}px), 0px, 0px)`
        }
        else{
            countSmallSlider.value=0
            smallSlider.value.style.transform = `translate3d(calc(${countSmallSlider.value * -25}% + ${countSmallSlider.value * -15}px), 0px, 0px)`
        }
    }
</script>