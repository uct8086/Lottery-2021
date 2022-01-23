<template>
  <div class="wrapper">
    <div class="header-bar">
      <button
        class="el-button el-button--primary"
        @click="updateOriginData"
      >
        更新大乐透原始数据
      </button>
    </div>
    <div class="chart-zone">
      <div
        id="chart_1"
        class="chart-content"
      />
      <div
        id="chart_2"
        class="chart-content"
      />
      <div
        id="chart_3"
        class="chart-content"
      />
      <div
        id="chart_4"
        class="chart-content"
      />
      <div
        id="chart_5"
        class="chart-content"
      />
      <div
        id="chart_6"
        class="chart-content"
      />
      <div
        id="chart_7"
        class="chart-content"
      />
      <div
        id="chart_8"
        class="chart-content"
      />
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