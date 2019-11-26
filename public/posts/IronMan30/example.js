var person = {
	firstName: 'Default',
	lastName: 'Default',
	getFullName: function() {
		return this.firstName + ' ' + this.lastName;
	}

}

var john = {
	firstName: 'Ben',
	lastName: 'Lee'
}

//千萬不要亂用__proto__，此為demo。
john.__proto__ = person;

for ( var prop in john) {
	console.log(prop + ': ' + john[prop]);
}

var jane = {
	addess: '111 Main St.',
	getFormalFullName: function() {
		return this.lastName + ', ' + this.firstName;
	}
}

$.extend(true, john, jane);
console.log(john);

window.onload= function() {
    initMode();
    initCards();
    setCard();
};

var mode = 'hard'; //初始遊戲難度
var resetButton = document.querySelector("#reset"); //抓到reset button
var modeButtons = document.querySelectorAll(".mode"); //array 儲存所有class為mode的tag
var cards = document.querySelectorAll(".card");//array 儲存所有class為card的tag
var numCards = 6; //卡片樟樹
var colors = []; //準備儲存顏色的陣列
var pickedColor;
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var resetDisplay = document.querySelector("#reset span");


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

resetButton.addEventListener("click", function() {
    setCard();
})

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

function pickColor() {
  var pick = Math.floor(Math.random() * colors.length);
  return colors[pick];
}