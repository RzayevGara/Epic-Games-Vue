<template>
    <section id="checkout-page">
        <div class="checkout-black"></div>
        <div class="checkout-container">
            <checkoutLoading v-if="store.getters.getLoadingCheckout" text="Loading your order .."/>
            <checkoutLoading v-if="store.getters.getCheckoutConfirmLoading" text="Your order is being confirmed .."/>
            <div class="checkout" v-if="!store.getters.getLoadingCheckout && !store.getters.getCheckoutConfirmLoading && !store.getters.getCheckoutConfirmStatus">
                <div class="checkout-title">
                    <h5>checkout</h5>
                    <div>
                        <h3>
                            <userIcon fill="#0078F2"/>
                            <span>{{store.getters.getCustomerInfo.firstname}}</span>
                        </h3>
                        <closeIcon class="close-icon" @click="closeCheckout"/>
                    </div>
                </div>
                <div class="order-detail">
                    <OrderSummary />
                    <PaymentMethod/>
                </div>
            </div>
            <CheckoutSuccess v-if="store.getters.getCheckoutConfirmStatus"/>
        </div>
    </section>
</template>

<script setup>
    import {useStore} from 'vuex'
    import {inject, onMounted} from 'vue'
    import userIcon from '../../assets/image/svg/user.svg'
    import closeIcon from '../../assets/image/svg/x-symbol.svg'
    import OrderSummary from './order-summary/OrderSummary.vue'
    import PaymentMethod from './payment-method/PaymentMethod.vue'
    import checkoutLoading from './checkoutLoading.vue'
    import CheckoutSuccess from './success-checkout/CheckoutSuccess.vue'
    const store = useStore()

    const closeCheckout = inject('closeCheckout')

    onMounted(()=>{
        store.commit("setCardNumber", {value: null, status: false})
        store.commit("setCardDate", {value: null, status: false})
        store.commit("setCardCVC", {value: null, status: false})
        store.commit("setCheckoutErrorMsg", null)
    })

    store.commit("setDiscountMessage", null)
    store.commit("setDiscountSucceed", false)
    store.commit("setCheckoutConfirmStatus", false)

</script>