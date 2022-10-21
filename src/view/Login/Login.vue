<template>
    <main id="login">
        <div v-if="store.getters.getLoading" class="login-loading">
            <v-progress-circular color="white" indeterminate :size="78" :width="6"></v-progress-circular>
        </div>
        <div class="login-container">
            <div class="login-text">
                <img src="../../assets/image/svg/logo.png" alt="logo"/>
                <p>Choose how to sign in to your Epic Games Account.</p>
            </div>
            <ul class="login-option">
                <li @click="loginWithGoogle">
                    <div class="logo">
                        <div>
                            <GoogleIcon/>
                        </div>
                    </div>
                    <p>Sign in with Google</p>
                </li>
            </ul>
            <div class="sign-up">
                <p>Don`t have an Epic Games Account?</p>
                <router-link to="/sign-up"><span>Sign Up</span></router-link>
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

    const logStatus = ref(store.getters.getStatus)
    // const errorMessage = ref(store.getters.getErrorMessage)

    watch(store.state.auth, (to)=>{
        logStatus.value = to.logStatus
        if(logStatus.value){
            router.push({ path: '/' })
        }
    })

    function loginWithGoogle(){
        store.dispatch("login")    
    }
</script>