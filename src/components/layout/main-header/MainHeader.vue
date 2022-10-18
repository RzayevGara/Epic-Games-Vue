<template>
    <div class="main-header">
        <div class="main-header-container">
            <div class="search-box">
                <SearchIcon/>
                <input type="text" placeholder="Search store">
            </div>
            <div class="main-header-menu">
                <ul class="desktop-list_menu">
                    <li><router-link  exactActiveClass="active-list" :to="{name: 'HomePage'}">Discovery</router-link></li>
                    <li><router-link  exactActiveClass="active-list" :to="{name: 'BrowsePage', query: {sortBy: 'created_at', sortDir: 'desc', page: 1}}">Browse</router-link></li>
                    <li><router-link :to="{name: ''}">News</router-link></li>
                </ul>
                <button @click="openMenu">
                    {{activePath==='/browse'?'Browse':'Discovery'}}
                    <ArrowIcon :class="[showMenu && 'svg-active']"/>
                </button>
                <div v-if="showMenu" class="bottom-menu">
                    <ul>
                        <li class="active-list"><router-link exactActiveClass="active-list" :to="{name: 'HomePage'}">Discovery</router-link></li>
                        <li class="active-list"><router-link exactActiveClass="active-list" :to="{name: 'BrowsePage', query: {sortBy: 'created_at', sortDir: 'desc', page: 1}}">Browse</router-link></li>
                        <li class="active-list"><router-link :to="{name: ''}">News</router-link></li>
                    </ul>
                </div>
            </div>
            <div class="basket-icon">
                <BasketIcon/>
                <p>Cart</p>
            </div>
        </div>
    </div>
    <div v-if="showMenu" @click="closeMenu" class="bottom-menu_black"></div>
</template>

<script setup>
    import SearchIcon from '../../../assets/image/svg/search-icon.svg'
    import ArrowIcon from '../../../assets/image/svg/arrow-up.svg'
    import BasketIcon from '../../../assets/image/svg/basket-icon.svg'
    import {ref,watch} from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const activePath = ref(route.path)
    const showMenu = ref(false)
    
    function openMenu(){
        showMenu.value = !showMenu.value
    }

    watch(route, (to) =>{
        activePath.value = to.path
        showMenu.value = false
    })

    function closeMenu(){
        showMenu.value = false
    }
</script>