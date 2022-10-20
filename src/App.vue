<template>
  <router-view></router-view>
</template>

<script setup>
  import { useStore } from "vuex";

  const store = useStore();

  store.dispatch("checkLogStatus")
  store.dispatch("getCustomer")

</script>