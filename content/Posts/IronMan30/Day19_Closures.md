+++
date = "2018-01-04"
title = "Closures"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

## Closures

Closures可以說是Javascript內的九陰真經，想真的精通Javascript，這是絕對、必須、不得不去完整明白的一個概念。而同時它也是惡名昭彰的難以理解，小魯我到現在至今是深受其擾，就讓我們一起再來重新認識吧 !

### Closure Sample

首先，我們先看看一小段code，大概了解一下closure的厲害，接著我們會慢慢分析並了解其中的奧秘。

<img style="width:100%;height:auto;padding:10px" src="../images/closure.png" />

乍看之下好像一切都滿有道理的，但好像有哪裡怪怪的事情發生了，為了讓大家可以看清楚怪怪的事情，我們稍微更改一下範例。

<img style="width:100%;height:auto;padding:10px" src="../images/closure1.png" />

仍然一樣的結果，就是這個Bug，但是!sayWelcome函式怎麼知道whatToSay是什麼?根據我們過去的理解，當greet函式執行完畢後，execution context會被清除，也就是whatToSay應該已經不存在了才是，但在sayWelcome中卻仍然知道原本的值。

這個神祕的力量就是closure，讓我們再看看exeuction stack了解其中的奧秘。

* 程式碼執行到greet assign給sayWelcome，呼叫greet()並創建execution stack，當結束時回傳一個function expression。

<img style="width:100%;height:auto;padding:10px" src="../images/closure2.png" />

* 程式執行完畢，return回來後，execution context pop out

<img style="width:100%;height:auto;padding:10px" src="../images/closure3.png" />

問題來了，我們知道每一個execution context在記憶體中有一個空間，讓其中的變數以及函式可以是有效存活的，上面範例中，這個空間發生了什麼事?

正常而言Javascript egine會啟動一個garbage collection的機制，在execution pop out後清空這個空間，但在範例中這個空間卻依然存在，仍然在記憶體中的某一處。

接著程式繼續回到glbaol execution，

<img style="width:100%;height:auto;padding:10px" src="../images/closure4.png" />

當程式繼續執行進到匿名函式時，Javascript Engine看到whatToSay時，會怎麼做?我們知道有了Scope chain，所以會沿著outer reference往外層尋找此變數。

<img style="width:100%;height:auto;padding:10px" src="../images/closure5.png" />

儘管greet()的exeuction context已經消失了，sayWelcome execution context仍然會有一條連到greet()的outer reference，連結到greet()的記憶體空間。

儘管函式已經完成，任何在其裡面建立的函式，當被呼叫的時後仍然會有outer reference連結到原本的函式記憶體空間。再多想想一次。

1. greet()完成，execution context消失，但其中的的記憶體空間並沒消失。
2. Javascript Engine透過此記憶體空間確保其中的函式仍然有scope chain連結著，儘管此函式已不存在於execution stack中。

這樣的連結，通常會這樣說明，這個execution context已經封閉了，變數不管怎樣仍然會有reference，即使execution context已經消失。

<img style="width:100%;height:auto;padding:10px" src="../images/closure6.png" />

上述的現象，這樣一個封閉的現象，execution context不存在仍然可以access到其中變數的況，我們就稱為closure。

### Closure Again
我們一樣先看範例，想一想Output是什麼呢。

<img style="width:100%;height:auto;padding:10px" src="../images/closure7.png" />

我們有一個function裡面建了一個空陣列，並有一個for loop將新建立的function放入陣列的內容，最後回傳陣列，你的答案可能會是 0,1,2，但實際上呢?

<img style="width:100%;height:auto;padding:10px" src="../images/closure8.png" />

各位觀眾，3個3，同花打不打得過Full House?驚訝的程度大概就跟獨眼龍被翻盤的結果一樣，怎麼會這樣呢，為什麼3個都是3，或許你已經知道了，不知道的我們就一步一步來探究吧。

我們依然從execution stack來一探究竟。

1. 建立好global execution context，裡面包含build函式以及變數getArr。
<img style="width:100%;height:auto;padding:10px" src="../images/closure9.png" />
2. 第17行呼叫到了build()並assign給getArr，創立了build()execution context，執行內容並回傳arr。
3. 注意到，迴圈裡，我們並 __沒有呼叫__ 新建的函式，而單純只是新建函式塞到陣列，最後 i = 3 跳出迴圈，回傳陣列
<img style="width:100%;height:auto;padding:10px" src="../images/closure10.png" />
4. 回到global execution，build execution pop out，但昨天我們講到，記憶體空間並沒有跟著消失。
<img style="width:100%;height:auto;padding:10px" src="../images/closure11.png" />
5. 接著呼叫三個陣列裡的函式，所以當找不到i時，跟著scope chain開始尋找，最後找到3。
<img style="width:100%;height:auto;padding:10px" src="../images/closure12.png" />

由上面可知，三個陣列裡的函式，三個函式都是再build()裡面被建立，都會找到沿著同樣的scope chain找到 i = 3，這也是為什麼會有3個3，明白了嗎~

雖然看起來會有點奇怪，會有疑惑的部分在於，我們會認為迴圈裡的console.log(i)已經執行並存好i的值，但事實上，迴圈裡只是將整個function 當成value存取，而尚未真正呼叫並執行，所以當執行並呼叫的時候才會真正去抓取i現在的值，也就是3，Gotcha ~

### 我就想要 0 1 2

你一定會想，那我要怎麼樣才能得到0 1 2的結果，我們上面提到了，什麼時候呼叫到函式一切的關鍵，如果我們想保留迴圈時的i，我們就先把函示執行完再存回到陣列就沒問題了，也就是IIFE !。

<img style="width:100%;height:auto;padding:10px" src="../images/closure13.png" />

抓到重點了嗎 ? 來，我講給你聽。

* 匿名函式在執行時仍然會沿著scope chain 尋找j值。
* 匿名函式一開始是迴圈裡是透過IIFE的呼叫後產生的結果，所以IIFE為其outer reference。
* 每次IIFE執行時就會創立一個 j (以 i 為初始值)，j存著當時IIFE執行時 i的值。
* 3個匿名函式沿著scope chain 找到3個IIFE的記憶體位置並拿到j的值所以也就得到 0 1 2。

這就是利用IIFE以及closure得到一開始想要的結果，事實上透過ES6的let 寫法能更快速的達到此結果。

<img style="width:100%;height:auto;padding:10px" src="../images/closure14.png" />

* let是每一次迴圈執行時，都會替變數創建不一樣的memory space。

## put it down
Closure是Javascript中一個特徵，這樣的現象就是會發生，它不管我們何時呼叫函式，我們不用擔心outer environment是否仍然存在，Javascript engine會幫我們確保不管哪個正在執行的函式中，variable應該被存取到的就是應該被存取到，整個scope是完整的。

這是Javascript一個很特別且強大的一個特性，許多程式碼都依賴著這樣的特性，而這個特性也會有一些特殊的code pattern，明白其中真正的原理才能更熟練地運用它。

***

### 參考來源
1.  [Udemy Course - JavaScript: Understanding the Weird Parts](https://www.udemy.com/understand-javascript/learn/v4/overview)
2. [You don't know JS](hhttps://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md)