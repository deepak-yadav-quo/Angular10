export class Book {
    constructor(
        public id: string,
        public name: string,
        public authorName: string,
        public publishDate: Date,
        public genre: string
    ) {}

}

/*
export class Book {
    public id: string;
    public name: string;
    public author_name: string;
    public publish_date: string;
    public genre: string;

    constructor(
        id: string,
        name: string,
        author_name: string,
        publish_date: string,
        genre: string
    ) {
        this.id = id;
        this.name = name;
        this.author_name = author_name;
        this.publish_date = publish_date;
        this.genre = genre;
    }

}

*/