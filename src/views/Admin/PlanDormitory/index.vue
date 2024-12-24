<script setup>
import { ref, onMounted } from 'vue'
import { getClassListApi, getCollegeListApi, listPlanDormitoryByClassNameApi, listDormitoryAreaApi,
    listBuildingByBuildingApi, listDormitoryByBuildingIdApi, getDormitoryDetailApi
 } from '@/apis/administrator'
const classData = ref([])
const total = ref(0)
const dormitoryList = ref([])
const collegeList = ref([])
const buildingList = ref([])
const thisDormitory = ref({})
const getClassListData = ref({
    page: 1,
    pageSize: 10,
    className: '',
    classCode: '',
    collegeName: '',
    grade: null,
    boyAmountStart: 0,
    boyAmountEnd: null,
    girlAmountStart: 0,
    girlAmountEnd: null,
    teacherPhoneNumber: '',
    isPlanComplete: null
})
// 现在正在分配宿舍的班级数据
const planDormitoryClass = ref({})
// 选中的班级已分配的宿舍
const selectClassPlanDormitory = ref([])
// 区域列表
const areaList = ref([])

const listPlanDormitoryByClassName = async (className) => {
    const res = await listPlanDormitoryByClassNameApi(className)
    selectClassPlanDormitory.value = res.data
}
// 获取区域列表
const listDormitoryArea = async () => {
    const res = await listDormitoryAreaApi()
    areaList.value = res.data
}
// 获取楼栋列表
const listDormitoryBuildingByArea = async (areaId) => {
    const res = await listBuildingByBuildingApi({
        areaId: areaId,
        type: planDormitoryClass.value.dormitoryType
    })
    buildingList.value = res.data
}
// 获取宿舍列表 
const listDormitoryByBuildingId = async (buildingId) => {
    const res = await listDormitoryByBuildingIdApi(buildingId)
    dormitoryList.value = res.data
}
    
const getClassList = async () => {
    const res = await getClassListApi(getClassListData.value)
    classData.value = res.data.records
    total.value = res.data.total
}
// 区域选择变化
const selectAreaOnChange = (areaName) => {
    planDormitoryClass.value.buildingId = null
    listDormitoryBuildingByArea(areaName)
}
// 获取宿舍详情
const getDormitoryDetail = async (dormitoryId) => {
    const res = await getDormitoryDetailApi(dormitoryId)
    thisDormitory.value = res.data
}
// 宿舍选择变化
const planDormitoryOnChange = () => {
    if (planDormitoryClass.value.dormitoryId == null) {
        return
    }
    getDormitoryDetail(planDormitoryClass.value.dormitoryId)
}
// 处理分页变化
const handleCurrentChange = (newPage) => {
    getClassListData.value.page = newPage;
    getClassList()
}
const handleSizeChange = (newSize) => {
    getClassListData.value.pageSize = newSize;
    getClassList()
}
// 查询按钮被点击
const queryOnHandle = () => {
    getClassList()
}

