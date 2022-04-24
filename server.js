const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require("koa-body");
const http = require("http");
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const uuid = require('uuid');
const {faker} = require('@faker-js/faker');

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));

app.use(cors({
  origin: '*',
  credentials: true,
  'Access-Control-Allow-Origin': true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback()).listen(port);

router.get('/', async(ctx) => {
  ctx.response.body = 'Server response';
});

router.get('/messages/unread', async(ctx) => {

  ctx.response.body = {
    status: 'ok',
    timestamp: Date.now(),
    messages: [
      {
        id: uuid.v4(),
        from: faker.internet.email(),
        subject: faker.lorem.words(2),
        body: faker.lorem.paragraph(),
        received: Date.now()
      }
    ]
  };
});

app
  .use(router.routes())
  .use(router.allowedMethods());
