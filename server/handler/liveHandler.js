const getLotteryData = require('../getLotteryData');

class LiveHandler {

    /**
     * 根据条件，筛选数据
     * @param {*} ctx 
     */
    async fetchHomePageDetail(ctx) {
        try {
            const { type, pageValue, frontValue, backValue } = ctx.request.body;
            const data = require('../data.json');
            const m = new Map();
            const m2 = new Map();
            const baseList = [];
            const parallelList = [];
            let total = pageValue;
            for (let i = 0, len = data.length; i < len; i++) {
                let list = data[i].lotteryDrawResult.split(" ");
                const curDate = data[i].lotteryDrawTime;
                const isDay = new Date(curDate).getDay();
                let temp = list.map(item => Number(item));
                let lotteryDrawResult = temp.slice(0, 5);
                let backend = temp.slice(5);
                const frontExist = LiveHandler.isIncludes(frontValue, lotteryDrawResult);
                const backExist = LiveHandler.isIncludes(backValue, backend);
                total--;
                if ((Number(type) === 0 || isDay === Number(type)) && (frontExist || backExist || (!frontValue && !backValue))) {
                    baseList.push(LiveHandler.buildInfoStr(data[i]));
                    LiveHandler.calculateHz(lotteryDrawResult, m);
                    LiveHandler.calculateHz(backend, m2);
                    parallelList.push(list);
                }
                if (total <= 0) break;
            }

            // 所有日期前后区统计
            const front = LiveHandler.concatArr(m, 35);
            const back = LiveHandler.concatArr(m2, 12);

            const pieF = LiveHandler.buildPieData(front);
            const pieB = LiveHandler.buildPieData(back);

            ctx.body = {
                code: 0, data: {
                    baseList,
                    barChartData: { front, back },
                    pieChartData: { pieF, pieB },
                    parallelList,
                }
            };
        } catch (e) {
            ctx.body = { code: -1, msg: 'fetchData failed.' };
        }
    }

    static buildInfoStr(Obj) {
        return `${Obj.lotteryDrawTime} 第${Obj.lotteryDrawNum}期：${Obj.lotteryDrawResult}`;
    }

    async fetchTotalInfo(ctx) {
        try {
            const data = require('../data.json');
            ctx.body = {
                code: 0, data: {
                    total: data.length,
                    latest: LiveHandler.buildInfoStr(data[0]),
                    latestDay: data[0].lotteryDrawTime,
                }
            };
        } catch (e) {
            ctx.body = { code: -1, msg: 'fetchTotalInfo failed.' };
        }
    }

    /**
     * 计算频率
     * @param {Array} list 
     * @param {Map} m 
     */
    static calculateHz(list, m) {
        for (let j = 0, jlen = list.length; j < jlen; j++) {
            const num = list[j];
            let current = m.get(num);
            if (!current) {
                m.set(num, 1);
            } else {
                m.set(num, m.get(num) + 1);
            }
        }
    }

    static concatArr(m, num) {
        let temp = new Array(num).fill(0);
        for (let [k, v] of m.entries()) {
            temp[Number(k) - 1] = v;
        }
        return temp;
    }

    static buildPieData(data) {
        return data.map((item, index) => ({ value: item, name: index + 1}));
    }

    static isIncludes(str, targetList) {
        if (!str) return false;
        const list = str.split('-') || [];
        for (let i = 0, len = list.length; i < len; i++) {
            const t = targetList.findIndex((item) => item === Number(list[i]));
            if (t === -1) return false;
        }
        return true;
    }

    updateOriginData(ctx, next) {
        try {
            getLotteryData.start();
            ctx.body = { code: 0, data: 'success' };
        } catch (e) {
            ctx.body = { code: -1, msg: 'updateOriginData failed.' };
        }
    }

}

module.exports = new LiveHandler();