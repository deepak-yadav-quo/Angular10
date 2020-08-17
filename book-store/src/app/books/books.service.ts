import { Injectable } from '@angular/core';

import { Book } from './book.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'}) 
export class BooksService {
    booksChanged = new Subject<Book[]>();
    private books: Book[] = [];

    constructor(private http: HttpClient) {}

    addBook(book: Book) {
        this.books.push(book);
        this.booksChanged.next(this.books.slice());
        this.updateBookDatabase(this.books.length);
    }

    getBooks() {
        if(this.books.length === 0){
            return this.books;
        }
        return this.books.slice();
    }

    getBook(id: number) {
        return this.books[id];
    }

    fetchBooks() {
        return this.http.get<Book[]>(
            'https://ng-book-store-ab728.firebaseio.com/books.json'
        )
        .pipe(tap(
            books => {
                this.books = books;
                console.log(this.books);
            }
        ));
    }

    deleteBook(id: number) {
        this.books.splice(id, 1);
        this.booksChanged.next(this.books.slice());
        this.updateBookDatabase(id);
    }

    updateBook(id: number, updatedBook: Book) {
        this.books[id] = updatedBook;
        this.booksChanged.next(this.books.slice());
        this.updateBookDatabase(id);
    }

    private updateBookDatabase(id: number) {
        console.log(this.books);
        this.http
            .put(
                'https://ng-book-store-ab728.firebaseio.com/books.json/'+id,
                this.books[id]
            )
            .subscribe(
                response => {
                    console.log(response);
                }
            );
    }
}