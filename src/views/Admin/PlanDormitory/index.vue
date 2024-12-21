<script setup>
import { ref, onMounted } from 'vue'
import { getClassListApi, getCollegeListApi } from '@/apis/administrator'
const classData = ref([])
const total = ref(0)
const collegeList = ref([])
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
const getClassList = async () => {
    const res = await getClassListApi(getClassListData.value)
    classData.value = res.data.records
    total.value = res.data.total
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
            <div class="screen">
                <div class="option">
                    <div class="option_form">
                        <div class="form_item">
                            <span>学院名称</span>
                            <el-select v-model="getClassListData.collegeName" placeholder="请选择学院名称" clearable>
                                <el-option
                                    v-for="item in collegeList"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form_item">
                            <span>班级名称</span>
                            <el-input v-model="getClassListData.className" placeholder="请输入班级名称" clearable />
                        </div>
                        <div class="form_item">
                            <span>年级</span>
                            <el-input v-model="getClassListData.grade" style="width: 50%;" placeholder="例如2023" clearable />
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
                                <el-option label="已分配完毕" value = "1"/>
                                <el-option label="未分配完毕" value = "0"/>
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
                <el-table :data="classData" style="width: 100%">
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
                    <el-table-column  label="是否已全部分配">
                        <template #default="{ row }">
                            {{ row.boyAmount - row.boyAlreadyPlanDormitoryAmount === 0 && row.girlAmount - row.girlAlreadyPlanDormitoryAmount === 0 ? '是' : '否' }}
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
    overflow: hidden;
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