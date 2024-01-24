<template>
    <div class="topflex">
        <!--背景-->
        <div :style="bgStyle" class="bg"></div>
        <div class="main-box">
            <div class="header topflex">
                <span class="header-text">欢迎来到橘子的歌单</span>
                <div class="header-info">
                    <span style="margin-right: 10px;"><a href="" style="color: orange;">直播间</a></span>
                    <span>共收录{{ musiclist.length }}首歌</span>
                </div>
            </div>
            <div class="body">
                <el-form :model="nav" class="nav leftflex">
                    <el-form-item style="width: 50%" class="input-box">
                        <el-input v-model="nav.name" placeholder="搜索歌名" @input="searchSong" clearable />
                    </el-form-item>
                    <el-form-item style="margin-left: 10px;">
                        <el-button type="primary" plain @click="RandonMusic">随机歌曲</el-button>
                    </el-form-item>
                    <el-form-item style="margin: 0 10px;">
                        <el-switch v-model="ShowSC" inline-prompt active-text="SC" inactive-text="SC"
                            style="--el-switch-on-color: #fee1a5; --el-switch-off-color: #cacacc" class="scbtn"></el-switch>
                    </el-form-item>
                    <el-form-item class="form-item">
                        <el-select v-model="nav.singer" style="min-width: 60px;" placeholder="全部歌手">
                            <el-option label="全部歌手" value="全部歌手"></el-option>
                            <el-option v-for="(i, index) in FiltSinger" :key="index" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="form-item">
                        <el-select v-model="nav.lang" style="min-width: 60px;" placeholder="全部语言">
                            <el-option label="全部语言" value="全部语言"></el-option>
                            <el-option v-for="i in language" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="form-item">
                        <el-select v-model="nav.style" style="min-width: 60px;" placeholder="全部风格">
                            <el-option label="全部风格" value="全部风格"></el-option>
                            <el-option v-for="i in FiltStyle" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div>
                    <el-table :data="searchResults" height="550" style="width: 100%" class="musiclist" border lazy
                        :row-style="{ height: '50px' }" :cell-style="setCellColor" sortable=true @row-click="CopyClick"
                        empty-text="没有这首歌！">
                        <el-table-column prop="name" label="歌名" width="240" class="musiclist-text" />
                        <el-table-column prop="singer" label="歌手" width="120" />
                        <el-table-column prop="lang" label="语言" />
                        <el-table-column prop="style" label="风格" />
                        <el-table-column prop="sc" label="SC" :cell-style="setCellColor" />
                        <el-table-column prop="des" label="备注" />
                    </el-table>
                </div>
            </div>
        </div>
        <!-- <div class="footer">Copyright © 2024</div> -->
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { ref } from 'vue'
import musiclist from '../assets/music/musiclist'
import { useClipboard } from 'vue-clipboard2'
import bgImage from '../assets/img/新年合照2024.png'
//表单数据
const nav = reactive({
    name: '',
    singer: '全部歌手',
    lang: '全部语言',
    style: '全部风格',
    sc: '',//sc数额
    des: ''
})
//语言选择
const language = ref(['中文', '英语', '日语', '韩语'])
//切换显示sc
const ShowSC = ref(false)

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
//复制文本到剪切板
const CopyClick = async (row) => {
    const text = '点歌 ' + row.name
    try {
        await navigator.clipboard.writeText(text)
        ElMessage({
            message: '复制成功 \n' + text,
            type: 'success',
        })
    } catch (err) {
        ElMessage({
            message: '复制失败',
            type: 'error',
        })
        console.log(err);
    }
}

//改变SC颜色
const setCellColor = ({ columnIndex }) => {
    if (columnIndex == 4) {
        return { color: "red" };
    } else {
        return {}
    }
}


//随机点歌
const RandonMusic = (() => {
    const listLength = musiclist.length;
    const randomIndex = Math.floor(Math.random() * listLength);
    CopyClick(musiclist[randomIndex])
})

//正则搜索
const searchResults = computed(() => {
    let results = musiclist;
    if (ShowSC.value) {
        results = results.filter(song => song.sc != 0);
    }
    if (nav.name) {
        results = results.filter(song => song.name.includes(nav.name));
    }
    if (nav.singer !== '全部歌手') {
        results = results.filter(song => song.singer === nav.singer);
    }

    if (nav.lang !== '全部语言') {
        results = results.filter(song => song.lang === nav.lang);
    }

    if (nav.style !== '全部风格') {
        results = results.filter(song => song.style === nav.style);
    }
    return results;
});

const searchSong = () => {
    const regex = new RegExp(nav.name, 'i')
    searchResults.value = nav.name
        ? musiclist.filter(song => regex.test(song.name))
        : musiclist
}

const bgStyle = computed(() => {
    let url;
    if (name.value) {
        const obj = new URL(`./assets/img/${name.value}.jpg`, import.meta.url);
        url = obj.pathname;
    } else {
        url = bgImage;
    }

    return {
        backgroundImage: `url(${url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'scroll',
        backgroundRepeat: 'no-repeat',
    };
});
</script>

<style>
.bg {
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
    line-height: 30px;
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

    .body {
        min-height: calc(100vh - 100px);
        margin: 20px 20px;
    }

    .main-box {
        max-width: 90%;
    }
}

@media screen and (width >=768px) {
    .header {
        width: 95%;
    }

    .body {
        min-height: calc(100vh - 350px);
    }

    .main-box {
        max-width: 100%;
    }
}

@media screen and (width < 439px) {
    .scbtn {
        margin-top: 10px;
    }
}

.body {
    background-color: rgba(255, 255, 255, 0.7);
    width: 95%;

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
    color: #000;
    font-family: '微软雅黑';
}

.musiclist-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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

/* .el-table__header .el-table_1_column_1,
.el-table__header .el-table_1_column_2,
.el-table__header .el-table_1_column_3,
.el-table__header .el-table_1_column_4,
.el-table__header .el-table_1_column_5,
.el-table__header .el-table_1_column_6 {
    border-right: 2px solid #808080 !important;
    color: #000;
} */

.el-table__header .el-table_1_column_1::after,
.el-table__header .el-table_1_column_2::after,
.el-table__header .el-table_1_column_3::after,
.el-table__header .el-table_1_column_4::after,
.el-table__header .el-table_1_column_5::after {
    content: "";
    position: absolute;
    right: 0;
    top: 35%;
    height: 40%;
    width: 3px;
    background-color: #c2c2c2;
    border-radius: 12px;
}

.el-table .cell {
    white-space: nowrap !important;
    font-size: 16px;
}

.el-table__cell {
    border-right: none !important;
}

.el-table tr {
    background-color: rgba(255, 255, 255, 0);
}
/**/
/*改表格背景*/
.el-table tbody tr:hover {
    /* background-color: #C2F0FF !important; */
}

.el-table th.el-table__cell {
    background-color: rgba(255, 255, 255, 0);
    padding: 10px 0 !important;
    color: #000;
    font-family: '微软雅黑';
    font-size: 16px;
    font-weight: 100;
}

.form-item {
    margin-right: 15px;
    width: 15%;
    min-width: 105px;
}

.footer {
    position: absolute;
    bottom: 5px;
}
</style>