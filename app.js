const request = require('request');


class ForkLottery{
    constructor() {
        this.page = 1;
        this.url = `https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&pageSize=30&isVerify=1&pageNo=${this.page}`;
    }

    start() {
        request(this.url, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });
    }
}

let ins = new ForkLottery();
ins.start();


