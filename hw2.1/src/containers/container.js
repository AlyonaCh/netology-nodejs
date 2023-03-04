import "reflect-metadata";
import { Book } from "../interfaces/Book";
import { BooksRepositor } from "../classes/BooksRepository";
import { injectable, inject } from "inversify";

@injectable()
