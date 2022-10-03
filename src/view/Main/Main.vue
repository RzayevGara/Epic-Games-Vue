<template>
    <main id="main">
        <appMainHeader/>
        <router-view></router-view>
    </main>
</template>


<script setup>
    import appMainHeader from '../../components/layout/main-header/MainHeader.vue'
</script>