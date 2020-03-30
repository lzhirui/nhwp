<template>
    <div class="downlist">
        <div @click="$router.push('/downloadimg')">
            <img src="../assets/img/downlist/picAoshan@3x.png" alt="" />
            <p>万龙滑雪场</p>
        </div>
        <div @click="$router.push('/downloadimg')">
            <img src="../assets/img/downlist/picBeidahu@3x.png" alt="" />
            <p>北大湖滑雪场</p>
        </div>
        <div @click="$router.push('/downloadimg')">
            <img src="../assets/img/downlist/picAoshan@3x.png" alt="" />
            <p>鳌山滑雪场</p>
        </div>
        <div @click="$router.push('/downloadimg')">
            <img src="../assets/img/downlist/picOther@3x.png" alt="" />
            <p>其他</p>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .downlist {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        margin:4% 5%;
        div {
            width: 48.5%;
            margin-top: 2%;
            position: relative;
            img {
                width: 100%;
            }
            p {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>