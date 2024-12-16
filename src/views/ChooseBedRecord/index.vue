<script setup>
import { onMounted, ref } from 'vue'
import { getAlreadyChooseBedApi } from '@/apis/user'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const router = useRouter()
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
// 推出登录按钮被点击
const logoutOnHandle = () => {
    userStore.clearUserInfo()
    router.push({path: '/login'})

}
onMounted(() => {
    getAlreadyChooseBed()
})
</script>
<template>
    <div class="choose_bed_record_container">
        <p>学生姓名:<span>{{ userStore.userInfo.name }}</span></p>
        <p>性别:<span>{{ userStore.userInfo.gender == 1? '男': '女' }}</span></p>
        <!-- <p>就读专业:<span>{{ userStore.userInfo.studentNumber }}</span></p> -->
        <p>班级:<span>{{ userStore.userInfo.className }}</span></p>
        <p>学号:<span>{{ userStore.userInfo.studentNumber }}</span></p>
        <p>紧急联系人电话:<span>{{ userStore.userInfo.emergencyContactPhone }}</span></p>
        <p>所选床铺信息:<span>{{ dormitoryName == null || bedRange == null ? '未选择' 
        : dormitoryName + "宿舍" + bedRange + "床" }}</span></p>
        <p>选择时间:<span>{{ chooseTime == null ? '未选择' : chooseTime }}</span></p>
        <el-button class="logout_btn" @click="logoutOnHandle">退出</el-button>
    </div>

</template>
<style scoped>
.choose_bed_record_container {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    height: 100vh;
    background-color: #f5f7fa;
    padding: 10px;
    font-family: "黑体";
}
span {
    margin-left: 20px;
    color:  red;
    font-weight: 500;
    font-size: 1em;
    float: right;
}
p {
    border-bottom: 1px solid grey;
    padding-bottom: 10px;
}
.logout_btn {
    margin-top: 20px;
    /* background-color: #ffffff; */
    border: #d7d7d7 solid 1px;
}
</style>