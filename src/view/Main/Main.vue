<template>
    <appHeader/>
    <main id="main">
        <appMainHeader/>
        <router-view></router-view>
    </main>
    <appFooter/>
</template>


<script setup>
    import appHeader from '../../components/layout/header/Header.vue'
    import appMainHeader from '../../components/layout/main-header/MainHeader.vue'
    import appFooter from '../../components/layout/footer/Footer.vue'
</script>