const express = require('express');

const errorMiddleware = require('./middleware/err-404');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');

const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/api/books', bookRouter);

app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT);