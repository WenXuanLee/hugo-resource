+++
date = "2018-01-09"
title = "prototype"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

## Constructors & prototype

前面我們提到了prototype的概念，也知道了物件裡的prototype chain是怎麼回事，我們回想一下創造物件的方式有哪些，除了一般的宣告，還有一個在function介紹的方式，也就是constructor，那透過constructor創立的物件如何去設定它的prototype呢?

今天我們就來探討一下這個問題


## One for all & All or one

```
function User(name, friends) {

	this.name = name;
	this.friends = friends;
	this.greet = function() {
		console.log('Welcome' + this.name);
	}

}

var userA = new User('Bob', ['Ben', 'Andy']);


console.log(userA.__proto__); // {constructor User}

```

當我們透過function 建立物件時，在new的時候Javascript Engine就會自動幫我們建立好prototype chain，新建的物件會有一條prototype chain連結到constructor。

### Special Property

回想一下，我們說過每一個物件都有自己的一個property叫做prototype吧，而所有函式之中也有一個特殊的property，這也是我們把函式當作constructor使用時應該要注意並好好運用的一個special property。

<img style="width:100%;height:auto;padding:10px" src="../images/prototype12.png" />

每個函式雖然都有prototype這個property，但除了function constructor，一般函式是不會用到這個property的。就只有 ! 當今天把函式用來建立新物件的時候，這個Property才會被使用到。


```
function User(name, friends) {

	this.name = name;
	this.friends = friends;
	this.greet = function() {
		console.log('Welcome' + this.name);
	}

}

User.prototype.welcome = function() {
	return 'Hi' + ' ' + this.name;
}

var userA = new User('Bob', ['Ben', 'Andy']);


console.log(userA.__proto__);
console.log(userA.welcome()); //Hi Bob
```

今天new建立一個空物件時候，同時也將空物件的prototype指到後面函式的prototype property，也就是此時空物件的prototype是指到 User.prototype的，所有透過此constructor的新物件，其prototype都會指到此函式的prototype property。

所以上面範例的結果會變成下圖。
<img style="width:100%;height:auto;padding:10px" src="../images/prototype12.png" />

welcome存在在新物件的prototype中，而且UserA可以使用這個method，酷吧 ! 同時我們也可以在物件之後再新增prototype方法，因為javascript egine是會沿著prototype chain去尋找的。

```
function User(name, friends) {

	this.name = name;
	this.friends = friends;
	this.greet = function() {
		console.log('Welcome' + this.name);
	}

}

User.prototype.welcome = function() {
	return 'Hi' + ' ' + this.name;
}

var userA = new User('Bob', ['Ben', 'Andy']);


console.log(userA.__proto__);
console.log(userA.welcome()); //Hi Bob

User.prototype.sayYo = function () {
	return 'Yo' + ' ' + this.name;
}
console.log(userA.sayYo()); //Yo Bob
```

試著想想這個背後強大的力量，今天我們用User建立了了千千萬萬個新物件，如果你想新增一個feature給所有的新物件，居然只要透過prototype property便可以一次新增給所有的新物件，這不是太神了嗎?這代表著你不用在來回複製個三天三夜，不用需要複製到血流成河阿 !

### Why prototype

通常比較好的javascript code你會發現，function constructor通常只包含著單純的property，而method通常都會放在prototype裡面。這是為什麼? 為什麼不把welcome放在constructor裡面，這樣每次新建的物件就會有這項method了阿 ?

年輕人就是太天真，想當初我也是這樣覺得沒事搞個prototype來幹嘛，直接在constructor解決就好，神經病沒事找事做。但你仔細想想，new 這傢伙是幹嘛的? 創造一個新物件? funciton也是什麼 ? 一個物件? 有沒有注意到一點點事情 ?

沒有錯 ! 每一個物件都佔了一個記憶體空間，倘若method都塞在constructor 這代表著雖然每一個物件都有此方法，但每一個物件也就多佔了一次這個method的記憶體空間。

也就是如果我們把welcome寫在User裡面，新建了一百個物件的話，就多佔用了100個welcome method的記憶體空間

那如果是prototype呢? 它是把物件的prototype refer到 constructor prototype的property，也就是所有物件的method都是指到同一個地方，同一個method。

有沒有一種恍然大悟的感覺，100 : 1的差異就在這裡啊，這也是為什麼會盡量把method放到prototype裡面，可以大大節省空間阿。

## Look at the big picutre

上面我們明白了constructor 跟 prototype的好處，試著多想一點，平常我們常見的String、Array、Number等等，是不是都有自己的method呢 ? 沒有錯，他們都是Javascript內已經有建好的constructor，並在prototype property中建好我們常用的method。

<img style="width:100%;height:auto;padding:10px" src="../images/prototype14.png" />

有了此概念之後，你便可以利用這個觀念，去延伸出自己想要的功能，這也就是其他人如何寫出自己的library。

```
String.prototype.isLengthGreaterThan = function(limit) {
	return this.length > limit'
}

console.log("John".isLengthGreaterThan(3)); //true
```

上面的範例就是透過今天的觀念，在String裡面新增一個method方便自己使用 ! 但這樣的行為是非常危險的，盡量避免修改到 built-in constructor，除非真的對其中的設計觀念非常清楚，不然真的隨時會陣亡阿，上面是個不良示範，大家不要亂來。

***
以上就是今天的內容拉，掰鋪。
### 參考來源
1.  [Udemy Course - JavaScript: Understanding the Weird Parts](https://www.udemy.com/understand-javascript/learn/v4/overview)
