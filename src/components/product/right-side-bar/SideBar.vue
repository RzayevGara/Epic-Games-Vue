<template>
  <aside>
    <div class="product-side">
        <div class="product-side_images">
            <img v-if="width<768" :src="item.assets[2].url"/>
            <img class="product-side_img_pc" v-else :src="item.assets[0].url"/>
        </div>

        <div class="price">
            <div>base game</div>
            <p>{{item.price.formatted_with_symbol}}</p>
        </div>
        <div class="buttons">
            <button class="buy-now">buy now</button>
            <button class="add-card">add to card</button>
        </div>
        <div class="product-detail">
            <p v-for="variant in item.variant_groups" :key="variant.id">
                {{variant.name}}
                <div>
                    <span v-for="option in variant.options" :key="option.id">
                        <span v-if="option.name==='windows'"><WindowsIcon/></span>
                        <span v-else-if="option.name==='mac'"><MacIcon/></span>
                        <span v-else>{{option.name}}</span>
                    </span>
                </div>
            </p>
        </div>
    </div>
  </aside>
</template>


<script setup>
    import WindowsIcon from '../../../assets/image/svg/Windows.svg'
    import MacIcon from '../../../assets/image/svg/MacOS.svg'
    import { ref} from 'vue';
    defineProps({item: Object})
    const width = ref()

    
    function handleResize() {
        width.value = window.innerWidth;
    }
    
    window.addEventListener('resize', handleResize);
    handleResize()
</script>