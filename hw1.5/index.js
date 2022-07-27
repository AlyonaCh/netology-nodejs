#!/usr/bin/env node
const express = require('express')
const { v4: uuid } = require('uuid')

class Book {
    constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uuid()) {
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.id = id
    }
}

class User {
    constructor(mail = "", id = uuid()) {
        this.mail = mail
        this.id = id
    }
}

const stor = {
    book: [
        new Book()
    ],
    user: [
        new User('test@mail.ru')
    ],
};

const app = express()
app.use(express.json())

app.get('/api/books', (req, res) => {
    const {book} = stor
    res.json(book)
})

app.get('/api/books/:id', (req, res) => {
    const {book} = stor
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.json(book[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }

})

app.post('/api/books/', (req, res) => {
    const {book} = stor
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
    book.push(newBook)

    res.status(201)
    res.json(newBook)
})

app.post('/api/user/login', (req, res) => {
    const {user} = stor
    const {mail} = req.body
    const idx = user.findIndex(el => el.mail === mail)

    if( idx !== -1) {
        res.json('Вы авторизованы')
    } else {
        res.status(201)
        res.json(user[0])
    }
})

app.put('/api/books/:id', (req, res) => {
    const {book} = stor
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if (idx !== -1){
        book[idx] = {
            ...book[idx],
            title,
            description, 
            authors,
            favorite, 
            fileCover, 
            fileName,
        }

        res.json(book[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

app.delete('/api/books/:id', (req, res) => {
    const {book} = stor
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)
     
    if(idx !== -1){
        book.splice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

const PORT = 3000
app.listen(PORT)