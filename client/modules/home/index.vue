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
        label="区间："
        placeholder="点击选择时间区间"
        @click="showPicker = true"
      />
      <van-field
        v-model="formObj.frontValue"
        name="前区数值："
        label="前区数值："
        placeholder="请输入..."
        @keyup.enter="requestData"
      />
      <van-field
        v-model="formObj.backValue"
        name="后区数值："
        label="后区数值："
        placeholder="请输入..."
        @keyup.enter="requestData"
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
<script setup>

import { onMounted, onUnmounted, ref, reactive } from 'vue';
import { showToast } from 'vant';
import HttpHelper from "common/utils/axiosHelper.js";
import { UPDATE_ORIGIN_DATA, FETCH_TOTAL_INFO, FETCH_HOME_DETAIL } from "common/urls";
import { initBarFront, initBarBack, initPie, initParallel } from 'common/utils/renderEcharts';
import * as echarts from 'echarts';

const columns = [
    { text: '近3期', value: 3 },
    { text: '近12期', value: 12 },
    { text: '近36期', value: 36 },
    { text: '近144期', value: 144 },
    { text: '全部', value: 1000000 },
];
let instanceList = [];
const totalInfo = ref(null);
const showInfo = ref(false);
const getInfo = async() => {
    showInfo.value = true;
    totalInfo.value = await HttpHelper.axiosPost(FETCH_TOTAL_INFO);
};
const formObj = reactive({
    timeZone: '近3期',
    pageValue: 3,
    type: '0',  // 默认全部
    frontValue: '', // 前区数值
    backValue: '', // 后区数值
});
const list = ref([]);
const activeName = ref('a');
const requestData = async () => {
    const { baseList, barChartData: { front, back }, pieChartData: { pieF, pieB }, parallelList } = await HttpHelper.axiosPost(FETCH_HOME_DETAIL, formObj);
    list.value = baseList;
    if (activeName.value === 'b') {
        instanceList.push(await initBarFront('chart_1', front));
        instanceList.push(await initBarBack('chart_2', back));
    }
    if (activeName.value === 'c') {
        instanceList.push(await initPie('chart_3', pieF));
        instanceList.push(await initPie('chart_4', pieB));
    }
    if (activeName.value === 'd') {
        document.getElementById('chart_5').style.height = `${window.innerHeight - 268}px`;
        await initParallel('chart_5', parallelList);
    }
};
onMounted(async () => {
    console.log(window.innerHeight);
    await requestData();
});
onUnmounted(() => {
    for(let i = 0, len = instanceList.length;i < len;i++){
        echarts.dispose(instanceList[i]);
    }
    instanceList = [];
});

const updateOriginData = () => {
    HttpHelper.axiosPost(UPDATE_ORIGIN_DATA);
    showToast('成功触发更新！');
};

const showPicker = ref(false);

const onConfirm = (val) => {
    showPicker.value = false;
    formObj.timeZone = columns[val.selectedIndexes[0]].text;
    formObj.pageValue = columns[val.selectedIndexes[0]].value;
    requestData();
};

const loading = ref(false);
const finished = ref(false);
const onLoad = async () => {
    await requestData();
};
const tabChange = async (name) => {
    activeName.value = name;
    await requestData();
};

    
</script>
<style lang="less">
  .chart-content {
    width: 100%;
    height: 250px;
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