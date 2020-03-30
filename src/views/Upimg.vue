<template>
    <div id="upimg">
        <Top titlename="上传图片"></Top>
        <div>
            <div @click="$router.push('/map')" class="condition">
                <p>位置选择</p>
                <img src="../assets/img/you.svg" />
            </div>
            <div class="condition group_item">
                <div class="label_item">日期选择：</div>
                <div class="content_item"  onfocus="this.blur();" @click="birthdayClick">
                    <input type="text" readonly autocomplete="off"  v-model="birthday" placeholder="请选择生日" style="width: 75px"/>
                    <img src="../assets/img/you.svg" />
                </div>
            </div>
            <div class="bgcolor"></div>
            <div class="img">
                <div v-for="(item, index) in imgList" :key="index" class="imgContent" @click="showBigImg(index)">
                    <img :src="item.src" alt="">
                </div>
                <div class="imgButton">
                    <img src="../assets/img/upimg/iconChoose@3x.png">
                    <p>添加图片</p>
                    <input @change="fileChange()" type="file" ref="file" accept="image/png, image/jpeg" multiple />
                </div>
            </div>
            <div class="upImg">我要上传</div>
        </div>
        <div v-show="bigImgTyle" class="alertBigImg">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for= "(item,index) in bugImgData" :key="index">
                        <img :src="item.src" alt="" style="width: 100%" />
                    </div>
                </div>
            </div>
            <div class="topFun">
                <img src="../assets/img/upimg/iconClose@3x.png" @click="closeBigImg" alt="">
                <div class="delete" @click="deleteImg">
                    <img src="../assets/img/upimg/iconDelete@3x.png" alt="">
                    <span>删除</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Top from '../components/top'
    import { format } from 'date-fns'
    export default {
        name: 'upimg',
        data() {
            return {
                imgList: [],
                bigImgTyle: false,
                listIndex: 0,
                bugImgData: [],
                selectTime:'',
                mySwiper:'',
                birthday: format(new Date(), 'yyyy-MM-dd')
            }
        },
        components:{
            Top
        },
        methods: {
            birthdayClick(){//生日
                this.$picker.show({
                    type:'datePicker',
                    date:format(new Date(), 'yyyy-MM-dd'),
                    endTime:'2033-01-01',//截至时间
                    startTime:'2000-01-01',//开始时间
                    onOk:(date)=>{
                        this.birthday=date;    // birthday就是所需字段，在data 里定义下
                    }
                })
            },
            deleteImg() {
                console.log(this.listIndex)
            },
            fileChange() {
                let myfile = this.$refs.file
                for(let i = 0 ; i < myfile.files.length ; i++) {
                    this.imgListDataFunc(myfile.files[i])
                }
                console.log(this.imgList)
            },
            imgListDataFunc(file) {
                let _this = this;
                let reader = new FileReader();
                reader.readAsDataURL(file); // 这里是最关键的一步，转换就在这里
                reader.onloadend = function () {
                    _this.imgList.push({src: this.result})
                }
            },
            closeBigImg() {
                this.bigImgTyle = false
                this.bugImgData = []
                this.listIndex = 0
            },
            showBigImg(index) {
                this.bugImgData = this.imgList
                this.listIndex = index
                this.bigImgTyle = true
            },
            log (str1, str2 = '') {
                console.log(str1, str2)
            },
            change (value) {
                console.log('change', value)
            },
            onConfirm (val) {
                console.log('on-confirm arg', val)
                console.log('current value', this.value1)
            }
        }
    }
</script>
<style lang="less" scoped>
    .content_item {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    #upimg {
        position: absolute;
        width: 100%;
        height: 100%;
        max-width: 500px;
    }
    .condition {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0,0,0,0.25);
        padding: 12px 15px;
        img {
            width: 15px;
        }
    }
    .bgcolor {
        background: #fafafa;
        width: 100%;
        height: 20px;
    }
    .img {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: calc(100% - 30px);
        margin-left: 15px;
        flex-wrap: wrap;
        padding-top: 1%;
        padding-bottom: 60px;
        div {
            margin: 2% 1%;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            overflow: hidden;
            width: 31%;
        }
        .imgContent {
            width: 31%;
            height: 130px;
            background: rgb(227,227,227);
            padding-bottom: 3%;
            display: block;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
            }
        }
        .imgButton {
            width: 31%;
            height: 130px;
            background: rgb(227,227,227);
            padding-bottom: 3%;
            display: block;
            position: relative;
            img {
                width: 60%;
                margin: 5% 20% 0 20%;
            }
            p {
                text-align: center;
                color: rgb(155,155,155);
                font-size: 13px;
            }
            input {
                opacity: 0;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }
    .upImg {
		max-width: 470px;
        width: calc(100% - 30px);
        margin-left: 15px;
        background: rgb(74,144,226);
        color: #fff;
        height: 35px;
        border-radius: 20px;
        position: fixed;
        bottom: 20px;
        border: 0;
		text-align: center;
		line-height: 35px;
    }
    .alertBigImg {
        position: absolute;
        left: 0;
        top: 0;
        background: #000;
        width: 100%;
        height: 100%;
        max-width: 500px;
        .topFun {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 3% 4%;
            position: absolute;
            left: 0;
            top: 0;
            width: 94%;
            img {
                width: 22px;
                height: 22px;
            }
            .delete {
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                span {
                    margin-left: 10px;
                }
            }
        }
        .bigImgContent {
            display: flex;
            width: 100%;
            height: 80%;
            margin-top: 15%;
            align-items: center;
            justify-content: center;
            .vux-slider {
                width: 100%;
            }
            .vux-swiper-item {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            img {
                width: 100%;
                display: inline;
            }
        }
    }
</style>