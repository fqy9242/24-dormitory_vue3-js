import { defineStore } from "pinia";
import { ref } from "vue";
import { studentLoginApi } from "@/apis/user";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件
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

    //清空用户信息，也就是推出登录
    const clearUserInfo = () => {
      userInfo.value = {}
      // 清空localStorage
      localStorage.clear()
    }
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
)