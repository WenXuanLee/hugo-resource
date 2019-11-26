+++
date = "2018-01-01"
title = "Scope"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

## Scope

Scope是Javascript很重要的一個也非常需要花時間去消化的觀念，在一開始我們有講到，Javascript是一個很注重Lexical Environment的，而Scope正是其重要的原因，礙於Scope的觀念有點龐大，我們會用兩天的篇幅來介紹，而今天主要注重在以下。

*	Variable Environment解釋
*	Sample推演
*	Scope chain

## Variable Environment

這是我們第一次見到這個名詞，其中代表的意義為，變數在哪裡存活以及變數與變數在記憶體中的關聯性，看起來有點繞舌，我們可以簡化一下。

當今天提到Variable Environment，你就想著，變數到底在哪裡。

### Sample推演

今天我們有function a、function b、變數 myVar，在往下滾動前，大家可以試著自己推導一下這段Code的流程。

<img style="width:100%;height:auto;padding:10px" src="../images/scope.png" />

*	Step1 - 建立Global Execution Context，建立好變數及函式的記憶體空間，之後開始執行Code，讀取到myVar = 1，讀取到函式b的呼叫，進入Step2。
<img style="width:100%;height:auto;padding:10px" src="../images/scope1.png" />

*	Step2 - 當讀取到b()，創立b( ) Execution Context，讀取到myVar = 2;再來讀取到函式a()的呼叫，進Step3

<img style="width:100%;height:auto;padding:10px" src="../images/scope2.png" />

*	Step3 - myVar = undefined.
<img style="width:100%;height:auto;padding:10px" src="../images/scope3.png" />

以上就為整個流程，而其中我們注意到，每個Execution Context的橘色框框，代表著myVar變數，也就是vaiable environment，並與我們的主題Scope有關係，也就是我們何時能看見這些變數。

上圖我們看到每個變數都是被定義在各別的Execution Context，因為這些變數被包含在函式裡，每次函式被呼叫便有自己的Execution Context。

所以即便myVar，被宣告了三次，事實上它們三個是不一樣的個體，是各自單一的存在，並不會接觸到其他與自己相同名稱的變數。如以下。

<img style="width:100%;height:auto;padding:10px" src="../images/scope4.png" />

每個myMvar，存在於各自的Execution Context中。

### 第二個Sample

接下來我們稍微將剛剛的範例修改一下如下圖，乍看之下是差不多的程式碼，真的是差不多，只有函式a的內容有變換，猜猜結果是什麼?

<img style="width:100%;height:auto;padding:10px" src="../images/scope5.png" />

答案是`1`，你猜對了嗎? 50%的機率錯了也不用灰心，那猜2的人一定會問為什麼，猜中1的人也未必理解，沒關係，跟著我一起走一遍。

這次我們快轉三個步驟，可以得到下面的流程。

<img style="width:100%;height:auto;padding:10px" src="../images/scope6.png" />

在函式a()我們這次為空的，並沒有宣告自己的myVar，當今天我們要取變數做行為時，Javascript不只看了此變數的execution context 的 variable environment，而同時也會看到它的外層 execution context。

而在範例中便是指到，global execution environment，函式b()亦同。

<img style="width:100%;height:auto;padding:10px" src="../images/scope7.png" />

這是我們又要回來討論到Lexical Environment了，函式a()就圖面來看，是位於global environment之上的，也就是說，它並不是包含在函式b()當中。

所以函式a()位於跟 var myVar = 1;同一層的，所以今天Javascript在Execution Context中找不到變數的時候，它會繼續尋找Outer reference是否有此變數。

這個Outer Reference便是取決於此這個函式坐落於哪裡，所以函式a()實際上位於global的層級，也就是程式碼的最外層，Global environment就是其Outer Reference。

由此可知，今天在函式a()找不到myVar，會去Global Execution Context尋找，進而得到 1 的值。

### Scope chain

今天三個Execution contexts被創立時，這些code具體被寫在哪裡並不重要，重要的在於我們什麼時候去呼叫這些函式。

當我們呼叫函式時，Javascript會替這些execution context建立一套outer reference，它會幫我們注意Code具體上位於哪個位置，並幫我們建立適當的outer reference。

透過outer reference一層一層往外部execution context尋找變數的的一連串搜尋行為，便是scope chain。

## Lexical Environment sample

### Sample Review

想一想函式a( )坐落於哪個位置?
<img style="width:100%;height:auto;padding:10px" src="../images/scope8.png" />
相信你一定知道，函式a( )位於global environment，實際上可以想像成它是連結在global object的，函式a( )具體是與myVar在同一個層級的。

函式a( )並不是被包涵於某個函式，而就是在Javascript檔案裡，所以當Javascript建立execution context時，同時建立了此函數，lexical environment的outer enviornment reference。

所以今天a裡面找不到myVar就去外面一層找，這是上一次提到的沒錯吧? 今天若我們更改函式a的lexical environment呢?

### Lexical Environment change

今天我們把程式碼改成以下。

<img style="width:100%;height:auto;padding:10px" src="../images/scope9.png" />

今天我們改變了函式a的Leixcal environment，將其具體位置放於函式b裡面，這發生了什麼變化?

<img style="width:100%;height:auto;padding:10px" src="../images/scope10.png" />

我們看到了，在Global層級中，我們找不到函式a，原因在於global execution context會去尋找函式a，但函式a並不存在於它的variable environment，因為函式a是坐落在函式b裡面。

今天創建global execution context時只讀取到函式b的宣告，並不會去讀取裡面的內容，而是直接到函式b的結尾然後繼續讀取，所以事實上是沒有讀到函式a的，自然而然global execution context
就認不得函式a了。

再來我們看一下當b()呼叫時結果是什麼?

<img style="width:100%;height:auto;padding:10px" src="../images/scope11.png" />

結果是2，花生省魔術?來一起來一探究竟，同樣的我們快轉三步驟。

<img style="width:100%;height:auto;padding:10px" src="../images/scope12.png" />

然而，這次我們的函式a，具體上是位於函式b裡面的，所以Javascript會將函式a的outer reference連結到函式b，而函式b的outer reference依然是global，如下圖。

<img style="width:100%;height:auto;padding:10px" src="../images/scope13.png" />

所以當這次，函式a找不到myVar時，隨著scope chain向外尋找，會找到函式b的myVar，也就是2，看明白了吧。

那如果今天在函式b也找不到myVar呢?

<img style="width:100%;height:auto;padding:10px" src="../images/scope13.png" />

你一定答對了，沒錯，就是跟著Scope chain在向外一層，直到最外層為止，在範例中，在往外一層到global找到myVar，也就是1。

### 總結

Scope的影響是非常顯而易見的，當你今天不明白這其中的脈絡，很容易就會產生Bug或者Error，就因為看不明白其中變數、函式的關係，而導致Access裡各種抓不到或者是變數值不是自己所預料的結果，透過這兩天的介紹，希望大家都能更明白Scope的概念。

***

### 參考來源
1. [Udemy Course - JavaScript: Understanding the Weird Parts](https://www.udemy.com/understand-javascript/learn/v4/overview)
2. [You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures)