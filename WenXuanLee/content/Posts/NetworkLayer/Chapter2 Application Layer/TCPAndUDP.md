+++
date = "2019-01-09"
title = "Socket Programming"
tags = [
  "Application Layer",
  "UDP",
  "TCP",
  "Socket"
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

## Socket Programming: Creating Network Applications

  複習一下當我們建立一個network application，我們基本上包含了一組programs，client program & server program，分別存在於兩個end system，當兩個program執行後，client process & server process被建立，這些processes透過socket互相溝通，因此身為一個developer主要就是負責撰寫code for clicent program & server program

  Network applications有兩種types，一種為`implementation`，主要`實作於protocol standard`，例如 RFC 或者其他 standard document，這樣的application通常又被稱為`open`，因為規則以及行為是被公開，因此此類別的程式設計需要`遵守standard的標準`。

 另一種type則為`proprietary`，此類型主要`運用的protocol`尚未被公開發布在RFC或者其他國際網路規範，client side & server side program都由同組開發者完成，而開發者完全掌控code的內容，由於此類別並非實作於公開的protocol上，其他獨立開發者也就不能開發與此application相互操作的code。

 下面會透過簡單實作的code來探討開發一個client-server application的簡易流程，在開發者階段，第一步主要得`決定此application是基於 TCP || UDP`，因此會就此兩種protocol類型來介紹。

### Socket Programming with UDP

  sending process將packet push 到 socket 前，UDP會先將`destination address`資訊帶給packet，packet到達sending socket時，Internet便會根據此資訊導引到receiving process socket。由於傳遞的途中或許會經過許多network application process以及多個sockets，辨別destination receiver socket是必要的，因此在socket建立過程中，`port number`會被指認到socket當作idtentifier。而此項訊息也會被包含在destination address裡。此外，source address的資訊有同樣會被帶入packet，特別注意到，source address的帶入動作並非由UDP application code執行，而是自動由operating system完成的。

  ![https://ithelp.ithome.com.tw/upload/images/20190109/20107670LFn1xTVweA.png](https://ithelp.ithome.com.tw/upload/images/20190109/20107670LFn1xTVweA.png)
### Socket Programming with TCP

  不同於UDP，在client & server 開始彼此溝通前，必須先通過`handshake`的行為並建立`TCP conntection`，`TCP connection`的兩端分別連結著sending socket & receiver socket，建立的同時也會將兩端的IP address 以及 port number連結於TCP connection上，兩端的互動都將由`socket把data丟到TCP connection`傳遞。不同於UDP的server必須先將destination address 附在 packet上才能進入socket傳遞。

  相同的是，兩者的server都必須是在running的狀態下，client端才能initiate動作。而在TCP中，首先 clicent initiate a TCP connection to the server，這在`client program建立TCP socket`時完成，當建立的途中會將`Server host`的`IP address`以及 socket的`port number`帶入，建立完成後開始three-way handshake並建立TCP connection with the server，建立connection主要是在`transport layer`，在應用層的client and server program是觀察不到的。
  ![https://ithelp.ithome.com.tw/upload/images/20190109/20107670kCTXHqFZcm.png](https://ithelp.ithome.com.tw/upload/images/20190109/20107670kCTXHqFZcm.png)
  TCP socket為所有建立tcp coneection之前先執行一個打招呼的動作，也就是handshake的部分，接著的connection socket才是主要用於傳遞溝通的管道，
  ![https://ithelp.ithome.com.tw/upload/images/20190109/20107670lCOBfgQJMM.png](https://ithelp.ithome.com.tw/upload/images/20190109/20107670lCOBfgQJMM.png)

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)