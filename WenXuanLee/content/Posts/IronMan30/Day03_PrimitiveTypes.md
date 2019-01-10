+++
date = "2017-12-22"
title = "Javascript Basic Types"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

##Javascript Basic Types

##Vaiables

Variables主要是用來 __存放__ 數值的，可以想像成它是一個保險箱，用來存放錢錢的，當然錢錢不能亂放，保險箱也不能亂蓋，否則是會有 __渲染__ 問題的，這在後面的章節提`Scope`時會再詳加敘述。

在Javascript中，特別注意到Javascript的 __Variables__ 是沒有 __Type__ 的，而是由Variable中的 __Value__ 去決定一個變數的Type，後面會針對Type作介紹。

而宣告變數的方法如下。

<img style="width:100%;height:75px;padding:10px" src="../images/valImg.png" />

###小叮嚀
在宣告變數中，仍然有幾項規矩得注意。

1. 	變數宣告的第一個字母必須是`英文、底線(_)、錢字號($)`。
	<img style="width:100%;height:200px;padding:10px" src="../images/valImg2.png" />
2. 	Case Sensitive - 大小寫的宣告是不會被視為相同的變數，特別注意到宣告變數的時候僅有 __var__ 是被認定的，如果是Var、VAR、vAR等都無法宣告變數的，而在ES6還多了`let & const`。
<img style="width:100%;height:150px;padding:10px" src="../images/valImg1.png" />
3. 	變數名稱不可為Reserved Words & Key Words <a href="https://www.w3schools.com/js/js_reserved.asp" target="_blank">保留字參考</a>
4.  沒有透過 __var__ 宣告的變數會被Javascript認定為`global scope`，這點非常之可怖，千萬要記住。

## Types
由前面的介紹，我們對Variable有了基本的了解，而上面提到的Varaible並不帶有Type，而是由	__Value__ 來決定，Javascript總共包含了	__7__ 種Types，而在Javascript中針對Value的存取方式又分為，__Primitivess Types(5) & Objects Types(2)__	，分別為 __copied by value & copied by reference__	。

__Primitives Types__ 依序為
1. Number
2. string
3. boolean
4. undefined
5. null

__Objects Types__ 依序為
1. object
2. function

Javascript提供了 __typeof__	這個Operator，可以快速Check目前的Type。以下見範例。

<img style="width:100%;height:150px;padding:10px" src="../images/typeof.png" />

接下來我們就先針對Primitives Types作介紹。

## Primitives Types

### Number
Javascript認定數字的方式很簡單，只要是數字都是屬於Number Type不管是浮點數，小數、松樹、藤井樹、村上春樹，只要是數就都屬於Number Type。

針對數學系的朋友你一定會想，那超級大的數字該怎麼表示，放心只要增加一個 __"e"__ 在數值裡，便可以使用科學記號表示。

<img style="width:100%;height:150px;padding:10px" src="../images/num.png" />

####Special Numbers
Number中有桃園三結義需要特別記住，分別是大哥 __NaN__、二哥 __Infinity__、三弟 __-Infinity__	，分別代表的就是，不是數值，無限大，負無限大。

扣掉二哥跟三弟很直白以外，大哥究竟是怎麼回事，NaN代表的是，not a number，但NaN的type又是Number，聽起來挺饒舌的，簡而言之，NaN所代表的是那些沒有意義的運算或無法產生有意義的運算。好比 0/0。

<img style="width:100%;height:150px;padding:10px" src="../images/num1.png" />
### string
字串是只要用雙引號或單引號包住的value，通通算是字串，但要注意，做人要有始有終，單引號開頭就要單引號結尾，雙引號開頭就要雙引號結尾唷。
<img style="width:100%;height:150px;padding:10px" src="../images/str.png" />

那如果字串內包含特殊字元呢，那我們就要用到偉大的	__\\__	，傳說中的跳脫字元，跟著一起跳出去Yo。
<img style="width:100%;height:150px;padding:10px" src="../images/str1.png" />

string是可以套用 + 這個operator的，但這邊並不是數字的加法，而是將兩個字串做接合的動作，簡單來說，就是融合阿 !
<img style="width:100%;height:150px;padding:10px" src="../images/str2.png" />

### boolean
boolean就像是擲銅板一樣，不是正面就是反面，不是True就是False。

基本上都是用於判斷式，或者控制功能是否開啟的判斷，或者作為比較的用途。

<img style="width:100%;height:150px;padding:10px" src="../images/boolean.png" />

特別的是，字串也是可以做比較的，在Javascript中，滿特別的是大寫字母永遠小寫字母的，這是由於比較的基準是Unicode Standard，所以包含非字母元素也有一個大小順序。

<img style="width:100%;height:150px;padding:10px" src="../images/boolean1.png" />

<a href="https://unicode-table.com/en/" target="_blank">我是Unicode Standard</a>

### undefined & null
這兩個type是非常特別的存在，有點相似卻又有根本上的差異，在這先暫時理解成是一個空值代表，這兩個傢伙的Value就是他們自己，但實際上又沒帶著什麼實體訊息，在後面的文章會特別提到這兩個糾纏不清的傢伙。在此我們就先跳過嚕。

### 參考來源

1. <a href="http://eloquentjavascript.net/00_intro.html#h_GlF1Kuv0JF" target="_blank">eloquentjavascript</a>
