class LiveHandler{


    static async fetchData(ctx, next) {
        try {
            let data = require('../data.json');
            ctx.body = {code: 0, data};
        } catch (e) {
            ctx.body = {code:-1, msg: 'fetchData failed.'};
        }
    }

}

module.exports = LiveHandler;