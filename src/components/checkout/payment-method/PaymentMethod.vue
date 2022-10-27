<template>
  <div class="payment-method">
    <h3>Payment Methods</h3>
  </div>
  <div class="payment-input">
    <form>
        <div class="card-number form-container">
            <label>Card Number:</label>
            <div :class="msg===false?'input-container input-error':'input-container'">
                <input v-model="payment.cardNumber" type="text" placeholder="#### #### #### ####" />
                <span v-if="!msg"><CradIcon/></span>
                <span v-if="msg==='Visa'"><Visa/></span>
                <span v-if="msg==='Mastercard'"><Mastercard/></span>
                <span v-if="msg==='Maestro'"><Maestro/></span>
            </div>
        </div>
        <div class="form-container">
            <div class="card-date">
                <label>Card Expiration:</label>
                <input v-model="payment.cardDate" type="text" placeholder="##/##" maxlength="5" :class="msgDate===false?'input-error':''"/>
            </div>
            <div class="card-cvc">
                <label>Card CVC:</label>
                <input v-model="payment.cardCVC" type="text" placeholder="####" maxlength="4" :class="msgCVC===false?'input-error':''"/>
            </div>
        </div>
    </form>
  </div>
</template>

<script setup>
    import Visa from '../../../assets/image/svg/visa.svg'
    import Mastercard from '../../../assets/image/svg/mastercard.svg'
    import Maestro from '../../../assets/image/svg/maestro.svg'
    import CradIcon from '../../../assets/image/svg/unknown-card.svg'
    import {reactive, watch, ref} from 'vue'
    const payment = reactive({
        cardNumber: null,
        cardDate: null,
        cardCVC: null
    })
    const msg = ref(null)
    const msgCVC = ref(null)
    const msgDate = ref(null)

    watch(payment, (to)=>{
        if(to.cardNumber){
            getCardBrandId(to.cardNumber)
            let realNumber = to.cardNumber.replace(/-/gi, '')
            let dashedNumber = realNumber.match(/.{1,4}/g)
            payment.cardNumber = dashedNumber.join('-')
        }else{
            payment.cardNumber = to.cardNumber
            msg.value = null;
        }
        if(to.cardDate){
            payment.cardDate = cardDate(to.cardDate)
            msgDate.value = true
            if(to.cardDate.length<5){
                msgDate.value = false
            }
        }
        else{
            msgDate.value = null
        }
        if(to.cardCVC){
            cardCVC(to.cardCVC)
        }else{
            msgCVC.value = null
        }
    })

    function getCardBrandId(value){
        if (/^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/.test(value.replace( /-/g, ""))) {
            msg.value = "Maestro";
        }
        else if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(value.replace( /-/g, ""))) {
            msg.value = "Mastercard";
        }
        else if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(value.replace( /-/g, ""))) {
            msg.value = "Visa";
        }else{
            msg.value = false;
        }
    }
    function cardDate(value) {
        return value.replace(
            /^([1-9]\/|[2-9])$/g, '0$1/' // To handle 3/ > 03/
        ).replace(
            /^(0[1-9]{1}|1[0-2]{1})$/g, '$1/' // 11 > 11/
        ).replace(
            /^([0-1]{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
        ).replace(
            /^(\d)\/(\d\d)$/g, '0$1/$2' // To handle 1/11 > 01/11
        ).replace(
            /^(0?[1-9]{1}|1[0-2]{1})([0-9]{2})$/g, '$1/$2' // 141 > 01/41
        ).replace(
            /^([0]{1,})\/|[0]{1,}$/g, '0' // To handle 0/ > 0 and 00 > 0
        ).replace(
            /[^\d\/]|^[\/]{0,}$/g, '' // To allow only numbers and /
        ).replace(
            /\/\//g, '/' // Prevent entering more than 1 /
        );
    }

    function cardCVC(value){
        if (/^[0-9]{3,4}$/.test(value)) {
            msgCVC.value = true;
        }else{
            msgCVC.value = false
        }
    }
</script>