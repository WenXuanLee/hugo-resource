+++
date = "2019-01-07"
title = "The Internet's Directory Service"
tags = [
  "Application Layer",
  "DNS",
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

## DNS The Internet's Directory Service

   網路上主要辨識host的方法為`hostname & IP address`，`IP`主要由`4 bytes`以及有自己的嚴格規則形式組成，使用者習慣使用網址來記host，而`router`則是偏好固定規則的`IP address`，為了整合這兩種特性，於是有了`DNS (domain name system)`。

   DNS是`IP address & hostname`對映的分散式資料庫，應用層的協定允許`hosts`對此資料庫發送`query`，DNS協定主要以UDP為底使用port 53。之前提過的`HTTP SMTP FTP`也都有使用此協定，用於將此用者提供的hostname轉化成對應的IP。

   所以當我們輸入網址，發送request時，會先觸發DNS application，browser從URL抓取host name並傳給DNS application，接著DNS clicent 傳送包含此hostname的query給DNS server，獲得對映的IP address，再回傳給browser，一旦browser獲取到IP後便開始建立TCP通道。而注意到通常IP網址會被快取在 `nearby`的`DNS server內`

### Overview of How DNS Works

   DNS是如何從DNS Server 找到對應的IP ADDRESS呢，如上述我們提到的DNS server，實際上的架構是有階級制的架構，由上而下為`Root server -> TLD(top-level domain) server -> authoritative DNS servers`，假使今天看到amazon.com的網址，DNS會從root開始聯繫，root 回傳對應到的 IP address以及TLD server，接著再從TLD server回傳對應到的IP address及 authoritative DNS server，最後回傳準確的IP address。

   值得注意的是，DNS帶有Cacheing的Feature，也就是每當 DNS Server 收到reply message時，是可以cache message裡面的資訊在local memory裡面，當下次再有類似的host name query時，便能從cache住的資訊回傳，即便此DNS server 不是 authoritative for the hostname的，由於 IP address & hostname的關係並不是永久的，通常cache的資訊兩天後就會被拋棄。

  ![https://ithelp.ithome.com.tw/upload/images/20181226/20107670cUJZ136hpX.png](https://ithelp.ithome.com.tw/upload/images/20181226/20107670cUJZ136hpX.png)

- **Root DNS** - 根據2011 秋天的資料 目前全球大概有 247 root servers。
- **TLD** - 高等DNS domain如常見的 .org .net .edu .gov等等都是，以及所有帶有國家代號的如.tw .US等等
- **Authoritative DNS server** - 最接近我們的DNS server，通常一個企業可以自己組一台DNS server保存紀錄，或者付錢給特定企業儲存，通常公司都會擁有自己的主要以及輩分的DNS server

  DNS server擁有一個重要的type `local DNS server`，並不屬於上面的階級結構，但在DNS架構中也是一個重要的角色，每個`ISP`會擁有自己的`local DNS server (default name server)`，當我們連結到ISP時，便是透過local DNS server取得對映的位址，當我們發出一個DNS query首先就會經過local DNS server，再由local DNS server以proxy的形式傳送query到階級制的DNS server裡去。

  ![https://ithelp.ithome.com.tw/upload/images/20181227/20107670D5pZVe5IDk.png](https://ithelp.ithome.com.tw/upload/images/20181227/20107670D5pZVe5IDk.png)

### DNS Records and Messages

   Message組成主要有四種fields`(Name, Value, Type, TTL)`，TTL決定了resource record何時從cache清除，type包含了幾種狀態，Name & Value主要相異於Type的回傳


- Type A - DNS 已經找到對應的 hostname-IP address，Name為hostname、Value為IP address (relay1.bar.foo.com, 145.37.93.126, A)
- Type NS - DNS server 知道此record存於哪個authoritative server Name為domain name、Value為authoritative server(foo.com, dns.foo.com, NS)
- Type CNAME - Value為類名稱，Name為domain name (foo.com, relay1.bar.foo.com, CNAME)
- Type MX - Value是mail server的類名稱(foo.com, mail.bar.foo.com, MX)


   DNS query & replay message擁有同樣的形式，`前12個bytes為header section`，主要包含幾個區塊，第一個區塊為`16-bit的數字`，讓client可以去`match reply & query`，再來包含幾個`flag field`


- 1-bit query/reply flag - 辨認message為query(0) or reply(1)
- 1-bit authoritative flags - 當找到DNS server for queried name，設於replay message裡
- 1-bit recursiondesired flag - 當client找不到record時重複執行動作
- 1-bit available field - 當DNS server 支援 recursion


  第二部分為`Question section`，帶有query information，包含`name field、type field`，再來為reply message的`Answer section`，包含了queried name，以及每筆record type、Value、TTL。

  ![https://ithelp.ithome.com.tw/upload/images/20181228/20107670iKjo6BYgZs.png](https://ithelp.ithome.com.tw/upload/images/20181228/20107670iKjo6BYgZs.png)

### Inserting Records into the DNS Database

  假使今天我想架設一個個人網站為BenTheDust.com，首先我肯定得先`註冊我的domain name`，`registrar`指的是間實體公司負責驗證此`domain name的唯一性`並將此`domain name加入DNS database`，並提供此服務的些許費用。當註冊完domain name後，接下來得提供`registrar`對應的pair name & IP address以及主要認可和次要的authoritative DNS servers。有了這些資訊，registrar便可以確保 `Type NS & Type A`的紀錄是有存進`TLD com servers`。

  DNS在發展中，在協定裏加入了`UPDATE OPTION`讓data可以從database透過DNS message動態的增加或刪除，當這些紀錄record的步驟完成後，便可以連到我們的個人網站。

  再複習一下DNS的流程步驟，假使今天Ben要連到BenTheDust.com，流程便會如下圖
![https://ithelp.ithome.com.tw/upload/images/20190107/20107670dxmrnbmqxB.png](https://ithelp.ithome.com.tw/upload/images/20190107/20107670dxmrnbmqxB.png)

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)