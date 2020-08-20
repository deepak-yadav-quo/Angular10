import { 
    Observable, 
    fromEvent, 
    Subject, 
    merge, 
    observable, 
    zip, 
    combineLatest, 
    Subscription } from 'rxjs';

import {
    exhaustMap,
    switchMap
} from 'rxjs/operators';
/*let observable = Observable.create((observer: any) => {
    observer.next("hey there");
    observer.next("How are you?");
    observer.complete();
    observer.next("Not gonna emit");
});

*/

/* Truly Hot Observable
let observable = fromEvent(document, 'mousemove');

observable.subscribe(
    (x:any) => addItem(x),
    (error:any) => addItem(error),
    () => addItem("completed")
);

*/
/*
let subject = new Subject();

subject.subscribe(
    data => addItem('Observer 1:'+data),
    err => addItem(err),
    () => addItem('Observer 1 Completed')
);

subject.next('The first thing has been sent');

let observer2 = subject.subscribe(
    data => addItem('Observer 2:'+data)
);

subject.next('The second thing has been sent');
subject.next('The third thing has been sent');

observer2.unsubscribe();

subject.next('The final thing has been sent');
*/

let subscription: Subscription;
let observable1 = Observable.create(
    (data: any) => {
        let i = 1;
        setInterval(() => {
            data.next(i++);
        },1000)
    }
);

let observable3 = Observable.create(
    (data: any) => {
        let i = 1;
        setInterval(() => {
            data.next(i++);
        },2000)
    }
);

let observable2 = Observable.create(
    (data: any) => {
        let i = 1000;
        setInterval(() => {
            data.next(i--);
        },1000)
    }
);



//let mergeObs = merge(observable1, observable2);
//let zippedObs = zip(observable1, observable2);
let combineLatestObs = switchMap(observable1, observable2, observable3);

subscription = combineLatestObs.subscribe(
    (data: any) => {
        console.log(typeof(data));
        addItem(data);
        
    }
);

setTimeout(() => {
    subscription.unsubscribe();
},5000)
/*mergeObs.subscribe(
    (data: any) => addItem(data)
);
*/
function addItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}
