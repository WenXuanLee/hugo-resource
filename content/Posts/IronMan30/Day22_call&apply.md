+++
date = "2018-01-06"
title = "call、apply、bind"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

##call()、apply()、bind()
今天來介紹這三個function，多半這三個function都與昨天介紹的this有關，我們已經了解this可以指到global object 或者是包含method的其他物件，如果能控制this最後的會是什麼狀態是不是一個很方便又美好的事呢?

沒有錯，因此Javascript裡面提供了 call()、apply()、bind()，想要透徹瞭解這三個傢伙，我們首先得確保理解function的概念，我們複習一下。

我們知道function是一個特別型態的物件，它有 name property，也就是函式名稱也可以是匿名，以及code property，讓函式可以被呼叫的，記得函式是一個object，所以也可以擁有property以及method，所以今天提到三個觀念就是Javascript提供在function物件裡面的method。

<img style="width:100%;height:auto;padding:10px" src="../images/call.png" />

##三幻神 vs this

###bind()
先看以下範例。
```
var friends ={
	name: 'Ben',
	greet: function() {
		return this.name;
	}
}

var myFriends = function(argu1, argu2) {

	console.log('Hi' + this.greet());
}.bind(friends)

myFriends();
```

透過昨天this的觀念，你一定了解了這個會造成error，因為函式myFriends的this會指到window，但加上了bind()後則可以正常運作。如以下

```
var friends ={
	name: 'Ben',
	greet: function() {
		return this.name;
	}
}

var myFriends = function(argu1, argu2) {

	console.log('Hi' + this.greet());
}.bind(friends)

myFriends();
```

bind()的概念是這個method會return一個新的function，實際上就是將function做一個copy。

當Javascript Engine讀取到bind()時，在execution context 創建時，會將bind後的參數指到this去，所以這邊的this指的就會是friends物件。

###call()
利用call我們也可以達到一樣的效果，但有些不一樣的細節。

```
var friends ={
	name: 'Ben',
	greet: function() {
		return this.name;
	}
}

var myFriends = function(argu1, argu2) {

	console.log('Hi' + this.greet());
	console.log(argu1,argu2);

}

myFriends.call(friends,'yo','bro');
```

不同於bind()，call()並沒有複製一個新的函式，而是 __執行__ 函式，在call()的第一個參數為指定給this的物件，後面則是函式原本的參數。

###apply()
apply跟call是差不多的，唯一的差別是apply後面的參數為陣列。
```
var friends ={
	name: 'Ben',
	greet: function() {
		return this.name;
	}
}

var myFriends = function(argu1, argu2) {

	console.log('Hi' + this.greet());
	console.log(argu1,argu2);

}

myFriends.apply(friends,['yo','bro']);
```

這當我們的參數是一長串資料時，更方便使用，透過Arry將所有參數集合再一起使用。

## Borrowing & Currying

###Borrowing
上面我們知道call & apply是直接執行函式的，並可以指定this的物件為何，而每個function都有這兩個method，物件裡的函式也不例外，因此我們可以做到下面這檔事。

```
var friends ={
	name: 'Ben',
	greet: function() {
		return this.name;
	}
}
var friends2 = {
	name: 'Danny',
	age: '15'
}

var myFriends = function(argu1, argu2) {

	console.log('Hi' + this.greet());
	console.log(argu1,argu2);

}

console.log('hi' + friends.greet.apply(friends2));
```

注意到，我們利用了apply()借用了friends裡面的method greet()，並把this指向friends2物件，這就是function borrowing，兩個性質相近的物件資料，可以透過call & apply借用method，而不需再新物件再多寫一次。

###Currying
從一個函式中建立一個新函式並有著初始值的參數，就是所謂的currying，見範例。

```
function add(a, b) {
	return a + b;
}

var addByTwo = add.bind(this, 2);
console.log(addByTwo(3)); // 5

var addByTen = add.bind(this, 10);
console.log(addByTen(3)); // 13
```

如範例，我們透過bind()建立一個新函式，並給定this以及一個參數，而實際上新建出來的函式就跟以下函式相同。

```
function addByTwo(b) {
	var a = 2;
	return a + b;
}

function addByTen(b) {
	var a = 10;
	return a + b;
}
```

像這樣透過原有函式新增一個帶有初始值參數的函式就是currying。

##結論

以上就是function內的 call、apply、bind三個method，這三個是很常見且很好運用的方法，但也常常被忽略，像我這種腦補型程式碼的傢伙，就會用得亂七八糟，東拼西湊的，也常常因為這三個method運用後搞不清楚this現在是指到誰去了，希望透過今天的範例大家可以清楚三者的用法。


### 參考來源
1.  [Udemy Course - JavaScript: Understanding the Weird Parts](https://www.udemy.com/understand-javascript/learn/v4/overview)
2. [You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md)