+++
date = "2018-11-13"
title = "Network Layer"
tags = [
  "Network Layer",
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

## Brief-intro about Five Layers

層級的概念是，個別層級中有自己的服務，個別執行特定的動作已達成目標，而傳遞下去的層級中，是依賴於上一層的服務，舉例來說的話，買票之後才能上火車，第一層的服務為窗口買票，第二層為上車的動作，若第一層沒買票的話，則第二層便無法實現。

從上到下的五層順序分別為 `Application Layer`、`Transport Layer`、`Network Layer`、`Link`、`Physical`

### Application Layer

應用層是最接近web app的，此層的協定包含常見
`Http` - 提供向瀏覽器發出request & transfer
`SMTP` - 提供transfer`email`訊息
`FTP`  - 提供檔案的傳輸協定
`DNS`  - 提供轉換網址到`network address`

應用層協定分布於各個end system上，各個end system透過傳輸層提供的protocol去交換packet。

### Transport Layer

主要將應用層傳遞下來的封包，透過TCP/UDP協定傳送，在此處也會在packet上加上header information，包含了允許封包在receiver那邊可以往上丟回`application layer`，以及`errr-detection bits`讓receiver知道message是否在route理被動過手腳

`TCP` - 提供`messages`的傳送以及flow control，也提供將`packet`切成`segment`，以及`packet`塞車的處理機制
`UDP` - 提供了當無網路狀態時web app的service

### Network Layer

負責整個封包傳遞流程的`datagrams`，主要為`IP protocol`，定義了`datagrams`的區域以及end system & router如何在這些fields做行為，特別注意到`IP protocol`只有唯一一個，所有`Internet component`一定都得遵守，同時此層也包含許多`routing protocols`。

### Link Layer

將`packet`從node中運輸依賴的是`link layer`的服務，負責傳送network層的datagram到下一個node節點。此服務依賴於`link-layer protocol`，常見的link-layer protocol為以下`Ethernet Wifi DOCSIS`等等，同一組`datagram`可能會在不同的Route被不同的協定服務，通常在`link-layer`的`packet`又稱為`frames`

### physical Layer

就幾乎是實體線路的範圍了，在此不做贅述

## Encapsulation

封包在傳遞的過程中，所經過的layer並不相同，如下圖所示，在link-layer switch以及router裡面，packet作用的service在後面三層，而在end system才有到頭兩層，在層數往下的過程中，都會加入header information作為保護的手段，如圖中的Ht、Hn，因此我們可以依圖所例，得知每個層級都會有兩個type of fields，一者為前一層帶下來的packet，一者為每層級的header information。

以一個假設來說，今天A想要寄信到B，首先`A手寫的信`，也就是`application-layer message`，會先裝到`信封袋`中，並寫上`B的住址以及姓名`，整個信封袋就是`transport-layer segment`，封裝了`application-layer message`，接著到郵局之後，經郵局分類放到`對應的縣市分類夾`，也就是`datagram`他封裝了`trsans-layer segment`，接著郵差開始從`分類夾中拿出信件`，並對照`上面的資訊送到B的家裡`，也就是解封的過程開始，最後B成功收到信上的內容。

由此可見，在每個層級都會在封裝前個層級的封包，這就是封裝的概念。

![https://ithelp.ithome.com.tw/upload/images/20181113/20107670udmOwQ5j7i.png](https://ithelp.ithome.com.tw/upload/images/20181113/20107670udmOwQ5j7i.png)

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)