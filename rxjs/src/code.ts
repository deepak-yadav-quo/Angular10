import { Observable, fromEvent, Subject } from 'rxjs';

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


function addItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}
