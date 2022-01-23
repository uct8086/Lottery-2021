<template>
  <div class="wrapper">
    <div class="header-bar">
      <button
        class="el-button el-button--primary"
        @click="updateOriginData"
      >
        更新大乐透原始数据
      </button>
      <button
        class="el-button el-button--success"
        @click="toDetail"
      >
        返回主页
      </button>
      <div class="item-search">
        <span>前区数值：</span>
        <input
          id="day-target"
          v-model="frontValue"
          type="text"
          max="35"
          placeholder="请选择数值"
          class="el-input__inner"
          @keyup.enter="search"
        >
      </div>
      <div class="item-search">
        <span>后区数值：</span>
        <input
          id="day-target"
          v-model="backValue"
          type="text"
          max="12"
          placeholder="请选择数值"
          class="el-input__inner"
          @keyup.enter="search"
        >
      </div>
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
  .item-search{
    display: flex;
    align-items: center;
    margin: 15px 0;
    span{
      width: 100px;
    }
  }
</style>