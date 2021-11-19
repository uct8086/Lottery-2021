<template>
  <div class="wrapper">
    <div>
      <button @click="toDetail">
        跳转到详情页
      </button>
    </div>
    <div class="chart-zone">
      <div
        id="chart-one"
        class="chart-content"
      />
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style lang="less">
.chart-content{
  width: 100%;
  height: 300px;
}
</style>