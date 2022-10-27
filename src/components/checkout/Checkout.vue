<template>
    <section id="checkout-page">
        <div class="checkout-black"></div>
        <div class="checkout-container">
            <div class="checkout-loading" v-if="store.getters.getLoadingCheckout">
                <p>Loading your order ..</p>
                <v-progress-circular color="black" indeterminate :size="75" :width="7"></v-progress-circular>
            </div>
            <div class="checkout" v-else>
                <div class="checkout-title">
                    <h5>checkout</h5>
                    <div>
                        <h3>
                            <userIcon fill="#0078F2"/>
                            <span>{{store.getters.getCustomerInfo.firstname}}</span>
                        </h3>
                        <closeIcon class="close-icon" @click="closeFunction"/>
                    </div>
                </div>
                <div class="order-detail">
                    <OrderSummary/>
                    <PaymentMethod/>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import {useStore} from 'vuex'
    import {computed, ref} from 'vue'
    import userIcon from '../../assets/image/svg/user.svg'
    import closeIcon from '../../assets/image/svg/x-symbol.svg'
    import OrderSummary from './order-summary/OrderSummary.vue'
    import PaymentMethod from './payment-method/PaymentMethod.vue'
    const store = useStore()

    defineProps({closeFunction: Function})

    store.commit("setDiscountMessage", null)
    store.commit("setDiscountSucceed", false)
</script>