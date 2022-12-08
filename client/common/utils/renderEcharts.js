import { getTextNumber } from "common/utils/tool";
import { commonBarOption, commonPieOption } from 'common/utils/echartsOptions';
import * as echarts from 'echarts';

const initBarFront = async (id, data, title) => {
    const dataAxis = getTextNumber(35);
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(id));
    const barOption = commonBarOption();
    barOption.title.text = title || "";
    barOption.xAxis.data = dataAxis;
    barOption.series[0].data = data;
    // 绘制图表
    myChart.setOption(barOption);
    return myChart;
}; 

const initBarBack = async (id, data, title) => {
    const dataAxis = getTextNumber(12);
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(id));
    const barOption = commonBarOption();
    barOption.title.text = title || "";
    barOption.xAxis.data = dataAxis;
    barOption.series[0].data = data;
    // 绘制图表
    myChart.setOption(barOption);
    return myChart;
}; 

const initPie = async (id, data) => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(id));
    const pieOption = commonPieOption();
    pieOption.series[0].data = data;
    // 绘制图表
    myChart.setOption(pieOption);
    return myChart;
};

export {
    initBarFront,
    initBarBack,
    initPie,
};