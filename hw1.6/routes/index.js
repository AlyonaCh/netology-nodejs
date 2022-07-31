const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')
const fileMulter = require('../middleware/file')

class Book {
    constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", fileBook="", id = uuid()) {
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook
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
        new Book("1", "1", "1", "1", "1", "1", '1659257285126-2135_Физика')
    ],
    user: [
        new User('test@mail.ru')
    ],
};

router.get('/', (req, res) => {
    const {url} =  req
    res.json({url})
})

router.get('/api/books', (req, res) => {
    const {book} = stor
    res.json(book)
})

router.get('/api/books/:id', (req, res) => {
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

router.post('/api/books/', (req, res) => {
    const {book} = stor
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
    book.push(newBook)

    res.status(201)
    res.json(newBook)
})

router.put('/api/books/:id', (req, res) => {
    const {book} = stor
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
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
            fileBook,
        }

        res.json(book[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

router.delete('/api/books/:id', (req, res) => {
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

router.post('/api/books/save', fileMulter.single('upload-file'), (req, res) => {
    if (req.file){
        const {path} = req.file
        res.json({path})
    }
    res.json()
})

router.get('/api/books/:id/download', (req, res) => {
    const {book} = stor
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.json(__dirname+'public/books/'+book[idx].fileBook)
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }

}, (req, res) => {
    express.static(res)

})

router.post('/api/user/login', (req, res) => {
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

module.exports = router
