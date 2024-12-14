<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const route = useRouter()
const loginForm = ref({
    studentNumber: '',
    password: ''
})
const userStore = useUserStore()
// 登录类型 1学生登录 2管理员登录
const loginType = ref(1)

const loginOnHandle = () => {
    // 表单校验通过，调用登录
    loginFormRef.value.validate( async(valid) => {
        if (valid) {
            const formData = new FormData()
            if (loginType.value == 1) {
                // 学生登录
                formData.append('studentNumber', loginForm.value.studentNumber)

            } else {
                // 管理员登录
                formData.append('username', loginForm.value.studentNumber)
            }

            formData.append('password', loginForm.value.password)
            await userStore.getUserInfo(loginType.value, formData)
            ElMessage.success('登录成功')
            route.push({path:'/'})
        }
    })

}
const loginFormRef = ref()
const loginRules = {
    studentNumber: [
        { required: true, message: '请输入学号', trigger: 'blur' },
        // { pattern: /^[0-9]{13}$/, message: '学号格式不正确', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不会少于6位', trigger: 'blur' }
    ]
}
</script>
<template>
    <div class="login-container">
        <el-card class="login-card">
            <div class="login_header">
                <h2>登录</h2>
                <p>欢迎使用学生床位预定管理系统</p>
            </div>
            <div class="login_type">
                <el-radio-group v-model="loginType" style="margin-bottom: 20px;">
                    <el-radio :value="1">学生登录</el-radio>
                    <el-radio :value="2">管理员登录</el-radio>
                </el-radio-group>
            </div>
            <el-form :model="loginForm" ref="loginFormRef" :rules="loginRules">
                <el-form-item prop="studentNumber">
                    <el-input :prefix-icon="User" v-model="loginForm.studentNumber" placeholder="请输入学号或管理员账号" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" placeholder="请输入密码" />
                </el-form-item>
                <el-button class="login_btn" type="primary" @click="loginOnHandle" style="width: 100%;">登录</el-button>
            </el-form>
            <!-- 
            <a href="#" style="float: right; margin-top: 10px;">忘记密码？</a>
            <a href="#" style="float: left; margin-top: 10px;">点击注册</a> -->
        </el-card>
    </div>
</template>
<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    align-items: center;
    height: 100vh;
    background-color: #f5f7fa;
    /* background-color: red; */
    padding-top: 20px; /* 添加顶部内边距 */
}

.login-card {
    width: 100%; 
    /* max-width: 400px;  */
    padding: 20px;
    box-sizing: border-box;
    flex-grow: 1; 
    display: flex;
    flex-direction: column;
    /* background-color: red; */
    .el-input {
            height: 50px;
            width: 100%;
        }
}
.login_btn {
    height: 50px;
    margin-top: 20px;
}

.login_type {
    margin-top: 50px;
}
.login_header {
    h2 {
        font-size: 2em;
    }
    p {
        font-size: 1em;
        color: #8c8c8c;
        font-weight: bolder;
    }
}
</style>