<script setup>
import { getPlanDormListApi, chooseBedApi, getAlreadyChooseBedApi, getOccupiedBedApi } from '@/apis/user'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
const userStore = useUserStore()
// 已提交的宿舍全名
const alreadyChooseBedNumber = ref(null)
// 安排的宿舍列表
const planDormitoryList = ref([])
// 已提交宿舍床位序号
const alreadyChooseBedRange = ref(null)
// 已提交的宿舍id
const alreadyChooseDormitoryId = ref(null)
const occupiedBeds = ref([])
// 选中的床位号
const bedNumber = ref(null)
// 选中的宿舍id
const dormitoryId = ref(null)
// 获取已选择床位
const getAlreadyChooseBed = async () => {
    const res = await getAlreadyChooseBedApi(userStore.userInfo.studentNumber)
    alreadyChooseBedNumber.value = res.data.dormitoryName + "宿舍" + res.data.bedRange + "号床"
    alreadyChooseBedRange.value = res.data.bedRange
    alreadyChooseDormitoryId.value = res.data.dormitoryId
}
// 根据宿舍id获取已占用床位
const getOccupiedBed = async (dormitoryIds) => {
    const res = await getOccupiedBedApi(dormitoryIds)
    occupiedBeds.value = res.data
    // console.log("已占用床位:" + res.data);
}
// 判断床位是否被占用
const isBedOccupied = (dormitoryId, bedRange) => {
    // 拼接床位号
    const bedNumber = dormitoryId + '-' + bedRange
    const dormitory = occupiedBeds.value.find(item => item.dormitoryId === dormitoryId)
    if (dormitory) {
        return dormitory.occupiedBedRange.includes(bedNumber)
    }
    return false
}
// 选床位
const chooseBed = async () => {
    const res = await chooseBedApi({
        bedRange: bedNumber.value,
        dormitoryId: dormitoryId.value,
        studentNumber: userStore.userInfo.studentNumber
    })
    ElMessage.success("提交成功！")
    // 刷新页面
    window.location.reload()
    // await getAlreadyChooseBed()
    // alreadyChooseBedNumber.value = bedNumber.value
}

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
    if (bedNumber.value == null) {
        ElMessage.error("请选择宿舍及床位")
        return
    }
    chooseBed()
}
// 获取宿舍列表
const getPlanDormList = async () => {
    const res = await getPlanDormListApi(userStore.userInfo.className, userStore.userInfo.gender)
    planDormitoryList.value = res.data
    const dormitoryIds = res.data.map(item => item.id).join(',')
    // console.log(dormitoryIds);
    await getOccupiedBed(dormitoryIds)
    // console.log("flag:" + occupiedBeds.value)
}
const bedNumberOnHandle = (num, id) => {
    bedNumber.value = num
    dormitoryId.value = id
}

onMounted(() => {
    getPlanDormList()
    getAlreadyChooseBed()
})
</script>
<template>
    <div class="choose_bad_container">
        <h3>当前已提交:<span class="already_choose_bednumebr">{{ alreadyChooseBedNumber == null ? '未提交' :
                alreadyChooseBedNumber }}</span></h3>
        <el-card v-for="planDormitory in planDormitoryList" :key="planDormitory.id" shadow="never">
            <span class="domitory_name">{{ planDormitory.dormitoryName }}宿舍</span>
            <div class="bed_number_container">
                <el-button class="bed_number_btn"
                    :class="{ 'selected': bedNumber === num && dormitoryId == planDormitory.id, 'already_occupied': isBedOccupied(planDormitory.id, num) }"
                    @click="bedNumberOnHandle(num, planDormitory.id)"
                    v-for="num in generateRange(planDormitory.bedAmount)" :key="num"
                    :disabled="isBedOccupied(planDormitory.id, num)">
                    {{ planDormitory.id == alreadyChooseDormitoryId && alreadyChooseBedRange == num ? num + '(我选的)' :
                    num }}
                </el-button>
            </div>
        </el-card>
        <div class="foot_btn">
            <el-button @click="submitOnHandle" :class="{ 'select_bin': bedNumber != null }"
                class="submit_btn">{{ alreadyChooseBedNumber != null ? "更改选定" : "选定床位" }}</el-button>
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

    .already_choose_bednumebr {
        color: red;
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
        height: auto;
        border-top: 0;
        border-bottom: 0;

    }

    .choose_bad_container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        /* height: 100vh; */
        height: 100%;
        margin-bottom: 39px;
        /* overflow-y: auto; */
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
        /* height: auto; */
    }

    .bed_number_btn {
        width: calc(50% - 10px);
        margin: 5px;
        box-sizing: border-box;
    }

    .bed_number_btn.selected {
        background-color: #fbe1e2;
        color: red;
        border: solid 1px red;
    }

    .bed_number_btn:hover {
        background-color: #fbe1e2;
        color: red;
        border: solid 1px red;
    }

    .already_occupied {
        pointer-events: none;
        background-color: rgb(197, 76, 76);
        color: white;
    }
</style>