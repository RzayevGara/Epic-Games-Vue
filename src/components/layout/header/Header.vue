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
                    <button v-if="logStatus" class="user-button">
                        <div>
                            <UserIcon/>
                            {{customer.firstname}}
                        </div>
                    </button>
                    <button v-else class="sign-button">
                        <router-link to="/login">
                            <UserIcon/>
                            sign in
                        </router-link>
                    </button>
                    <button class="download-button">download</button>
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
    import UserIcon from '../../../assets/image/svg/user.svg'
    const store = useStore()
    
    const showMenu = ref(false)
    const logStatus = ref(store.getters.getLogStatus)
    const customer = ref(store.getters.getCustomerInfo)

    watch(store.state.auth, (to)=>{
        logStatus.value = to.logStatus
    })

    function burgerClick(){
        showMenu.value= !showMenu.value
        if(showMenu.value){
            document.getElementsByTagName('body')[0].classList.add('active-body')
        }else{
            document.getElementsByTagName('body')[0].classList.remove('active-body')
        }
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