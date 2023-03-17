import  mongoose, {Document, Schema, model} from 'mongoose';
import { Book } from "../interfaces/Book";

const bookSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    authors: {
        type: String,
        default: ''
    },
    favorite: {
        type: String,
        default: ''
    },
    fileCover: {
        type: String,
        default: ''
    },
    fileName: {
        type: String,
        default: ''
    },
    fileBook: {
        type: String,
        default: ''
    }
})

export const BookModel = mongoose.model<Book & Document>('Book', bookSchema)