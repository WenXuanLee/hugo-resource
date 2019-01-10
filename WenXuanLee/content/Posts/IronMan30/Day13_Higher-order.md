+++
date = "2017-12-30"
title = "Higher-order Function"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

## Higher-order Function

Function在Javascript是它馬重要的傢伙，記住它一個特別的特性，在JS裡，Function也可以是value，Assign到變數中，相同道理，function也可以被當作function的參數，聽起來有點弔詭，但其實我們在介紹陣列的方法中已經有看到這種用法。

一個function如果接受function為參數，或者，function 回傳的值是一個function，則稱之為Higher-order Functions。見範例。

<img style="width:100%;height:auto;padding:10px" src="../images/high.png" />

* 之前介紹的filter就是一個higher-order function
* 接受一個function (如果Area === Taipei)為參數。

### 好處是什麼 ?

試著想想，如果剛剛的範例不用filter來寫的話該如何做?

<img style="width:100%;height:auto;padding:10px" src="../images/high1.png" />

以下我們分成來比較，共同動作為，檢視每個元素，過濾符合條件的元素。

1. 在filter的使用下，我們只需要決定過濾內的函式如何執行。
2. 手動的情況下，我們需要自建一個Array存放，並手寫一個for迴圈，並在條件式裡，撰寫儲存新Array的方式。

相比之下，哪一個方式比較繁瑣呢?答案應該很清楚。

透過Higher-order function，我們可以將簡單的函式，如上面條件判斷式的簡單函式當作參數，一步一步串成規模更大的程式，這樣的設計方式，不僅讓程式碼乾淨俐落，也不容易產生Bug，更ㄅㄧㄤˋ的是可以重複使用阿 !

* 簡潔程式碼，不容易出錯。
* 函式可以再重複使用。
* 可以將大程式切割成簡單函式來組織。

## Function Programming VS OOP

上面我們提到了Function Programming(FP)，其實還有另外一種概念就是Object-oriented Programming(OOP)，我們就來稍微介紹一下兩者的設計概念以及比較。

### OOP
主要用Objects來達成程式目的，每個物件中有各自的屬性及方法，而有些物件是有共有特性的，透過這些物件互相的作用，每個物件都可以處理其相對應的動作並且將處理好的內容再傳達給其他物件。

而OOP最核心的概念就是 - 封裝、繼承、多型。

1. 封裝 - 可以讓別人使用，但別人不知道實際的細節
2. 繼承 - 保有原物建的特性並做擴充。
3. 多型 - 物件可以針具收到的任務而有不同的操作，只須注意物件是有否共同型別。

而PTT中有一篇強大的範例完整演繹了OOP的概念 如下
>面試官:
什麼是OOP?

> 封裝
面試者:
我是個封裝良好的軟體工程師，您只要將任務交待給我，我就會把程式寫好，您可以不用耗費心力在細節中，可以去專心在您的核心
業務。

> 繼承
我已經有在A公司當過N年軟體工程師的經驗，我以前的經驗可以繼承，您不用花時間心力成本教我訓練我，而且我會根據貴公司
的狀況調整我的工作方式。

> 多型
我不僅是軟體工程師，事實上，我是個多型者。我可以是資料科學家，UI/UX設計師，DBA，FAE。總之，我就是一個職員。只要
您說，"職員去做事"，我就會根據狀況做好該做的事，不管是分析資料，設計UI，備份資料，或是對客戶解說技術。
[文章來源](https://linkptt.com/a2.php?p=Soft_Job853cfw0vM.1510632262.A.C49.html)

範例 - 情境為幫員工加薪 OOP方式

<img style="width:100%;height:auto;padding:10px" src="../images/high4.png" />

*	封裝 - 幫員工加薪，但並不知道加薪的過程是什麼。
*	繼承 - 每個員工都有薪水以及名字並都有加薪的潛力。
*   多型 - 今天想要飛，a員工可以完成。
*	好處 - 對於新的Data進來並做處理是很簡單的，就再新增一個新的物件，但實際行為得先設計好，也就是Constructor的部分。

### FP

完成事情的方式，用的是固定的函式，也就是這個函式永遠運作一樣的事情，不管餵進來的是什麼，都不會影響Data的結構，也就是說資料是被分開存放並且不可變動的，而主要完成動作就是藉由組織這一堆函式去完成一個複雜的任務。

範例 - 情境為幫員工加薪 FP方式

<img style="width:100%;height:auto;padding:10px" src="../images/high3.png" />

* function只注重加薪的功能，並只做同一件事情。
* 回傳的資料都是一個新的資料結構(clone)，不會影響原資料。
* 好處 - 對於新增動作是很容易的，好比今天想要減薪，升職，新增功能是很簡單的，因為data都是階段性並回傳新的資料結構，不用擔心影響餵進來的資料。

### 兩者的取捨
其實兩者沒有一定的優劣與否，這是沒有絕對的，實際上考量的點在於程式欲解決的問題啊。

* OOP適合函式的動作是固定的，而資料是比較會變動的部分，只要先想好動作是什麼，新增資料並做動作就顯得很容易。
* FP適合資料是固定的，而函式是需要各種更新的，也就是動作會比較多樣化。

***
但由於小弟解起來還是有點卡卡的，自己看過也覺得好像哪裡怪怪的，但就是不知道好像哪裡怪怪的阿 !希望看過這篇文的大神們，可以幫忙提出建議並糾正我的錯誤QQ，以上就謝謝大家囉。


### 參考來源
1. [eloquentjavascript](http://eloquentjavascript.net/00_intro.html#h_GlF1Kuv0JF)
2. [A dirt simple introduction to higher order functions in JavaScript](https://medium.com/humans-create-software/a-dirt-simple-introduction-to-higher-order-functions-in-javascript-b33bf9e19056")