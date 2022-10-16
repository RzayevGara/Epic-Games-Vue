<template>
    <div class="browse-product">
        <BrowseSort/>
        <BrowseItem :items="product?.data"/>
        <BrowsePagination :meta="product?.meta?.pagination"/>
    </div>
</template>

<script setup>
    import BrowseSort from './BrowseSort.vue'
    import BrowseItem from './BrowseItem.vue'
    import BrowsePagination from '../browse-pagination/BrowsePagination.vue'

    defineProps({ product: Object})
</script>