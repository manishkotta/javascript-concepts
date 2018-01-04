
import Rx from 'rxjs';
import express from 'express';
import events from 'events';
import { setInterval } from 'timers';

const app = express.Router();




var myEventhandler = function () {
    res.write('Scream')
}

var myEventHandler2 = function(){
    res.write('Shout');
}

var rxjsDemo = (req, res) => {

    // Generators in javascript
    function* foo(index) {
        while (index < 3)
            yield index++;
    }
    var x = foo(1);

    console.log(x.next().value);
    console.log(x.next().value);
    console.log(x.next().value);


    var eventEmitter = new events.EventEmitter();

    var observable = Rx.Observable.fromEvent(eventEmitter, 'scream');
    var observable2 = Rx.Observable.fromEvent(eventEmitter,'shout');

    var mainObservable = Rx.Observable.merge(
        observable,observable2
    )

    mainObservable
    .subscribe({
        next: () => mainObservable.pipe(myEventhandler,myEventHandler2) 
    });

    setInterval(function () {
        eventEmitter.emit('scream');
        eventEmitter.emit('shout');
    }, 1000);

}

app.get('/api/demo', rxjsDemo);

export default app;