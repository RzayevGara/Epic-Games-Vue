<template>
  <aside>
    <div class="product-side">
        <div class="product-side_images">
            <img v-if="width<768" :src="item.assets[2].url"/>
            <img class="product-side_img_pc" v-else :src="item.assets[0].url"/>
        </div>

        <div class="price">
            <div>base game</div>
            <p>{{item.price.formatted_with_symbol}}</p>
        </div>
        <div class="buttons">
            <button class="buy-now">buy now</button>
            <button v-if="cartContainsItem" class="add-card">view in cart</button>
            <button v-if="!cartContainsItem" :disabled="store.getters.getAddCartStatus" @click="addTocard(item.id)" class="add-card" >
                <span v-if="!store.getters.getAddCartStatus">add to card</span>
                <div v-if="store.getters.getAddCartStatus" class="add-card-loading">
                    <v-progress-circular color="white" indeterminate :size="28" :width="3"></v-progress-circular>
                </div>
            </button>
        </div>
        <div class="product-detail">
            <p v-for="variant in item.variant_groups" :key="variant.id">
                {{variant.name}}
                <div>
                    <span v-for="option in variant.options" :key="option.id">
                        <span v-if="option.name==='windows'"><WindowsIcon/></span>
                        <span v-else-if="option.name==='mac'"><MacIcon/></span>
                        <span v-else>{{option.name}}</span>
                    </span>
                </div>
            </p>
        </div>
    </div>
  </aside>
</template>


<script setup>
    import WindowsIcon from '../../../assets/image/svg/Windows.svg'
    import MacIcon from '../../../assets/image/svg/MacOS.svg'
    import { ref, watch, computed} from 'vue';
    import {useStore} from 'vuex'
    const props = defineProps({item: Object})
    const width = ref()
    const store = useStore()

    const cartContainsItem = computed(()=>{
        return store.state.cart.cartItems.some(item=>item.product_id===props.item.id)
    })
    
    function handleResize() {
        width.value = window.innerWidth;
    }
    
    window.addEventListener('resize', handleResize);
    handleResize()

    function addTocard(id){
        store.dispatch("addToCart", id)
    }
</script>