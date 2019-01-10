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

## Functional Programming

我們明白Javascript的函式是first class function，也就是function可以被當成value,parameter，甚至return 一個function，這樣的設計就讓我們可以延伸到一個程式設計的概念，funtional programming，前面有提到，但挺簡略的，今天就來了解這個程式設計概念吧。

### Sample#1

先看個範例，感受一下functional programming的奧妙之處。

```
var arr1 = [1,2,3];
console.log(arr1);

var arr2 = [];
for(var i = 0; i < arr1.length; i++) {

	arr2.push(arr1[i] * 2);

}

console.log(arr2);
```

上面這個範例是不是顯得有點冗長，在程式中，我們通常想要越偷懶越好啊，打這麼多字豈不是浪費我的生命，打字的時間不如拿來打人中之龍。 接下來我們看functional programming的寫法。

```
function easyWay(arr, fn) {

	var newArr = [];
	for(var i = 0; i < arr.length; i++) {

		newArr.push(
			fn(arr[i]) //functional programming;
		);
	}
	return newArr;
}

var arr1 = [1,2,3];
var arr2 = easyWay(arr1, function(item) {
	return item * 2;
});

console.log(arr2);
```

看到了嗎，我們透過一個函式省略掉了原本的for迴圈，且此函示接受兩個參數，陣列與函式，今天如果我們要在對arr1做不同的動作，我們不需要在重寫一個for迴圈，只要針對動作的函式撰寫就好。


### Sample#2

透過function programming的寫法，我們今天若想再針對陣列做不同的動作只要如以下，將函式的第二個參數函式作內容撰寫就好。

```
var arr3 = easyWay(arr1, function(item) {
	return item > 2;
});
```

有感受到那個力量了嗎? 我們透過function 重複使用，省略掉了for迴圈的寫法，不僅可以少寫很多次迴圈，而且此function又可以重複使用，不限定只能拿來做一件事情，有稍微感受到一點不一樣嗎?

### Sample#3

聰明的你一定覺得，可是這樣每次想做不同動作就要重寫一個參數函式，那如果我今天不想比較2，想比較其他數值不就又要一直重寫相似的函式，太麻煩了吧，沒關係，在看下面的例子。


```
var checkPastLimit = function(limit, item) {
	return item > limit;
}

var arr4 = easyWay(arr1,checkPastLimit.bind(this, 1));
```

我們寫好一個函式放到變數裡面，這個函式接受兩個參數，一個是比較值，一個是arr的物件，透過bind()我們copy了這個函式，並把第一個參數preset為1，也就是arr4存的結果是物件裡面 > 1的結果，所以類似的動作只要想更改值的話，只要在bind裡面preset好比較的數字就好啦。

### Sample#4
人的懶惰是沒有極限的，每次都要在寫bind()跟this，寫到我也是生無可戀了，能不能再懶一點，當然沒有問題，functional programming的強大就是要你懶到無可救藥。 看下面

```
var checkPastLimitSimplified = function(limiter) {
	return function(limit, item) {
		return item > limit;
	}.bind(this, limiter);
};

var arr5 = easyWay(arr1, checkPastLimitSimplified(1));
```

燈愣，結果會與arr4一樣，我們建了一個新函式負責return 一個function回來，return的function中我們先bind好比較的數值，再將此函式return回去，太神拉，仔細感受到其中的強大了吧。

### Sample解析
相信看到最後的範例我們會有點搞不太清楚發生什麼事了，讓我們一步一步來看。

```
var arr5 = easyWay(arr1, checkPastLimitSimplified(1));
```

首先看這一行中的checkPastLimitSimplified(1)做了什麼事。

```
var checkPastLimitSimplified = function(limiter) {
	return function(limit, item) {
		return item > limit;
	}.bind(this, limiter);
};
```

我們看到了這個函式接受一個參數limiter也就是 1，並回傳一個函式，回傳的函式中，透過bind() copy一個一樣的回傳函式但透過bind()擁有preset值 limiter 也就是 1，所以實際上回傳的結果為

```
function(item) {
	var limit = 1;
	return item > limit;
}
```
整個checkPastLimitSimplified(1)的結果就是上面的函式接下來看
easyWay(arr1, checkPastLimitSimplified);

```
function easyWay(arr, fn) {

	var newArr = [];
	for(var i = 0; i < arr.length; i++) {

		newArr.push(
			fn(arr[i]) //functional programming;
		);
	}
	return newArr;
}
```

我們知道此時的fn就是前面所回傳的函式，所以迴圈裡跑的內容實際上是以下。

```
for(var i = 0; i < arr1.length; i++) {

	newArr.push(function(arr[i]) {
		var limit = 1;
		return arr[i] > limit;
	})
}
```

最後的newArr就是我們想要得到的結果，看明白了吧。

我們透過function的特性，可以做到更複雜的程式結構，進而省略大量重複性的動作，這就是functional programming的強大之處，這也大大改變了我們程式設計的想法，我們不再需要把每個函式分開來想，而可以思考著如何再函式與函式中做連結運作，

## Better way to learn

如我們知道的，現在網路上有很多開源的的Javascript libiary，學習functional programming概念的或者說，學習Javascript，多看別人的程式碼是很有用處的，但不是指抄襲，而是指去理解，去明白為何他人的寫法是如此。

畢竟人外有人天外有天，多看好的程式碼提升自己對code的敏感度，就像美感一樣，需要多看美好的事物來培養，我認為寫Code也是這樣啦，在此推薦兩個超強開源推薦大家去看，雖然本魯自己也都還沒行動，但大家一起開始吧。

1. [underscore.js](http://underscorejs.org/docs/underscore.html)
2. [lodash](https://github.com/lodash/lodash)

### 參考來源
1.  [Udemy Course - JavaScript: Understanding the Weird Parts](https://www.udemy.com/understand-javascript/learn/v4/overview)
