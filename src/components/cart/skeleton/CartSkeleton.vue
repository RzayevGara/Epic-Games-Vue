<template>
  <ul>
    <li v-for="item in new Array(4).fill()" :key="item">
      <div class="list-container">
        <div class="skeleton-item-detail">
            <img src="../../../assets/image/png/skeleton-img.png" alt="image" />
            <div>
                <p></p>
                <h2 class="skeleton-item-name"></h2>
            </div>
        </div>
        <div class="skeleton-item-price">
          <p class="skeleton-price"></p>
          <p class="skeleton-remove-item"></p>
        </div>
      </div>
    </li>
  </ul>
</template>