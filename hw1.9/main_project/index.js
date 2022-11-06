const express = require('express');

const errorMiddleware = require('./middleware/err-404');

const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');

const app = express();
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/api/books', bookRouter);

app.use(errorMiddleware);

app.listen(PORT);