<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { updateLoginPasswordApi } from '@/apis/user'
const route = useRouter()
const updatePasswordDialogVisible = ref(false)
const loginForm = ref({
    studentNumber: '',
    password: ''
})
const updatePasswordForm = ref({
    studentNumber: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const updatePasswordFormRef = ref()
const updatePasswordRules = {
    studentNumber: [
        { required: true, message: '请输入学号', trigger: 'blur' },
        { pattern: /^[0-9]{13}$/, message: '学号格式不正确', trigger: 'blur' }
    ],
    oldPassword: [
        { required: true, message: '请输入旧密码', trigger: 'blur' }
    ],
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入新密码', trigger: 'blur' },
        { validator: (rule, value, callback) => {
            if (value !== updatePasswordForm.value.newPassword) {
                callback(new Error('两次输入密码不一致'))
            } else {
                callback()
            }
        }, trigger: 'blur' }
    ]
}
//点击回车键登录
const keyDown = (e) => {
    if (e.keyCode == 13 || e.keyCode == 100) {
        loginOnHandle()
    }
}


// 修改密码被点击
const updatePasswordOnHandle = () => {
    updatePasswordDialogVisible.value = true
}
const userStore = useUserStore()
// 登录类型 1学生登录 2管理员登录
const loginType = ref(1)

const loginOnHandle = () => {
    // 表单校验通过，调用登录
    loginFormRef.value.validate( async(valid) => {
        if (valid) {
            const formData = new FormData()
            formData.append('password', loginForm.value.password)
            if (loginType.value == 1) {
                // 学生登录
                if (!/^[0-9]{13}$/.test(loginForm.value.studentNumber)) {
                    ElMessage.error('学号格式不正确')
                    return
                }
                formData.append('studentNumber', loginForm.value.studentNumber)
                const res  = await userStore.getUserInfo(loginType.value, formData)
                route.push({ path: '/' })
                ElMessage.success('登录成功')

            } else {
                // 管理员登录
                formData.append('username', loginForm.value.studentNumber)
                await userStore.getUserInfo(loginType.value, formData)
                route.push({ path: '/admin' })
                ElMessage.success('登录成功')
            }
        }
    })

}
// 修改密码表单确认被点击
const updatePasswordOnSubmit =  () => {
    updatePasswordFormRef.value.validate(async(valid) => {
        if (valid) {
            const res = await updateLoginPasswordApi({
                studentNumber: updatePasswordForm.value.studentNumber,
                oldPassword: updatePasswordForm.value.oldPassword,
                newPassword: updatePasswordForm.value.newPassword
            })
            ElMessage.success('修改成功')
            updatePasswordForm.value = {
                studentNumber: '',
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
            updatePasswordDialogVisible.value = false
        } //else {
            //ElMessage.error('请检查输入是否正确')
        //}
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
onMounted(() => {
    //绑定监听事件
    window.addEventListener('keydown', keyDown)
})

onUnmounted(() => {
    //销毁事件
    window.removeEventListener('keydown', keyDown, false)
});
</script>
<template>
    <div class="login-container">
        <el-card class="login-card">
            <div class="login_header">
                <h2>登录</h2>
                <p>欢迎使用学生床位预定管理系统</p>
            </div>
            <div class="update_password">
                <el-dialog title="学生用户修改密码" v-model="updatePasswordDialogVisible" width="80%">
                    <el-form :model="updatePasswordForm" ref="updatePasswordFormRef" :rules="updatePasswordRules">
                        <el-form-item prop="studentNumber">
                            <el-input v-model="updatePasswordForm.studentNumber" placeholder="请输入学号" />
                        </el-form-item>
                        <el-form-item prop="oldPassword">
                            <el-input type="password" v-model="updatePasswordForm.oldPassword" placeholder="请输入旧密码"
                                showPassword />
                        </el-form-item>
                        <el-form-item prop="newPassword">
                            <el-input type="password" v-model="updatePasswordForm.newPassword" placeholder="请输入新密码"
                                showPassword />
                        </el-form-item>
                        <el-form-item prop="confirmPassword">
                            <el-input type="password" v-model="updatePasswordForm.confirmPassword"
                                placeholder="请再次输入新密码" showPassword />
                        </el-form-item>
                        <el-button type="primary" @click="updatePasswordOnSubmit">确定</el-button>
                    </el-form>
                </el-dialog>
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
                <span v-show="loginType == 1" style="float: right;cursor: pointer;"
                    @click="updatePasswordOnHandle">修改密码</span>
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