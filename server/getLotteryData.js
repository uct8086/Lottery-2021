const request = require('request');
const fs = require('fs');
class ForkLottery {

    async start() {
        let page = 1, totalPages = 10000, data = [];

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
                totalPages = pages;
                console.log(page, totalPages);
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
        } while (page <= totalPages);
        try {
            const dataPath = `./server/data.json`;
            const exist = fs.existsSync(dataPath);
            if (exist) {
                fs.rmSync(dataPath);
            }
            fs.writeFileSync(dataPath, JSON.stringify(data));
        } catch (e) {
            console.log(`got lottery data error is : ${e && e.message || ''}`);
        }
       
    }
}

module.exports = new ForkLottery();



