import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {

    error = new Subject<string>();
    
    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content}
        this.http
            .post<{ name: string }>(
                'https://ng-complete-guide-453ad.firebaseio.com/posts.json',
                postData,
                {
                    observe: 'response'
                }
            )
            .subscribe(responseData => {
                console.log(responseData);
            }, error => {
                this.error.next(error.message);
            });
    }

    fetchPosts() {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('print', 'pretty');
        queryParams = queryParams.append('custom', 'key');
        return this.http
            .get<{[key: string]: Post}>(
                'https://ng-complete-guide-453ad.firebaseio.com/posts.json',
                {
                    headers: new HttpHeaders({'Custom-Headers': 'Hello'}),
                    //params: new HttpParams().set('print', 'pretty');
                    params: queryParams
                }
            )
            .pipe(
                map(responseData => {
                    const postsArray:Post[] = [];
                    for(const key in responseData) {
                        if(responseData.hasOwnProperty(key)) {
                            postsArray.push({...responseData[key], id: key});
                        }
                    }
                    return postsArray;
                }),
                catchError(errorResponse => {
                    //Generic Error Handling tasks like sending to analytics server
                    return throwError(errorResponse);
                }) 
            );

    }

    onDelete() {
        return this.http
            .delete('https://ng-complete-guide-453ad.firebaseio.com/posts.json', {
                observe: 'events',
                responseType: 'text'
            })
            .pipe(
                tap(event => {
                    console.log(event);
                    if(event.type === HttpEventType.Sent){
                        //...
                    }
                    if(event.type === HttpEventType.Response){
                        console.log(event.body);
                    }
                })
            );
        
    }
}