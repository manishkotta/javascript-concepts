function Main() {
    arrayManipulation();
    console.log(Rectangle(1, 2, 3, 4, 5, 6, 7, 8, 9));
    TemplateStrings();
    Destructuring();
    DefaultRestSpread();
    var objExample = new Example([1, 2, 3]);
}


function arrayManipulation() {
    var evens = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38];
    // Expression Bodies
    var odds = evens.map(v => v + 1);
    var nums = evens.map((v, i) => v + i);

    var fives = [];
    // Statement Bodies
    nums.forEach(v => {

        if (v % 5 == 0) {
            fives.push(v);
        }
    });

    console.log(fives);
    console.log(odds);
}

//Lexical Arguments
// We can access the arguments passed throught the rectangle object by using "arguments"
// The scope of the arguments can be still alive in its child functions which are arrow functions.
function Rectangle(x) {
    console.log(x);
    console.log(arguments);
    let example = () => {
        let numbers = [];
        for (let number of arguments) {
            numbers.push(number * number);
        }
        return numbers;
    }
    return example();
}


//Lexical this
var bob = {
    _name: 'Bob',
    _friends: ['kkk'],
    printFriends() {
        this._friends.forEach((v, i) =>
            console.log(this._name + "knows" + i));
    }
};

bob.printFriends();

// Start

// Es6 Classes
class Parent {

    constructor(props) {
        this._props = props;
    }
    updated() {
        console.log("updated");
    }
}

class Example extends Parent {
    constructor(props) {
        super(props);
        super.updated;
    }
}

// End

// Enchance Object Litreals
// Need to work

// Template strings
function TemplateStrings() {


    // Basic literal string creation
    console.log(`Normal string`);

    // Multiline strings
    var multiLineString = `Multi
    line string`;
    console.log(multiLineString);


    // Interpolate variable bindings
    var name = "Bob", time = "today";
    console.log(`Hello ${name}, how are you ${time}?`);

    console.log(String.raw`In Es5 '\n is a line feed.`);
}


// Destructuring 

function getASTNode() {
    return {
        op: 1,
        lhs:{
            op:{
                b: 1
            }
        },
        rhs:{
            c: 2
        }
    };
}

function Destructuring() {

    //List Matching
    var [a, , b] = [1, 2, 3];
    console.log([a, , b]);

    //Object matching
    var { op: a, lhs: { op: b }, rhs: c } = getASTNode();
    console.log(a,b,c);

    //Same props names
    var {op,lhs,rhs} = getASTNode();
    console.log(op,lhs,c);

    // Destructuring + defaults arguments
    function r({w,r,x=10,y=20}){
        return w+r+x+y;
    }
    console.log(r({w:11,r:20}));
}

// Default + Rest + Spread

function DefaultRestSpread(){

(function (x=10,y=20){
    console.log(x+y);
}());

(function (x=10 , ...rest){
   console.log(x,rest)
}(1,'hello','world',function(x){ return x;}));

(function (x,y,z){
 console.log(x+y+z);
}(...[1,2,3]));

}

// Let + Const

(function() {
    {

      let x=10;
      {
        // this is ok since it's a block scoped name
          const x = "sneaky";
        // // error, was just defined with `const` above
        // x = "foo";
        console.log(x);
      }
      // this is ok since it was declared with `let`
      x = "bar";
    //   // error, already declared above in this block
    //   let x = "inner";
    }
  }());


 // Iterators + For of
 // Need to work on it.


 // Map + Set + Weakset + Weakmap

 (function(){

    // Set
    var s =new Set();
    s.add('hello').add('goodbye').add('world');
    console.log(s.size,s);

    //Map
    var m = new Map();
    m.set('hello',24);
    console.log(m.size,m);


    //WeakSet
    //WeakSet allows garbage collector to do its task
    var ws = new WeakSet();
    ws.add({ data: 42 });
    console.log(ws.size,ws);


    //Weakmap
    // Weakmap allows garbage collector to do its task
    var wm = new WeakMap();
    wm.set(ws,{extra:23});
    console.log(wm.size,wm);


 }());

 // Proxies
(function (){
// Proxying a normal object
var target = {};
var handler = {
  get: function (receiver, name) {
    return `Hello, ${name}!`;
  }
};

var p = new Proxy(target, handler);
console.log(p.head);
}());