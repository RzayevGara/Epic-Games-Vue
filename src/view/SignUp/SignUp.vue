<template>
    <main id="sign-up">
        <div v-if="isLoading" class="sign-loading">
            <v-progress-circular color="white" indeterminate :size="78" :width="6"></v-progress-circular></div>
        <div class="sign-up-container">
            <div class="sign-up-text">
                <img src="../../assets/image/svg/logo.png" alt="logo"/>
                <p>Choose how you would like to sign up</p>
            </div>
            <ul class="sign-up-option">
                <li @click="signinWithGoogle">
                    <div class="logo">
                        <div>
                            <GoogleIcon/>
                        </div>
                    </div>
                    <p>Sign up with Google</p>
                </li>
            </ul>
            <p class="error-message">{{errorMessage}}</p>
            <div class="login">
                <p>Have an Epic Games Account?</p>
                <router-link to="/login"><span>Login</span></router-link>
            </div>
        </div>
    </main>
</template>

<script setup>
    import GoogleIcon from '../../assets/image/svg/google.svg'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import {ref, watch} from 'vue'
    const store = useStore()
    const router= useRouter()
    
    const isLoading = ref(store.getters.getLoading)
    const logStatus = ref(store.getters.getStatus)
    const errorMessage = ref(store.getters.getErrorMessage)

    watch(store.state.auth, (to)=>{
        isLoading.value = to.isLoading
        logStatus.value = to.logStatus
        if(logStatus.value){
            router.push({ path: '/' })
        }
    })



    function signinWithGoogle(){
        store.dispatch("signUp")    
    }
</script>