<template>
    <Auth :authData="loginData" :errorMsg="errorMsg"/>
</template>

<script setup>
    import GoogleIcon from '../../assets/image/svg/google.svg'
    import Auth from '../../components/shared/auth/Auth.vue'
    import {useStore} from 'vuex'
    import {ref, watch} from 'vue'
    const store = useStore()

    function loginWithGoogle(){
        store.dispatch("login")    
    }
    const errorMsg = ref(store.getters.getErrorMessageLogin)

    watch(store.state.auth, (to)=>{
        errorMsg.value = to.errorMessageLogin
    })

    const loginData ={
        optionText: "Choose how to login to your Epic Games Account.",
        loginWithGoogle: loginWithGoogle,
        authOption: "login",
        accountText: "Don`t have an Epic Games Account?",
        link: "sign-up",
    }
</script>