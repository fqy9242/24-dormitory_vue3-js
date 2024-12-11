<script setup>
import { getPlanDormListApi } from '@/apis/user'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
const userStore = useUserStore()
const planDormitoryList = ref([])
const getPlanDormList = async () => {
    const res = await getPlanDormListApi(userStore.userInfo.className, userStore.userInfo.gender)
    planDormitoryList.value = res.data
    
}

onMounted(() => {
    getPlanDormList()
})
</script>
<template>

    <div>
        <el-card v-for="planDormitory in planDormList">

            11
            <h1>{{ planDormitory.dormitoryName }}</h1>

        </el-card>
    </div>

</template>
<style scoped>
</style>