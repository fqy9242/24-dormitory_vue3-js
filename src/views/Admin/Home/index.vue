<script setup>
import { Expand, Avatar, Setting, Edit } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'
const userStore = useUserStore()
const router = useRouter()
// const updateDialogVisible = ref(false)
const expandOnHandle = () => {}
// const updatePasswordForm = ref({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: ''
// })
const setIcoOnHandle = () => {
    ElMessage.success("这么点功能就不做这个了。")
}
const logoutOnHandle = () => {
    userStore.clearUserInfo()
    ElMessage.success("退出登录成功！")
    router.push('/login')
}
// 修改密码确认提交
// const updatePasswordOnHandle = () => {}

const checkIsAdmin = () => {
    // 没有登陆或者登录的是学生用户
    if (userStore.userInfo.token == null || userStore.userInfo.studentNumber != null) {
        ElMessage.error("请先登录管理员账号！")
        router.push('/login')
    }
}
// const handleMenuClick = (option) => {
//     if (option === 'updatePassword') {
//       // 修改密码
//         updateDialogVisible.value = true

//     }

// }
const planDormitoryOnHandle = () => {
    router.push('/admin/planDormitory')
}
onMounted(() => {
    checkIsAdmin()
})
</script>
<template>
    <div class="containner">
        <!-- <div class="update_password_dialog">
            <el-dialog v-model="updateDialogVisible" title="修改登录密码" width="70%" destroy-on-close center>
                <el-form :model="updatePasswordForm" label-width="80px">
                    <el-form-item label="旧密码" prop="oldPassword">
                        <el-input v-model="updatePasswordForm.oldPassword" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input v-model="updatePasswordForm.newPassword" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input v-model="updatePasswordForm.confirmPassword" show-password></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center;">
                    <el-button @click="updateDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updatePasswordOnHandle">确 定</el-button>
                </div>
            </el-dialog>
        </div> -->
        <div class="header">
            <!-- <img src="@/assets/logo" alt=""> -->
            <div class="title_icon">
                <svg t="1734506258446" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5224" width="200" height="200">
                    <path
                        d="M329.9 484.1c66.6 0 122.9-51.2 122.9-117.8s-56.3-117.8-122.9-117.8c-66.6 0-122.9 51.2-122.9 117.8s51.2 117.8 122.9 117.8z"
                        p-id="5225" fill="#ffffff"></path>
                    <path
                        d="M339.9 453.4c-51.2 0-102.2-35.8-102.2-87s41-87 92.2-87 92.2 35.8 92.2 87c-5.1 51.2-46.1 87-92.2 87h10z"
                        p-id="5226" fill="#ffffff"></path>
                    <path
                        d="M759.8 279.3h-297V520H145.9V207.6h-36.4v607.8h36.4V673.1h665v142.4h102.4V432.9c5.2-87-66.5-153.6-153.5-153.6z"
                        p-id="5227" fill="#ffffff"></path>
                    <path
                        d="M759.8 310c66.6 0 128 56.3 128 122.9v357h-41V642.4H115.2v147.5h30.2V243.5h-30.2v307.2h378.3V310h266.3z"
                        p-id="5228" fill="#ffffff"></path>
                </svg>
            </div>
            <span>选床位系统-管理员后台</span>
            <div class="header_right">
                <!-- <el-dropdown>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="handleMenuClick('updatePassword')">修改密码</el-dropdown-item>
                        </el-dropdown-menu>
                    </template> -->
                    <el-icon class="expand_icon" @click="setIcoOnHandle">
                        <Expand />
                    </el-icon>
                <!-- </el-dropdown> -->
                <el-icon>
                    <Avatar />
                </el-icon>
                <el-button class="logout_btn" @click="logoutOnHandle">退出</el-button>
            </div>
        </div>
        <div class="content">
            <div class="content_title">
                <h3>我的应用</h3>
                <el-icon @click="setIcoOnHandle">
                    <Setting />
                </el-icon>
            </div>
            <div class="operator_list">
                <div class="operator" @click="planDormitoryOnHandle">
                    <el-icon>
                        <Edit />
                    </el-icon>
                    <span>分配宿舍</span>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
.operator {
    display: flex;
    flex-direction: column;
    align-content: center;

    span {
        margin-top: 1%;
        font-family: "黑体";
    }
}

.operator_list {
    margin-top: 3%;
    margin-left: 10%;
    margin-right: 10%;

    .el-icon {
        background: #e5004f;
        border: 3px solid #e5004f;
        border-radius: 50%;
        color: white;
        font-size: 50px;
    }
}

.header_right {
    /* height: 100%; */
    float: right;
    margin-right: 2%;
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 2%;
}

.containner {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: center; */
    background: #f0f0f0;
}

.header {
    background: #0483d4;
    /* height: 15%; */
    height: auto;
    border-radius: 6px 0px;

    span {
        display: block;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        margin-left: 60px;
        margin-top: -50px;
    }
}

.title_icon {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 5px;

    svg {
        width: 100%;
        height: 100%;
    }
}

.header_right .el-icon {
    color: white;
    /* height: 90%; */
    font-size: 32px;
}

.logout_btn {
    background: #0483d4;
    color: #274355;
    border: #6aadd8 2px solid;
    width: 50px;
}

.expand_icon {
    border: white 1px solid;
    border-radius: 10px;
    cursor: pointer;
}

.content {
    margin-top: 3%;
    height: 100%;
    background: white;
}

.content_title {
    border-bottom: #ece4e4 1px solid;
    /* 使子元素在两端对齐 */
    justify-content: space-between;
    /* 垂直居中 */
    align-items: center;

    display: flex;

    h3 {
        margin: 0;
        padding: 5px;
        margin-left: 10px;
    }

}

.content_title .el-icon {
    font-size: 30px;
    color: #b1c4d0;
}
</style>