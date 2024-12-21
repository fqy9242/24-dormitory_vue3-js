import request from '@/utils/request'
// 管理员登录
export const administratorLoginApi = (data) => {
    return request({
        url: '/administrator/login',
        method: 'post',
        data
    })
}
// 获取班级列表
export const getClassListApi = (data) => {
    return request({
      url: "/administrator/listClass",
      method: "post",
      data
    })
}
// 获取学院列表
export const getCollegeListApi = () => {
    return request({
      url: "/administrator/listCollegeName",
    })
}