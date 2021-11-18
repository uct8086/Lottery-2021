import HttpHelper from "common/utils/axios_helper.js";
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FETCH_DATA } from "../../common/urls";
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
            d3.select('body');
            getData();
        });

        const toDetail = () => {
            router.push('/detail');
        };

        return {
            data,
            getData,
            toDetail
        };
    }
};