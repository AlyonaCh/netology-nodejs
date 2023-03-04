const express = require('express');
const mongoose = require('mongoose');

const errorMiddleware = require('./middleware/err-404');

const PORT = process.env.PORT || 3000;
// const UrlDB = process.env.URL_DB || 'mongo://localhost:27017/books';
const ME_CONFIG_MONGODB_ADMINUSERNAME = process.env.ME_CONFIG_MONGODB_ADMINUSERNAME || 'root';
const ME_CONFIG_MONGODB_ADMINPASSWORD = process.env.ME_CONFIG_MONGODB_ADMINPASSWORD || 'example';
const ME_CONFIG_MONGODB_URL = process.env.ME_CONFIG_MONGODB_URL || 'mongodb://root:example@mongo:27017/';

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');


const app = express();
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/api/books', bookRouter);

app.use(errorMiddleware);

async function start(PORT, UrlDB, user, pass) {
    try {
        await mongoose.connect(UrlDB, {
            user: user,
            pass: pass,
            dbName: 'book'
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
   
}

start(PORT, ME_CONFIG_MONGODB_URL, ME_CONFIG_MONGODB_ADMINUSERNAME, ME_CONFIG_MONGODB_ADMINPASSWORD)
