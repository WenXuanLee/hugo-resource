+++
date = "2018-12-04"
title = "Overview HTTP"
tags = [
  "Application Layer",
  "HTTP",
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

## Overview of HTTP

`HyperText Transfer Protocol(HTTP)`，application-layer protocol，被定義在`RFC`中，在`client program & ser ver program`中被實行，在不同的end systems中執行，在兩端透過交換`HTTP messages`進行交流。

`Web page(documents)`由不同物件組成，這裡的物件指的是`FILE`，例如HTML、JPEG、JS檔案等，而這個PAGE可以透過`URL`找到存在位址。`URL`則由`hostname、object's pathname`組成。以http://www.someSchool.edu/someDepartment/picture.gif 舉例，`/www.someSchool.edu`就是
hostname，`someDepartment/picture.gif`則是檔案的`pathname`。

HTTP定義了 web client & web server中間的溝通，包括client如何送出message以及server如何轉送webpage給client，此外，`HTTP`使用`TCP`作為underlying transport protocol，因此當client端送出一個HTTP request message時會透過socket傳送給tcp connection，也從trp connection經過socket接回到response message，同理於server端亦是，而一旦`message`到`socket interface`後，訊息的傳遞的掌控就不再client端的手裡而是在`tcp protocol`下了。

值得注意的是`HTTP`是被稱為`stateless protocol`也就是每次的交流並不會留下痕跡，也因此，就算client端短時間發送一樣的request，對於server端來說，並不會因為剛response完前一筆request就不處理同樣的下一筆，反之仍視為另一筆request回應，儘管內容完全相同。

## Non-Persistent and Persistent Connections

開發者可以決定當送出request/response pair時，是透過`separet TCP connections` 或者是 `同一個TCP connection`實行，若為前者則稱為`Non-Persistent`後者則為`Persistent`。

### Non-Persistent

假使今天有一個html file裡面有十張圖片，整個重request到呈現頁面的步驟如下，
1. HTTP clicent processs 啟動一條TCP connection到Server端，建立TCP connection
2. client 透過 socket開始傳送message到server端
3. server端透過socket接收到request message，並在透過socket回傳封裝好的response message
4. HTTP server process 告訴TCP connection 關閉此連結(但實際上並還沒關閉，直到確認clicent端已經接收到正確response後才停止)
5. client端接受到response，TCP connection關閉，開始檢驗回傳的HTML檔案並找到圖片的references
6. 取得十張照片，重複1 ~ 4的步驟十次

在這個過程中，取得web page的階段，建立了11條TCP connection，每條connection負責處理一對request/response

而實際上使用者可以控制瀏覽器的parallel tcp connections數，也就是決定TCP connection的建立是one by one或者可以一次建立多條，減少Response時間

### Persistent

同上數步驟，區別在於所有Request/response 都由同一條connection處理，在一組response回傳後仍舊保持connection為開啟狀態，而同時若server端有其他web page也同樣可以透過此條connection回送給同樣的client端。requests是可以連續被發出的而不必等待pending request，若connection在特定時間區段無使用後就會關閉。

## http message format

### http request message

想看request header message 可以透過devtool來觀看，以編輯文章頁面為例
第一行稱為`request line`，包含了三個區塊，`method field、URL field、http version field`，其餘部分則稱為`header lines`，紀錄了一些資訊包含host，connection是否持續保持打開等等

GET /articles/10210183/draft HTTP/1.1
Host: ithelp.ithome.com.tw
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7

### http response message

想看response message 可以透過devtool來觀看，以編輯文章頁面為例
第一行稱為`status line`，包含了三個區塊，`protocol version status code corresponding status message`，其餘部分則稱為`header lines`，紀錄了一些資訊包含host，connection是否持續保持打開等等、再來為`entity body`

HTTP/1.1 200 OK
Access-Control-Allow-Headers: DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: *
Cache-Control: no-cache, private
Content-Encoding: gzip
Content-Type: text/html; charset=UTF-8
Date: Tue, 04 Dec 2018 06:23:24 GMT
Server: nginx/1.4.6 (Ubuntu)
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Content-Length: 13621
Connection: keep-alive

## Cookies

Cookies允許網站用於追蹤使用者紀錄，主要構成有四部分

1. cookie header line in request message
2. cookie header line in response message
3. cookie file 存放於各個使用者的browser
4. back-end database in the Web site

當今天使用者第一次進到某網站，發出request到server端之後，response回來會有一個項目為ser-Cookie: 1678(for example)，之後當使用者再次進入此網站時發出request時便會夾帶此cookie，server端便能透過此cookie值追蹤與此使用者相關的紀錄，包含瀏覽過哪些商品或者是點擊過哪些資訊等等，

![https://ithelp.ithome.com.tw/upload/images/20181204/201076704r4tWrwTXc.png](https://ithelp.ithome.com.tw/upload/images/20181204/201076704r4tWrwTXc.png)

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)