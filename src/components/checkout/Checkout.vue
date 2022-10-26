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
                    <div class="order-summary">
                        <h3>order summary</h3>
                        <ul class="order-list">
                            <li v-for="item in orderList.line_items" :key="item.id">
                                <img :src="item.image.url" alt="image"/>
                                <div>
                                    <h4>{{item.name}}</h4>
                                    <p>{{item.price.formatted_with_symbol}}</p>
                                </div>
                                
                            </li>
                        </ul>
                        <div class="price-detail">
                            <p class="price">
                                <span>Price</span>
                                <span>{{orderList.subtotal.formatted_with_symbol}}</span>
                            </p>
                            <p class="discount">
                                <span>Sale Discount</span>
                                <span>-{{orderList.discount.length===0 ? '$0.00' : orderList.discount.amount_saved.formatted_with_symbol}}</span>
                            </p>
                            <p class="total">
                                <span>Total</span>
                                <span>{{orderList.total_with_tax.formatted_with_symbol}}</span>
                            </p>
                        </div>
                        <div class="discount-box">
                            <form>
                                <input v-model="inputValue" type="text" placeholder="Discount code"/>
                                <button @click="submitDiscount" type="submit">submit</button>
                            </form>
                        </div>
                    </div>
                    <div class="payment-method"></div>
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
    const store = useStore()

    defineProps({closeFunction: Function})

    const inputValue = ref()

    const orderList = computed(()=>{
        return store.getters.getLiveObject
    })

    function submitDiscount(){
        if(inputValue.value){
            store.dispatch("checkDiscountCode", inputValue.value)
        }
    }
</script>