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
                    <button class="sign-button">
                        <UserIcon/>
                        sign in</button>
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
    import UserIcon from '../../../assets/image/svg/user.svg'

    const showMenu = ref(false)

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