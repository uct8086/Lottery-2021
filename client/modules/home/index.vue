<template>
  <div class="wrapper">
    <div class="header-bar">
      <van-button
        icon="down"
        type="primary"
        size="small"
        @click="updateOriginData"
      />
      <button
        class="el-button el-button--success"
        @click="toDetail"
      >
        查找单个数字相关性
      </button>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style lang="less">
  .chart-content {
    width: 100%;
    height: 300px;
  }

  .header-bar {
    padding: 10px;

  }
</style>