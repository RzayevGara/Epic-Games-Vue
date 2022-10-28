<template>
    <section id="cart">
        <div class="cart-container">
            <h3 class="cart-title">My Cart</h3>
            <div class="cart-detail">
                <div class="cart-items">
                    <ul v-if="store.getters.getCartDetail?.line_items.length>0">
                        <li v-for="item in store.getters.getCartDetail?.line_items" :key="item.id">
                            <CartItem :item="item"/>
                        </li>
                    </ul>
                    
                    <div v-else-if="store.getters.getCartDetail?.line_items.length===0" class="empty-cart">
                        <EmptyIcon/>
                        <p class="empty-text">Your cart is empty.</p>
                        <router-link to="/" class="go-home">
                            <p >Shop for Games & Apps</p>
                        </router-link>
                    </div>

                    <CartSkeleton v-else-if="!store.getters.getCartDetail"/>
                </div>
                <div class="cart-price" v-if="store.getters.getCartDetail?.line_items.length>0">
                    <h4>Games and Apps Summary</h4>
                    <div class="price-detail">
                        <div class="calculate">
                            <p>
                                Price
                                <span>{{store.getters.getCartDetail?.subtotal.formatted_with_symbol}}</span>
                            </p>
                            <p>
                                Sale Discount
                                <span>$0.00</span>
                            </p>
                        </div>
                        <div class="total-price">
                            <p>
                                Subtotal
                                <span>{{store.getters.getCartDetail?.subtotal.formatted_with_symbol}}</span>
                            </p>
                            <button class="checkout-btn" @click="checkout()">check out</button>
                        </div>
                    </div>
                </div>
                <PriceBoxSkeleton  v-else-if="!store.getters.getCartDetail"/>
            </div>
        </div>
    </section>
    <Checkout v-if="showCheckoutModal"/>
</template>

<script setup>
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import CartSkeleton from '../../components/cart/skeleton/CartSkeleton.vue'
    import PriceBoxSkeleton from '../../components/cart/price-box-skeleton/PriceBoxSkeleton.vue'
    import EmptyIcon from '../../assets/image/svg/cart-empty.svg'
    import CartItem from '../../components/cart/cart-item/CartItem.vue'
    import Checkout from '../../components/checkout/Checkout.vue'
    import {ref, provide} from 'vue'
    
    const router = useRouter()
    const store = useStore()
    const showCheckoutModal = ref(false)

    function checkout (data){
        if(store.getters.getLogStatus){
            store.dispatch("checkoutTokenCart", data)
            showCheckoutModal.value = true
            document.getElementsByTagName('body')[0].classList.add('active-body')
        }else{
            router.push("/login")
        }
    }

    function closeCheckoutModal(){
        showCheckoutModal.value = false
        document.getElementsByTagName('body')[0].classList.remove('active-body')
    }
    provide("closeCheckout", closeCheckoutModal);

</script>