<template>
    <div>
        <div class="top">
            <div>
                <button :class="selectTyle == 1 ? 'select' : ''" @click="selectButtonFunc(1)">所有照片</button>
                <button :class="selectTyle == 2 ? 'select' : ''" @click="selectButtonFunc(2)">{{myselectdate}}</button>
            </div>
            <p>共1000张</p>
        </div>
        <div class="content">
            <div @click="bigImg">
                <img src="../assets/img/downlist/picOther@3x.png" alt="" />
            </div>
            <div @click="bigImg">
                <img src="../assets/img/downlist/picOther@3x.png" alt="" />
            </div>
            <div @click="bigImg">
                <img src="../assets/img/downlist/picOther@3x.png" alt="" />
            </div>
            <div @click="bigImg">
                <img src="../assets/img/downlist/picOther@3x.png" alt="" />
            </div>
            <div @click="bigImg">
                <img src="../assets/img/downlist/picOther@3x.png" alt="" />
            </div>
        </div>
        <div v-if="dateShowType" class="date" @click="closeDate">
            <dateTools
                    :dateToolsKey="2"
                    :trainDateList="trainDateList2"
                    :trainDateFullList="trainDateFullList"
                    ref="topDateTools2"
                    @topDateEvent2="topDateFun2"
                    @changeDay="changeDay"
            ></dateTools>
        </div>
        <div v-if="show" class="showBigImg">
            <img src="../assets/img/downlist/picOther@3x.png" alt="" />
        </div>
        <div v-if="show" class="download">
            <p @click="closeDownload">x</p>
            <div>
                <img src="../assets/img/downlist/iconDownload@3x.png" alt="" />
                <span>下载高清图</span>
            </div>
        </div>
    </div>
</template>
<script>
    import dateTools from '../components/data'
    export default {
        data(){
            return {
                trainDateFullList:['20180201','20120228'],
                trainDateList2:[12,17,30],
                show:false,
                selectTyle: 1,
                dateShowType: false,
                myselectdate: '选择日期'
            }
        },
        components: {
            dateTools
        },
        methods: {
            bigImg(){
                this.show = true
            },
            topDateFun2(){

            },
            closeDownload() {
                this.show = false
            },
            selectButtonFunc(index) {
                this.selectTyle = index
                if(index == 2){
                    this.dateShowType = true
                } else {
                    this.myselectdate = '选择日期'
                    this.dateShowType = false
                }
            },
            changeDay(data) {
                console.log(data.slice(3,5))
                this.myselectdate = data.slice(0,4)+'-'+data.slice(5,6)+'-'+data.slice(7,8)
                console.log(data)
                this.
                this.$server({
                    url:'',
                    params: data
                }).then(()=>{
                    console.log(data)
                })
            },
            closeDate() {
                this.dateShowType = false
            }
        }
    }

</script>
<style scoped lang="less">
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 10px 5%;
        div {
            button {
                width: 90px;
                height: 35px;
                border: 1px solid rgb(74,144,226);
                border-radius: 20px;
                background: #fff;
                color: rgb(74,144,226);
                margin-right: 15px;
                outline: none;
            }
            button.select {
                background:rgb(74,144,226) ;
                color: #fff;
            }
        }
    }
    .content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        margin:4% 5%;
        div {
            width: 48.5%;
            margin-top: 2%;
            position: relative;
            img {
                width: 100%;
            }
        }
    }
    .date {
        position: absolute;
        top: 56px;
        background: transparent;
        width: 100%;
        height: 100%;
    }
    .showBigImg {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 100%;
        }
    }
    .download {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        p {
            width: 50px;
            height: 50px;
            color: #fff;
            font-size: 20px;
            text-align: center;
            line-height: 20px;
            margin-top: 20px;
        }
        div {
            width: 70%;
            height: 50px;
            border-radius: 25px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 15%;
            background:rgb(74,144,226) ;
            position: fixed;
            bottom: 50px;
        }
    }
</style>