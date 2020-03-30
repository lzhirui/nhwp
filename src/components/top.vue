<template>
    <div id="backTop">
        <img @click="$router.back(-1)" src="../assets/img/top/cc-left.png" alt="" />
        <div>{{ titlename }}</div>
        <div class="wid40"></div>
    </div>
</template>
<script>
    export default {
        name: 'backTop',
        props:['titlename']
    }
</script>
<style lang="less" scoped>
    #backTop {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 17px;
        img {
            width: 30px;
        }
        .wid40 {
            width: 30px;
        }
    }
</style>