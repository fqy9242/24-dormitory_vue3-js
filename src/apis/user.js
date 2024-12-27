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
// 学生获取已选床位
export const getAlreadyChooseBedApi = (studentNumber) => {
  return request({
    url: "/student/getAlreadyChooseBed",
    params: {
      studentNumber
    }
  })
}
// 根据宿舍号列表获取已被选的床位
export const getOccupiedBedApi = (dormitoryIds) => {
  return request({
    url: `/student/getOccupiedBed?dormitoryIds=${dormitoryIds}`,
  })
}
// 学生用户修改登录密码
export const updateLoginPasswordApi = (data) => {
  return request({
    url: "/student/updateLoginPassword",
    method: "post",
    data
  })
}