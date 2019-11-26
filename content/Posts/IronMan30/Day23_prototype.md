+++
date = "2018-01-07"
title = "prototype"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

## prototype

Prototype可以說是Javascript至關重要的一環，嚴格來說Prototype不管在哪個程式語言都是很重要的觀念，但Javascript的prototype觀念又跟多數的程式語言有著特別的不同。

今天就來討論一下最根本的觀念，Object-oriented Javascript & Prototypal Inheritance。

當提到了object-oriented，我們主要會專注在物件的創造，因為這個Part藏著許多讓人混淆的部分。

## Inheritance

首先我們先理解繼承的概念，Javascript內的繼承核心概念就是，是一個物件可以access到另一個物件的property、method。

### Classical Inheritance

如果你學過Java或者其他程式語言，相信你對class一定不陌生，透過class可以分享methods & properties給class的instance。

但聰明的你一定發現，這樣的繼承方式顯得有點冗贅，並且容易交互影響，很難去搞明白這群物件們是怎麼與彼此互動的，你得搞明白許多keywords protected、private、interface、blablabla。

並不是說classical的方式就是不好，它肯定有它的好處才會這麼受歡迎，只是仍然有些不足的部分。

### Prototypal Inheritance

Prototypal Inheritance，它相對的易於使用，並且容易修改或者擴增，以及容易理解其中的脈絡，但也不是完美無缺的，相對的結構比較鬆散，一不注意就會讓整個結構變的混亂。

### Again
當我們提到Javascript的 inheritance時，我們就只在意一個最核心的觀念，也就是，一個Object 可以 access 另一個object 的 properties & methods.

想更清楚明白剛剛提到的兩種繼承差異，請服用下面這篇文章。

[What’s the Difference Between Class & Prototypal Inheritance](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)

## Understanding the prototype

到底什麼是prototype呢，我們知道Javascript的物件都有properties，而實際上Javascript內的物件都有一個prototype property - __proto__ ，

__proto__ 主要是連結到其他物件的一個reference，而它也就是我們的prototype，看下圖。

<img style="width:100%;height:auto;padding:10px" src="../images/prototype.png" />

今天我們obj.prop2若在原本的obj內找不到的話，則會往proto去尋找，也就是往prototype去找，借由proto再去看看有沒有一個property name，有的話則reutrn回來。

就片面來看我們會以為obj含有prop2，但實際上prop2是存在於object prototype裡面。

同時，proto這個物件可以再指到另一個proto，每個物件都有自己的prototype，可以一直延展下去，prototype的prototype可能也有其它property。

<img style="width:100%;height:auto;padding:10px" src="../images/prototype1.png" />

這樣一層一層prototype組織而成的鍊子，就稱為prototype chain - 原型鍊。

而這個原型鍊通常是藏住的不會被看到的，也就是我們不會打 obj.proto.proto.prop3，而只要obj.prop3就會得到，Javascript Engine會透過原型鍊去尋找property & method。

而不一樣的Object卻有可能擁有同樣的proto。

<img style="width:100%;height:auto;padding:10px" src="../images/prototype2.png" />

我們知道proto只是一個reference，所以我們share到的同樣的property，不論是 obj.prop2 or obj2.prop2指到的都是同樣的記憶體位置，同樣的property。

這就是原型鍊，也就是prototype的概念，就這樣，別想太多，就是一個object會有reference到proto去，這個proto可能含有其他property & methods，但不用記得它再哪，Javascript Engine會自動透過prototype chain幫我們找。

### 還是要Sample一下

<img style="width:100%;height:auto;padding:10px" src="../images/prototype3.png" />

範例中，我們主動將john的prototype設為person，因此儘管john物件中沒有greet()，仍然可以透過prototype chain 去使用prototype裡面的method，也就是共享。

<img style="width:100%;height:auto;padding:10px" src="../images/prototype4.png" />

而當我們取用firstName這個property時，為什麼不是得到Default呢? 這是因為，Javascript Engine會先尋找物件裡是否有此property，若沒有才會透過prototype chain去尋找。

***

### 參考來源
1.  [Udemy Course - JavaScript: Understanding the Weird Parts](https://www.udemy.com/understand-javascript/learn/v4/overview)
2. [You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md)