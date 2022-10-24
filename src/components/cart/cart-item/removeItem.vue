<template>
  <button @click="deleteFromCart(item.id)" :class="loading?'remove-item remove-item-active':'remove-item'">
    <span v-if="!loading"> Remove </span>
    <div v-if="loading" class="delete-item-loading">
      <v-progress-circular
        color="white"
        indeterminate
        :size="15"
        :width="1.5"
      ></v-progress-circular>
    </div>
  </button>
</template>

<script setup>
    import {useStore} from 'vuex'
    import {ref, inject} from 'vue'

    const store = useStore()

    const commerce = inject('commerce')

    defineProps({item: Object})

    const loading = ref(false)    


    function deleteFromCart(id){
        loading.value = true
        commerce.cart.remove(id)
        .then((cart) => {
            store.commit("setCartCount", cart.total_unique_items)
            store.commit("setCartDetail", cart)
            loading.value = false
        })
    }
</script>