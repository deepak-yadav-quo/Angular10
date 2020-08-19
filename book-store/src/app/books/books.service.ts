import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { concat } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Book } from './book.model';

@Injectable({providedIn: 'root'}) 
export class BooksService {
    books: Book[] = [];
    
    constructor(private http: HttpClient,
                private router: Router) {
        console.log(this.books);
    }

    addBook(book: Book) {
        this.books.push(book);
        console.log(this.books);
        this.updateBookDatabase();
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
                console.log(books);
                console.log(this.books);
                if(books !== null) {
                    this.books = books;
                }
                console.log(this.books);
            }
        ));
    }

    deleteBook(id: number) {
        this.books.splice(id, 1);
        this.updateBookDatabase();
    }

    updateBook(id: number, updatedBook: Book) {
        this.books[id] = updatedBook;
        this.updateBookDatabase();
    }

    private updateBookDatabase() {
        console.log(this.books);
        
        const addBook = this.http
            .put(
                'https://ng-book-store-ab728.firebaseio.com/books.json/',
                this.books
            );
        const getBook = this.http.get<Book[]>(
            'https://ng-book-store-ab728.firebaseio.com/books.json'
        );
        const goToDashboard = this.router.navigateByUrl('books');
        concat(addBook, getBook, goToDashboard).subscribe(
            response => {
                console.log(response);
            }
        );
    }
}