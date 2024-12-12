<script setup>
import { getPlanDormListApi } from '@/apis/user'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
const userStore = useUserStore()
const planDormitoryList = ref([])
// 选中的床位号
const bedNumber = ref(null)
// 选中的宿舍id
const dormitoryId = ref(null)

// 生成床位范围
const generateRange = (amount) => {
    const arr = []
    for (let i = 1; i <= amount; i++) {
        arr.push(i)
    }
    return arr
}
// 选定床位被点击
const submitOnHandle = () => {
    
}
// 获取宿舍列表
const getPlanDormList = async () => {
    const res = await getPlanDormListApi(userStore.userInfo.className, userStore.userInfo.gender)
    planDormitoryList.value = res.data
}
const bedNumberOnHandle = (num, id) => {
    bedNumber.value = num
    dormitoryId.value = id
}

onMounted(() => {
    getPlanDormList()
})
</script>
<template>
    <div class="choose_bad_container">
        <el-card v-for="planDormitory in planDormitoryList" :key="planDormitory.id" shadow="never">
            <span class="domitory_name">{{ planDormitory.dormitoryName }}宿舍</span>
            <div class="bed_number_container">
                <el-button class="bed_number_btn"
                    :class="{ 'selected': bedNumber === num && dormitoryId == planDormitory.id}"
                    @click="bedNumberOnHandle(num, planDormitory.id)"
                    v-for="num in generateRange(planDormitory.planNumber)" :key="num">
                    {{ num }}
                </el-button>
            </div>
        </el-card>
        <div class="foot_btn">
            <el-button @click="submitOnHandle" :class="{'select_bin':bedNumber != null}" class="submit_btn">选定床位</el-button>
        </div>
    </div>
</template>

<style scoped>
.submit_btn {
    width: 80%;
    height: 80%;
    color: white;
    background-color: gray;
    margin-bottom: 8px;
}

.select_bin {
    background-color: rgb(197, 76, 76);
    color: white;

}

.foot_btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 7%;
    background-color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
}

.el-card {
    width: 90%;
    height: 35%;
    /* border-top: 0; */
}

.choose_bad_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    margin-bottom: 39px;
}

.domitory_name {
    font-family: "黑体";
    font-weight: bolder;
    font-size: 1.2;
    display: block;
    margin-bottom: 5px;
    text-align: center;
}

.bed_number_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}

.bed_number_btn {
    width: calc(50% - 10px);
    margin: 5px;
    box-sizing: border-box;
}

.bed_number_btn.selected {
    background-color: #fbe1e2;
    color: red;
    border-radius: solid 1px red;
}
.bed_number_btn:hover {
    background-color: #fbe1e2;
    color: red;
    border-radius: solid 1px red;
}
</style>