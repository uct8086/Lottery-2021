
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import HttpHelper from "common/utils/axiosHelper.js";
import { UPDATE_ORIGIN_DATA, FETCH_TOTAL_INFO, FETCH_HOME_DETAIL } from "common/urls";
// import { countFrontHz, countBackHz } from 'common/utils/renderEcharts';
import * as echarts from 'echarts';
const columns = [
    { text: '近3期', value: 3 },
    { text: '近12期', value: 12 },
    { text: '近36期', value: 36 },
    { text: '近144期', value: 144 },
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
        const formObj = reactive({
            timeZone: '近3期',
            pageValue: 3,
            type: '0'  // 默认全部
        });
        const list = ref([]);
        const requestData = async () => {
            const { baseList } = await HttpHelper.axiosPost(FETCH_HOME_DETAIL, formObj);
            list.value = baseList;
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

        const showPicker = ref(false);

        const onConfirm = (val) => {
            showPicker.value = false;
            formObj.timeZone = columns[val.selectedIndexes[0]].text;
            formObj.pageValue = columns[val.selectedIndexes[0]].value;
            requestData();
        };

        const activeName = ref('a');
        const loading = ref(false);
        const finished = ref(false);
        const onLoad = async () => {
            await requestData();
        };

        return {
            totalInfo,
            showInfo,
            formObj,
            showPicker,
            columns,
            activeName,
            loading,
            finished,
            list,
            requestData,
            getInfo,
            toDetail,
            updateOriginData,
            onConfirm,
            onLoad
        };
    }
};