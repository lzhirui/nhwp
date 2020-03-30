<template>
    <div id="select">
        <Top titlename="用户123435"></Top>
        <div @click="$router.push('/upimg')" class="goRouter one">
            <img src="../assets/img/select/iconUpload@3x.png" class="upimg" alt="" />
            <p>上传照片</p>
        </div>
        <div @click="$router.push('/orderlist')" class="goRouter tow">
            <img src="../assets/img/select/iconList@3x.png" class="listImg" alt="" />
            <p>订单列表</p>
        </div>
    </div>
</template>
<script>
    import Top from '../components/top'
    export default {
        name: 'select',
        components:{
            Top
        }
    }
</script>
<style lang="less" scoped>
    #select {
        position: relative;
        width: 100%;
        height: 100%;
        .goRouter {
            width: 150px;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            font-weight: bold;
            font-size: 17px;
            border-radius: 12px;
            img {
                width: 40%;
            }
            p {
                width: 100%;
                text-align: center;
                margin-top: -30px;
            }
        }
        .one {
            background: rgb(74, 144, 226);
            color: #ffffff;
            margin: 13% auto;
        }
        .tow {
            box-shadow: 0px 1px 4px rgb(222, 222, 222);
            margin: 0 auto;
        }
    }
</style>