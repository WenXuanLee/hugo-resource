+++
date = "2018-11-08"
title = "Packet Probrlm"
tags = [
  "Packet Delay",
  "Packet Loss",
  "Packet Throughput"
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

# Delay, Loss, Throughtput

## Types of Dealy

假使今天sourceA丟出一個封包道destinationB，途中可能會經過routerA、routerB，當`packet`運送到`routerA`時，routerA會有一條`outbound link`到routerB，進到此link前會有一個queue，判斷當前是否有其他`packet`，是否正在此`link`傳輸資訊。所以今天`new packet`送到routerA時，routerA會根據`header`資訊決定將`new packet`安排到特定`link`，當`link`有數據正在傳輸時，new packet便會進到queue裡面去等待。

### Processing Delay

解讀`packet header`並解決定此`packet`map到特定`link`的時間就是process delay，通常在routers裡面，此種delay的時間大概落於`microseconds or less`

### Queuing Delay

就字面上的意思，當`packet 進到queue`裡面，等待其他先到達的packet完成傳輸的時間成本就是Queuing Delay，通常此delay的時間實務上落於`microseconds to milliseconds`。

### Transmission Delay

`packet`傳輸到`link`的所耗費時間，假使今天`packet`有L bits，`link`的 transmission rate R bits/sec，那麼transmission delay的時間便是 L/R，此delay的時間實務上落於`microseconds to milliseconds`。

與propagation delay區別的話，`transmission delay`為packet中的每個bit從link到router裡面組好完成一個packet後的等待時間，假使今天有一個packet中包含十個bit，十個bit分別排隊等待進入router，而第一個bit通過router後仍然得在router裡面等待另外九個bit來後組成一個packet才能往下一個router前進，十個bit調router的時間就是`transmission delay`。

### Propagation Delay

從`link`將資料傳遞到`router`的時間成本，`Propagation speed`主要影響為實體的線路，指的是一個`packet`從`router`到`router`的時間，而影響此數據的實際因素為`router`間的`distance`。


## Traffic intensity

`Traffic intensity` 代表的是每秒傳送到`queue的密集度`，假設今天有`X`個packets，每個packets皆由`Y bits`組成，而若`transmission rate`為`Z bits/sec`，則密集度為`XY/Z`

此密集度通常用來評估`queueing dealy`的長度，若`Traffic intensity > 1`也就是每次進來排隊的packet大於送出去的packet，那麼queue就會無限長，因此最最最基本的設計為，`Design your system so that the traffic intensity is no greater than 1`

當`Traffic intensity <= 1`時，第一，若是packet到達的時間剛好等同於出去的時間，也就是 X/Z，那麼就不會有queue的產生，反之，若packets於短時間大量到達，假使N packet在 (X/Z)N的速率到達，今天若有三個，澤第一個packet不用等待，而第二個就得等待(X/Z)(2-1)，第三個就得等待(X/Z)(3-1)的時間。

簡單來說，`Traffic intensity`越接近或大於1時，`queueing delay`就越大，反之則越小

## Throughput

HostA傳送檔案到HostB的完整時間，也就是每秒傳輸量，主要影響為communication link的 Transmission rate，若單純只有A到B，則`Throughput`為min(Ra,Rb)，也就是router到A以及Router到B的最小值，若common rate為R，有十台機器連到server，Server to router 為Ra，Router to destination為Rd，若 R/10小於Ra、Rd，則Throughput為R，若遠大於Ra、Rd，則為min(Ra,Rd)

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)