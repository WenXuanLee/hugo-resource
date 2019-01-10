+++
date = "2017-12-27"
title = "Value-copy & Reference-copy"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

##Value-copy & Reference-copy

Javascript的兩大Type，之前我們提到主要分別是value的存取方式，在先前自己學習時，是沒有特別在意這部分的，因為只要結果是正確的，管他是怎樣去指定或傳遞值，但後來發現，常常Output出來的結果跟自己預料中的有落差，進而一步造成Bug，後來才明白原來就是值的存取方式影響甚大，所以今天，我們就針對這個超級重要，他馬的真的很重要的觀念，好好理解一波，一起來挖掘這個深奧的Part。

###Copied by Value

先前說過Primitive type的存取方式都是透過Value，這是什麼意思呢? 當今天有一個primitive type 存取到a變數，

```
var a = 1;
```

我們可以說a變數擁有一個記憶體位址，指到實際上primitive value 1 存在的位置。
<img style="width:100%;height:auto;padding:10px" src="../images/valImg3.png" />

```
var b = a;
```

當今天我們將a在存到b的話，由於a是存放primitive type的，實體上b的結構會是這樣。

<img style="width:100%;height:auto;padding:10px" src="../images/valImg4.png" />

b存了一個新的記憶體位置，這個位置指像了一個新的primitive value 1，而這個value是從a的value複製過來的。這樣的方式就稱為By value。

你可以想像成By Value的話就像是做一個從本體做一個複製人，範例中的copiedByValue，function 收到的變數是Primitive Type時，就會做出複製人，此時的arg就是複製人，再次Output copiedByValue的話依然會是原本的市北許效舜，就算這個複製人已經去韓國一趟變成金城武了，本體依然還是許效舜，因為複製人有自己的記憶體位置，而這個位置的value被換成金城武，這就是Copied by Value。

```
var copiedByValue = "市北許效舜";

function change(arg) {
	arg = "市北金城武";
	console.log(arg);
}
change(copiedByValue); // "市北金城武"
console.log(copiedByValue); //"市北許效舜"
```

###Copied by Reference

而如果是object types則是by reference，範例以下。

```
var a = { num : 1};
var b = a;
```

實體架構則是如圖中所示。

<img style="width:100%;height:auto;padding:10px" src="../images/valImg4.png" />

由於我們的a是一個物件，是透過by reference，b = a的動作會讓b存放a所指的記憶體位置，也就是兩人指到記憶體位置的reference是相同的，沒有新的物件，也沒有copy原本的value。而在這邊 a & b的value會相同的原因就在於，兩個變數都指到同樣的記憶體位置。


不同於By Value，Reference是認位址的，也就是說，今天當我們宣告了CopiedByReference時，這個變數是指到後面物件的記憶體位址，而之後function收到此變數為參數時，就是收到指向物件記憶體位址的一個Reference，見範例。
```
var copiedByReference = {
	name: "市北許效舜",
	aka: "Javascript界的一粒塵土"
};

function change(arg) {
	arg.name = "市北金城武";
	console.log(arg.name);
}
change(copiedByReference); // "市北金城武"
console.log(copiedByReference.name); //"市北金城武"
```

### Special Case

我們上面知道了by Value & by Reference的差異，但在後者我們得特別注意到一件事情，那就是 __=__ operator，__=__ 會創立一個新的記憶體空間也就是新的位置，所以當by reference遇到以下範例就會有所不同。

```
var test = { name: 'Ben'};
var test1 = test;
test = { name: 'Andy'};

console.log(test); //{name: "Andy"}
console.log(test1); //{name: "Ben"}
```

注意到重點了嗎，這時候的物件test & test1就是指到不一樣的記憶體位置了，因為test在後面套用到了 __=__ 的關係，試著多想想記憶體位置的關係，更能清楚其中的差異。


##總結

透過上面的範例，可以發現，如果對於 Value-copied & Reference-copied的觀念不夠熟悉的話，常常會有出乎意料的結果，那種感覺有點像，我覺得自己長得像金城武，但實際上卻一點也不像的那種錯覺，當這種錯覺在程式碼出現的時候，就是一隻Bug的存在，所以搞清楚值的來由，才能避免這樣Bug的存在阿，所以我們簡易的重點一下兩者最大的特點。

*	Copied by value就像是鳴人的影分身，分身被打爆了或者斷腿了，都不會影響真正的鳴人。
*	Copied by reference就是魯夫，它的橡膠手，橡膠腳被攻擊了，本體一樣會收到傷害。

以上就是今天的主題拉，還望各位給點建議，在說明的時後一直覺得很難描述，希望大家能給點更好的想法，謝謝 !


## 參考來源
1. 我的好朋友，阿德，虎右衛門。
2. <a href="https://hackernoon.com/grasp-by-value-and-by-reference-in-javascript-7ed75efa1293">Grasp “By Value” and “By Reference” in JavaScript</a>
