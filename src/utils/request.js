import axios from "axios";
import { useUserStore } from "@/stores/user";
// import { useRouter } from "vue-router";
// const router = useRouter()
import router from "@/router";
// axios的基础封装
const httpInstance = axios.create({
    baseURL: '/api',
    timeout: 5000
})
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 从pinia中获取token
  const userStore = useUserStore();
  // 拼接token数据
  const token = userStore.userInfo.token;
//   console.log("Token:", token); // 添加日志检查 token
  if (token) {
    // config.headers.token = `${token}`    // 请求携带token
    config.headers.Authorization = `Bearer ${token}`; // 使用Bearer令牌格式
  }
  return config;
}, e => Promise.reject(e))


// axios响应拦截器
httpInstance.interceptors.response.use(res => {
    // 判断业务状态码
    if (res.data.code === 1) {
        return res.data;
    }
    // 操作失败
    ElMessage.error(res.data.msg? res.data.msg: '请求错误！')
    // 异步状态转换为失败
    return Promise.reject(res.data)
    
}, e => {
    //判断状态码，401为未登录 
    if (e.response.status === 401) {
        ElMessage.error('请先登录！')
        // 跳转到登录页
        router.push('/login')   
    } else {
        ElMessage.warning("请求错误！");
    }
    return Promise.reject(e);
})

export default httpInstance