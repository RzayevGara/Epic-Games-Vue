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
            <button @click="checkout(item)" class="buy-now">buy now</button>
            <button :disabled="store.getters.getAddCartStatus" class="add-card" >
                <span v-if="!store.getters.getAddCartStatus && !cartContainsItem" @click="addTocard(item.id)">add to card</span>
                <router-link v-if="cartContainsItem" to="/cart">
                    <span >view in cart</span>
                </router-link>
                <div v-if="store.getters.getAddCartStatus" class="add-card-loading">
                    <v-progress-circular color="white" indeterminate :size="28" :width="3"></v-progress-circular>
                </div>
            </button>
        </div>
        <div class="product-detail">
            <div class="product-detail_container">
                <span>Refund Type</span>
                <div>
                    <span >
                        <span>Self-Refundable</span>
                    </span>
                </div>
            </div>
            <div class="product-detail_container">
                <span>Developer</span>
                <div>
                    <span >
                        <span>Epic Games</span>
                    </span>
                </div>
            </div>
            <div class="product-detail_container">
                <span>Publisher</span>
                <div>
                    <span >
                        <span>Epic Games</span>
                    </span>
                </div>
            </div>
            <div class="product-detail_container">
                <span>Platform</span>
                <div>
                    <span>
                        <span v-if="platform.includes('windows')"><WindowsIcon/></span>
                    </span>
                    <span>
                        <span v-if="platform.includes('mac')"><MacIcon/></span>
                    </span>
                </div>
            </div>
        </div>
    </div>
  </aside>
</template>


<script setup>
    import WindowsIcon from '../../../assets/image/svg/Windows.svg'
    import MacIcon from '../../../assets/image/svg/MacOS.svg'
    import { ref, watch, computed} from 'vue';
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    const props = defineProps({item: Object})
    const emit = defineEmits(['showCheckoutModal'])
    const width = ref()
    const store = useStore()
    const router = useRouter()
    const platform  = ref([])
    const showCheckoutModal = ref(false)
    const cartContainsItem = computed(()=>{
        return store.state.cart.cartDetail?.line_items.some(item=>item.product_id===props.item.id)
    })
    

    function handleResize() {
        width.value = window.innerWidth;
    }
    
    window.addEventListener('resize', handleResize);
    handleResize()

    function addTocard(id){
        store.dispatch("addToCart", id)
    }

    function checkout (data){
        if(store.getters.getLogStatus){
            store.dispatch("checkoutToken", data)
            showCheckoutModal.value = true
            emit('showCheckoutModal', showCheckoutModal.value)
        }else{
            router.push("/login")
        }
    }

    props.item.categories.filter((el)=>{
        if(el.slug==='windows' || el.slug==='mac'){
            platform.value.push(el.slug)
        }
    })
</script>