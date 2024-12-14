import request from '@/utils/request'
// 登录
export const studentLoginApi = (data) => {
    return request({
        url: '/student/login',
        method: 'post',
        data
    })
}
// 学生获取可选宿舍列表
export const getPlanDormListApi = (className, gender) => {
    return request({
      url: "/student/getPlanDormitory",
      method: "get",
      params: {
        className,
        gender
      }
    })
}
// 学生选床位
export const chooseBedApi = (data) => {
    return request({
      url: "/student/chooseBed",
      method: "post",
      data
    })
}