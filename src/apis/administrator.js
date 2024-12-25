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


// 根据班级查询已分配的宿舍
export const listPlanDormitoryByClassNameApi =  (className)=> {
  return request({
    url: "/administrator/listPlanDormitoryByClassName",
    params: {
      className
    }
  })
}

export const listDormitoryAreaApi =  () => {
  return request({
    url: "/administrator/listDormitoryArea",
  })
}

// 根据楼栋信息查询楼栋
export const listBuildingByBuildingApi = (data) => {
  return request({
    url: "/administrator/listBuildingByBuilding",
    method: "post",
    data,
  });
}
// 根据楼栋id获取宿舍
export const listDormitoryByBuildingIdApi = (buildingId) => {
  return request({
    url: "/administrator/listDormitoryByBuilding",
    params: {
      buildingId
    }
  })
}

// 根据宿舍id获取宿舍详情
export const getDormitoryDetailApi = (dormitoryId) => {
  return request({
    url: `/administrator/getDormitoryById/${dormitoryId}`,
  })
}


// 手动分配宿舍
export const planDormitoryApi = (data) => {
  return request({
    url: "/administrator/planDormitory",
    method: "post",
    data
  })
}