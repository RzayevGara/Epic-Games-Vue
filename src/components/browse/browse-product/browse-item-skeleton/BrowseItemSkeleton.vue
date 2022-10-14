<template>
    <ul>
        <li v-for="item in Array(20).fill()" :key="item">
            <div class="item-skeleton-container">
                <img src="../../../../assets/image/png/skeleton-img.png"/>
                <p class="skeleton-title"></p>
                <h3 class="skeleton-name"></h3>
                <p class="skeleton-price"></p>
            </div>
        </li>
    </ul>
</template>