const Router = require('koa-router');
const live = require('./live.js');

const router = Router()

// routes表示的是路由的嵌套处理
router.use(live.routes(), live.allowedMethods())


module.exports = router;

