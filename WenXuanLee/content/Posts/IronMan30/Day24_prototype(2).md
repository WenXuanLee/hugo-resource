+++
date = "2018-01-08"
title = "prototype"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

## Everything is Object

今天來談談prototype一些注意的細節，我們知道Javascript裡面所有的變數都是一個物件不然就是Primtive，也就是說除了primitive - number, string, boolean, ect 以外，全都是物件 - function、array、basic objects. 所有的物件以及primitive都有prototype。

但唯一有一個例外，base object，也就是object的最底層。

## Everything has a prototype

讓我們用一下範例來看一下prototype吧，我們用basic object、function、array為例子。

```
var a = {};
function b() {};
var c = [];
```
### Object a

<img style="width:100%;height:auto;padding:10px" src="../images/prototype5.png" />

我們看到了物件a的proto仍然是一個物件，而其中擁有許多property以及method，其中我們可以看到熟悉的toString()。

### function b

<img style="width:100%;height:auto;padding:10px" src="../images/prototype7.png" />

<img style="width:100%;height:auto;padding:10px" src="../images/prototype6.png" />

function b的proto則是一個function object，而其中包含的許多method，包含我們先前才介紹的call()、apply()、bind()，這也就是為什麼每個function都能使用這三個method的原因，就是擁有這個function prototype。

### array c

<img style="width:100%;height:auto;padding:10px" src="../images/prototype8.png" />

array的proto我們看到了仍然是一個object，而這個object包含了常見的array method，包括了 pop()、push() ... ，所有的array proto都會指到這一個object，也就是為何每個array都可以用到常見的method。

#### Tricky
透過三個範例知道了為什麼平常可以用一些好用的method了嗎，這就是prototype的功力阿，

那如果這些proto的proto又是什麼呢。

<img style="width:100%;height:auto;padding:10px" src="../images/prototype9.png" />

這就是最底層的object了，每個object都共享的base object。

## reflection & extend
接下來我們深入探討一下object的兩個觀念，有助於我們理解prototype的運作

### Reflection
Reflection的定義為，object可以查看自己，列出並更改自己的properties & methods。所以Javascript Object能夠觀察自己的properties & methods。

透過這樣的一個特性我們可以實行一個好用的pattern - extend。
那我們先來看一下 Reflection的範例。

```
var person = {
	firstName: 'Default',
	lastName: 'Default',
	getFullName: function() {
		return this.firstName + ' ' + this.lastName;
	}

}

var john = {
	firstName: 'Ben',
	lastName: 'Lee'
}

//千萬不要亂用__proto__，此為demo。
john.__proto__ = person;

for ( var prop in john) {
	console.log(prop + ': ' + john[prop]);
}

```

得到的結果為

<img style="width:100%;height:auto;padding:10px" src="../images/prototype10.png" />

有沒有發現哪裡怪怪的，proto的method也被列出來了，這樣未免也太混淆了，所以我們可以透過 hasOwnProperty()method，只查看自己物件的property就好。

```
for ( var prop in john) {
	if(john.hasOwnProperty(prop)) {
		console.log(prop + ': ' + john[prop]);
	}
}

```

因此我們可以reflect john object，查看它的properties & method。

### Extend

透過上述我們知道object可以查看自己，並運用此特性做extend，也就是雖然可以share object內的property & methods，但有時候object會想要新增一些功能而不要是prototype型態，這時候我們就能利用extends來達到。

```
var person = {
	firstName: 'Default',
	lastName: 'Default',
	getFullName: function() {
		return this.firstName + ' ' + this.lastName;
	}

}

var john = {
	firstName: 'Ben',
	lastName: 'Lee'
}

//千萬不要亂用__proto__，此為demo。
john.__proto__ = person;

for ( var prop in john) {
	console.log(prop + ': ' + john[prop]);
}

var jane = {
	addess: '111 Main St.',
	getFormalFullName: function() {
		return this.lastName + ', ' + this.firstName;
	}
}

$.extend(true, john, jane);
console.log(john);
```

<img style="width:100%;height:auto;padding:10px" src="../images/prototype11.png" />

上面的範例中，我們透過extend將兩個物件結合起來，不同於prototype，extends只屬於特定object，將原本的物件做擴增的動作，而這也常被應用於library，也就是我們可以透過extend的作法，寫出自己的library，我們可以結合objects，而不需要一直透過prototype chain。

### 參考來源
1.  [Udemy Course - JavaScript: Understanding the Weird Parts](https://www.udemy.com/understand-javascript/learn/v4/overview)
