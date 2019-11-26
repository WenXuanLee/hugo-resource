+++
date = "2018-11-30"
title = "Transport Services"
tags = [
  "Application Layer",
  "Transport Services",
  "UDP",
  "TCP"
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

## Transport Services Available to Applications

`transport service` 這邊主要區分了四個面向的`service`大類，`Reliable Data transfer`、`throughput`、`timing`、`security`。

1. `Reliable data transfer` - 假使protocol提供受保證的data delivery service則為受信賴的，亦即就是此service保證了一旦data從sending process傳遞到socket時就已經保證此data一定會抵達receiving process而且無任何error，若無提供此服務，則data從sending process之後有可能永遠到達不了receiving process端，這行為能被 `loss-tolerant applications`接受
2. `throughput` - transport提供了保證穩定傳輸速率的service，可以保證application能擁有的傳輸速度，Applications需要throughput requirements的類型又被稱為`bandwidth-sensitive applications`。
3. `timing` - 提供了時間的保證，可以保證資料傳遞的時間間距，此service相對real-time application是重要的。
4. `security` - 提供資料安全性的service，提供加密以及解密data的服務

## Transport Services Provided by the Internet

Internet(大部分為TCP/IP networks)提供了兩個協定`TCP`、`UDP`，當設計一個network application時的必做選擇之一為在此兩種協定中擇一，不同的協定提供了不同的服務，不同的應用程式也有不同的需求。

### TCP

TCP model 包含了連結取向的設計服務以及提供了`reliable data transfer`服務，TCP在client server端都擁有`transpoart-layer control information`在實際進入應用層面的`message`時啟動，也就是所謂的`handshaking procedure`，在握手階段完成後`TCP connection`存在於`sockets of the two process`之間。

TCP 以及 UDP 兩者皆沒有提供任何加密手段，但以`TCP`而言，廣大社群開發了一套`SSL`，用於加強於`TCP`中的安全考量，但注意到`SSL`並不屬於一種協定，跟TCP、UDP是不同的level，而只是`TCP`的強化，將加密手段實作於`application layer`

`TCP`的設計中包含了防堵塞機制，會在網路壅塞時，去控制`process`的送出以避免packet loss的問題等等。

### UDP

相對於`tcp`，UDP相對寬鬆並只提供最小限度的服務，沒有加密手段，沒有防堵塞機制，也沒有任何Connection過程，甚至也不保證資料的傳遞，

## Application-Layer Protocols

應用層的協定主要規範了，`types of messages exchanged`、`syntax of the various message type`、`semantics of the fields`、`rules for determining how and when a process sends message and responds to messages`

有些應用層協定是已經在`RFCs`被明確記錄了，也因此這些協定是存在於`public domain`裡的，例如常見的`http`，也就是說今天一個web application若遵守`http`協定，他便能從任何遵守`http`的`web server`去要求檔案。而另一種常見的協定為，`email`傳遞所遵守的`SMTP`。而協定在一個web application組成的一小部分，但也是極重要的部分之一，通常web application的組成包括了，文檔格式(HTML)、Web browser、Webserver、application-layer protocols

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)