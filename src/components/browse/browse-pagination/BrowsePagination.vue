<template>
    <div v-if="meta" class="browse-pagination">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" class="d-flex justify-center align-center">
                    <v-container class="max-width">
                        <v-pagination
                        v-model="page"
                        class="my-4"
                        :length="meta?.total_pages"
                        active-color="white"
                        color="grey"
                        size="small"
                        total-visible="6"
                        @update:modelValue="updatePage"
                        ></v-pagination>
                    </v-container>
                </v-col>
            </v-row>
    </v-container>
    </div>
</template>

<script setup>
    import {useRouter, useRoute} from 'vue-router'
    import {ref, inject} from 'vue'    
    defineProps({ meta: Object})
    const router = useRouter()
    const route = useRoute()
    const page = ref(Number(route.query.page) || 1)
    const fetchSort = inject('fetch')

    function updatePage(){
        let query =JSON.parse(JSON.stringify(route.query)) ;
        query.page = page.value
        router.replace({query})
        .then(()=>{
            fetchSort() 
        })
    }
</script>