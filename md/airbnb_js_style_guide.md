#Airbnb JavaScript Style Guide() {
最最合理的JS规范指导手册

##Types关于类型
###基本类型, 如string  number  boolean  null  undefined
    const foo = 1;
    let bar = foo;
    bar = 9;
    console.log(foo, bar); // => 1, 9
###引用类型, 如object  array  function
    const foo = [1, 2];
    const bar = foo;
    bar[0] = 9;
    console.log(foo[0], bar[0]); // => 9, 9
##References 引用类型变量的定义
使用const来定义所有引用类型，避免使用var   
这样可以避免你错误的重新复制引用，通常这样会造成一些bug，而且代码的可读性会降低.   
eslint rules:  prefer-const ,  no-const-assign   

    //bad
    var a = 1;
    var b = 2;
    //good
    const a = 1;
    const b = 2;

如果你需要改变引用类型的值，使用let而不是var，因为let是块级作用域变量，而var是方法作用域变量
eslint rules:  no-var    

    // bad
    var count = 1;
    if (true) {
        count += 1;
    }
    // good, use the let.
    let count = 1;
    if (true) {
        count += 1;
    }

let跟const都是块级作用域定义
    // const and let only exist in the blocks they are defined in.
    {
      let a = 1;
      const b = 1;
    }
    console.log(a); // ReferenceError
    console.log(b); // ReferenceError

##Objects
使用字面量的方式定义对象
eslint rules:  no-new-object.   

  // bad
  const item = new Object();

  // good
  const item = {};

如果编写需要在浏览器端执行的代码，需要注意不能使用保留字/关键字作为键值（key）。在IE8中会发生问题。在服务器端或者ES6的模块中使用这些保留字并不会产生问题。   
保留字列表[Keyword&FutureReservedWord&NullLiteral&BooleanLiteral](http://es5.github.io/#x7.6.1)

    // bad
    const superman = {
      default: { clark: 'kent' },
      private: true,
    };

    // good
    const superman = {
      defaults: { clark: 'kent' },
      hidden: true,
    };

使用可读，词义清晰的词语替代保留字作为key

    // bad
    const superman = {
      class: 'alien',
    };

    // bad
    const superman = {
      klass: 'alien',
    };

    // good
    const superman = {
      type: 'alien',
    };

当创建的对象包含有可变属性名的时候，通过方法来计算生成该变量名。这样可以使你的对象所有的属性定义在一个声明中。

    function getKey(k) {
        return `a key named ${k}`;
    }

    // bad
    const obj = {
        id: 5,
        name: 'San Francisco',
    };
    obj[getKey('enabled')] = true;

    // good
    const obj = {
        id: 5,
        name: 'San Francisco',
        [getKey('enabled')]: true,
    };

使用方法简写
eslint rules:  object-shorthand .


    // bad
    const atom = {
        value: 1,

        addValue: function (value) {
            return atom.value + value;
        },
    };

    // good
    const atom = {
        value: 1,

        addValue(value) {
            return atom.value + value;
        },
    };

使用属性简写，这样写更简便更清晰
eslint rules:  object-shorthand .

    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
        lukeSkywalker: lukeSkywalker,
    };

    // good
    const obj = {
        lukeSkywalker,
    };

所有使用简写方式定义的属性，都写在对象声明的顶部，这样更加一目了然的知道哪些属性是shorthand的

    const anakinSkywalker = 'Anakin Skywalker';
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
        episodeOne: 1,
        twoJediWalkIntoACantina: 2,
        lukeSkywalker,
        episodeThree: 3,
        mayTheFourth: 4,
        anakinSkywalker,
    };

    // good
    const obj = {
        lukeSkywalker,
        anakinSkywalker,
        episodeOne: 1,
        twoJediWalkIntoACantina: 2,
        episodeThree: 3,
        mayTheFourth: 4,
    };

##Arrays
使用字面量的形式来创建数组，不要通过构造器。
eslint rules:  no-array-constructor .

    // bad
    const items = new Array();

    // good
    const items = [];

使用数组的push方法来向数组内添加内容。
    const someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');

使用展开操作来拷贝数组

    // bad
    const len = items.length;
    const itemsCopy = [];
    let i;

    for (i = 0; i < len; i++) {
      itemsCopy[i] = items[i];
    }

    // good
    const itemsCopy = [...items];

使用Array.from来转换所有类数组对象

    const foo = document.querySelectorAll('.foo');
    const nodes = Array.from(foo);

##Destructuring（解构）
当需要使用多种对象属性时，使用解构的方式来获取变量
解构能够是属性操作更加快捷方便。

    // bad
    function getFullName(user) {
        const firstName = user.firstName;
        const lastName = user.lastName;

        return `${firstName} ${lastName}`;
    }

    // good
    function getFullName(obj) {
        const { firstName, lastName } = obj;
        return `${firstName} ${lastName}`;
    }

    // best
    function getFullName({ firstName, lastName }) {
        return `${firstName} ${lastName}`;
    }

使用数组的解构

    const arr = [1, 2, 3, 4];

    // bad
    const first = arr[0];
    const second = arr[1];

    // good
    const [first, second] = arr;

