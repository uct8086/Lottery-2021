const request = require('request');
const fs = require('fs');


class ForkLottery{
    constructor() {
        this.page = 1;
        this.pages = 2;
        this.url = `https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&pageSize=30&isVerify=1&pageNo=${this.page}`;
        this.data = [];
    }

    async start() {
        do{
            let {pages, list} = await new Promise((resolve, reject) => {
                request(this.url, (error, response, body) => {
                    if(error) {
                        return reject(error);
                    }
                    if(response && response.statusCode === 200) {
                        let temp = JSON.parse(body);
                        const {pages, list} = temp.value;
                        return resolve({pages, list});
                    }
                });
            });
            if(!list) {
                console.log(this.page);
                return;
            } else {
                console.log(this.page, this.pages);
            }
            this.pages = pages;
            for(let item of list){
                let {lotteryDrawNum,
                    lotteryDrawResult,
                    lotteryDrawTime} = item;
                this.data.push({
                    lotteryDrawNum,
                    lotteryDrawResult,
                    lotteryDrawTime,
                })
            }
            this.page ++;
        } while (this.page <= this.pages);
        
        fs.writeFileSync(`./src/data/data.json`, JSON.stringify(this.data));
    }
}

let ins = new ForkLottery();
ins.start();


