+++
date = "2017-12-21"
title = "Javascript Intro"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

##Javascript Introduction

身為一個前端工程師，對前端三本柱子大家一定不陌生，HTML、CSS、Javascript，在一個Page裡面，Javascript又扮演著什麼樣的角色呢?

若用一個英文文法來說的話，HTML就是扮演著Nonus、CSS則是Adj、Javascript則是扮演著Verb的角色，也就是說，Javascript便是控制元素如何與使用者互動的部分，三者合為一體則可以完成一個標準的句子，也就是我們的Web Page。

主要介紹為

*	Synyax Parsers、Execution Contenxts、Lexical Environments
*	Javascript的小故事

##Javascript 你不知道的事

### Syntax Parser

今天我們寫了一隻Javascript的程式，裡面有密密麻麻的程式碼，身為一個人開發的人，理所當然地你會知道Code代表的意思是什麼，但對電腦而言呢？電腦是不明白我們看得Code，而Syntax Parser就登場囉，你可以想像成，`Syntax Parser就像是一個翻譯`，負責將我們的Javascript Code 翻譯給電腦讀，進而執行程式。

所以當我們今天的Javascript Code執行時，會先經過Syntax Parser一字一句讀取我們的程式，並判斷這個語法是否有效，將有效的語法翻譯成電腦可以明白的方式。

###Lexical Environment

Lexical的原意為，與字詞或語法相關的。Lexical Environment在Javascript代表的是，今天我們Code寫在哪個 __位置__	，是非常重要的。

<img style="width:100%;height:300px;" src="../images/intro.png" />

上面我們看到有一個變數，在函式裡面，這變數在字詞上來說就是坐落於、存在於這個函式，這隻函式{ ... } 就是一個Lexical Environment。

就如我們上面講的，我們寫的Code是會經過Syntax Parser翻譯的，而翻譯的過程它是對於這些字詞存在的位置很在意的，寫的位置是會影響存放於電腦記憶體中的位置，以及如何去與其他變數、函式、元素互動的。

所以當我們提到Lexical Environment中，便是在討論code是被寫在哪個段落位置以及被什麼東西涵蓋住。一隻程式

###Execution Context

一隻程式函式這麼多，到底要怎麼知道目前是哪段Code正在執行阿，搞得我好亂R，這時候我們就歡迎偉大的Execution Context，拯救我們的世界。

Execution Context就像是一張包裝紙，幫助管理哪段Code正在被執行。如同我們上面提到的，一隻程式會有許多個Lexical Environment，那哪一個先執行便是透過Execution Contexts管理。

而最基本的Execution Context就是 `Global Execution Context`，每隻Javascript程式一開始一定會有的傢伙，而這傢伙在一開始便替我們做兩件事，`創造 Global Object & This`。

Global Object - 在Code裡面不管哪個元素不管在哪個段落都可以Access到的物件。
this - 之後會有篇幅說明


###ECMAScript
Javascript是一個普遍的稱呼，嚴格上來說，Javascript是符合	__ECMAScript標準__ 的一個實作，而ECMAScript標準是不止一個版本的，隨著時代演進，尤其在近年前端的大量改革下，ECMAScript近幾年也開始頻繁性的改動。

而目前ECMAScript主要常見的有以下三種
1. ES5 = ECMAScript 5
2. ES6 = ECMAScript 6
3. ES7 = ECMAScript 7

基本上除了ES5的標準目前是被主流Browser接受外，目前ES6與ES7的一些新語法及規範還尚未被Browser完全採納，但，身處一個不斷進化的世代，還是建議以未來的標準去撰寫。

目前`Babel`，便可以幫助我們把ES6 OR ES7的語法轉譯成ES5餵給Browser，所以還是建議大家一起往ES6邁進吧，畢竟以未來的標準去撰寫，當未來瀏覽器採用時，便不須再負擔修改的成本。


### 參考來源
1. <a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank">Wiki</a>
2. <a href="http://eloquentjavascript.net/00_intro.html#h_GlF1Kuv0JF" target="_blank">eloquentjavascript</a>
3. [Udemy Course - JavaScript: Understanding the Weird Parts](https://www.udemy.com/understand-javascript/learn/v4/overview)