使用对象解构的方式来返回多值，不要使用数组解构返回。通过这种方式，可以随时增减返回的属性条目或者改变他们的排序。
-
    // bad
    function processInput(input) {
        // then a miracle occurs
        return [left, right, top, bottom];
    }

    // the caller needs to think about the order of return data
    const [left, __, top] = processInput(input);

    // good
    function processInput(input) {
    // then a miracle occurs
        return { left, right, top, bottom };
    }

    // the caller selects only the data they need
    const { left, right } = processInput(input);

##Strings
字符串使用单引号
eslint rules:  quotes .

    // bad
    const name = "Capt. Janeway";

    // good
    const name = 'Capt. Janeway';

超过100个字符的字符串，需要换行显示，使用’+’拼接字符串。
需要注意的是，如果过度使用字符串拼接，可能会造成性能问题。___此问题待讨论解决___。

    // bad
    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

    // bad
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // good
    const errorMessage = 'This is a super long error that was thrown because ' +
        'of Batman. When you stop to think about how Batman had anything to do ' +
        'with this, you would get nowhere fast.';

使用模板来组合字符串。使用模板，可以提高可读性。
eslint rules:  prefer-template .

    // bad
    function sayHi(name) {
        return 'How are you, ' + name + '?';
    }

    // bad
    function sayHi(name) {
        return ['How are you, ', name, '?'].join();
    }

    // good
    function sayHi(name) {
        return `How are you, ${name}?`;
    }
__不要对字符串使用eval方法，这会带来太多的危害。__

##Functions
使用命名函数来声明方法，必要使用赋值变量的声明方式。这样在调用栈当中能更加清晰的识别执行函数。

    // bad
    const foo = function () {
    };

    // good
    function foo() {
    }

函数表达式
// immediately-invoked function expression (IIFE)   
IIFE 即执行函数的写法

    (() => {
      console.log('Welcome to the Internet. Please follow me.');
    })();

不要在`if while`等表达式内部声明函数,而是采取将函数赋值给变量的操作。各个浏览器对在`if while`之中声明的函数的解析各不相同。
__ECMA-262中定义了一份此类区块内的声明清单,声明函数不在其中__

    // bad
    if (currentUser) {
        function test() {
            console.log('Nope.');
        }
    }

    // good
    let test;
    if (currentUser) {
        test = () => {
            console.log('Yup.');
        };
    }

不要使用arguments做参数名

    // bad
    function nope(name, options, arguments) {
        // ...stuff...
    }

    // good
    function yup(name, options, args) {
        // ...stuff...
    }

不要使用arguments,选择`...`使用省略写法来替代,因为arguments是类数组，而...是真实的数组

    // bad
    function concatenateAll() {
        const args = Array.prototype.slice.call(arguments);
        return args.join('');
    }

    // good
    function concatenateAll(...args) {
        return args.join('');
    }

使用默认参数，不要定义了参数，而又在函数内部区判断该参数是否传入，这样真的非常糟糕

    function handleThings(opts) {
        // No! We shouldn't mutate function arguments.
        // Double bad: if opts is falsy it'll be set to an object which may
        // be what you want but it can introduce subtle bugs.
        opts = opts || {};
        // ...
    }

    // still bad
    function handleThings(opts) {
        if (opts === void 0) {
            opts = {};
        }
        // ...
    }

    // good
    function handleThings(opts = {}) {
        // ...
    }

要注意默认参数可能会带来的副作用,有时会会让人迷惑，如下代码例子：

    var b = 1;
    // bad
    function count(a = b++) {
      console.log(a);
    }
    count();  // 1
    count();  // 2
    count(3); // 3
    count();  // 3

将默认参数放在最后

    // bad
    function handleThings(opts = {}, name) {
        // ...
    }

    // good
    function handleThings(name, opts = {}) {
        // ...
    }

不要通过new一个函数构造器来创建新的函数，这会产生严重的代码危害性。

    // bad
    var add = new Function('a', 'b', 'return a + b');
    // still bad
    var subtract = Function('a', 'b', 'return a - b');

方法签名处的空格非常重要。有助于代码格式的统一，而且你不必再添加或者删除姓名时添加删除空格。
    // bad
    const f = function(){};
    const g = function (){};
    const h = function() {};
    // good
    const x = function () {};
    const y = function a() {};

##Arrow Functions
当需要使用方法表达式时，比如需要传第一个匿名方法参数时，使用箭头函数语法。
箭头函数会创建一个在this上下文中的函数版本，通常这样更便于我们的使用，而且语法上也会更加精简。
eslint rules:  prefer-arrow-callback ,  arrow-spacing .

    // bad
    [1, 2, 3].map(function (x) {
        const y = x + 1;
        return x * y;
    });

    // good
    [1, 2, 3].map((x) => {
        const y = x + 1;
        return x * y;
    });

