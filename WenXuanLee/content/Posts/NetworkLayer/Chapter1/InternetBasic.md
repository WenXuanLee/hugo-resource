+++
date = "2018-09-19"
title = "Internet Basic"
tags = [
  "Network",
  "TCP/IP"
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

## Internet

Internet主要大概流向為 ISPs -> routers -> Moerdem -> routers -> end system, base station等等

`packet`為封包，透過`目標host`將傳輸的資料轉成片段的封包，並在header 加上bytes，類似於加密的功能，網路上的資訊都是透由`packet`傳遞。

`communication links`封包的接受與傳送主要透過此links連結，在`packet switches`裡面會從多個`incoming communication links`之一挑選一個接收封包，再由多個`outgoing communication links`傳送封包出去，兩者的運用就是主要封包的傳遞路程，最後送到欲到達的`end sysystem`裡面重新解密原始資料。

而整個從第一個`end system`丟出封包到另一台`end system`的過程稱為一個`route || path`

![https://ithelp.ithome.com.tw/upload/images/20180919/20107670bKCkgJ2cTo.png](https://ithelp.ithome.com.tw/upload/images/20180919/20107670bKCkgJ2cTo.png)

網路資訊的傳遞過程就像是貨物運送流程，`packet`就像是一台卡車，負責載著貨物(`data`)到目的地，`communication links`則是卡車行駛的道路或者高速公路，`packet switches`則像是中繼站或者十字路口，負責決定將封包分配到目的地，也就是`end system`並卸載，而整個配送過程就是一個`route || path`

當今最主要的`packet switches`方式為`router & link-layer switches`

- router 主要使用在network core裡面
- link-layer switches 通常使用於access network上

## TCP/IP

目前 Internet 最重要的兩個協定，`IP`主要是規範於封包在`router & end system`傳遞過程中的格式。

`API`指的是一組規則，傳送資料的program必須得遵守此規則，Internet才能准許傳送data到指定的目的地，以寄信來做個比喻的話，假設A要寄信給B，不可能只把信寫好，丟在門口，信就會自動到達位置的吧?

寄信的過程得必須遵守，將信放置信封袋，寫上收件人、收件地址、貼上郵票，丟到郵箱丟到郵筒後才會準確寄出，相同於API，program傳送資訊必須遵守一定的規範才能透過API傳送資料到另一台end system。

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)