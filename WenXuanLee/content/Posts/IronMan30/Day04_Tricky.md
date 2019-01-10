+++
date = "2017-12-24"
title = "Undefined & Null"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

##Tricky Undefined & Null

今天這一章我們就來看一下前面沒細談的Undefined & Null types ! 一般在其他程式語言Null是被當作一個空值的，而在Javascript也是，但Javascript中又有另一個Undefined的type，，當這兩個做比較的時候會有很神奇的事情發生。

<img style="width:100%;height:150px;padding:10px" src="../images/tricky.png" />

上圖中，當兩者用 __==__ 比較時，是True，原因是兩個都代表著`此變數不帶值`，
而 __===__ ，是較嚴謹的比較方式，連Type都會納入考量，所以是false。
同樣都代表著空值兩者差異到底在哪，但要說Undefined為不帶值聽起來是挺怪的我們下面會再解釋。

而通常我們如果想要假設某變數為空值，我們會用null而不會主動塞給變數undefined。


<img style="width:100%;height:150px;padding:10px" src="../images/tricky1.png" />

除了相異處，兩者也有共通點，例如兩者的Boolean default都是false。

<img style="width:100%;height:150px;padding:10px" src="../images/tricky2.png" />

但聰明如你，一定會試著用typeof 一窺他們的秘密，此時你會發現一個天大的消息，相信你一定重複按了很多次，嚴重懷疑是不是自己打錯了或是語法出了問題。

<img style="width:100%;height:150px;padding:10px" src="../images/tricky3.png" />

為什麼type null 不是null？這得追溯到Javscript的歷史了，但我是印象派，只喜歡個大概，所以為什麼會這樣就請看官有興趣自行上網查閱。

至於為什麼到至今的版本中，仍然沒改善這個問題，這是由於，目前有太多程式的運作是依賴這個Bug的特性，因此倘若改的話可能會有更多Bug出現，所以就不要期待這個Bug被修好吧嘿嘿。

###Undefined & is not defined ?
字面上來看這兩個應該是相同道理的，但並不是的，這也是容易讓人疑惑的部分，首先Undefined是不會有Error的，而 is not defined是Error給出的訊息。

在Javascript我們看到undefined，事實上並不是真的代表字面上的意思，而是代表著一個 __Special Value__	，它代表的是`變數還沒被設定一個正常值`。

<img style="width:100%;height:150px;padding:10px" src="../images/tricky4.png" />

而今天如果我們賦予了a一個值。

<img style="width:100%;height:150px;padding:10px" src="../images/tricky5.png" />

上面兩個範例我們可以看到，第一個還沒給予正常值的話，大家還記得的話，在Creation phase會創立所有變數到記憶體裡面，並給予一個undefined為初始。

而上面的範例又跟接下來的狀況不太一樣，特別注意到，如果今天我們連變數都沒宣告的話。

<img style="width:100%;height:150px;padding:10px" src="../images/tricky6.png" />

燈愣 ! Error出現了，那是因為在Creation phase的時候它並沒在程式碼找到 var a，因此並沒有替a建立好記憶體空間存放，也就是說a根本不再記憶體內，所以當要在程式碼執行時找到a，就會回傳error，因此我強烈覺得Javascript應該把這個error訊息改成 `a is not declared`，才不容易造成混淆。

所以undefined並不是真的代表空值或不存在，而應該說是一個非常特別的值，它一樣佔有記憶體空間，實際上代表著這個 special value是被Javascript主動建立的。

知道了這個道理之後，千千萬萬要記得，千萬別做以下這個動作。

<img style="width:100%;height:150px;padding:10px" src="../images/tricky7.png" />

事實上這個動作是不會產生Error的，但我們最好讓 undefined這個特殊值永遠代表著一個意思，就是我們，寫程式的人，並沒有替此變數設定一個正常值，也就是說當我們看到undefined就可以知道，阿~這個變數沒有被我們設定到值，這對於debug是非常有幫助的。

想想你如果做了上圖的動作，今天看到undefined，你會無法確定這個undefined到底是我們設定的還是Javascript初始塞入的，所以永遠讓undefined代表著一個意思就好 - 我們只有宣告並沒有設定這個值。


### 參考來源

1. <a href="http://eloquentjavascript.net/00_intro.html#h_GlF1Kuv0JF" target="_blank">eloquentjavascript</a>
2. <a href="https://github.com/getify/You-Dont-Know-JS/blob/master/up%20%26%20going/ch2.md" target="_blank">You don't know JS</a>
