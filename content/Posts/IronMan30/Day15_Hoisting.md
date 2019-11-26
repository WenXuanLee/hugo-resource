+++
date = "2017-12-31"
title = "Hoisting"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

## Hoisting
JS內有一個機制稱為Hoisting，那什麼是Hoisting呢?看看以下的程式碼。

<img style="width:100%;height:auto;padding:10px" src="../images/function6.png" />

在其他程式語言中，通常會先定義變數好才去做使用，尚未定義的變數去使用的話通常會有Error產生。

然而，Javascript內提供了一個機制叫做Hoisting，Javascript Engine把變數以及函式宣告的部分提移到程式的最上層，透過這個機制，就算變數使用在宣告前使用，不會有Error，所以實際上透過編譯後的程式碼比較像以下的範例。

<img style="width:100%;height:auto;padding:10px" src="../images/function7.png" />

今天就來講解Hoisting這個機制吧 !

### Creation Phase
先前我們提到，程式執行時，會有Execution context，而其實Execution context是透過兩個階段創建出來的，第一階段稱為creation phase，第二階段為Execution Phase。

Creation Phase，我們知道初始一定會有global exection Context，也就是 __Global Object & this__	已經建立在記憶體中。

而當 Syntax Parser逐步閱讀我們的code並開始編譯時，它會先記住我們宣告變數以及函式的位置，因此Parser同時在Creation Phase中建立了記憶體位置準備存放這些變數以及函式，這個階段就稱為Hoisting。

<img style="width:100%;height:auto;padding:10px" src="../images/hoisting.png" />

### Hoisting的解釋
所以實際上，我們並不是真的把code宣告的部分移到最上層，而是在程式真正開始逐行執行前，Javascript已經預先把所有在Code裡面的變數及函式的記憶體準備好，所以這些變數以及函式已經存在於記憶體中了，因此，在程式開始逐行執行的時候，就可以從記憶體抓取到這些變數及函式。

而注意到變數又跟函式的Hoisting有些差別，在建立記憶體給變數時，它並不知道實際的value是什麼，直到程式執行到的時候才會知道value，取而代之的是，它預先放了一個替代方案，undefined。如剛剛的範例。

<img style="width:100%;height:auto;padding:10px" src="../images/function7.png" />

### 總結
Hoisting的存在並不是要我們太過依賴於它，所以還是盡量避免在宣告前先使用的寫法，這很容易會困住自己的邏輯，而實際上我們真正探討的是為什麼Javasript能讓宣告前先使用的現象，而不是為了讓大家依賴這種寫法。

再來是我們知道了一件事情，我們寫的Code並不是就直接被執行，而是Javascript讀取了Code，並做決定。第一階段是替我們的code創立一個execution context，決定程式碼如何執行，並在執行前，替變數及函式建立好記憶體空間。

### 參考來源
1. <a href="http://eloquentjavascript.net/00_intro.html#h_GlF1Kuv0JF" target="_blank">eloquentjavascript</a>

2.  [Udemy Course - JavaScript: Understanding the Weird Parts](https://www.udemy.com/understand-javascript/learn/v4/overview)