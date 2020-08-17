import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { BooksService } from './../books.service';
import { Book } from './../book.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  id:number;
  bookForm: FormGroup;
  model: NgbDateStruct;
  editMode = false;


  constructor(private booksService: BooksService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  private initForm() {

    let bookName = '';
    let authorName = '';
    let publishDate = new Date();
    let genre = '';

    if(this.editMode) {
      const book = this.booksService.getBook(this.id);
      bookName = book.name;
      authorName = book.authorName;
      publishDate = book.publishDate;
      genre = book.genre;

    }
    console.log(authorName);

    this.bookForm = new FormGroup({
      'name': new FormControl(bookName, [Validators.required]),
      'authorName': new FormControl(authorName, [Validators.required]),
      'publishDate': new FormControl(publishDate, [Validators.required]),
      'genre': new FormControl(genre, [Validators.required])
    });
  }
  onAddBook() {
    if(this.editMode) {
      this.booksService.updateBook(this.id, this.bookForm.value);
      this.router.navigate(['../../'], { relativeTo: this.route })

    } else {
      this.booksService.addBook(this.bookForm.value);
      this.router.navigate(['../'], { relativeTo: this.route })
    }
    
  }

}
