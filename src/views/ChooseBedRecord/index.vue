<script setup>
import { onMounted, ref } from 'vue'
import { getAlreadyChooseBedApi } from '@/apis/user'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
const dormitoryName = ref('')
const bedRange = ref('')
const chooseTime = ref('')
// 获取已选床位
const getAlreadyChooseBed = async () => {
    const res = await getAlreadyChooseBedApi(userStore.userInfo.studentNumber)
    dormitoryName.value = res.data.dormitoryName
    bedRange.value = res.data.bedRange
    chooseTime.value = res.data.createTime
}
onMounted(() => {
    getAlreadyChooseBed()
})
</script>
<template>
    <div class="choose_bed_record_container">
        <p>学号:<span>{{ userStore.userInfo.studentNumber }}</span></p>
        <p>已选择宿舍:<span>{{ dormitoryName == null ? '未选择' : dormitoryName }}</span></p>
        <p>床位号:<span>{{ bedRange == null ? '未选择' : bedRange }}</span></p>
        <p>选择时间:<span>{{ chooseTime == null ? '未选择' : chooseTime }}</span></p>
    </div>

</template>
<style scoped>
.choose_bed_record_container {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    height: 100vh;
    background-color: #f5f7fa;
    padding: 20px;
    font-family: "黑体";
}
span {
    margin-left: 20px;
    color:  red;
    font-weight: 500;
    font-size: 1.3em;
}
</style>