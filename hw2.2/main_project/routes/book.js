console.clear();
import "reflect-metadata";
import { Container } from "inversify";
import { IBooksRepository } from "../src/classes/BooksRepository";
import { BooksRepository } from "../src/classes/BooksRepository.service";
const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')
const fileMulter = require('../middleware/file')
const http = require("http")
const request = require("request")
const COUNTER_URL = process.env.COUNTER_URL || 'counter://localhost';
const Book = require('../models/book')

const container = new Container();
container.bind(BooksRepository).toSelf();

class User {
    constructor(mail = "", id = uuid()) {
        this.mail = mail
        this.id = id
    }
}

const stor = {
    user: [
        new User('test@mail.ru')
    ],
};

router.get('/', async (req, res) => {
    try {
        const book = await Book.find().select('-__v')
        res.render("book/index", {
            title: "Books",
            books: book,
        });
    } catch (e) {
        console.log(e)
        res.redirect('/404');
    }

})

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "create",
        book: {},
    });
})

router.post('/create',  async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
    const newBook = new Book({title, description, authors, favorite, fileCover, fileName, fileBook})
    try {
        await newBook.save()
        res.redirect('/api/books/')
    } catch (e) {
        console.log(e)
        res.redirect('/404');
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const repo = container.get(BooksRepository);
        const book = await repo.getBook(id);
        // const book = await Book.findById(id).select('-__v')
        var promise = new Promise(function(resolve, reject) {
            request.post({url:`${COUNTER_URL}counter/${id}/incr`,method:'POST',
            json: true,
            body: { }},(err, res, body) => {
                if (err) {
                    reject(new Error(err));
                    return
                }
                resolve(body.result);
                return
            })
            
        })
        promise
            .then(
                result => {
                    res.render("book/view", {
                        title: "view",
                        book: book,
                        counter: result
                    });
                },
                error => {
                    res.render("book/view", {
                        title: "view",
                        book: book,
                        counter: 0
                    });
                }
            );
    } catch (e) {
        console.log(e)
        res.redirect('/404');
    }
    

})

router.get('/update/:id', async (req, res) => {
    const {id} = req.params

    try {
        const book = await Book.findById(id).select('-__v')
        res.render("book/update", {
            title: "view",
            book: book,
        });
    } catch (e) {
        console.log(e)
        res.redirect('/404');
    }
});

router.post('/update/:id', async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
    const {id} = req.params
    
    try {
        await Book.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName, fileBook})
        res.redirect(`/api/books/${id}`);
    } catch (e) {
        console.log(e)
        res.redirect('/404');
    }
    
})

router.post('/delete/:id', async (req, res) => {
    const {id} = req.params
     
    try {
        await Book.deleteOne({_id: id})
        res.redirect(`/api/books/`);
    } catch (e) {
        console.log(e)
        res.redirect('/404');
    }

})

router.get('/:id/download', (req, res) => {
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.download(book[idx].fileBook)
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }

}, (req, res) => {
    express.static(res)

})

module.exports = router
