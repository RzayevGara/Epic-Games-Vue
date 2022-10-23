<template>
    <section id="product">
        <div v-if="product" class="product-container">
            <div class="product-title">
                <h2>{{product.name}}</h2>
            </div>
            <div class="product-content">
                <div class="product-content_detail">
                    <SwiperProduct :item="product"/>
                    <p>{{product.description.replace(/<[^>]*>?/gm, '')}}</p>
                </div>
                <SideBar :item="product"/>
            </div>
            <ProductSpec :item="product.description"/>
        </div>
        <ProductSkeleton v-else/>
    </section>
</template>

<script setup>
    import SwiperProduct from '../../components/product/product-swiper/SwiperProduct.vue'
    import SideBar from '../../components/product/right-side-bar/SideBar.vue'
    import ProductSpec from '../../components/product/product-spec/ProductSpec.vue'
    import ProductSkeleton from '../../components/product/product-skeleton/ProductSkeleton.vue'
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

    watch(route, (to)=>{
        activePath.value = to.params.productID
        if(activePath.value){
            store.dispatch('fetchProduct', activePath.value)
        }
    }, {deep: true})
</script>