+++
date = "2017-12-26"
title = "Basic Operators"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

## Operators
介紹完了Javascript types，我們知道Javascript的組成大概是這樣，Variable -> Value ->Types，一個變數可以給予一個Value，這個Value同時決定此變數的Type。

更精確的說法我們可以稱為，執行動作的句子是一個Statement，statement裡面又包含了Expression，而Expression正是由variable或者Value，或者是一段由Variable和Value透過Operators結合起來的一段式子。

聽起來有點抽象，我們直接舉出例子來看。

<img style="width:100%;height:150px;padding:10px" src="../images/operator.png" />

*	2 是一個 value expression。
*	b 是一個 variable expression。
*	b * 2 是一個數學式expression，透過operator * 結合。
*	a = b * 2 則是一個assign expression。
*	整段結合起來便是一個statement。

那前面我們知道了 value、variable、types，今天就來看看Operators吧 !

## Operator在幹嘛?
一般來說，Operator是一個特殊的函式，與一般函式的寫法不同，通常，operators讀取兩個參數後回傳一個新的結果。

例如常見的 __= * + -__ 諸如此類，所以他實際上的用途就是在variable 與 value上面做一些行為，好比 * 就是將value做一個乘法的動作， = 就是負責assign這個動作。

特別注意到Assignment Operators的執行是從右到左稱為 __Right-associativeity__ 以下見範例。

<img style="width:100%;height:150px;padding:10px" src="../images/operator1.png" />

這段結果 a & b 的 value都會是5，那實際上的動作是這樣的

1. b 被assign成 5
2. a 透過b的value被assign成 5

所以是從右邊先開始的，這就是Right-associative。

## Operator的優先順序
有了上面的觀念，你會觀察到，那不一樣的Operator從哪邊開始先處理呢，實際上是這樣的，就像梁山108條好漢長幼有序，如此多的Operator也是要照輩分來的。以下就是常見到的Operator順序。

<img style="width:100%;height:auto;padding:10px" src="../images/operator2.png" />

更多的Operator參見參考來源。
<a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Operator_Precedence" target="_blank">來源</a>

## Unary Operators
常見的operators們多半是符號，可能會造成大家的誤會，但實際上有些Operators是被寫成拼字的，而我們前面的篇章就有用到這樣的Operator，例如 - __typeof__	、 __in__ 、__delete__ 等等

<img style="width:100%;height:110px;padding:10px" src="../images/operator3.png" />

### Operators的區別
由上面的例子我們看到 __typeof__	operator只針對一個value做動作，而 __+-\*/__ 則對兩個values是則對兩個values做動作。

* 一個values做動作為 __unary operator__
* 兩個value的則稱為	__binary operators__
* Operators不一定可以同時是以上兩種，Ex : __-(minus)__

再來根據運算子的功能分成下面幾大類

*	賦值運算子
*	比較運算子
*	算數運算子
*	位元運算子
*	邏輯運算子
*	字串運算子
*	條件(三元)運算子
*	逗點運算子
*	一元運算子
*	關係運算子

