<template>
  <div class="wrapper">
    <div class="form-zone">
      <van-button
        icon="revoke"
        type="success"
        size="small"
        @click="toDetail"
      >
        返回
      </van-button>
      <van-field
        v-model="frontValue"
        name="前区数值："
        label="前区数值："
        placeholder="请输入..."
        @keyup.enter="search"
      />
      <van-field
        v-model="backValue"
        name="后区数值："
        label="后区数值："
        placeholder="请输入..."
        @keyup.enter="search"
      />
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