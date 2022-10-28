<template>
    <main id="auth">
        <div v-if="store.getters.getLoading" class="auth-loading">
            <v-progress-circular color="white" indeterminate :size="78" :width="6"></v-progress-circular>
        </div>
        <div class="auth-container">
            <div class="auth-text">
                <router-link to="/">
                    <img src="../../../assets/image/svg/logo.png" alt="logo"/>
                </router-link>
                <p>{{authData?.optionText}}</p>
            </div>
            <ul class="auth-option">
                <li @click="authData?.loginWithGoogle">
                    <div class="logo">
                        <div>
                            <GoogleIcon/>
                        </div>
                    </div>
                    <p>{{authData?.authOption}} with Google</p>
                </li>
            </ul>
            <p v-if="errorMsg" class="error-msg">{{errorMsg}}</p>
            <div class="sign-login">
                <p>{{authData?.accountText}}</p>
                <router-link :to="`/${authData?.link}`"><span>{{authData?.link}}</span></router-link>
            </div>
        </div>
    </main>
</template>

<script setup>
    import GoogleIcon from '../../../assets/image/svg/google.svg'
    import {useStore} from 'vuex'
    import {useRouter, useRoute} from 'vue-router'
    import {ref, watch, onMounted} from 'vue'
    const store = useStore()
    const route= useRoute()
    const router= useRouter(route.query.redirect)

    const redirect = ref(route.query.redirect)

    defineProps({authData: Object, errorMsg: [String, Boolean]})

    const logStatus = ref(store.getters.getStatus)

    watch(store.state.auth, (to)=>{
        logStatus.value = to.logStatus
        if(logStatus.value){
            if(store.getters.getRedirectUrl){
                router.push({ path:  store.getters.getRedirectUrl})
            }else{
                router.push({ path: "/"})
            }
        }
    })

    
    onMounted(()=>{
        store.commit("setRedirectUrl", router.options.history.state.back)
        router.push({query: {redirect: store.getters.getRedirectUrl} })
    })
</script>