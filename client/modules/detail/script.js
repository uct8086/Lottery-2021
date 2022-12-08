
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import HttpHelper from "common/utils/axiosHelper.js";
import { FETCH_DATA, SEARCH_BY_PARAMS } from "common/urls";
import { initBarFront, initBarBack } from 'common/utils/renderEcharts';
import * as echarts from 'echarts';

export default {
    setup() {
        const router = useRouter();
        let frontValue = ref();
        let backValue = ref();
        let instanceList = [];

        const getFrontData = async () => {
            let data = await HttpHelper.axiosPost(FETCH_DATA);
            // console.log(data);
            return data;
        };

        const requestData = async (data) => {
            const {front, back, front1, back1, front3, back3, front6, back6,} = data;
            instanceList.push(await initBarFront('chart_1', front));
            instanceList.push(await initBarBack('chart_2', back));
            instanceList.push(await initBarFront('chart_3', front1, "星期一前区各数值出现频率"));
            instanceList.push(await initBarBack('chart_4', back1, "星期一后区各数值出现频率"));
            instanceList.push(await initBarFront('chart_5', front3, "星期三前区各数值出现频率"));
            instanceList.push(await initBarBack('chart_6', back3, "星期三后区各数值出现频率"));
            instanceList.push(await initBarFront('chart_7', front6, "星期六前区各数值出现频率"));
            instanceList.push(await initBarBack('chart_8', back6, "星期六后区各数值出现频率"));
        };

        onMounted(async () => {
            const data = await getFrontData();
            await requestData(data);
        });
        onUnmounted(() => {
            for(let i = 0, len = instanceList.length;i < len;i++){
                echarts.dispose(instanceList[i]);
            }
            instanceList = [];
        });

        const search = async () => {
            let data = await HttpHelper.axiosPost(SEARCH_BY_PARAMS, {front: frontValue.value, back: backValue.value});
            await requestData(data);
        };

        const toDetail = () => {
            router.push('/');
        };

        return {
            frontValue,
            backValue,
            search,
            toDetail,
        };
    }
};