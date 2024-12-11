import { defineStore } from "pinia";
import { ref } from "vue";
import { studentLoginApi } from "@/apis/user";
export const useUserStore = defineStore(
  "user", 
  () => {
  // 用户信息
  const userInfo = ref({});
  // 获取用户信息 也就是登录
  const getUserInfo = async (userType, formData) => {
    if (userType == 1) {
      // 学生登录
      const res = await studentLoginApi(formData);
      userInfo.value = res.data;
    } else {
      // 管理员登录
      alert("管理员登录");
    }
  }
  return{      
    userInfo,
    getUserInfo,
    }
})