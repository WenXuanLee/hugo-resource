+++
date = "2017-12-28"
title = "Functions Basic"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

##Functions

在Javascript裡，Functions佔了一個非常重要的角色，是最核心的部分，也是最容易造成誤解以及混淆的Part，今天吃完早餐後就來分享Function 函式吧。

##Functions Basic

function在Javascript可以說是最最最最重要而且最最最核心的觀念，透徹了解function的觀念，我們可以利用javascript做到一些其他程式語言所不能做到的事情，這個核心重點就是 - `first class functions`。

在Javascript中，function是 __物件__ ，first class function意思是指，它可以像其他types一樣被assgin到變數裡面，被當作參數使用，這也是Javascript強大的地方。

由於function是物件，所以function也可以包含其它properties & methods，可以連結object、function、primitive。而其中有兩個特別的property - Name & Code。

<img style="width:100%;height:auto;padding:10px" src="../images/function9.png" />

* name - 是指函數的名稱，不一定要有，可以是匿名函式。
* code - 函式內我們所寫的code。

感覺上我們好像是自己寫了一個function的code，但其實我們只是將code新增到一個稱為CODE的property裡面。特別的部分在於，這個Code property是可以被呼叫的，也就是，可以執行code property裡面的code。

這是非常一個重要的觀念，我們得時刻記在心裡，function is object，其中的code只是這個object的一個property。

所以我們也可以做到下面這個看起來可能很奇妙的行為

```
function greet() {
	console.log('hi');
}

greet.language = 'English';
console.log(greet.language); // 'English';
```

看起來或許很怪，但在Javascript這就是一個合理的事情。

回頭來看實際上這個function的架構。

<img style="width:100%;height:auto;padding:10px" src="../images/function10.png" />

它是一個object，有properties，code是被存在property的，記住它，絕對不要忘。


當用typeof 去檢查function時會回傳 __'function'__	，就算如此也要記住它是object。

```
typeof greet; // function
```


##Function的宣告方式

在知道函式的宣告前，我們得先知道兩個觀念 - function statement & function expression。最簡單的區別在於是否主動回傳一個value。

### function expression

如範例，我們將函式存到變數裡，整個匿名function就是一個value。

```
// function expression;
var test = function(x) {
	return x * 2;
}
```

知道了函式也屬於物件的一種，所以它可以跟一般物件一樣assign給variable

*	function是透過由 keyword function開頭產生。
*	__()__ 是決定裡面要放的參數，可以沒有參數也可以多個參數。
*	__{}__ 大擴號中就是主要的行為部份，可以包含多項statement，當function被呼叫時執行。

### Function Statement

function statement - 如範例，除非我們呼叫並執行完函式，否則不擁有value，但這個函式仍舊存在於記憶體空間中。

```
// function statement
function greet() {
	console.log('hi');
}
greet();
```

*	這樣就是一個函式宣告，而函數的呼叫方式便是直接用函數名字( 參數 )呼叫
*	雖然function定義在呼叫之後，卻可以正常執行，這是因為函式宣告並不是一種top-to-bottom的 contron flow，而這也是Javascript的一個機制 Hoisting 我們後面再講。

### Function as Values

Function除了直接用函式宣告的方式，也可以當作value assign到變數裡面。
<img style="width:100%;height:auto;padding:10px" src="../images/function3.png" />

*	這裡我們拆成兩部分變數以及Value，整體來看變數sub存放了一個function。
*	Value中我們看到是一段function expression，而這個函式是沒有名字的，我們又稱它為匿名函式。
*	與前面的宣告方式差別在於，若sub是有可能assign成其他值，則它就不再是function了。

### Function arguments

這個function中的特殊之處或許比較少見到，但還是知道一下比較好。

<img style="width:100%;height:auto;padding:10px" src="../images/function4.png" />

*	注意到函式是沒有指定參數的，然而Javascript已經有內建好的一個arguments，讓我們可以透過其index去refer到被丟入function的參數。

### Local Variable的存在

參數在函式裡面就很像一個正常的變數，然而這個變數的來源是由我們呼叫的時候定義，而不是function內的code產生。

這樣的變數我們稱它為Local Variables，同時在函數裡面才宣告的變數也屬於同一範疇，Local Variables代表著是，只在函式裡面生效的變數，倘若跳出函式以外，則此變數就不存在了，看個例子。

<img style="width:100%;height:auto;padding:10px" src="../images/function5.png" />

*	我們看到total若再函式外面則是會有error表示是Undefined，然而在function內卻是可取用的。
*	實際上是每次進到function時，total都會重新被創造出來，一旦函式結束，則total這個變數就會被回收掉了。

正所謂做人要有國際觀，在地要有本土化，Javascript的世界也是熟知這道理，所以本土化有Local Variable，國際觀則有Global Variable，而這在之後的Scope文章內會詳加介紹。

***
以上就是關於Function內應該知道的大小事，但其實還有很多細節尚未提到，不過千萬不要給它害怕，我們將在之後的文章做整理，今天就先到這吧，冷冷的天趕快來一碗花生湯圓溫暖自己吧。


### 參考來源
1. <a href="http://eloquentjavascript.net/00_intro.html#h_GlF1Kuv0JF" target="_blank">eloquentjavascript</a>