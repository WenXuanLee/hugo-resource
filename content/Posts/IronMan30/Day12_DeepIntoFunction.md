+++
date = "2017-12-29"
title = "Deep into Functions "
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

##Deep Into Functions
昨天的文章我們介紹了一些Functions的基本觀念，但Functions的細節卻遠超乎我們的想像，因此，今天我們就更深入地來探討Function的概念，
一起征服這隻大怪物吧，今天主要的介紹會有 - Call stack、Recursion、 Constructors、 IIFE 。

##Call Stack

我們知道了函式的概念，也知道了函式怎麼被呼叫使用，但函式實際上運行的樣子，以及背後的流程原理是什麼我們卻不清楚，現在就讓我們進一步看一看運作的原理，了解之後才更能避免錯誤的發生。

###函式運作的流程

首先我們有個範例。

<img style="width:100%;height:auto;padding:10px" src="../images/function8.png" />

實際上程式碼的運作是這樣的 -
1. Global Execution Context被建立，同時會建立好 `this、global object(window)` 。
2. function sister & brother 因為hoisting的機制，會被建立在記憶體中，接著才開始逐行執行。
 <img style="width:100%;height:auto;padding:10px" src="../images/stack.png" />
3. 逐行執行後，看到了sister()這個函式呼叫，這時候，會建立sister的 execution context，並被堆疊到 execution stack中，最上層的 execution context會是執行中的。
 <img style="width:100%;height:auto;padding:10px" src="../images/stack1.png" />
4. 進入sister函式，又讀取到呼叫 brother()這個函式，同上步驟，brother()的execution context被建立並堆疊到最上層開始執行。

  <img style="width:100%;height:auto;padding:10px" src="../images/stack2.png" />
5. 接著brother中讀到console.log()一樣被堆疊上去開始執行。
  <img style="width:100%;height:auto;padding:10px" src="../images/stack3.png" />
6. console.log()執行完後，被抽離出stack，進而brother()執行完抽離，再來是sister()執行完抽離，最後回到global execution context繼續逐行往下看。

 <img style="width:100%;height:auto;padding:10px" src="../images/stack2.png" />

  <img style="width:100%;height:auto;padding:10px" src="../images/stack1.png" />

<img style="width:100%;height:auto;padding:10px" src="../images/stack.png" />

####以上就是整個運作的流程，而存取這些 execution context的地方就叫做call stack。

##Recursion

接著介紹Recursion，所謂的Recursion指的就是函式呼叫函式本身，只要不超過stack的上限都是可以接受的，以下的範例就是一個Recursion。

<img style="width:100%;height:auto;padding:10px" src="../images/recursion.png" />

以上透過函式呼叫函式自己的就是Recursion，但有一點要特別注意，用膝蓋想也知道，這樣一直呼叫函式的效能肯定會差的多了，雖然話是這樣說的沒錯，但你可以清楚發現，通常Recursion的版本會相對Loop版本的解法來的比較容易明白，兩者沒有一定的好壞。

Recursion擁有比較好的可讀性，但犧牲了效能，而Loop的方式擁有較好的效能，但在較複雜的結構會顯得艱澀迂迴，端看大家如何在兩者去做一個平衡。

但有一個很通用的規則大家可以考慮，當今天除非效能差得太明顯，否則建議是以可讀性高的寫法為優先，畢竟大程式不會是自己一個人全部負責，擁有好的可讀性對團隊來說是更好的選擇，當然如果效能真的差得太明顯，再去找出哪一個部分占用了最多時間，再用高效率低可讀性的方法取代掉就好了啊 !

##Constructors

Function在Javascript中也可以被當成Constructor使用，這樣的函示我們會稱為構造函式，以下為範例。

```
function User(name, friends) {
	this.name = name;
	this.friends = friends;
	this.greet = function() {
		console.log('Welcome' + this.name);
	}
}

var userA = new User('Bob', ['Ben', 'Andy']);
var userB = new User('Chen', ['Dan', 'Roy']);

console.log(userA); // User {name: "Bob", friends: Array(2), greet: ƒ}
console.log(userB); // User {name: "Chen", friends: Array(2), greet: ƒ}
```

*	User就是一個構造函式，也就是一個Constructor。
*	new運算子先幫我們建立一個空物件，在來執行構造函式。
*	this的部分我們後面會在介紹，目前這個this指到的是new出來的空物件。
*	實際上運行到this.name、this.friends時就是賦予空物件屬性還有其屬性值。
*	最後return object存回給變數。
*	透過constructor new 出來的物件都稱為instances。

### new keyword

我們看到了上述範例new的功能，而實際上new 是個運算子，當Javascript Engine讀到這個運算子時，會建立一個空物件，並接著呼叫後面接的函式，並將函式裡的this指定到建立的空物件上，我們將範例稍微修改一下看看this指哪去。

```
function User(name, friends) {
	console.log(this); // User {}
	this.name = name;
	this.friends = friends;
	this.greet = function() {
		console.log('Welcome' + this.name);
	}

}

var userA = new User('Bob', ['Ben', 'Andy']);


console.log(userA);

```

在透過this 將property & method 設定給空物件時，我們看到this是指向 User {}的，這也是new帶來的功用。


####Function Constructor?

當今天看到function constructor指的就是，函式是被用來 __建立物件__ 的，而這個函式裡的 this 會指向到一個 new 的空物件，這個物件會在執行完這個一般函式之後自動回傳回來。

透過上面的例子，其實你不難發現，很多時候我們常常會需要建造出許多同性質的物件，但只是裡面的值不一樣而已，好比我剛舉例的User，User都有名字都有朋友，只是內容物不一樣，這時候有Constructor的話就可以省略掉重複的動作，而這也是Function一個很強力的功用。

##IIFE

IIFE全名為，Immediately Invoked Function Expression，前面我們提到函式需要呼叫才會被使用，而IIFE則是一種立刻執行函式的方式，就字面上的意思就是用Function expression的方式建立函式後立刻執行，如下。

<img style="width:100%;height:auto;padding:10px" src="../images/IIFE.png" />

*	(function Expression());便是一個IIFE的表示。
*	後面的( ) 便是參數放入位置。

###IIFE與一般函式的比較

IIFE所提到的立刻執行是不是乍聽之下挺模糊的，以下我們就用一個比較來更明白IIFE的概念吧。見以下。

<img style="width:100%;height:auto;padding:10px" src="../images/IIFE1.png" />

當我們用一般的函式print出來看的話，會得到整個function expression。若今天變成IIFE呢?

<img style="width:100%;height:auto;padding:10px" src="../images/IIFE2.png" />

根本又是大衛魔術，我們在function expression後加上( )，並放入，代表立即執行的IIFE，此時在assign給變數前，這個function expression自己先執行完了，所以變數實際上存放的是，執行完後return的值。

<img style="width:100%;height:auto;padding:10px" src="../images/IIFE3.png" />

特別注意到，此時變數存放的已經是執行完後的return 值，亦即是一串字串，所以此變數並不是一個function，並不能再被當成function呼叫執行囉。


***
以上就是今天的內容拉，多補充了一些Function該知道的功用，雖然並不是真的很Detail，但希望可以幫助到大家QQ。
### 參考來源
1. <a href="http://eloquentjavascript.net/00_intro.html#h_GlF1Kuv0JF" target="_blank">eloquentjavascript</a>
2. <a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript" target="_blank">MDN</a>