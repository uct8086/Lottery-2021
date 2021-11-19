import HttpHelper from "common/utils/axios_helper.js";
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FETCH_DATA } from "../../common/urls";
import * as echarts from 'echarts';

export default {
    setup() {
        const data = reactive({
            id: "5d42ac3d9c149c38248c8199"
        });
        const router = useRouter();
        const getData = async () => {
            let data = await HttpHelper.axiosPost(FETCH_DATA);
            console.log(data);
        };

        onMounted(() => {
            getData();
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-one'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'Static'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });

        });

        const toDetail = () => {
            router.push('/detail');
        };

        return {
            data,
            toDetail
        };
    }
};