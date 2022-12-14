<template>
    <div class="main-header">
        <div v-if="showSearchBar" @click="closeSearchBar" class="search-black"></div>
        <div class="main-header-container">
            <div class="main-header_search">
                <SearchIcon @click="searchClick" class="mobile-search"/>
                <form v-show="showSearchBar || width>=1024" class="search-box">
                    <SearchIcon/>
                    <input v-model="inputValue" type="text" placeholder="Search store" @focus="togglePicker" ref="inputDOM">
                    <xIcon @click="closeSearchBar" class="close-icon"/>
                </form>
                <ul v-if="searchQuery?.length>0 && showSearchBar">
                    <li v-for="item in searchQuery" :key="item.id" @click="removePicker">
                        <router-link :to="`/p/${item.permalink}`">
                            <img :src="item.image.url" alt="images"/>
                            <p>{{item.name}}</p>
                        </router-link>
                    </li>
                </ul>
                <ul v-if="searchQuery?.length===0 && showSearchBar">
                    <li v-for="item in new Array(4).fill()" :key="item" class="search-skeleton-list">
                        <a>
                            <img src="../../../assets/image/png/skeleton-img.png" alt="images"/>
                            <p></p>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="main-header-menu">
                <ul class="desktop-list_menu">
                    <li><router-link  exactActiveClass="active-list" :to="{name: 'HomePage'}">Discovery</router-link></li>
                    <li><router-link @click="browseClick"  exactActiveClass="active-list" :to="{name: 'BrowsePage', query: {sortBy: 'created_at', sortDir: 'desc', page: 1}}">Browse</router-link></li>
                    <li><router-link :to="{name: ''}">News</router-link></li>
                </ul>
                <button @click="openMenu">
                    {{activePath==='/browse'?'Browse':'Discovery'}}
                    <ArrowIcon :class="[showMenu && 'svg-active']"/>
                </button>
                <div v-if="showMenu" class="bottom-menu">
                    <ul>
                        <li class="active-list"><router-link exactActiveClass="active-list" :to="{name: 'HomePage'}">Discovery</router-link></li>
                        <li @click="browseClick" class="active-list"><router-link exactActiveClass="active-list" :to="{name: 'BrowsePage', query: {sortBy: 'created_at', sortDir: 'desc', page: 1}}">Browse</router-link></li>
                        <li class="active-list"><router-link :to="{name: ''}">News</router-link></li>
                    </ul>
                </div>
            </div>
            <div class="basket-icon">
                <router-link to="/cart"  class="cart-text" exactActiveClass="active-list">
                    <v-badge :content="store.getters.getCartItemCount" color="white" inline>
                        <p>Cart</p>
                    </v-badge>
                </router-link>
                <router-link to="/cart" class="cart-icon">
                    <v-badge :content="store.getters.getCartItemCount" color="white" >
                        <v-icon icon="mdi-cart-outline" color="grey"></v-icon>
                    </v-badge>
                </router-link>
            </div>
        </div>
    </div>
    <div v-if="showMenu" @click="closeMenu" class="bottom-menu_black"></div>
</template>

<script setup>
    import SearchIcon from '../../../assets/image/svg/search-icon.svg'
    import ArrowIcon from '../../../assets/image/svg/arrow-up.svg'
    import xIcon from '../../../assets/image/svg/x-symbol.svg'
    import BasketIcon from '../../../assets/image/svg/basket-icon.svg'
    import {ref,watch} from 'vue'
    import { useRoute } from 'vue-router'
    import {useStore} from 'vuex'
    import debounce from "lodash/debounce"
    const store = useStore()
    const route = useRoute()
    const inputValue = ref()

    const inputDOM = ref(null)

    const showSearchBar = ref(false)

    const searchQuery = ref(store.getters.getSearch)

    function togglePicker(){
        showSearchBar.value = true
    }
    function removePicker(){
        showSearchBar.value = false
    }

    watch(store.state.category, (to)=>{
        searchQuery.value = to.search
    })

    function searchClick(){
        showSearchBar.value = !showSearchBar.value
        setTimeout(function () { 
            inputDOM.value.focus()
        }, 0);
    }
    
    function closeSearchBar(){
        showSearchBar.value = false
    }

    const searchDebounce = debounce(function(data){
        if(data===""){
            store.commit("setSearch", null);
        }else{
            store.dispatch("fetchSearch", data)
        }
    }, 1000)

    watch(inputValue, searchDebounce)

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

    function browseClick(){
        store.dispatch('fetchBrowse',{
            category_slug: 'browse',
            limit: 20,
            page: 1,
            sortBy: "created_at",
            sortDirection: "desc",
        })
        store.commit("setFilterRoute", [])
    }

    const width = ref()

    
    function handleResize() {
        width.value = window.innerWidth;
    }

    window.addEventListener('resize', handleResize);
    handleResize()
</script>