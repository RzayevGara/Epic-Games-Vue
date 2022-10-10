<template>
    <div class="free-games">
        <div class="free-games-container">
            <div class="free-games_title">
                <h2>
                    <span>
                        <FreeIcon/>
                    </span>
                    Free Games
                </h2>
                <ViewMore/>
            </div>
            <ul v-if="product">
                <li v-for="item in product" :key="item.id">
                    <div class="free-games_image_container">
                        <div class="free-games_image">
                            <img :src="item.image.url"/>
                        </div>
                        <div class="free-games_box">
                            <span>free now</span>
                        </div>
                    </div>
                    <div class="free-games_text">
                        <h3>{{item.name}}</h3>
                        <p>Free Now - {{freeTime}} at 07:00 PM</p>
                    </div>
                </li>
            </ul>
            <FreeGamesSkeleton v-else/>
        </div>
    </div>
</template>

<script setup>
    import FreeIcon from '../../../assets/image/svg/freeIcon.svg'
    import ViewMore from '../../shared/button/ViewMore.vue'
    import FreeGamesSkeleton from './skeleton/FreeGamesSkeleton.vue'
    import {computed} from 'vue'
    defineProps({product: Object})

    const freeTime = computed(()=>{
        const time  = new Date()
        time.setDate(time.getDate() + 7);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        return `${monthNames[time.getMonth()]} ${time.getDate()}`
    })

</script>