<template>
  <div class="wrapper">
    <div class="header-bar">
      <van-button
        icon="down"
        type="primary"
        size="small"
        @click="updateOriginData"
      >
        更新
      </van-button>
      <van-button
        icon="bar-chart-o"
        type="success"
        size="small"
        @click="toDetail"
      >
        图表
      </van-button>
      <van-button
        icon="coupon-o"
        type="success"
        size="small"
        @click="getInfo"
      >
        信息摘要
      </van-button>
    </div>
    <div class="form-zone">
      <van-field
        v-model="formObj.timeZone"
        is-link
        readonly
        name="picker"
        label="区间"
        placeholder="点击选择时间区间"
        @click="showPicker = true"
      />
      <van-radio-group v-model="formObj.type" direction="horizontal" @change="requestData">
        <van-radio name="1">星期一</van-radio>
        <van-radio name="3">星期三</van-radio>
        <van-radio name="6">星期六</van-radio>
        <van-radio name="0">全部</van-radio>
      </van-radio-group>
      <van-popup
        :show="showPicker"
        position="bottom"
      >
        <van-picker
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </div>
    <van-tabs :active="activeName" @change="tabChange">
      <van-tab title="基本" name="a">
        <van-list
          :loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
      <van-tab title="柱状图" name="b" class="chart-zone">
        <div
          id="chart_1"
          class="chart-content"
        />
        <div
          id="chart_2"
          class="chart-content"
        />
      </van-tab>
      <van-tab title="圆点图" name="c" class="chart-zone">
        <div
          id="chart_3"
          class="chart-content"
        />
        <div
          id="chart_4"
          class="chart-content"
        />
      </van-tab>
      <van-tab title="平行坐标" name="d" class="chart-zone">
        <div
          id="chart_5"
          class="chart-content-parallel"
        />
      </van-tab>
    </van-tabs>
    <van-popup v-if="totalInfo" :show="showInfo" position="bottom"
               :style="{ height: '15%', padding: '15px' }" @click-overlay="showInfo = false"
    >
      <div>共{{ totalInfo.total }}条记录</div>
      <div>最新日期：{{ totalInfo.latestDay }}</div>
      <div>{{ totalInfo.latest }}</div>
    </van-popup>
  </div>
</template>
<script src="./script.js"></script>
<style lang="less">
  .chart-content {
    width: 100%;
    height: 300px;
  }

  .chart-content-parallel {
    width: 100%;
    height: 800px;
  }

  .header-bar {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  .van-tabs__nav {
    background-color: #ecf5ff !important;
  }
  .van-tab {
    color: #07c160 !important;
  }
  .van-radio-group--horizontal, .van-checkbox-group--horizontal {
    padding: 10px;
    display: flex;
    justify-content: space-around;
  }
</style>