<template>
    <Auth :authData="signupData" :errorMsg="errorMsg"/>
</template>

<script setup>
    import GoogleIcon from '../../assets/image/svg/google.svg'
    import Auth from '../../components/shared/auth/Auth.vue'
    import {useStore} from 'vuex'
    import {ref, watch} from 'vue'
    const store = useStore()

    function signinWithGoogle(){
        store.dispatch("signUp")    
    }

    const errorMsg = ref(store.getters.getErrorMessageSign)

    watch(store.state.auth, (to)=>{
        errorMsg.value = to.errorMessageSign
    })

    const signupData = {
        optionText: "Choose how you would like to sign up.",
        loginWithGoogle: signinWithGoogle,
        authOption: "Sign up",
        accountText: "Have an Epic Games Account?",
        link: "login"
    }

</script>