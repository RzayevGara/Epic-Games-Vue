<template>
    <section id="product">
        <div class="product-container">
            <div class="product-title">
                <h2>game name</h2>
            </div>
            <div class="product-content">
                <div class="product-swiper">swiper</div>
                <aside>
                    <div class="product-side"> side</div>
                </aside>
            </div>
            <div class="product-spec">
                specs
            </div>
        </div>
    </section>
</template>

<script setup>
    import {useStore} from 'vuex'
    import { useRoute } from 'vue-router'
    import {ref} from 'vue'
    const store = useStore()
    const route = useRoute()
    const activePath = ref(route.params.productID)
    store.dispatch('fetchProduct', activePath.value)

    const product = ref(store.getters.getProduct);
</script>