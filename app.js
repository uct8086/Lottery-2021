const Koa = require('koa');
const convert = require('koa-convert');
const logger = require('koa-logger');
const cors = require('koa-cors'); //跨域
const bodyParser = require('koa-bodyparser'); //请求体JSON解析
const onerror = require('koa-onerror'); //错误处理
const resource = require('koa-static');//静态资源托管
const path = require('path');

const routes = require('./src/server/routes/index.js');
const config = require('./src/config/index.js');
 
const app = new Koa();

const env = process.NODE_ENV || 'dev';

onerror(app)

app.use(convert(cors()))

app.use(convert(logger()))

app.use(bodyParser())

app.use(resource(path.join(__dirname, './public')))

app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(routes.routes(), routes.allowedMethods());


app.on('error', (error, ctx) => {
	console.log('其他错误' + JSON.stringify(ctx.onerror))
	console.log('server error:' + error)
})

app.listen(config[env].port).on('listening', function () {
	console.log('正在监听端口: ' + config[env].port)
});