如果箭头函数只有一条表达式，可以忽略return。而当有多行代码时，return不可忽略，否则会返回一个对象。
eslint rules:  arrow-parens ,  arrow-body-style.

    // good
    [1, 2, 3].map(number => `A string containing the ${number}.`);

    // bad
    [1, 2, 3].map(number => {
        const nextNumber = number + 1;
        `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map(number => {
        const nextNumber = number + 1;
        return `A string containing the ${nextNumber}.`;
    });
    
如果表达式过长（多行），使用小括号包起来。这样比较清晰。

    // bad
    [1, 2, 3].map(number => 'As time went by, the string containing the ' +
        `${number} became much longer. So we needed to break it over multiple ` +
        'lines.'
    );

    // good
    [1, 2, 3].map(number => (
        `As time went by, the string containing the ${number} became much ` +
        'longer. So we needed to break it over multiple lines.'
    ));

如果只有一个参数，可以省略函数签名的括号   
eslint rules:  arrow-parens .

    // good
    [1, 2, 3].map(x => x * x);

    // good
    [1, 2, 3].reduce((y, x) => x + y);

##Constructors
使用class，避免使用原型来模拟。这样语法上更加简练与合理。

    // bad
    function Queue(contents = []) {
        this._queue = [...contents];
    }
    Queue.prototype.pop = function () {
        const value = this._queue[0];
        this._queue.splice(0, 1);
        return value;
    }


    // good
    class Queue {
        constructor(contents = []) {
            this._queue = [...contents];
        }
        pop() {
            const value = this._queue[0];
            this._queue.splice(0, 1);
            return value;
        }
    }

使用extend做继承，这是底层实现，高效稳定。

    // bad
    const inherits = require('inherits');
    function PeekableQueue(contents) {
        Queue.apply(this, contents);
    }
    inherits(PeekableQueue, Queue);
    PeekableQueue.prototype.peek = function () {
        return this._queue[0];
    }

    // good
    class PeekableQueue extends Queue {
        peek() {
            return this._queue[0];
        }
    }

可以通过在方法中返回this来做链式调用。

    // bad
    Jedi.prototype.jump = function () {
        this.jumping = true;
        return true;
    };
    Jedi.prototype.setHeight = function (height) {
        this.height = height;
    };
    const luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20); // => undefined

    // good
    class Jedi {
        jump() {
            this.jumping = true;
            return this;
        }
        setHeight(height) {
            this.height = height;
            return this;
        }
    }
    const luke = new Jedi();
    luke.jump().setHeight(20);

放心的自定义toString方法，只要确保工作正确并且不会产生副作用。

    class Jedi {
        constructor(options = {}) {
            this.name = options.name || 'no name';
        }
        getName() {
            return this.name;
        }
        toString() {
            return `Jedi - ${this.getName()}`;
        }
    }

##Modules模块
使用es6的模块导入导出import/export

    // bad
    const AirbnbStyleGuide = require('./AirbnbStyleGuide');
    module.exports = AirbnbStyleGuide.es6;

    // ok
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    export default AirbnbStyleGuide.es6;

    // best
    import { es6 } from './AirbnbStyleGuide';
    export default es6;

不要使用\*做全部导入,这样能保证你的所有模块都有一个默认的export

    // bad
    import * as AirbnbStyleGuide from './AirbnbStyleGuide';

    // good
    import AirbnbStyleGuide from './AirbnbStyleGuide';

不要直接导出import的内容
    // bad
    // filename es6.js
    export { es6 as default } from './airbnbStyleGuide';

    // good
    // filename es6.js
    import { es6 } from './AirbnbStyleGuide';
    export default es6;

##Iterators and Generators
不要使用for...of，使用map（），reduce（）等替代方案   
eslint rules:  no-iterator .

    const numbers = [1, 2, 3, 4, 5];

    // bad
    let sum = 0;
    for (let num of numbers) {
        sum += num;
    }

    sum === 15;

    // good
    let sum = 0;
    numbers.forEach((num) => sum += num);
    sum === 15;

    // best (use the functional force)
    const sum = numbers.reduce((total, num) => total + num, 0);
    sum === 15;

__暂时__不要使用generators，generators不能很好的转换为ES5

##Properties
使用.来访问属性
eslint rules:  dot-notation .

    const luke = {
        jedi: true,
        age: 28,
    };

    // bad
    const isJedi = luke['jedi'];

    // good
    const isJedi = luke.jedi;

当属性名是变量时，使用[]来访问属性

    const luke = {
        jedi: true,
        age: 28,
    };
    function getProp(prop) {
        return luke[prop];
    }
    const isJedi = getProp('jedi');

##Variables
使用const来定义变量,不这么做的话会导致变量上升为全局变量

    // bad
    superPower = new SuperPower();

    // good
    const superPower = new SuperPower();

每个变量单独声明。这样在你增删变量定义时，就不用纠结我到底是逗号结尾还是分好结尾了。
eslint rules:  one-var .

    // bad
    const items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // bad
    // (compare to above, and try to spot the mistake)
    const items = getItems(),
        goSportsTeam = true;//说实话，我以前经常遇到
        dragonball = 'z';

    // good
    const items = getItems();
    const goSportsTeam = true;
    const dragonball = 'z';

const变量写一起，let变量协一起。

    // bad
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;

    // good
    const goSportsTeam = true;
    const items = getItems();

    let dragonball;
    let i;
    let length;

在你需要的地方来定义变量。因为let跟const是块级作用域变量。

    // good
    function () {
        test();
        console.log('doing stuff..');

        //..other stuff..

        const name = getName();

        if (name === 'test') {
            return false;
        }

        return name;
    }

    // bad - unnecessary function call
    function (hasName) {
        const name = getName();

        if (!hasName) {
            return false;
        }

        this.setFirstName(name);

        return true;
    }

    // good
    function (hasName) {
        if (!hasName) {
            return false;
        }

        const name = getName();
        this.setFirstName(name);

        return true;
    }

##Hoisting变量定义的自上升,自动上升到该作用域的顶部
使用`var`关键字参数的定义会自动升到作用域的最顶部，但是赋值语句不会升至顶部。
而`const`和`let`关键字所声明的变量是由一种新的设计观念(TDZ)所保护的,并不会自上升,所以有必要了解为何我们说`typeof`不再是一个万无一失的方法.

    // we know this wouldn't work (assuming there
    // is no notDefined global variable)
    function example() {
        console.log(notDefined); // => throws a ReferenceError
    }

    // creating a variable declaration after you
    // reference the variable will work due to
    // variable hoisting. Note: the assignment
    // value of `true` is not hoisted.
    function example() {
        console.log(declaredButNotAssigned); // => undefined
        var declaredButNotAssigned = true;
    }

    // The interpreter is hoisting the variable
    // declaration to the top of the scope,
    // which means our example could be rewritten as:
    function example() {
        let declaredButNotAssigned;
        console.log(declaredButNotAssigned); // => undefined
        declaredButNotAssigned = true;
    }

    // using const and let
    function example() {
        console.log(declaredButNotAssigned); // => throws a ReferenceError
        console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
        const declaredButNotAssigned = true;
    }

匿名函数会自上升变量，而不会将变量赋值自上升

    function example() {
        console.log(anonymous); // => undefined

        anonymous(); // => TypeError anonymous is not a function

        var anonymous = function () {
            console.log('anonymous function expression');
        };
    }

命名函数会自上升变量名，而不会自上升函数名或者函数定义

    function example() {
        console.log(named); // => undefined

        named(); // => TypeError named is not a function

        superPower(); // => ReferenceError superPower is not defined

        var named = function superPower() {
            console.log('Flying');
        };
    }

    // the same is true when the function name
    // is the same as the variable name.
    function example() {
        console.log(named); // => undefined

        named(); // => TypeError named is not a function

        var named = function named() {
            console.log('named');
        }
    }

声明式函数会自上升函数名以及函数定义

    function example() {
        superPower(); // => Flying

        function superPower() {
            console.log('Flying');
        }
    }

更多关于JavaScript作用域以及自上升的信息请参考[JavaScript Scoping & Hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html) by Ben Cherry.

##Comparison Operators & Equality
使用`===`与`!==`做比较
条件表达式如`if`会调用`ToBoolean`这个抽象方法来做强制转换,遵循以下这个转换原则:   
`Objects` 计算结果为 `true`   
空字符串''计算结果为`false`，非空字符串计算为`true`   
+0,-0,NaN计算为`false` 关于+0，-0的比较可以参考我的博客   
eslint rules:  eqeqeq .

    if ([0]) {
      // true
      // An array is an object, objects evaluate to true
    }

在做比较时，使用简写

    // bad
    if (name !== '') {
        // ...stuff...
    }

    // good
    if (name) {
        // ...stuff...
    }

    // bad
    if (collection.length > 0) {
        // ...stuff...
    }

    // good
    if (collection.length) {
        // ...stuff...
    }

关于判断的真假值问题，更多的信息请参考由[Angus Croll](https://github.com/angus-c/)的文章[Truth Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108)

##Blocks
多行区块使用括号

    // bad
    if (test)
        return false;

    // good
    if (test) return false;

    // good
    if (test) {
        return false;
    }

    // bad
    function () { return false; }

    // good
    function () {
        return false;
    }

如果你使用`if`和`else`在多行区块内，将else放在if区块结束`}`后面
eslint rules:  brace-style .

    // bad
    if (test) {
        thing1();
        thing2();
    }
    else {
        thing3();
    }

    // good
    if (test) {
        thing1();
        thing2();
    } else {
        thing3();
    }

##Comments
多行注释使用/\*\*.../   

    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    function make(tag) {
        // ...stuff...

        return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed in tag name
     *
     * @param {String} tag
     * @return {Element} element
     */
    function make(tag) {
        // ...stuff...

        return element;
    }
    
使用//做单行注释,注释独立成行,注释写被注释内容的上方,并且在注释的上方留一个空行，除非是第一行，则不用留空行

    // bad
    const active = true;  // is current tab

    // good
    // is current tab
    const active = true;

    // bad
    function getType() {
        console.log('fetching type...');
        // set the default type to 'no type'
        const type = this._type || 'no type';

        return type;
    }

    // good
    function getType() {
        console.log('fetching type...');

        // set the default type to 'no type'
        const type = this._type || 'no type';

        return type;
    }

    // also good
    function getType() {
        // set the default type to 'no type'
        const type = this._type || 'no type';

        return type;
    }

- 17.3 Prefixing your comments with  FIXME  or  TODO  helps other developers quickly understand if you're pointing out a problem that needs to be revisited, or if you're suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are  FIXME -- need to figure this out  or  TODO -- need to implement .
在注释中使用`FIXME`和`TODO`来标注详细信息，这样有助于其他人员迅速的理解代码
使用`// FIXME:  to annotate problems.`来标注问题或者bug

    class Calculator extends Abacus {
        constructor() {
            super();

            // FIXME: shouldn't use a global here
            total = 0;
        }
    }

使用`// TODO:  to annotate solutions to problems.`来标注解决方案或者待实现内容

    class Calculator extends Abacus {
        constructor() {
            super();

            // TODO: total should be configurable by an options param
            this.total = 0;
        }
    }

##Whitespace
使用4个空格（原文为2个空格）做缩进，我一直使用的4个空格做缩进。。。,包括在翻译本文的时候的事例代码的缩进全部使用的4个空格
不过这应该只是一种代码格式的风格，大家可以自行选择
eslint rules:  indent .

    // bad
    function () {
    ∙∙∙∙const name;
    }

    // bad
    function () {
    ∙const name;
    }

    // good
    function () {
    ∙∙const name;
    }
开始的括号前插入一个空格
eslint rules:  space-before-blocks .

    // bad
    function test(){
        console.log('test');
    }

    // good
    function test() {
        console.log('test');
    }

    // bad
    dog.set('attr',{
        age: '1 year',
        breed: 'Bernese Mountain Dog',
    });

    // good
    dog.set('attr', {
        age: '1 year',
        breed: 'Bernese Mountain Dog',
    });

`if while`等括号开始前加一个空格,函数的调用跟声明的时候不要再参数列表之前加空格
eslint rules:  space-after-keywords ,  space-before-keywords .

  // bad
  if(isJedi) {
    fight ();
  }

  // good
  if (isJedi) {
    fight();
  }

  // bad
  function fight () {
    console.log ('Swooosh!');
  }

  // good
  function fight() {
    console.log('Swooosh!');
  }

操作符加前后空格
eslint rules:  space-infix-ops .

    // bad
    const x=y+5;

    // good
    const x = y + 5;

文件结尾处加一个换行符,不要加一个空行

    // bad
    (function (global) {
        // ...stuff...
    })(this);
    // bad
    (function (global) {
        // ...stuff...
    })(this);↵
    ↵
    // good
    (function (global) {
        // ...stuff...
    })(this);↵

当有一个很长的链式调用时，使用.号开头做缩进

    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();

    // bad
    $('#items').
      find('.selected').
        highlight().
        end().
      find('.open').
        updateCount();

    // good
    $('#items')
      .find('.selected')
        .highlight()
        .end()
      .find('.open')
        .updateCount();

    // bad
    const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').class('led', true)
        .attr('width', (radius + margin) * 2).append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .classed('led', true)
        .attr('width', (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);

在块内容结束之后添加一个新行

    // bad
    if (foo) {
        return bar;
    }
    return baz;

    // good
    if (foo) {
        return bar;
    }

    return baz;

    // bad
    const obj = {
        foo() {
        },
        bar() {
        },
    };
    return obj;

    // good
    const obj = {
        foo() {
        },

        bar() {
        },
    };

    return obj;

    // bad
    const arr = [
        function foo() {
        },
        function bar() {
        },
    ];
    return arr;

    // good
    const arr = [
        function foo() {
        },

        function bar() {
        },
    ];

    return arr;

不要在区块代码内部填充空行
eslint rules:  padded-blocks .

    // bad
    function bar() {

        console.log(foo);

    }

    // also bad
    if (baz) {

        console.log(qux);
    } else {
        console.log(foo);
    }

    // good
    function bar() {
        console.log(foo);
    }

    // good
    if (baz) {
        console.log(qux);
    } else {
        console.log(foo);
    }

不要在小括号内部填充空格
eslint rules:  space-in-parens .

    // bad
    function bar( foo ) {
        return foo;
    }

    // good
    function bar(foo) {
        return foo;
    }

    // bad
    if ( foo ) {
        console.log(foo);
    }

    // good
    if (foo) {
        console.log(foo);
    }

不要在中括号内填充空格
eslint rules:  array-bracket-spacing .

    // bad
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);

    // good
    const foo = [1, 2, 3];
    console.log(foo[0]);

在大括号内部填充空格
eslint rules:  object-curly-spacing .

    // bad
    const foo = {clark: 'kent'};

    // good
    const foo = { clark: 'kent' };

##Commas
逗号不要前置
eslint rules:  comma-style .

    // bad
    const story = [
          once
        , upon
        , aTime
    ];

    // good
    const story = [
        once,
        upon,
        aTime,
    ];

    // bad
    const hero = {
          firstName: 'Ada'
        , lastName: 'Lovelace'
        , birthYear: 1815
        , superPower: 'computers'
    };

    // good
    const hero = {
        firstName: 'Ada',
        lastName: 'Lovelace',
        birthYear: 1815,
        superPower: 'computers',
    };

不要省略逗号,git diff 会显示这个省略的不同，不造成其他同事的困扰,你也不必担心，babel会自动将comma去掉，以便在一些老的浏览器中不会产生问题
eslint rules:  no-comma-dangle .

    // bad - git diff without trailing comma
    const hero = {
      firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb graph', 'modern nursing']
    };

    // good - git diff with trailing comma
    const hero = {
        firstName: 'Florence',
        lastName: 'Nightingale',
    +   inventorOf: ['coxcomb chart', 'modern nursing'],
    };

    // bad
    const hero = {
        firstName: 'Dana',
        lastName: 'Scully'
    };

    const heroes = [
        'Batman',
        'Superman'
    ];

    // good
    const hero = {
        firstName: 'Dana',
        lastName: 'Scully',
    };

    const heroes = [
        'Batman',
        'Superman',
    ];

##Semicolons
不要省略分号
eslint rules:  semi .

    // bad
    (function () {
        const name = 'Skywalker'
        return name
    })()

    // good
    (() => {
        const name = 'Skywalker';
        return name;
    })();

    // good (guards against the function becoming an argument when two files with IIFEs are concatenated)
    ;(() => {
        const name = 'Skywalker';
        return name;
    })();

##Type Casting & Coercion
使用强制类型转换
- 21.2 Strings:

    //  => this.reviewScore = 9;

    // bad
    const totalScore = this.reviewScore + '';

    // good
    const totalScore = String(this.reviewScore);

- 21.3 Numbers: Use  Number  for type casting and  parseInt  always with a radix for parsing strings.使用`Number`做类型转换,使用`parseInt`配合进制来做转换
eslint rules: radix.

    const inputValue = '4';

    // bad
    const val = new Number(inputValue);

    // bad
    const val = +inputValue;

    // bad
    const val = inputValue >> 0;

    // bad
    const val = parseInt(inputValue);

    // good
    const val = Number(inputValue);


    const inputValue= '16';

    // good
    const val = parseInt(inputValue, 10);//16

    // good 
    const val = parseInt(inputValue, 16);//22

- 21.4 If for whatever reason you are doing something wild and  parseInt  is your bottleneck and need to use Bitshift for performance reasons, leave a comment explaining why and what you're doing.
有时在使用parseInt时会发现性能比较差，这是可以考虑使用Bitshift,参考[这里](http://jsperf.com/coercion-vs-casting/3)

    // good
    /**
    * parseInt was the reason my code was slow.
    * Bitshifting the String to coerce it to a
    * Number made it a lot faster.
    */
    const val = inputValue >> 0;

- 21.5 Note: Be careful when using bitshift operations. Numbers are represented as 64-bit values, but Bitshift operations always return a 32-bit integer (source). Bitshift can lead to unexpected behavior for integer values larger than 32 bits. Discussion. Largest signed 32-bit Int is 2,147,483,647:
在使用bitshift时需要谨慎，数字类型是以64位，但是bitshift操作往往返回一个32位的整形，所以当对一个大于32位长度的数值使用bitshift时会产生一些不可预测的行为.

    2147483647 >> 0 //=> 2147483647
    2147483648 >> 0 //=> -2147483648
    2147483649 >> 0 //=> -2147483647

布尔类型

    const age = 0;

    // bad
    const hasAge = new Boolean(age);

    // good
    const hasAge = Boolean(age);

    // good
    const hasAge = !!age;

##Naming Conventions

不要使用单个字符来命名变量或者函数

    // bad
    function q() {
        // ...stuff...
    }

    // good
    function query() {
        // ..stuff..
    }

使用驼峰式来命名对象，函数以及实例
eslint rules:  camelcase .

    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}

    // good
    const thisIsMyObject = {};
    function thisIsMyFunction() {}

使用PascalCase来命名构造器和类

    // bad
    function user(options) {
        this.name = options.name;
    }

    const bad = new user({
        name: 'nope',
    });

    // good
    class User {
        constructor(options) {
            this.name = options.name;
        }
    }

    const good = new User({
        name: 'yup',
    });

对私有属性加\_
eslint rules:  no-underscore-dangle .

    // bad
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';

    // good
    this._firstName = 'Panda';

不要赋值对`this`的引用,使用箭头函数或者Function#bind方法

    // bad
    function foo() {
        const self = this;
        return function () {
            console.log(self);
        };
    }

    // bad
    function foo() {
        const that = this;
        return function () {
            console.log(that);
        };
    }

    // good
    function foo() {
        return () => {
            console.log(this);
        };
    }

如果文件只包含一个类，文件名必须与类名相同

    // file contents
    class CheckBox {
        // ...
    }
    export default CheckBox;

    // in some other file
    // bad
    import CheckBox from './checkBox';

    // bad
    import CheckBox from './check_box';

    // good
    import CheckBox from './CheckBox';

当使用默认导出一个函数式，文件名需要与函数名相同,使用驼峰式命名

    function makeStyleGuide() {
    }

    export default makeStyleGuide;

当导出的是一个单例/工厂类/空对象时,当使用PascaalCase的命名方式

    const AirbnbStyleGuide = {
        es6: {
        }
    };

    export default AirbnbStyleGuide;

##Accessors
- 23.1 Accessor functions for properties are not required.
没有必要单独编写函数属性的获取方法
如果非要有，使用`getVal()`和`setVal('hello')`方法

    // bad
    dragon.age();

    // good
    dragon.getAge();

    // bad
    dragon.age(25);

    // good
    dragon.setAge(25);

如果是布尔值的属性，使用`isVal()` 或者 `hasVal()`

    // bad
    if (!dragon.age()) {
        return false;
    }

    // good
    if (!dragon.hasAge()) {
        return false;
    }

get set方法可以有，最好使用统一的实现

    class Jedi {
        constructor(options = {}) {
            const lightsaber = options.lightsaber || 'blue';
            this.set('lightsaber', lightsaber);
        }

        set(key, val) {
            this[key] = val;
        }

        get(key) {
            return this[key];
        }
    }

##Events
使用对象做事件参数,这样便于以后的维护以及拓展

    // bad
    $(this).trigger('listingUpdated', listing.id);

    ...

    $(this).on('listingUpdated', function (e, listingId) {
      // do something with listingId
    });

    // good
    $(this).trigger('listingUpdated', { listingId: listing.id });

    ...

    $(this).on('listingUpdated', function (e, data) {
      // do something with data.listingId
    });

##jQuery
jQuery变量对象使用\$作为命名前缀

    // bad
    const sidebar = $('.sidebar');

    // good
    const $sidebar = $('.sidebar');

    // good
    const $sidebarBtn = $('.sidebar-btn');

当使用jQuery的选择器时，使用变量保存引用

    // bad
    function setSidebar() {
        $('.sidebar').hide();

        // ...stuff...

        $('.sidebar').css({
            'background-color': 'pink'
        });
    }

    // good
    function setSidebar() {
        const $sidebar = $('.sidebar');
        $sidebar.hide();

        // ...stuff...

        $sidebar.css({
            'background-color': 'pink'
        });
    }

jQuery选择器使用链式查找或者子节点查找的方式，如`$('.sidebar ul')` ， `$('.sidebar > ul')`
在子节点中查找时，使用find

    // bad
    $('ul', '.sidebar').hide();

    // bad
    $('.sidebar').find('ul').hide();

    // good
    $('.sidebar ul').hide();

    // good
    $('.sidebar > ul').hide();

    // good
    $sidebar.find('ul').hide();


以上为所有对本文的翻译，以下为一些相关内容，暂时不做翻译
//TODO:修改格式，完善翻译，跟原作者申请pull request 2016.1.12 Timiz Qi

---

##ECMAScript 5 Compatibility
- 26.1 Refer to Kangax's ES5 compatibility table.

##ECMAScript 6 Styles
- 27.1 This is a collection of links to the various es6 features.
- Arrow FunctionsClassesObject ShorthandObject ConciseObject Computed PropertiesTemplate StringsDestructuringDefault ParametersRestArray SpreadsLet and ConstIterators and GeneratorsModules

##Testing
- 28.1 Yup.
- function () {
  return true;
}
- 28.2 No, but seriously:
    - Whichever testing framework you use, you should be writing tests!Strive to write many small pure functions, and minimize where mutations occur.Be cautious about stubs and mocks - they can make your tests more brittle.We primarily use  mocha  at Airbnb.  tape  is also used occasionally for small, separate modules.100% test coverage is a good goal to strive for, even if it's not always practical to reach it.Whenever you fix a bug, write a regression test. A bug fixed without a regression test is almost certainly going to break again in the future.

##Performance
- On Layout & Web PerformanceString vs Array ConcatTry/Catch Cost In a LoopBang FunctionjQuery Find vs Context, SelectorinnerHTML vs textContent for script textLong String ConcatenationLoading...
⬆ back to top

##Resources
Learning ES6
- Draft ECMA 2015 (ES6) SpecExploringJSES6 Compatibility TableComprehensive Overview of ES6 Features
Read This
- Standard ECMA-262
Tools
- Code Style Linters
    - ESlint - Airbnb Style .eslintrcJSHint - Airbnb Style .jshintrcJSCS - Airbnb Style Preset
Other Style Guides
- Google JavaScript Style GuidejQuery Core Style GuidelinesPrinciples of Writing Consistent, Idiomatic JavaScript
Other Styles
- Naming this in nested functions - Christian JohansenConditional Callbacks - Ross AllenPopular JavaScript Coding Conventions on Github - JeongHoon ByunMultiple var statements in JavaScript, not superfluous - Ben Alman
Further Reading
- Understanding JavaScript Closures - Angus CrollBasic JavaScript for the impatient programmer - Dr. Axel RauschmayerYou Might Not Need jQuery - Zack Bloom & Adam SchwartzES6 Features - Luke HobanFrontend Guidelines - Benjamin De Cock
Books
- JavaScript: The Good Parts - Douglas CrockfordJavaScript Patterns - Stoyan StefanovPro JavaScript Design Patterns - Ross Harmes and Dustin DiazHigh Performance Web Sites: Essential Knowledge for Front-End Engineers - Steve SoudersMaintainable JavaScript - Nicholas C. ZakasJavaScript Web Applications - Alex MacCawPro JavaScript Techniques - John ResigSmashing Node.js: JavaScript Everywhere - Guillermo RauchSecrets of the JavaScript Ninja - John Resig and Bear BibeaultHuman JavaScript - Henrik JoretegSuperhero.js - Kim Joar Bekkelund, Mads Mobæk, & Olav BjorkoyJSBooks - Julien BouquillonThird Party JavaScript - Ben Vinegar and Anton KovalyovEffective JavaScript: 68 Specific Ways to Harness the Power of JavaScript - David HermanEloquent JavaScript - Marijn HaverbekeYou Don't Know JS: ES6 & Beyond - Kyle Simpson
Blogs
- DailyJSJavaScript WeeklyJavaScript, JavaScript...Bocoup WeblogAdequately GoodNCZOnlinePerfection KillsBen AlmanDmitry BaranovskiyDustin Diaznettuts
Podcasts
- JavaScript Jabber
⬆ back to top

##In the Wild
This is a list of organizations that are using this style guide. Send us a pull request and we'll add you to the list.
- Aan Zee: AanZee/javascriptAdult Swim: adult-swim/javascriptAirbnb: airbnb/javascriptApartmint: apartmint/javascriptAvalara: avalara/javascriptBillabong: billabong/javascriptBisk: bisk/javascriptBlendle: blendle/javascriptComparaOnline: comparaonline/javascriptCompass Learning: compasslearning/javascript-style-guideDailyMotion: dailymotion/javascriptDigitpaintdigitpaint/javascriptEcosia: ecosia/javascriptEvernote: evernote/javascript-style-guideExactTarget: ExactTarget/javascriptExpensifyExpensify/Style-GuideFlexberry: Flexberry/javascript-style-guideGawker Media: gawkermedia/javascriptGeneral Electric: GeneralElectric/javascriptGoodData: gooddata/gdc-js-styleGrooveshark: grooveshark/javascriptHow About We: howaboutwe/javascriptHuballin: huballin/javascriptHubSpot: HubSpot/javascriptHyper: hyperoslo/javascript-playbookInfoJobs: InfoJobs/JavaScript-Style-GuideIntent Media: intentmedia/javascriptJam3: Jam3/Javascript-Code-ConventionsJeopardyBot: kesne/jeopardy-botJSSolutions: JSSolutions/javascriptKinetica Solutions: kinetica/javascriptMighty Spring: mightyspring/javascriptMinnPost: MinnPost/javascriptMitocGroup: MitocGroup/javascriptModCloth: modcloth/javascriptMoney Advice Service: moneyadviceservice/javascriptMuber: muber/javascriptNational Geographic: natgeo/javascriptNational Park Service: nationalparkservice/javascriptNimbl3: nimbl3/javascriptOrion Health: orionhealth/javascriptPeerby: Peerby/javascriptRazorfish: razorfish/javascript-style-guidereddit: reddit/styleguide/javascriptReact: /facebook/react/blob/master/CONTRIBUTING.md#style-guideREI: reidev/js-style-guideRipple: ripple/javascript-style-guideSeekingAlpha: seekingalpha/javascript-style-guideShutterfly: shutterfly/javascriptSpringload: springload/javascriptStudentSphere: studentsphere/javascriptTarget: target/javascriptTheLadders: TheLadders/javascriptT4R Technology: T4R-Technology/javascriptVoxFeed: VoxFeed/javascript-style-guideWeggo: Weggo/javascriptZillow: zillow/javascriptZocDoc: ZocDoc/javascript

##Translation
This style guide is also available in other languages:
- Brazilian Portuguese: armoucar/javascript-style-guideBulgarian: borislavvv/javascriptCatalan: fpmweb/javascript-style-guideChinese (Simplified): sivan/javascript-style-guideChinese (Traditional): jigsawye/javascriptFrench: nmussy/javascript-style-guideGerman: timofurrer/javascript-style-guideItalian: sinkswim/javascript-style-guideJapanese: mitsuruog/javacript-style-guideKorean: tipjs/javascript-style-guidePolish: mjurczyk/javascriptRussian: uprock/javascriptSpanish: paolocarrasco/javascript-style-guideThai: lvarayut/javascript-style-guide

##The JavaScript Style Guide Guide
- Reference

##Chat With Us About JavaScript
- Find us on gitter.

##Contributors
- View Contributors

##License
(The MIT License)
Copyright (c) 2014 Airbnb
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

##Amendments
We encourage you to fork this guide and change the rules to fit your team's style guide. Below, you may list some amendments to the style guide. This allows you to periodically update your style guide without having to deal with merge conflicts.

##};

