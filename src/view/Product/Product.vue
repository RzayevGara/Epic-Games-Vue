<template>
    <section id="product">
        <div v-if="product" class="product-container">
            <div class="product-title">
                <h2>{{product.name}}</h2>
            </div>
            <div class="product-content">
                <SwiperProduct :item="product"/>
                <aside>
                    <div class="product-side"> side</div>
                </aside>
            </div>

            <div class="product-spec">
                specs
            </div>
        </div>
        <div v-else class="product-container">yox</div>
    </section>
</template>

<script setup>
import SwiperProduct from '../../components/product/product-swiper/SwiperProduct.vue'
    import {useStore} from 'vuex'
    import { useRoute } from 'vue-router'
    import {ref, watch} from 'vue'
    const store = useStore()
    const route = useRoute()
    const activePath = ref(route.params.productID)
    store.dispatch('fetchProduct', activePath.value)

    const product = ref();

    watch(store.state.product, (to)=>{
        product.value = to.product
    })
</script>