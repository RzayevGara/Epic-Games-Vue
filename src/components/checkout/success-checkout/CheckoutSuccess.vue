<template>
    <div class="checkout-success">
        <img src="../../../assets/image/svg/logo.png" alt="image"/>
        <p>Your order has been confirmed</p>
        <closeIcon @click="closeCheckout" class="checkout-success-close"/>
    </div>
</template>

<script setup>
    import closeIcon from '../../../assets/image/svg/x-symbol.svg'
    import {inject} from 'vue'

    const closeCheckout = inject('closeCheckout')
</script>