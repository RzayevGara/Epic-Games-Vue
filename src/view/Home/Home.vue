<template>
    <section id="home">
        <div class="home-container">
        </div>
    </section>
</template>


<script setup>
    import {ref, inject} from 'vue'
  
  
  const myProducts = ref([])
  const commerce = inject("commerce");


  const fetchProducts = () => {
    commerce.products.list({
        category_slug: 'new-release',
    })
    .then((products) => {
      myProducts.value = products.data
      console.log(myProducts.value)
    })
    .catch((error) => {
      console.log('There is an error fetching products', error);
    });
  }
  const fetchProductsMost = () => {
    commerce.products.list({
        category_slug: 'top-sellers',
    })
    .then((products) => {
      myProducts.value = products.data
      console.log(myProducts.value)
    })
    .catch((error) => {
      console.log('There is an error fetching products', error);
    });
  }
  fetchProducts()
  fetchProductsMost()
</script>