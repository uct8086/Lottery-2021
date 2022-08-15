const request = require('request');
const fs = require('fs');
class ForkLottery {

    async start() {
        let page = 1, pages = 75, data = [];

        do {
            let url = `https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&pageSize=30&isVerify=1&pageNo=${page}`;
            let { pages, list } = await new Promise((resolve, reject) => {
                request(url, (error, response, body) => {
                    if (error) {
                        return reject(error);
                    }
                    if (response && response.statusCode === 200) {
                        let temp = JSON.parse(body);
                        const { pages, list } = temp.value;
                        return resolve({ pages, list });
                    }
                });
            });
            if (!list) {
                console.log(page);
                return;
            } else {
                console.log(page, pages);
            }
            for (let item of list) {
                let { lotteryDrawNum,
                    lotteryDrawResult,
                    lotteryDrawTime } = item;
                data.push({
                    lotteryDrawNum,
                    lotteryDrawResult,
                    lotteryDrawTime,
                });
            }
            page++;
        } while (page <= pages);
        const dataPath = `./server/data.json`;
        if (fs.existsSync(dataPath)) {
            fs.rmSync(dataPath);
        }
        fs.writeFileSync(dataPath, JSON.stringify(data));
    }
}

module.exports = new ForkLottery();



