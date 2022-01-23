
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import HttpHelper from "common/utils/axiosHelper.js";
import { UPDATE_ORIGIN_DATA, FETCH_DATA } from "common/urls";
import { countFrontHz, countBackHz } from 'common/utils/renderEcharts';
import * as echarts from 'echarts';

export default {
    setup() {
        const router = useRouter();
        let instanceList = [];

        const getFrontData = async () => {
            let data = await HttpHelper.axiosPost(FETCH_DATA);
            // console.log(data);
            return data;
        };

        const requestData = async () => {
            const {front, back, front1, back1, front3, back3, front6, back6,} = await getFrontData();
            instanceList.push(await countFrontHz('chart_1', front));
            instanceList.push(await countBackHz('chart_2', back));
            instanceList.push(await countFrontHz('chart_3', front1, "星期一前区各数值出现频率"));
            instanceList.push(await countBackHz('chart_4', back1, "星期一后区各数值出现频率"));
            instanceList.push(await countFrontHz('chart_5', front3, "星期三前区各数值出现频率"));
            instanceList.push(await countBackHz('chart_6', back3, "星期三后区各数值出现频率"));
            instanceList.push(await countFrontHz('chart_7', front6, "星期六前区各数值出现频率"));
            instanceList.push(await countBackHz('chart_8', back6, "星期六后区各数值出现频率"));
        };

        onMounted(async () => {
            await requestData();
        });
        onUnmounted(() => {
            for(let i = 0, len = instanceList.length;i < len;i++){
                echarts.dispose(instanceList[i]);
            }
            instanceList = [];
        });

        const toDetail = () => {
            router.push('/detail');
        };

        const updateOriginData = () => {
            HttpHelper.axiosPost(UPDATE_ORIGIN_DATA);
        };

        return {
            toDetail,
            updateOriginData
        };
    }
};