// 获取学院列表
const getCollegeList = async () => {
    const res = await getCollegeListApi()
    collegeList.value = res.data
}
const planDormitoryTypeOnChange = () => {
    planDormitoryClass.value.areaId = null
    planDormitoryClass.value.buildingId = null
    planDormitoryClass.value.dormitoryId = null
}
const planDormitoryDialogVisible = ref(false)
// 表格行点击事件
const handleRowClick = (row) => {
    planDormitoryClass.value = row
    listDormitoryArea()
    listPlanDormitoryByClassName(row.className)
    planDormitoryDialogVisible.value = true
}
const selectBuildingOnChange = (buildingId) => {
    planDormitoryClass.value.dormitoryId = null
    listDormitoryByBuildingId(buildingId)
}
onMounted(() => {
    getClassList()
    getCollegeList()
})
</script>
<template>
    <div class="plan_domitory_container">
        <div class="header">
            <span>
                分配学生宿舍
            </span>
        </div>
        <div class="content">

            <!-- 手动分配宿舍对话框 -->
            <div class="plan_dormitory_dialog">
                <el-dialog v-model="planDormitoryDialogVisible" title="分配宿舍" :close-on-click-modal="false">
                    <div class="class_info_and_plan">
                        <div class="class_info">
                            <p>班级名称:{{ planDormitoryClass.className }}</p>
                            <p>男生人数:{{ planDormitoryClass.boyAmount }}
                                <span>
                                    (待分配 {{ planDormitoryClass.boyAmount -
                                    planDormitoryClass.boyAlreadyPlanDormitoryAmount
                                    }}人)
                                </span>
                            </p>
                            <p>
                                女生人数:{{ planDormitoryClass.girlAmount }}
                                <span>
                                    (待分配{{ planDormitoryClass.girlAmount -
                                    planDormitoryClass.girlAlreadyPlanDormitoryAmount
                                    }}人)
                                </span>
                            </p>
                            <el-tag>
                                <span>该班级已分配宿舍情况如下表格</span>
                            </el-tag>
                        </div>
                        <div class="plan_form">
                            <el-form>
                                <el-form-item label="宿舍类型">
                                    <el-radio-group v-model="planDormitoryClass.dormitoryType"
                                        @change="planDormitoryTypeOnChange">
                                        <el-radio label="1">男生</el-radio>
                                        <el-radio label="2">女生</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="区域">
                                    <el-select v-model="planDormitoryClass.areaId"
                                        :placeholder="!planDormitoryClass.dormitoryType? '请先选择宿舍类型':'请选择宿舍区域'" clearable
                                        @change="selectAreaOnChange(planDormitoryClass.areaId)"
                                        :disabled="!planDormitoryClass.dormitoryType">
                                        <el-option v-for="item in areaList" :key="item.id" :label="item.areaName"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="楼栋">
                                    <el-select v-model="planDormitoryClass.buildingId"
                                        :placeholder="planDormitoryClass.areaId? '请选择楼栋':'请先选择区域'" clearable
                                        :disabled="!planDormitoryClass.areaId"
                                        @change="selectBuildingOnChange(planDormitoryClass.buildingId)">
                                        <el-option v-for="item in buildingList" :key="item.id"
                                            :label="item.buildingName" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="宿舍">
                                    <el-select v-model="planDormitoryClass.dormitoryId" clearable
                                        :placeholder="planDormitoryClass.buildingId? '请选择宿舍':'请先选择楼栋'"
                                        :disabled="!planDormitoryClass.buildingId" @change="planDormitoryOnChange()">
                                        <el-option v-for="item in dormitoryList" :key="item.id"
                                            :label="item.dormitoryNumber" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <span v-show="planDormitoryClass.dormitoryId">
                                    该宿舍总床位数:{{ thisDormitory.bedAmount }} 可分配 {{ thisDormitory.bedAmount -
                                    thisDormitory.totalPlanNumber }}人
                                </span>
                                <el-form-item label="名额">
                                    <el-input v-model="planDormitoryClass.planNumber" placeholder="请输入名额" clearable />
                                </el-form-item>
                                <el-button>添加</el-button>
                            </el-form>

                        </div>
                    </div>


                    <el-table :data="selectClassPlanDormitory" style="width: 100%">
                        <el-table-column label="宿舍类型">
                            <template #default="{ row }">
                                {{ row.dormitoryType == 1 ? '男生' : '女生' }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="areaName" label="区域" />
                        <el-table-column prop="buildingName" label="楼栋" />
                        <el-table-column prop="dormitoryNumber" label="宿舍" />
                        <el-table-column prop="planNumber" label="名额" />
                    </el-table>

                </el-dialog>
            </div>
            <div class="screen">
                <div class="option">
                    <div class="option_form">
                        <div class="form_item">
                            <span>学院名称</span>
                            <el-select v-model="getClassListData.collegeName" placeholder="请选择学院名称" clearable>
                                <el-option v-for="item in collegeList" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form_item">
                            <span>班级名称</span>
                            <el-input v-model="getClassListData.className" placeholder="请输入班级名称" clearable />
                        </div>
                        <div class="form_item">
                            <span>年级</span>
                            <el-input v-model="getClassListData.grade" style="width: 50%;" placeholder="例如2023"
                                clearable />
                        </div>
                        <div class="form_item">
                            <span>男生人数</span>
                            <el-input v-model="getClassListData.boyAmountStart" placeholder="最小值" clearable />
                            <span>-</span>
                            <el-input v-model="getClassListData.boyAmountEnd" placeholder="最大值" clearable />
                        </div>
                        <div class="form_item">
                            <span>女生人数</span>
                            <el-input v-model="getClassListData.girlAmountStart" placeholder="最小值" clearable />
                            <span>-</span>
                            <el-input v-model="getClassListData.girlAmountEnd" placeholder="最大值" clearable />
                        </div>
                        <div class="form_item">
                            <span>分配状态</span>
                            <el-select v-model="getClassListData.isPlanComplete" placeholder="请选择分配状态" clearable>
                                <el-option label="已分配完毕" value="1" />
                                <el-option label="未分配完毕" value="0" />
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="button">
                    <span>如需要根据条件筛选班级 填写对应条件即可 否则默认查看所有班级</span>
                    <el-button type="primary" @click="queryOnHandle">查询</el-button>
                </div>
            </div>
            <div class="class_table">
                <el-table :data="classData" style="width: 100%" @row-click="handleRowClick">
                    <!-- <el-table-column type="selection" :selectable="selectable" width="55" /> -->
                    <el-table-column prop="collegeName" label="学院名称" />
                    <el-table-column prop="className" label="班级名称" />
                    <el-table-column label="男生人数">
                        <template #default="{ row }">
                            共{{ row.boyAmount }} 已分配 {{ row.boyAlreadyPlanDormitoryAmount }} 未分配
                            <span>{{ row.boyAmount - row.boyAlreadyPlanDormitoryAmount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="女生人数">
                        <template #default="{ row }">
                            共{{ row.girlAmount }} 已分配 {{ row.girlAlreadyPlanDormitoryAmount }} 未分配
                            <span>{{ row.girlAmount - row.girlAlreadyPlanDormitoryAmount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否已全部分配">
                        <template #default="{ row }">
                            {{ row.boyAmount - row.boyAlreadyPlanDormitoryAmount === 0 && row.girlAmount -
                            row.girlAlreadyPlanDormitoryAmount === 0 ? '是' : '否' }}
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, sizes, next" :total="total"
                    :current-page="getClassListData.page" :page-size="getClassListData.pageSize"
                    @current-change="handleCurrentChange" @size-change="handleSizeChange" />
            </div>

        </div>


    </div>

</template>
<style scoped>

.class_info_and_plan {
    width: 100%;
    display: flex;
    justify-content: space-between;

}
.plan_form {
    /* border: 1px solid #0483d4; */
    padding-right: 5%;
    .el-button{
        color: white;
        width: 100%;
    }

}



.option_form {
    width: 100%;
    display: flex;
    /* justify-content: flex-start; */


}

.form_item {
    width: 100%;
    display: flex;
    align-items: center;


    span {
        flex: 0 0 auto;
        width: auto;
        margin: 0 10px;
    }

    .el-select {
        width: 55%;
    }



}

/* .el-input {
    width: 100px;
} */

.el-pagination {
    margin-top: 1%;
}

.plan_domitory_container {
    background: #f0f0f0;
    height: 100vh;
    /* overflow: hidden; */
    /* padding: 1px; */
    /* display: flex; */
}

.content {
    height: 100%;
    margin: 2% 5% 5% 5%;
    background: white;
}

.header {
    display: flex;
    align-items: center;
    background: #0483d4;
    height: 5%;
    width: 100%;
    /* padding: 0; */

    color: white;
    font-family: "黑体";

    span {
        margin-left: 5%;
        font-size: 1.3em;
    }
}

.class_table {
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 2%;
    border: 1px solid #f0f0f0;

    span {
        color: red;
    }
}

.screen {
    height: 15%;
    /* background: red; */
    margin-left: 2%;
    margin-right: 2%;
    padding-top: 1%;
    /* border: 1px solid #f0f0f0; */


}

.option {
    display: flex;
    padding-left: 1%;
    /* padding-right: 1%; */
    /* width: 100%; */
    height: 60%;
    border: 1px solid #f0f0f0;
    padding-top: 1%;
    font-family: "黑体";
    font-weight: 1000;

}

.button {
    display: flex;
    align-items: center;
    height: 40%;
    width: 100%;
    background: #f4f4f4;
    border: 1px solid #f0f0f0;
    justify-content: flex-end;

    span {
        margin-right: 1%;
        color: red;
    }

}

/* .el-form-item {
    margin-left: 1%;
} */
.el-button {
    background: #0483d4;
    margin-right: 1%;

}
</style>