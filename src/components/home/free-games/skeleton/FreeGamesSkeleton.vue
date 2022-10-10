<template>
    <ul>
        <li v-for="item in Array(2).fill()" :key="item">
            <img class="free-games-skeleton_image" src="../../../../assets/image/png/free-games.png"/>
            <h3 class="free-games-skeleton_title"></h3>
            <p class="free-games-skeleton_date"></p>
        </li>        
    </ul>
</template>