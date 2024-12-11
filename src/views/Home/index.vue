<script setup>
import router from '@/router';
const chooseBedOnHandle = () => {
    // 路由跳转到选床位页
    router.push({name: 'ChooseBed'})
}
</script>
<template>
    <div class="guide_container">
        <h2 class="title">入学指南</h2>
        <img src="@/assets/youcaihua.jpg" class="head_img">
        <p>
            广西农业职业技术大学（Guangxi Vocational University Of
            Agriculture），坐落于广西壮族自治区的首府南宁市，是广西壮族自治区人民政府举办、广西壮族自治区农业农村厅主管的全日制公办本科层次职业学校，是国家农业农村部、教育部推介的“全国乡村振兴人才培养优质校”、广西高水平高职学校和高水平专业立项建设单位、教育部现代学徒制试点单位、广西首批高等职业教育示范性产业学院、广西现代职业教育发展示范项目区域合作（国际合作）试点单位。
            学校是由创办于2002年的广西大学行健文理学院、创建于1942年的广西农业职业技术学院及成立于1960年的广西壮族自治区畜牧研究所于2021年经国家教育部、广西壮族自治区人民政府批准合并转设而成。
            截至2023年11月，学校占地面积3458.13亩，设东、西两个校区（西校区占地面积964.66亩，东校区占地面积2493.47亩）；设有11个教学单位，有招生备案专业88个（四年制职业本科专业36个，二年制职业本科专业9个，高职专科专业43个）；有全日制在校生25000多人，教职工近1500人。
        </p>
        <div class="foot_btn">
            <el-button @click="chooseBedOnHandle" class="choose_bed_btn">选定床位</el-button>
            <el-button class="choose_record_btn">选定记录</el-button>
        </div>
    </div>
</template>

<style scoped>
.guide_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    background-color: #f5f7fa;
    padding: 20px;
    font-family: "黑体";
}

.title {
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
    margin-top: 20px;
}

.head_img {
    width: 100%;
    height: 20%;
}

p {
    font-weight: 500;
    font-size: 1.3em;
}

.foot_btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 7%;
    background-color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
}

.choose_bed_btn {
    background-color: #216ab6;
    color: white;
    width: 47%;
    height: 100%;
    margin-bottom: 5px;
}

.choose_record_btn {
    background-color: #f07338;
    color: white;
    width: 47%;
    height: 100%;
    margin-bottom: 5px;
}
</style>