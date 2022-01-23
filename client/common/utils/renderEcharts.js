import { getTextNumber } from "common/utils/tool";
import { commonBarOption } from 'common/utils/echartsOptions';
import * as echarts from 'echarts';

const countFrontHz = async (id, data, title) => {
    const dataAxis = getTextNumber(35);
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(id));
    const barOption = commonBarOption();
    barOption.title.text = title || "前区各数值出现频率";
    barOption.xAxis.data = dataAxis;
    barOption.series[0].data = data;
    // 绘制图表
    myChart.setOption(barOption);
    return myChart;
}; 

const countBackHz = async (id, data, title) => {
    const dataAxis = getTextNumber(12);
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(id));
    const barOption = commonBarOption();
    barOption.title.text = title || "后区各数值出现频率";
    barOption.xAxis.data = dataAxis;
    barOption.series[0].data = data;
    // 绘制图表
    myChart.setOption(barOption);
    return myChart;
}; 

export {
    countFrontHz,
    countBackHz
};