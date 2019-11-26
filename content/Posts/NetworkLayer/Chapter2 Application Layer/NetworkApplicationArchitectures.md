+++
date = "2018-11-28"
title = "Network Application Architectures"
tags = [
  "Network Application",
  "Application Layer"
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

## Network Application Architectures

network architecture，一個開發者設計一個application時，如何被架構在各個end system，而現今常見的net work application主要應用的兩個主流設計為`client-server architecture`以及`peer-to-peer architecture (P2P)`

### client-server architecture

最終端永遠會存在於一台或以上的`host`，所謂的`server`，負責處理從其他end system傳來的`service request`，也就是所謂的`client`，最明顯的特徵是，`clients`之間並不能直接溝通傳遞訊息，必須得經由最上游的`host`來運作，另一個特點是`server`存在固定的`IP Address`，地址永遠是固定的而且server持續維持運作的狀態下，client便可以透過這樣的服務傳遞封包。

通常如常見的大型社群網站，會擁有`data center`，安放大量的`hosts`來做為一個強大的server，處理大量的用戶request，而因此也必須額外付出從`data center`到各個`host`的連線以及頻寬成本。

### peer-to-peer architecture (P2P)

P2P並沒有絕對依賴指定的`host`，不同於前者，`clients`在一組相互連結的`hosts中`可以直接與彼此溝通，稱為`peers`，`peers`並不屬於`service provider`而是各個`users hosts`，也就是不用轉折點的`server`去執行。

很明顯一項特點就是`self-scalability`，雖然每一個peers在request時都會產生workload，但同時也提升了service capacity，也就是說，每當一個`peer`加入時，整個P2P架構的系統，就會多增加一個`peer`提供的資源、頻寬以及計算能力，但同時越多使用者的話，傳輸的效率也會越慢，此外，由於不需通過指定`server`的運作，也省去了從`host -> server`的頻寬以及服務功能。

方便的同時也須注意三個隱憂

1. ISP Friendly - 大部分的地區ISPs已經切割好指定的頻寬使用，為了準備應付更多的`downstream than upstream traffic`，而`P2P`的設計則會把佔頻寬的`upstream traffic`從`server`搬移至`ISPs`運作，造成ISPs更大的負擔，因此在設計上得納入考量。

2. Security - 顯而易見的彼此users都是open的，所以也很容易遭受到惡意攻擊。

3. Incentives - 以P2P的設計來說，得吸引使用者去提供自己的頻寬、儲存空間以及資源。
![https://ithelp.ithome.com.tw/upload/images/20181128/20107670oq8R6uBKYo.png](https://ithelp.ithome.com.tw/upload/images/20181128/20107670oq8R6uBKYo.png)

## Process Communicating

process可以想像成，一隻program在end system上執行，Processes在兩台不同的end systems上主要透過`messages`的交換來溝通。

### Client and Server Process

Network application 都會有`一組processes`組成，透過network傳送`messages`給彼此，通常會將兩個processes一個定義為clicent另一個為server，以常見的google為例，我們的`browser`就是一個`client process`發送`request message`給`server process`接收並給予回應，在`P2P`的設計上來說，`peer`可以同時為`client`與`server`，有一個定義是指`觸發訊息交換的process`為`client`，而等待被聯絡的`process`則為`server`

### The Interface Between the Process and the Computer Network

所有`message`從process出發到接收一定會經過`network`，而透過將`process message`傳遞到`network`的介面就是`socket`，也被稱為`API`。可以記為`socket`為`application layer & transpoart layer`的`interface`，通常開發者會在application-layer side of the socket 擁有比較多的控制權，反之在transport-layer side便沒有太大的操作空間。

後者主要有兩種，
1. 選擇transport protocol，如果有選擇是available的話
2. 或許有機會去調整少數transport-layer parameters如最大buffer以及最大segment size

### Addressing Processes

傳遞訊息主要需要兩個已知的資訊，一者為receive host 的 address，二者為辨別receiving process的身分證，通常前者為host IP address。一般而言，一台host可能會在多個network applications上，為了辨別出指定的`receiving socket`，需要`port number`來達成，而這也有一個常見的規範port number表 [於此](http://www.iana.org)

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)