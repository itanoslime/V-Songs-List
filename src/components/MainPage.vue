<template>
    <div class="topflex">
        <!--背景-->
        <img class="bg">
        <div class="main-box">
            <div class="header topflex">
                <span class="header-text">欢迎来到橘子的歌单</span>
                <div class="header-info">
                    <span style="margin-right: 10px;"><a href="">直播间</a></span>
                    <span>共收录{{ musiclist.length }}首歌</span>
                </div>
            </div>
            <div class="body">
                <el-form :model="nav" class="nav leftflex">
                    <el-form-item style="width: 50%" class="input-box">
                        <el-input v-model="nav.name" placeholder="搜索歌名" />
                    </el-form-item>
                    <el-form-item style="margin-left: 10px;">
                        <el-button type="primary" plain>随机歌曲</el-button>
                    </el-form-item>
                    <el-form-item style="margin: 0 10px;">
                        <el-switch v-model="sc" inline-prompt active-text="SC" inactive-text="SC"
                            style="--el-switch-on-color: #fee1a5; --el-switch-off-color: #cacacc"></el-switch>
                    </el-form-item>
                    <el-form-item class="form-item">
                        <el-select v-model="nav.singer" style="min-width: 60px;" placeholder="全部歌手">
                            <el-option v-for="(i, index) in FiltSinger" :key="index" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="form-item">
                        <el-select v-model="nav.lang" style="min-width: 60px;" placeholder="全部语言">
                            <el-option v-for="i in language" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="form-item">
                        <el-select v-model="nav.style" style="min-width: 60px;" placeholder="全部风格">
                            <el-option v-for="i in FiltStyle" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div>
                    <el-table :data="musiclist" height="250" style="width: 100%" class="musiclist" border fit=false>
                        <el-table-column prop="name" label="歌名" width="180" class="musiclist-text" />
                        <el-table-column prop="singer" label="歌手" width="100" />
                        <el-table-column prop="lang" label="语言" />
                        <el-table-column prop="style" label="风格" />
                        <el-table-column prop="sc" label="SC" />
                        <el-table-column prop="des" label="备注" />
                    </el-table>
                </div>
                <!-- <div class="musiclist">
                    <table class="musictable">
                        <thead>
                            <tr>
                                <td>歌名</td>
                                <td>歌手</td>
                                <td>语言</td>
                                <td>风格</td>
                                <td>SC</td>
                                <td>备注</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in musiclist">
                                <td>{{ i.name }}</td>
                                <td>{{ i.singer }}</td>
                                <td>{{ i.lang }}</td>
                                <td>{{ i.style }}</td>
                                <td>{{ i.sc }}</td>
                                <td>{{ i.des }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> -->
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { ref } from 'vue'
import musiclist from '../assets/music/musiclist'

//表单数据
const nav = reactive({
    name: '',
    singer: '',
    lang: '',
    style: '',
    sc: '',//sc数额
    des: ''
})
//语言选择
const language = ref(['中文', '英语', '日语', '韩语'])
//切换显示sc
const sc = ref(false)

//处理重复歌手
const FiltSinger = computed(() => {
    const singers = new Set(musiclist.map(i => i.singer));
    console.log(Array.from(singers));
    return Array.from(singers);
})
//处理重复风格
const FiltStyle = computed(() => {
    const style = new Set(musiclist.map(i => i.style));
    console.log(Array.from(style));
    return Array.from(style);
})

</script>

<style>
.bg {
    background-image: url('src/assets/img/新年合照2024.png');
    background-position: center;
    background-size: cover;
    background-attachment: scroll;
    background-repeat: no-repeat;
    min-width: 100%;
    min-height: 100%;
    z-index: -99;
    position: fixed;
    top: 0;
    opacity: .5;
    transition: opacity 1s linear;
}

.main-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    max-width: 100%;
    width: 1100px;
    margin: 0 10px;
}

.header {
    background-color: rgba(255, 255, 255, 0.7);
    min-height: 100px;
    padding: 20px;
    margin-top: 40px;
    border-radius: 12px;
}

.header-text {
    font-size: 2rem;
    font-weight: bold;
    color: #495057;
    margin: 25px 0;
}

.header-info {
    width: 98%;
    height: 30px;
    padding: 10px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 1px 3px 4px #0000001a;
}

@media screen and (width < 768px) {
    .header {
        display: none;
    }

    .form-item {
        margin-top: 10px;
    }

    .nav {
        flex-wrap: wrap;
    }
}

@media screen and (width >=768px) {
    .header {
        width: 95%;
    }
}

.body {
    background-color: rgba(255, 255, 255, 0.7);
    width: 95%;
    min-height: 600px;
    padding: 20px;
    margin-top: 20px;
    border-radius: 12px;
    box-shadow: 1px 3px 4px #0000001a;
}

.nav {
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 1px 3px 4px #0000001a;
    border-radius: 8px;
}

.musiclist {
    margin-top: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 1px 3px 4px #0000001a;
    border-radius: 8px;
}

.musiclist-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 180px;
}

.musictable {
    font-size: 16px;
    font-family: '微软雅黑';
}

.input-box {
    box-shadow: 1px 3px 4px #0000001a;
}

.el-form-item {
    margin-bottom: 0 !important;
}

.el-switch__core {
    width: 50px !important;
    height: 30px;
    border-radius: var(--el-border-radius-base) !important;
}

.el-switch__core::after {
    width: 14px;
    height: 14px;
    margin-top: -1px;

}

.el-switch.is-checked .el-switch__core::after {
    margin-left: -15px;
}

.el-switch__action {
    border-radius: var(--el-border-radius-base) !important;
}

.el-table__header .el-table_1_column_1,
.el-table__header .el-table_1_column_2,
.el-table__header .el-table_1_column_3,
.el-table__header .el-table_1_column_4,
.el-table__header .el-table_1_column_5,
.el-table__header .el-table_1_column_6 {
    border-right: 1px solid #d1dbe5 !important;
    color: #000;
}

.el-table__cell {
    border-right: none !important;
}

.form-item {
    margin-right: 15px;
    width: 15%;
}</style>