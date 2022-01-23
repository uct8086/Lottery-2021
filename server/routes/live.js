const Router = require('koa-router');
const router = Router();
const LiveHandler = require('../handler/liveHandler');

// 设置项目路径
router.post('/api/fetch_data', LiveHandler.fetchData);
router.post('/api/update_origin_data', LiveHandler.updateOriginData);
// router.post('/api/do_base', MainHandler.base);
// router.post('/api/do_replay', MainHandler.replay);
// router.post('/api/create_test_folder', MainHandler.createTestFolder);
// router.post('/api/find_test_folder', MainHandler.findTestFolder);
// router.post('/api/remove_test_folder', MainHandler.removeTestFolder);
// router.post('/api/select_test_folder', MainHandler.selectTestFolder);
// router.post('/api/get_report_list', MainHandler.getReportList);
// router.post('/api/get_report', MainHandler.getTestReport);
// router.post('/api/remove_report', MainHandler.removeTestReport);


module.exports = router;