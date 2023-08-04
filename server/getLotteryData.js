const request = require('request');
const path = require('path');
const { writeFile, existsSync, rmSync, createReadStream, createWriteStream } = require('node:fs');
class ForkLottery {

    async start() {
        let page = 1, totalPages = 10000, data = [];
        try {
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
            const dataPath = `./server/data.json`;
            const exist = await existsSync(dataPath);
            let historyData = [];
            console.log('exist: ', exist);
            if (exist) {
                try {
                    historyData = require(path.join(__dirname, '../server/data.json'));
                } catch (e) {
                    historyData = [];
                }
                
                const backupPath = `./server/data-${+new Date()}.json`;
                // 备份文件
                createReadStream(dataPath).pipe(createWriteStream(backupPath));
                // 删除旧文件
                await rmSync(dataPath);
            }
            console.log('remove success. ');
            // 增量更新
            if (historyData.length) {
                const newData  = data.filter((item) => item.lotteryDrawNum > historyData[0].lotteryDrawNum);
                historyData = newData.concat(historyData);
            } else {
                historyData = data;
            }
            
            writeFile(dataPath, JSON.stringify(historyData), (err) => {
                console.log(err, 'back');
            });
            console.log('write success. ');
        } catch (e) {
            console.log(`got lottery data error is : ${e && e.message || ''}`);
        }
       
    }
}

module.exports = new ForkLottery();



