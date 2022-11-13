<template>
  <div class="order-summary">
    <h3>
      order summary
      <closeIcon @click="closeCheckout"/>
    </h3>
    <div class="order-summary-container">
      <ul class="order-list">
        <li v-for="item in orderList.line_items" :key="item.id">
          <img :src="item.image.url" alt="image" />
          <div>
            <h4>{{ item.name }}</h4>
            <p>{{ item.price.formatted_with_symbol }}</p>
          </div>
        </li>
      </ul>
      <div class="price-detail">
        <p class="price">
          <span>Price</span>
          <span>{{ orderList.subtotal.formatted_with_symbol }}</span>
        </p>
        <p class="discount">
          <span>Sale Discount</span>
          <span
            >-{{
              orderList.discount.length === 0
                ? "$0.00"
                : orderList.discount.amount_saved.formatted_with_symbol
            }}</span
          >
        </p>
        <p class="total">
          <span>Total</span>
          <span>{{ orderList.total_with_tax.formatted_with_symbol }}</span>
        </p>
      </div>
      <div class="discount-box">
        <form v-if="!store.getters.getDiscountSucceed">
          <div class="discount-loading" v-if="store.getters.getLoadingDiscount">
            <v-progress-circular
              color="black"
              indeterminate
              :size="22"
              :width="2"
            ></v-progress-circular>
          </div>
          <input
            v-if="!store.getters.getLoadingDiscount"
            v-model="inputValue"
            type="text"
            placeholder="Discount code"
          />
          <button
            v-if="!store.getters.getLoadingDiscount"
            @click="submitDiscount"
            type="submit"
          >
            submit
          </button>
        </form>
        <div class="discount-code" v-else>
          <p>
            Discount applied: <span>{{ orderList.discount.code }}</span>
          </p>
        </div>
        <p class="error-message" v-if="store.getters.getDiscountMessage">
          {{ store.getters.getDiscountMessage }}
        </p>
        <p class="test-code" v-if="!store.getters.getDiscountSucceed">
          test code: <span>epicsale</span>
        </p>
      </div>
      <div class="confirm-order">
        <p>By clicking "Place Order" below, I represent that I am over 18 and an authorized user of this payment method, and I agree to the <span>End User Licence Agreement</span></p>
        <button :class="store.getters.getCardStatus?'confirm-button button-active' : 'confirm-button'" @click="confirmOrder">confirm order</button>
      </div>
    </div>
  </div>
</template>

<script setup>
    import {useStore} from 'vuex'
    import {computed, ref, inject} from 'vue'
    import closeIcon from '../../../assets/image/svg/x-symbol.svg'
    const store = useStore()

    const closeCheckout = inject('closeCheckout')

    const inputValue = ref()

    const orderList = computed(()=>{
        return store.getters.getLiveObject
    })

    function submitDiscount(){
        if(inputValue.value){
            store.dispatch("checkDiscountCode", inputValue.value)
        }
    }

    function confirmOrder(){
      if(store.getters.getCardStatus){
        store.dispatch("checkoutItem", store.getters.getCustomerInfo)
      }
    }
</script>