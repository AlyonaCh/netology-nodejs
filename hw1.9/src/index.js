const express = require('express');

const errorMiddleware = require('./middleware/err-404.js');

const redis  = require('redis');
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost'

const client = redis.createClient({url:REDIS_URL});

(async () => {
    await client.connect();
})

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const counterRouter = require('./routes/counter');

const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/api/books', bookRouter);
app.use('/counter', counterRouter);

app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT);