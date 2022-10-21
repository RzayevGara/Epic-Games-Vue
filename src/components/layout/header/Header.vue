<template>
    <header>
        <nav>
            <div class="left-nav">
                <router-link to="/">
                    <img src="../../../assets/image/svg/logo.png" alt="">
                </router-link>
                <ul>
                    <li class="active-list">Store
                        <div class="border-list"></div>
                    </li>
                    <li>Faq
                        <div class="border-list"></div>
                    </li>
                    <li>Help
                        <div class="border-list"></div>
                    </li>
                    <li>Unreal Engine
                        <div class="border-list"></div>
                    </li>
                </ul>
            </div>
            <div :class="[showMenu ? 'right-nav right-nav-active' : 'right-nav']">
                <ul>
                    <li>store</li>
                    <li>faq</li>
                    <li>help</li>
                    <li>unreal engine</li>
                </ul>
                <div class="buttons">
                    <button v-if="store.getters.getLogStatus" class="user-button" @click="profileClick">
                        <div class="user-button-container">
                            <UserIcon/>
                            {{store.getters.getCustomerInfo?.firstname}}
                        </div>
                        <div v-if="width>=768" :class="showProfile?'profile-hover profile-hover-active':'profile-hover'">
                            <ul>
                                <li>account</li>
                                <li>my orders</li>
                                <li @click="logOut">sign out</li>
                            </ul>
                        </div>
                    </button>
                    <button v-else class="sign-button" @click="removeActiveBody">
                        <router-link to="/login">
                            <UserIcon/>
                            sign in
                        </router-link>
                    </button>
                    <button class="download-button">download</button>
                    <div v-if="width<768" :class="showProfile?'profile profile-active':'profile'">
                        <ul>
                            <li class="profile-title" @click="profileClick">
                                <ArrowIcon/>
                                <p>{{store.getters.getCustomerInfo?.firstname}}</p>
                            </li>
                            <li>account</li>
                            <li>my orders</li>
                            <li @click="logOut">sign out</li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul @click="burgerClick" :class="[showMenu ? 'burger burger-active' : 'burger']">
                <li class="line"></li>
                <li class="line"></li>
                <li class="line"></li>
            </ul>
        </nav>
    </header>
</template>


<script setup>
    import {ref, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import UserIcon from '../../../assets/image/svg/user.svg'
    import ArrowIcon from '../../../assets/image/svg/arrow-up.svg'
    const store = useStore()
    const router = useRouter()
    
    const showMenu = ref(false)

    const showProfile = ref(false)

    function burgerClick(){
        showMenu.value= !showMenu.value
        if(showMenu.value){
            document.getElementsByTagName('body')[0].classList.add('active-body')
        }else{
            document.getElementsByTagName('body')[0].classList.remove('active-body')
        }
        showProfile.value = false
    }

    function removeActiveBody(){
        document.getElementsByTagName('body')[0].classList.remove('active-body')
    }

    function profileClick(){
        showProfile.value = !showProfile.value
    }

    function logOut(){
        store.dispatch("logOut")
        router.go()
    }

    const width = ref()

    
    function handleResize() {
        width.value = window.innerWidth;
    }

    window.addEventListener('resize', handleResize);
    handleResize()

    watch(width, (to)=>{
        if(to>768 && showMenu.value){
            document.getElementsByTagName('body')[0].classList.remove('active-body')
            showMenu.value = false
        }
    })
</script>