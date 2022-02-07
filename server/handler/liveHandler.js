const getLotteryData = require('../getLotteryData');

class LiveHandler{

    static calculateHz(list, m) {
        for(let j=0, jlen=list.length; j<jlen; j++) {
            const num = list[j];
            let current = m.get(num);
            if(!current) {
                m.set(num, 1);
            } else {
                m.set(num, m.get(num) + 1);
            }
        }
    }

    static concatArr(m, num) {
        let temp = new Array(num).fill(0);
        for(let [k,v] of m.entries()) {
            temp[Number(k) - 1] = v;
        }
        return temp;
    }

    async fetchData(ctx, next) {
        try {
            let data = require('../data.json');
            const m = new Map();
            const m2 = new Map();
            const mDay1 = new Map();
            const mDay12 = new Map();
            const mDay3 = new Map();
            const mDay32 = new Map();
            const mDay6 = new Map();
            const mDay62 = new Map();

            for (let i=0,len = data.length; i<len;i++) {
                let list = data[i].lotteryDrawResult.split(" ");
                if (list.includes("32")) {
                    console.log(111);
                }
                const curDate = data[i].lotteryDrawTime;
                const isDay = new Date(curDate).getDay();
                let lotteryDrawResult = list.slice(0,5);
                let backend = list.slice(5);
                LiveHandler.calculateHz(lotteryDrawResult, m);
                LiveHandler.calculateHz(backend, m2);

                switch(isDay) {
                    case 1:
                        LiveHandler.calculateHz(lotteryDrawResult, mDay1);
                        LiveHandler.calculateHz(backend, mDay12);
                        break;
                    case 3:
                        LiveHandler.calculateHz(lotteryDrawResult, mDay3);
                        LiveHandler.calculateHz(backend, mDay32);
                        break;
                    case 6:
                        LiveHandler.calculateHz(lotteryDrawResult, mDay6);
                        LiveHandler.calculateHz(backend, mDay62);
                        break;
                    default:
                        break;
                }

            }
            // 所有日期前后区统计
            const front = LiveHandler.concatArr(m, 35);
            const back = LiveHandler.concatArr(m2, 12);
            // 周一开奖统计
            const front1 = LiveHandler.concatArr(mDay1, 35);
            const back1 = LiveHandler.concatArr(mDay12, 12);
            // 周三开奖统计
            const front3 = LiveHandler.concatArr(mDay3, 35);
            const back3 = LiveHandler.concatArr(mDay32, 12);
            // 周六开奖统计
            const front6 = LiveHandler.concatArr(mDay6, 35);
            const back6 = LiveHandler.concatArr(mDay62, 12);
            
            ctx.body = {code: 0, data: {
                front, 
                back,
                front1,
                back1,
                front3,
                back3,
                front6,
                back6,
            }};
        } catch (e) {
            ctx.body = {code:-1, msg: 'fetchData failed.'};
        }
    }

    searchByParams(ctx, next) {
        try {
            const {front: fr, back: ba} = ctx.request.body;
            let data = require('../data.json');
            const m = new Map();
            const m2 = new Map();
            const mDay1 = new Map();
            const mDay12 = new Map();
            const mDay3 = new Map();
            const mDay32 = new Map();
            const mDay6 = new Map();
            const mDay62 = new Map();

            for (let i=0,len = data.length; i<len;i++) {
                let list = data[i].lotteryDrawResult.split(" ");
                let temp = list.map(item => Number(item));
                if (fr && !temp.slice(0,5).includes(Number(fr))) {
                    continue;
                }
                if (ba && !temp.slice(5).includes(Number(ba))) {
                    continue;
                }
                const curDate = data[i].lotteryDrawTime;
                const isDay = new Date(curDate).getDay();
                let lotteryDrawResult = list.slice(0,5);
                let backend = list.slice(5);
                LiveHandler.calculateHz(lotteryDrawResult, m);
                LiveHandler.calculateHz(backend, m2);

                switch(isDay) {
                    case 1:
                        LiveHandler.calculateHz(lotteryDrawResult, mDay1);
                        LiveHandler.calculateHz(backend, mDay12);
                        break;
                    case 3:
                        LiveHandler.calculateHz(lotteryDrawResult, mDay3);
                        LiveHandler.calculateHz(backend, mDay32);
                        break;
                    case 6:
                        LiveHandler.calculateHz(lotteryDrawResult, mDay6);
                        LiveHandler.calculateHz(backend, mDay62);
                        break;
                    default:
                        break;
                }

            }
            // 所有日期前后区统计
            const front = LiveHandler.concatArr(m, 35);
            const back = LiveHandler.concatArr(m2, 12);
            // 周一开奖统计
            const front1 = LiveHandler.concatArr(mDay1, 35);
            const back1 = LiveHandler.concatArr(mDay12, 12);
            // 周三开奖统计
            const front3 = LiveHandler.concatArr(mDay3, 35);
            const back3 = LiveHandler.concatArr(mDay32, 12);
            // 周六开奖统计
            const front6 = LiveHandler.concatArr(mDay6, 35);
            const back6 = LiveHandler.concatArr(mDay62, 12);
            
            ctx.body = {code: 0, data: {
                front, 
                back,
                front1,
                back1,
                front3,
                back3,
                front6,
                back6,
            }};
        } catch (e) {
            ctx.body = {code:-1, msg: 'searchByParams failed.'};
        }
    }

    updateOriginData(ctx, next) {
        try {
            getLotteryData.start();
            ctx.body = {code: 0, data: 'success'};
        } catch (e) {
            ctx.body = {code:-1, msg: 'updateOriginData failed.'};
        }
    }

}

module.exports = new LiveHandler();