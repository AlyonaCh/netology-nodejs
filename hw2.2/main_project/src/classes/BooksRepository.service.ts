import { injectable } from "inversify";
import { IBooksRepository } from "./BooksRepository";

@injectable()
export class BooksRepository {
  constructor(private readonly repo: IBooksRepository) {}

  fetchList() {
    return this.repo.getBooks();
  }
}