
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import HttpHelper from "common/utils/axiosHelper.js";
import { UPDATE_ORIGIN_DATA, FETCH_TOTAL_INFO } from "common/urls";
// import { countFrontHz, countBackHz } from 'common/utils/renderEcharts';
import * as echarts from 'echarts';
const columns = [
    { text: '近一周', value: 3 },
    { text: '近一月', value: 12 },
    { text: '近一季', value: 36 },
    { text: '近一年', value: 144 },
    { text: '全部', value: 1000000 },
];

export default {
    setup() {
        const router = useRouter();
        let instanceList = [];
        const totalInfo = ref(null);
        const showInfo = ref(false);
        const getInfo = async() => {
            showInfo.value = true;
            totalInfo.value = await HttpHelper.axiosPost(FETCH_TOTAL_INFO);
        };
        // const getFrontData = async () => {
        //     let data = await HttpHelper.axiosPost(FETCH_DATA);
        //     // console.log(data);
        //     return data;
        // };

        const requestData = async () => {
            // const {front, back, front1, back1, front3, back3, front6, back6,} = await getFrontData();
            // instanceList.push(await countFrontHz('chart_1', front));
            // instanceList.push(await countBackHz('chart_2', back));
            // instanceList.push(await countFrontHz('chart_3', front1, "星期一前区各数值出现频率"));
            // instanceList.push(await countBackHz('chart_4', back1, "星期一后区各数值出现频率"));
            // instanceList.push(await countFrontHz('chart_5', front3, "星期三前区各数值出现频率"));
            // instanceList.push(await countBackHz('chart_6', back3, "星期三后区各数值出现频率"));
            // instanceList.push(await countFrontHz('chart_7', front6, "星期六前区各数值出现频率"));
            // instanceList.push(await countBackHz('chart_8', back6, "星期六后区各数值出现频率"));
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

        const timeZone = ref('近一周');
        const showPicker = ref(false);

        const onConfirm = (val) => {
            showPicker.value = false;
            timeZone.value = columns[val.selectedIndexes[0]].text;
            requestData();
        };

        const activeName = ref('a');
        const loading = ref(false);
        const finished = ref(false);
        const list = ref([]);
        const onLoad = () => {
            // todo
        };

        return {
            totalInfo,
            showInfo,
            timeZone,
            showPicker,
            columns,
            activeName,
            loading,
            finished,
            list,
            getInfo,
            toDetail,
            updateOriginData,
            onConfirm,
            onLoad
        };
    }
};