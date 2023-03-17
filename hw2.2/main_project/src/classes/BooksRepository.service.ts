import { injectable } from "inversify";
import { IBooksRepository } from "./BooksRepository";

import { Book } from "../interfaces/Book";

interface CreateBookDto {
  title: Book['title'],
  description: Book['description'],
  authors: Book['authors'],
  favorite: Book['favorite'],
  fileCover: Book['fileCover'],
}

@injectable()
export class BooksRepository {
  constructor(private readonly repo: IBooksRepository) {}

  fetchList() {
    return this.repo.getBooks();
  }
}