更多細節就麻煩大家有興趣自己看看囉
[Operators 大全](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

### 非常Trikcy 的 ++ 與 --
想當初，在學習的途中遇到一題問題是這樣，a++、++a的差別在哪裡，那時候我認為反正就是 +1 沒什麼差別的，但後來發現其實是挺需要在意的小細節，在這邊稍微分享給大家。

這兩個運算子都有Postfix與Prefix的差別

#### Postfix
operator在後面的狀況，也就是 a++，還沒執行 + 的動作 就先把原本的值丟過去。

<img style="width:100%;height:110px;padding:10px" src="../images/operator4.png" />

#### Prefix
operator在前面的狀況，也就是++a，是先執行 + 的動作再把值丟過去。

<img style="width:100%;height:110px;padding:10px" src="../images/operator5.png" />

### Comparison
Operators的比較混在javascript裡面常常就是造成讓人崩潰的怪異現象，針對operator的比較做一個整理。

```
console.log(1 < 2 < 3); //true
console.log(3 < 2 < 1); //true ????????
```

### 比較的順序

根據比較的優先順序 "<"，是先比較 3 < 2再將結果與 1 比較也就是會變成。

```
console.log(false < 1); // false
```

而false會透過自動轉型成number也就是0，這就是為什麼回傳true的原因，重點就在於比較的順序以及強制轉型的部分，透過上面的範例，可以知道，很多時候如果一個不注意就會造成意外的結果並難以追蹤。

### Coerce
不一定每次的轉型都是我們期望的那樣，而是javascript engine決定的，這會意外造成嚴重的bug以及出乎意料的。

```
Number(defined); //NaN
Number(null); //0
```

### Equality

1. __==__ - 用來判斷兩者的值是否相同，但如果比較的兩者type不一樣，則會有恐怖a自動轉型發生。

```
'3' == 3; //true
false == 0; //true
null == 0; //false
null == < 1; //true
"" == 0; //true
"" == false; //true
```

看到上面的比較是不是有很多黑人問號的部分，null在 < 時會自動轉型，但在 == 卻又沒有，這就是造成怪異的部分，有時候自動轉型的部分會是你期望的，但尷尬的是自動轉型會有意外發生就像上面的null。

2. __===__ - 也是用來判斷兩者值是否相同，不同於上者，這是嚴格的比較，不只是只有兩者的值，包含type都會一同被當作比較的標準，同時不會觸發強制轉型的機制。

```
3 === 3; //true
"3" === 3; //false
```

為了避免被轉型的機制給搞得歪七扭八，建議大家盡量以 === 的方法或比較的基準，這樣的作法不只是比較嚴謹，同時也可以避免掉尷尬的bug。

[Equality table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

### Dynamic typing & coercion be useful

許多framework對於轉型的機制以及動態Type的運用，實際上是對於程式碼有所幫助的，這邊就來探討 Existence & boolean

```
Boolean(undefined); // false
Boolean(null); // false
Boolean(""); // false
```

以上這些代表沒有值存在的內容，在boolean的判斷，都會被認定為false，而我們可以利用這樣的特點。

```
var a;

a = 0;// in if statement 0 coercion to be false;

if(a || a === 0) {
  console.log('test');
}

```

上面的範例中若是沒有 || 的判斷，在if statement中的a會因為coercion而變成false，但如果有||的話，實際上裡面的狀況是以下。


```
if(false || true) { // always true
  console.log('test');
}
```

通常在debug的時候，透過boolean的判斷，去找出值的存在性通常可以解決因為轉型造成的問題。

### Defalut Valuse
```
function greet(name) {
  console.log('hello' + name);
}

greet('Tony'); // hello Tony
greet(); // hello undefined;
```

在execution context中，參數變數存在卻沒有指派值進去，Javascript engine會自動認定為undefined。

其中的name就會被認為 type undefined，再透過coercion轉成字串，通常為了避免這樣被轉型的麻煩狀況，會在function給參數設定一個default value。

```
function greet(name) {
  name = name || '<your name here>';
  console.log('hello' + name);
}

greet(); // hello your name here
```

透過 || operator，會優先比較兩者，並將回傳true的值丟回去，藉此可以設定default values。

範例中，name因為是undefined， || 判斷為false，而後者為true，所以回傳後面的字串給name。 這樣的方式可以給參數defalut valuse，避免掉參數被coercion的狀況。

而ES6的寫法可以更簡潔如下。
```
function greet(name = ' your name here') {

  console.log('hello' + name);
}

greet(); // hello your name here
```

### 參考來源

1. [eloquentjavascript](http://eloquentjavascript.net/00_intro.html#h_GlF1Kuv0JF)
2. [MDN Javascript](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_Operators)
