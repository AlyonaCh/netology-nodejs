#!/usr/bin/env node
const express = require('express')

const logger = require('./middleware/logger')
const err404 = require('./middleware/err-404')
const indexRouter = require('./routes/index')


const app = express()
app.use(logger)
app.use('/',indexRouter)
app.use(express.json())

app.use('/api/books', indexRouter)

app.use('/api/books/:id', indexRouter)

app.use('/api/books/', indexRouter)

app.use('/api/user/login', indexRouter)

app.use('/api/books/:id', indexRouter)

app.use('/api/books/save', indexRouter)

app.use('/api/books/:id/download', indexRouter)

app.use(err404)

const PORT = 3000
app.listen(PORT)