const Router = require('koa-router');
const router = Router();
const LiveHandler = require('../handler/liveHandler');

// 设置项目路径
router.post('/api/fetch_data', LiveHandler.fetchData);
router.post('/api/update_origin_data', LiveHandler.updateOriginData);
router.post('/api/search_by_params', LiveHandler.searchByParams);


module.exports = router;