const getLotteryData = require('../server/getLotteryData');
const { blomqvistBeta } = require('../server/common');


// getLotteryData.start();


const x = [25, 50, 75], y = [30, 60, 90];
console.log(blomqvistBeta(x, y));