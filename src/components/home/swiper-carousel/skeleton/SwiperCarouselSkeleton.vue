<template>
    <ul>
        <li v-for="item in Array(6).fill()" :key="item">
            <div class="swiper-carousel-item_container">
                <div class="swiper-carousel-skeleton_image">
                    <img src="../../../../assets/image/png/skeleton-img.png" alt="image"/>
                </div>
                <div class="swiper-carousel-skeleton_text">
                    <h3></h3>
                    <p></p>
                </div>
            </div>
        </li>
    </ul>
</template>