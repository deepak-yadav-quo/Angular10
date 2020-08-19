import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  booksSubscription: Subscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private booksService: BooksService) { 
                console.log("constructor called!");
              }

  ngOnInit(): void {
    this.booksSubscription = this.booksService.fetchBooks().subscribe(
      books => {
        if(books !== null) {
          this.books = books;
        }
      }
    );
    console.log(this.books);
  }

  addForm() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditBook(id: number) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  onViewBook(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onDeleteBook(id: number) {
    this.booksService.deleteBook(id);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
