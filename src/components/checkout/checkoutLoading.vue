<template>
  <div class="checkout-loading">
    <p>{{text}}</p>
    <v-progress-circular
      color="black"
      indeterminate
      :size="75"
      :width="7"
    ></v-progress-circular>
  </div>
</template>

<script setup>
    defineProps({text: String})
</script>