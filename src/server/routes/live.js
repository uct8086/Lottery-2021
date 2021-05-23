const Router = require('koa-router');

const router = Router()

// 直播
router.get('/live', async (ctx, next) => {
  ctx.body = ""
})

module.exports = router;