<template>
  <appHeader/>
  <router-view></router-view>
  <appFooter/>
</template>

<script setup>
  import appHeader from './components/layout/header/Header.vue'
  import appFooter from './components/layout/footer/Footer.vue'
</script>