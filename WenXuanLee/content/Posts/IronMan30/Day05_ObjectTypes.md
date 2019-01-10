+++
date = "2017-12-25"
title = "Object Types"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

##Object Types

在介紹Types，我們提到主要分成兩種，一為基本的`Primitive Types`，另一則為`Object Types`，透過存取方式的不同做區別，那今天就來介紹一下Object Types，而在後面也會針對`copied by value` & `copied by reference` 作探討。

###Objects

基本上，Javascript除了Primitive Types以外都算是Object，那麼什麼是Object呢，你可以想像成蓋房子一樣，Primitive Types就像是一塊磚子，但能單靠一塊一塊磚子疊出來的房子不可能大到哪裡去，是吧 ?這時候我們是不是就需要鋼筋阿水泥阿混擬土阿，將各種元素包在一起的的結構去建造出更大結構的房子，Object就是這樣的一個存在，Object可以讓我們將多個Value包再一起，也可以Object包Object，藉此能做出一個更複雜的結構完成更複雜的事情。

看起來有點模糊，我們直接來個情境，假如有一個人叫小明，身高172cm，體重80公斤，每天早上都會吃蛋餅，那單靠Primitive Types你需要怎麼做呢?想到我就累了，我知道你不會想自己嘗試的，所以我已經準備好了。

<img style="width:100%;height:150px;padding:10px" src="../images/obj.png" />

你一定覺得這樣太沒效率了，連低能如我都知道這樣太誇張地真的，這時候來看看Object的厲害。

<img style="width:100%;height:300px;padding:10px" src="../images/obj1.png" />

透過Object的方式我們只要一個變數宣告便可以儲存多項訊息，接下來我們就針對Object內的細節做更多介紹。

###Object的宣告

Object的宣告方式很簡單，只要將想要放在一起的訊息用	__大擴號{}__	 包起來，便是一個Object，每一個Property對應的value用 __冒號:__	丟過去，不同的屬性值則用 __逗號 ,__	隔開，可以看上方圖片做對應。

###Property

在物件中，每一個value對應會有一個Property，例如剛剛範例中的 __name、height、weight、routine__	就是這個物件的Property。
而注意到routine這個property是存了一個function的，我們通常會稱為這樣的Property為object的method。

<img style="width:100%;height:300px;padding:10px" src="../images/obj1.png" />

###Property 的存取

那怎麼透過物件去得到這些Property所對應的值呢，我們就會用 __句號.__ 來得到，除此之外也可以透過 __[]__ ，而後者主要是用於當Property有特殊符號如空白或者變數名稱不符合規則時使用。

dot的方式
<img style="width:100%;height:300px;padding:10px" src="../images/obj2.png" />

中括號的方式
<img style="width:100%;height:300px;padding:10px" src="../images/obj3.png" />

###Property的新增與刪除

Object內的新增與移除非常之簡單方便，新增的部分只要透過 __=__ 直接直球進去就得分，而刪除只要透過delete就可以解決。
<img style="width:100%;height:300px;padding:10px" src="../images/obj4.png" />

###查看Object的狀況

常常我們Object內塞了一大堆東西，想要check的時候看得頭昏腦脹，在此分享一個好用的方式，可以讓check的時候更方便，這時候我們歡迎偉大的 __console.table(object)__ ，讓我們一次一目瞭然。

<img style="width:100%;height:300px;padding:10px" src="../images/obj5.png" />

###查看Property是否存在

通常Property不存在的狀況下會是 __Undefined__	，但你知道程式百百種，當一個property被刻意設成undefined的狀況下，這樣就不能判斷property的存在與否，這時我們就得依靠 __in、hasOwnProerty()__ 來判斷，根據我們的慣例，兩個做一樣的事情，一定會有細節上不一樣，他們也不例外。

* `in` 主要是連obj內的prototype 都會搜索過一次，至於什麼是prototype後面會在介紹，你可以先想成只要是obj都會擁有的東西，就像是只要是人都有腦，腦就是一個prototype。
* `hasOwnProperty()` 則只會搜索當前這個obj。
<img style="width:100%;height:300px;padding:10px" src="../images/obj6.png" />

### 參考來源

1. <a href="http://eloquentjavascript.net/00_intro.html#h_GlF1Kuv0JF" target="_blank">eloquentjavascript</a>

