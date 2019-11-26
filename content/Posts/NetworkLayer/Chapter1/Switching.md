+++
date = "2018-10-25"
title = "Switching"
tags = [
  "Packet Switching",
  "TDM",
  "FDM"
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

### Packet switching vs Circuit Switching

主要差別在於，前者並不會保留`特定path`，而後者會`保留一個特定path`給package。因此當`packet switching`同時遇到太多package進來時，就得進入到buffer裡面去排隊，等待安排output communication，`Circuit Switching`則不必等待，而是在進來之前已經先預訂好path，而因此，也必須在兩個end system裡面先建立好connection之後才能進行資料傳輸動作，而相對也有比較穩定的傳輸速率。

範例來說，如果今天有N個使用者的話，套用`circuit switching`的方法可能最高只能容納10個使用者同時運作，因為會預先保留頻寬給user，當user可能還沒進行傳輸時，就會一直保留住，導致於後面進來的user，得一直卡在buffer裡面，有種占著茅坑不拉屎的感覺。

`packet switching`則不會保留頻寬，只要有空位使用者便進來使用而且傳輸，今天若同時有十個人進到餐廳裡面，但有五個人還沒開始用餐的話，packet switching則會先把五個座位安排給可以馬上用餐的人，所以相對`circuit switching`來說，就不會有被佔住位置的問題。當然如果五個user都佔據超大數據傳輸資料的話，仍然會有buffer塞爆的問題了

### TDM & FDM

`TDM`是將一個connection的duration切成`frame`，每個`frame`中在切出`time slot`，User開始傳遞資訊時便會被塞到`time slot`，也就是在一個固定的時間內切割頻寬，同時允許多個使用者傳遞資料，`time slot`越多，相對地速率也會趨緩。

`FDM`則是依頻率來切割link區段，而使用者同時在同一個切割區域裡面做傳輸，不同於`TDM`是一個一個將使用者塞到slot裡面去做動作，FDM是一起將user丟到一個pool的感覺。

### networks of networks

![https://ithelp.ithome.com.tw/upload/images/20181025/20107670FFexMX3gjC.png](https://ithelp.ithome.com.tw/upload/images/20181025/20107670FFexMX3gjC.png)

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)