const Koa = require('koa');
const convert = require('koa-convert');
const cors = require('koa-cors'); //跨域
const bodyParser = require('koa-bodyparser'); //请求体JSON解析
const onerror = require('koa-onerror'); //错误处理
const resource = require('koa-static');//静态资源托管
const { historyApiFallback } = require('koa2-connect-history-api-fallback'); 
const path = require('path');


const routes = require('./server/routes/index');
const config = require('./build/config');

const app = new Koa();

onerror(app);

app.use(historyApiFallback({ whiteList: ['/api'] }));

app.use(convert(cors()));


app.use(bodyParser());

app.use(resource(path.join(__dirname, './public')));

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(routes.routes(), routes.allowedMethods());


app.on('error', (error, ctx) => {
    console.log('other error ' + JSON.stringify(ctx.onerror));
    console.log('server error:' + error);
});

app.listen(config.port).on('listening', function () {
    console.log('listening port : ' + config.port);
});
