+++
date = "2018-01-03"
title = "Asynchronous"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

## Asynchronous

眾所皆知Javascript是synchronicity的，也就是同一個時間只能執行一件事情，但我們常常會聽到Asynchronous callbacks，這又是什麼呢?今天我們就來介紹這個主題吧。

## What's asynchronous

聰明的你不難猜出，簡易而言，asynchronous代表的是在一段時間內，不只執行一件事情，也就是當我們開始執行一段程式碼時，另一段程式碼也同是在運作了。

但我們知道，Javascript是synchronous的，它一次時間只執行一段code,然而我們知道Javascript有事件監聽例如點擊事件，或者是送要求然後將資料傳回的動作，當這些事件完成時會有一個callback function。

奇妙的事情發生了，Javascript是如何處理這些asynchronous的事件呢?

## Javascript Engine

這時我們要回來探討Javascript Engine本身，它不只是一個單一的個體，它同時與其他元素互動，好比Browser，會有其他engines並執行code。

好比有一個Rendering Engine負責印出web page畫面、會有HTTP Request處理資料要求，而Javascript Engine與這些元素會有一個鉤子連結再一起，當程式碼有更新時，可以與其他引擎做溝通。

<img style="width:100%;height:auto;padding:10px" src="../images/asyn.png" />

當程式碼執行時，這些Engines就有可能是asynchronous的，也就是這三個Engines在browser內可能是同步執行的，但只有Javascript Egine內部自己是synchronous。

我們之前已經知道Javascript有Execution stack
，當函式呼叫時會一層一層推疊，最上層優先執行，執行完後離開Stack。而Javascript Engine還有另一個 __event queue__ 。

### event queue

event queue主要是存放事件、事件的通知，所以當今天browser有一個事件發生時，在Javascript Engine內我們需要知事件要發生了，這時就會把準備發生的事件堆到event queue裡面，讓我們可以對事件作監聽並準備做相對應的動作，而當Execution Stack清空後，Javascript才會去看event queue是否有需要處理的事件。

### Sample

舉例來說，今天我們有函式對點擊事件作回應，或者有當函式執行時，又有另一個事件發生，例如送要求要資料，實際上整個流程怎麼跑呢?

<img style="width:100%;height:auto;padding:10px" src="../images/asyn1.png">

當今天exeuction stack整個執行完畢清空時，接著Javascript會回來看Event queue，如果queue裡有事件在等待，若有的話，接著看這個事件是否有一個函式去處理事件發生的狀況，所以就範例而言，Javascript看到了點擊事件，並有一個clickHandler()函式處理。

<img style="width:100%;height:auto;padding:10px" src="../images/asyn2.png">

Javascript知道有函式處理點擊事件後，此事件就會被移出queue，而下一步因為execution stack尚未被清空，所以Evet queue不會進執行流程，直到stack被清空為止，所以Javascript實際上並不是真的asynchronous，而是Broswer asynchronously的將事件存放進event queue裡面，Javascript egine仍然是一行一行執行code。

### Sample again

接著我們用一個程式範例來看看。

<img style="width:100%;height:auto;padding:10px" src="../images/asyn3.png">

這個範例中，我們有click event並有一個handler專門負責此事件，有一個需要執行三秒的function，以及一個當整個execution完成時提示訊息。Output的結果依序是 finish function、finish execution、click event。經過上面的sample應該不難推敲出這個結果，但我們還是實際上在重頭跑一次流程。

1. 建立好execution stack，並偵測到browser有點擊事件。
<img style="width:100%;height:auto;padding:10px" src="../images/asyn4.png">
2. execution stack清空。查看event queue。
<img style="width:100%;height:auto;padding:10px" src="../images/asyn5.png">
3. event queue有點擊事件，建立相對應的函式execution context。
<img style="widh:100%;height:auto;padding:10px" src="../images/asyn6.png">
4. 點擊事件已有函式做處理，移出Event queue
<img style="widh:100%;height:auto;padding:10px" src="../images/asyn7.png">

以上就是整個流程，相信大家也能自己推導出來，強烈推薦大家自己重頭在想一次啊!

## 總結

今天我們討論到asynchronous，實際上並不是指Javascript engine真的可以做到，而是指在javascript engine之外的其他元素所發生的事件，而javascript egine再透過事件loop，也就是event queue，當javascript處理好execution stack後再一個一個查看事件並處理，但仍舊是synchronous的。

***
以上就是今天的內容了，希望大家可以看得明白，內容有誤的話仍然麻煩大家指教了QQ，掰鋪。


### 參考來源
1.  [Udemy Course - JavaScript: Understanding the Weird Parts](https://www.udemy.com/understand-javascript/learn/v4/overview)
2. [You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch1.md)