<template>
    <header>
        <nav>
            <div class="left-nav">
                <img src="../../../assets/image/svg/logo.png" alt="">
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
                        <img src="../../../assets/image/svg/user.svg" alt="">
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
    import {ref} from 'vue'

    const showMenu = ref(false)

    function burgerClick(){
        showMenu.value= !showMenu.value
    }
</script>