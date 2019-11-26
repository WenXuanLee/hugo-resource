+++
date = "2018-01-05"
title = "This"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

## This
今天我們講講This，到底this是this什麼東西，榮登Javascript界Top3疑惑的傢伙，常常看到別人的程式碼this來this去的到底在搞什麼鬼，自己用的時候卻又不明所以，模模糊糊的，今天我們就來揭開這團迷霧吧 !

## Throw back creation phase
當要探討this時，我們得先回想一下execution context，當execution context創建時，我們知道會有

1. variable environment決定variable的建立以及存活
2. Outer reference environment確定位置，用來查詢scope chain的脈絡。
3. This - 我們的大魔王，每次創建時都會有這傢伙，我們不需要宣告或創建它，就是會給我們這個傢伙 __this__ ，而它根據我們呼叫函式的方式，指向一個不同的物件。
<img style="width:100%;height:auto;padding:10px" src="../images/this.png" />

也就是我們今天要探討的主題 !

## Let's get this !!
This常常會帶來很多疑惑，因為根據函式呼叫的方式，每一次this指向的東西都會隨之變化，關於這個this會有許多情景，我們就來一探究竟。

### this with window
我們已經知道，global execution context中也會內建一個this，而這個this指定到window。

<img style="width:100%;height:auto;padding:10px" src="../images/this1.png" />

讓我們換一個方式來看看，倘若今天用一個函式a包起來，並呼叫函式a。

<img style="width:100%;height:auto;padding:10px" src="../images/this2.png" />

函式裡的this仍然會指到window object。

我們再換一個方式，將function expression存放到變數中。

<img style="width:100%;height:auto;padding:10px" src="../images/this3.png" />

Again，還是指到window，不管是a或是b的execution context中，雖然各自取得自己的this，但取到的都是同一個記憶體位置的物件，也就是window，都指到了global object.

這代表我們可以做出一些特別的行為，如以下我們透過this.newVar建立了一個新的global object。
<img style="width:100%;height:auto;padding:10px" src="../images/this4.png" />

是不是挺莫名的，如果不明白this是如何指到其他物件，你會有錯誤的觀念以為this就是連結到函式裡面，燈愣 ! 那就完蛋拉，你便會不小心造出一堆global object進而有一堆問題。

### this with object method
當今天我們object裡的method用到了this又會指到哪個物件去呢。

<img style="width:100%;height:auto;padding:10px" src="../images/this5.png" />

在這個案例，function是物件的一個method，屬於一個物件，當Javascript engine看到這個裡面的this，會認為，阿你就是連結到這個這個物件的，因此這個this指到物件C，因此我們可以做到下面這檔事。

<img style="width:100%;height:auto;padding:10px" src="../images/this6.png" />

看到了嗎，透過this.name我們改變了object的property，這是很方便一個用處，method中我們可以透過this拿到或改變其他同物件裡的properties，相當酷吧!

那如果今天method內又包含了一個function後會怎麼回事
<img style="width:100%;height:auto;padding:10px" src="../images/this7.png" />

燈愣 ! 你以為應該要秀出Big C 但事實卻不是這樣，那這個newName到底去哪了呢，讓我們來看看。
<img style="width:100%;height:auto;padding:10px" src="../images/this8.png" />

我的老天鵝阿，跑到了window的global object裡去了，這代表method裡面的那個function的this仍然指到了window，儘管它位於object裡面。

這不可能發生，直到現在，我還是不願意相信我的眼睛，相信你也跟我一樣，這太誇張了真的，但沒辦法Javascript大老就是這樣運作的，那我們遇到這種狀況該怎麼辦呢?如何確保我的this是指到我想要的object而不是window。

<img style="width:100%;height:auto;padding:10px" src="../images/this9.png" />

簡易的方法就是在確定this指到我們要的物件時，將它存取到一個變數中，之後透過這個變數去使用，如上圖的self。

### 當我們bind在一起
上面我們提到一個簡易的方法可以確保this所指向的物件，而其時Javascript也有一個方法叫bind()可以解決此類的問題，透過bind可以將this綁定在物件，而不要指到window去，後面會再介紹一次。

<img style="width:100%;height:auto;padding:10px" src="../images/this10.png" />

### ES6 way
ES6新提供的arrow function也可以解決這類問題，而詳細的內容就請大家去翻閱，這邊就只介紹用法給大家。

<img style="width:100%;height:auto;padding:10px" src="../images/this10.png" />

* arrow function - (argu, argu1...) => { ... }

***
以上就是今天的內容了，小弟常常被this搞得死去活來，希望透過今天的範例，大家可以減少一些跟我一樣死去活來的狀況，雖然我現在還是死去活來的，以上就是今天的內容嚕。

### 參考來源
1.  [Udemy Course - JavaScript: Understanding the Weird Parts](https://www.udemy.com/understand-javascript/learn/v4/overview)
2. [You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/apC.md)