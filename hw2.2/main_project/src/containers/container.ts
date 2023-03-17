import "reflect-metadata";
import { Book } from "../interfaces/Book";
import { BooksRepository } from "../classes/BooksRepository";
import { injectable, inject } from "inversify";

container.bind(BooksRepository).toSelf()