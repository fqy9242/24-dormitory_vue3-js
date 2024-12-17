import request from '@/utils/request'
// 管理员登录
export const administratorLoginApi = (data) => {
    return request({
        url: '/administrator/login',
        method: 'post',
        data
    })
}