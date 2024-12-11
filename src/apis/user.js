import request from '@/utils/request'
// 登录
export const studentLoginApi = (data) => {
    return request({
        url: '/student/login',
        method: 'post',
        data
    })
}