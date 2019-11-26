+++
date = "2018-01-08"
title = "Color Game"
tags = [
  "Javascript",
]
categories = [
  "Javascript",
  "Tech Note"
]
+++

## Color Game
30天即將到了尾聲，雖然文章寫的七零八亂又超沒系統的，還是小小期盼大家有從中獲得一點什麼，而上面幾乎都只是文字介紹，很少動手code的部分，但學code就是要學中做、做中學，所以我們這兩天，就來小小寫一個遊戲吧。

這個遊戲是我看到有人分享清大線上課程時候，自學的時候的一個作業，我覺得挺有趣的，就分享給大家一起來寫寫看，以下是它的作業需求 [Color Game](https://shwu10.cs.nthu.edu.tw/courses-software-studio-2017-spring/lab-js-color-game-quiz)

但由於我們介紹的部分是Javascript，我們就針對Javascript的部分一步一步來完成這個小專案，至於html & css的部分我們就直接套用git lab提供的，雖然script的部分上面也有了，但建議大家可以先自己寫看看，我會照著上面範例的script一步步解釋其中的code是怎麼回事，但如果大家能自己想出來那是最好的了。

那我們就開始吧 ! 我們準備寫script的地方是Code Pen，Code Pen是很方便的好所在，沒事無聊想寫寫小東西都可以在這邊操作，雖然我都是在本基端就是XD，大家可以去code pen fork我這個沒有script版本的code來操作。

[Code Pen連結](https://codepen.io/WenXuanLee/pen/ZveBNK)

## Play with it
首先，看到這個我們觀察整個動作的流程是什麼樣。

![Alt text](https://shwu10.cs.nthu.edu.tw/courses-software-studio-2017-spring/lab-js-color-game-quiz/raw/102012031/demo.gif)


### 你看到了什麼?

我們可以看到整個遊戲有許多跟Javascript有關的動作。

1. 可以點擊的難易度選擇。
2. 點擊難易度之後遊戲畫面的變換。
3. 每一張可以點擊的卡片。
4. 卡片點擊後的變化。
5. 卡片顏色的產生以及題目的產生。
6. 判斷卡片顏色是否正確以及遊戲是否結束。
7. 是否重新開始遊戲。

簡單來說大概是這樣，所以我們開始建立script前，強烈建議大家先想好到底有哪些功能需要注意，不要一股腦的還沒想好架構就暴走一波。

### Start coding
有了大概的結構我們可以開始思考我們的Code要怎麼寫了，這邊是按照我個人的習慣，由於我不太有耐心，喜歡先把簡單的部分做掉，先得到一點成就感不然很容易喪失鬥志，所以我第一個動作為以下。

先處理好所有需要有點擊動作的傢伙。


```
window.onload= function() {
    initMode();
    initCards();
};

var mode = 'hard'; //初始遊戲難度
var resetButton = document.querySelector("#reset"); //抓到reset button
var modeButtons = document.querySelectorAll(".mode"); //array 儲存所有class為mode的tag
var cards = document.querySelectorAll(".card");
//array 儲存所有class為card的tag

function initMode() {
  for(let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {

      for(let j = 0; j < modeButtons.length; j++) {
        modeButtons[j].classList.remove("selected");
      }

      this.classList.add("selected"); //變換點選的模式

    });
  }
}

function initCards() {
  for(let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function() {
      this.style.opacity = 0; //測試是否成功點擊觸發
    });
  }
}

resetButton.addEventListener("click", function() {
    this.style.backgroundColor = "#02F78E"; //測試按鈕是否成功可以點擊
})
```

我個人code習慣是會先設定一下變化確認自己有成功設定好要觸發的事件，大家可以省略也可以跟我一樣寫一個測試的變化。

1. 我們透過querySelector去抓取html標籤裡的元素，而注意到querySelectorAll()抓取到回傳的是一個陣列。
2. 利用for迴圈把每個元素新增點擊事件，新增的方法為addEventListener('事件', callback);
3. callback function內我先對元素的css做變化確認事件監聽成功。

### step2

再來我會把卡片上色，上色的部分分成

#### 依據難易度減少卡片張數。
```
var numCards = 6; //卡片張數
function initMode() {
  for(let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {

      for(let j = 0; j < modeButtons.length; j++) {
        modeButtons[j].classList.remove("selected");
      }

      this.classList.add("selected");
      mode = this.textContent;
            switch (mode) {
                case 'Easy':
                    numCards = 3;
                    break;
                default: // 'hard' or 'nighmare'
                    numCards = 6;
            }
       setCard();
    });
  }
}
```

1. 設定卡片張數，並針對模式的選擇不同決定張數數字。
2. textContent可以抓取到標籤裡的內容
```
<a href="#" class="mode">Easy</a> 也就是扣掉標籤部分 Easy這段字串
```

#### 產生隨機顏色。

```
function randomColor() {
  //floor是去掉小數點，random出 0 ~ 255的數字
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function storeRandomColor(numCard) {
    var arr = [];

    for (let i = 0; i < numCard; i++){
      arr.push(randomColor());
    }

    return arr; //return 儲存的隨機顏色們
}
```

1. 透過內建的數學函式庫floor做整數的動作。
2. random方式random 0 ~ 255範圍的數字
3. 回傳整個rgb字串等待存到陣列裡。
4. 陣列裡push進random color產生的字串，因此陣列裡的內容會如以下

<img style="width:100%;height:auto;padding:10px" src="../images/color.png" />


#### 將隨機顏色放到色卡裡面。

```
var colors = []; //準備儲存顏色的陣列

function setCard() {
  colors = storeRandomColor(numCards);

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.opacity = 1;
    if(colors[i]) {
      cards[i].style.display = "block";
      cards[i].style.backgroundColor = colors[i];
    } else {
      cards[i].style.display = "none";
    }
  }
  body.style.backgroundColor = "#232323";
}

```

1. storeRandomColor回傳一個陣列，利用一個空陣列儲存起來給函式使用。
2. 重新設定卡片時將所有卡片顯示可見。
3. 由於卡片cards初始為6，所以當變更為easy模式的話，後三個卡片顏色將會不存在，此時我們直接將卡片隱藏起來。

### Almost there
其實做到這邊主要的內容大概都設定好了，剩下只要挑選出題目的顏色並判斷點選卡片的顏色是否等於題目顏色變完成囉，讓我們繼續下去。

#### 選定題目顏色
```
var picked color;
var colorDisplay = document.getElementById("color-picked");

function pickColor() {
  var pick = Math.floor(Math.random() * colors.length);
  return colors[pick];
}
```

1. 建立一個變數準備儲存題目顏色
2. 從隨機產生的顏色中挑選一個為題目。
3. 將題目的RGB數字顯現在html的標籤上。

#### 顯示題目
```
function setCard() {
  colors = storeRandomColor(numCards);
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.opacity = 1;
    if(colors[i]) {
      cards[i].style.display = "block";
      cards[i].style.backgroundColor = colors[i];
    } else {
      cards[i].style.display = "none";
    }
  }
  body.style.backgroundColor = "#232323";
}
```

1. 注意到pickedColor()的位置，因為其中的函式是根據RandomColor的結果去做挑選的。
2. 透過textContent顯示pickedColor的數字

#### 判斷是否為題目顏色。
```
function initCards() {
  for(let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function() {


      var clickedColor = this.style.backgroundColor;

      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
      } else {
            this.style.opacity = 0;
            messageDisplay.textContent = "Try Again"
        }
    });
  }
}
```

記得我們點擊事件在一開始寫好的函式內，所以當要判斷選擇顏色與題目是否相符時也在這邊的callback function決定。

#### 重新開始遊戲
```
resetButton.addEventListener("click", function() {
    setCard();
})
```

直接在callback裡面再次呼叫設定卡片的函式就可以整個重新再來一次囉。到這邊簡單的簡單的遊戲已經完成拉，其他小細節就留給大家自己去做修改吧 !

***
這就是今天的內容拉，希望大家都可以成功完成一個小遊戲。

### 參考來源
1.  [Modern Web and App Programming](https://nthu-datalab.github.io/webapp/index.html)
