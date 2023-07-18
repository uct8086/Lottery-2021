const Router = require('koa-router');
const liveRouter = require('./live.js');

const router = Router();

// routes表示的是路由的嵌套处理
router.use(liveRouter.routes(), liveRouter.allowedMethods());


module.exports = router;

