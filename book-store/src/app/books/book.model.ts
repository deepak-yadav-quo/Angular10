export class Book {
    constructor(
        public id: string,
        public name: string,
        public authorName: string,
        public publishDate: Date,
        public genre: string
    ) {}
}
