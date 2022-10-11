<template>
    <div class="swiper-title-pc_content">
        <div v-if="data" class="swiper-title-pc_container">
            <img :src="ActiveImage"/>
            <div class="swiper-title-pc_text">
                <p class="swiper-title-pc_title">out now</p>
                <p class="swiper-title-pc_desc">{{data.description.replace(/<[^>]*>?/gm, '')}}</p>
                <div class="swiper-title-pc_buy">
                    <p class="swiper-title-pc_price">Starting at {{data.price.formatted_with_symbol}}</p>
                    <button>
                    <router-link :to="`p/${data.permalink}`">
                        buy now
                    </router-link>    
                    
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="swiper-title-pc_skeleton">
            <img class="swiper-title-pc_skeletonimg" src="../../../../assets/image/png/skeleton-img-pc.png"/>
        </div>

    </div>
</template>

<script setup>
    import {useStore} from 'vuex'
    import {ref, watch, computed} from 'vue'
    import ShuffleData from '../../../../data/shuffle-data'

    const store = useStore()
    const data = ref(store.getters.getActiveList)

    const ActiveImage = computed(()=>{
        if(store.getters.getActiveList){
            const activeImage =  ShuffleData.filter(el=>el.id===store.getters.getActiveList.id)
            return activeImage[0].img
        }
    })
    const ActiveList = computed(()=>{
        return store.getters.getActiveList
    })

    watch(ActiveList, (to)=>{
        data.value = to
    })
</script>