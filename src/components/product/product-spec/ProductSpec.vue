<template>
  <div class="product-spec">
    <h4>Specification</h4>
    <div class="product-spec_container">
        <p class="spec-title">windows</p>
        <div class="pc-spec">
            <div class="spec">
                <p class="title">Minimum</p>
                <p class="title">OS
                    <span>64-bit Windows 7, 64-bit Windows 8 (8.1) or 64-bit Windows 10</span>
                </p>
                <p class="title">CPU
                    <span>Intel CPU Core i5-2500K 3.3GHz / AMD CPU Phenom II X4 940</span>
                </p>
                <p class="title">GPU
                    <span>Nvidia GPU GeForce GTX 660 / AMD GPU Radeon HD 7870</span>
                </p>
                <p class="title">Memory
                    <span>6 GB</span>
                </p>
                <p class="title">Storage
                    <span>77GB</span>
                </p>
            </div>
            <div class="spec">
                <p class="title">Recommended</p>
                <p class="title">OS
                    <span>64-bit Windows 7, 64-bit Windows 8 (8.1) or 64-bit Windows 10</span>
                </p>
                <p class="title">CPU
                    <span>Intel CPU Core i7 3770 3.4 GHz / AMD CPU AMD FX-8350 4 GHz</span>
                </p>
                <p class="title">GPU
                    <span>Nvidia GPU GeForce GTX 770 / AMD GPU Radeon R9 290</span>
                </p>
                <p class="title">Memory
                    <span>8 GB</span>
                </p>
                <p class="title">Storage
                    <span>77GB</span>
                </p>
            </div>
            
        </div>
        <div class="lang-support">
            <p>Languages Supported</p>
            <ul>
                <li>Audio: English, French, German, Japanese, Polish, Russian, Portuguese - Brazil,</li>
                <li>Text: English, Italian, Spanish - Spain, French, German, Arabic, Czech, Japanese, Chinese - Simplified, Chinese - Traditional, Hungarian, Korean, Polish, Portuguese - Brazil, Russian, Turkish</li>
            </ul>
        </div>
        <div class="desc">
            <p class="desc-text">{{item.replace(/<[^>]*>?/gm, '')}}</p>
            <p class="privacy">Privacy Policy</p>
        </div>
    </div>
  </div>
</template>

<script setup>
    defineProps({item: String})
</script>