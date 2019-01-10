+++
date = "2018-12-25"
title = "Overview FTP & SMTP"
tags = [
  "Application Layer",
  "FTP",
  "SMTP"
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

## File Transfer FTP

user 主要透過 `FTP user agent`與`FTP`互動，為了辨認User，User會提供`User identification and password`給FTP辨認用，`FTP`同HTTP是以`TCP protocol`為基本運作，但不一樣的是，`FTP`使用了`Two parallel TCP connections`來傳遞檔案，`control connection & data connection`，前者主要用來傳遞`hosts 的 control information & commands to put and get files`，後者則為實際真的`傳送檔案`，特別注意到`data connection`是`non-persisent`。

`FTP server`是必須維持user state的，也就是`server`會觀察user在要求檔案或者抓取檔案時的行為，FTP同樣會回傳Response，帶有基本訊息包含成功或者失敗訊息等等

![https://ithelp.ithome.com.tw/upload/images/20190110/20107670uh2FgUtOJn.png](https://ithelp.ithome.com.tw/upload/images/20190110/20107670uh2FgUtOJn.png)

## Electronic Mail in the Internet

三個最主要的核心為，`user agents、mail servers、SMTP`，一封電郵的旅途會是這樣的，假使今天A寄了一封信到B，A透過`user agent`，也就是g-mail、apple mail...，讓使用者可以傳送回復編輯信件等等，完成後`user agent`會將信件送到`user mail servers`，接著從`user mail server`傳送到`receiver mail server`，接著B的`user agent`再從`receiver mail server`去抓取信件到B信箱裡面。

`mail server`提供了信件的基礎功能，包括若A的信件**無法成功傳遞**到B的`mail server`，則此封信件會排到`message queue`裡面，待三十分鐘(常見的頻率)後重試，若多天重試後仍無法成功則移除此`message`並由`mail server`發送通知給`sender`，mail server同時也記錄了`憑證確認Sender & receiver`。

`SMTP protocol`主要為email的協定，套用了`reliable data transfer service of TCP`保證信件的傳遞，`SMTP`也擁有`client & server side`，前者主要作用於`sender mail server`，後者則為`receive mail sender`，廣義的定義而言，mail server `傳送信件`到其他 mail server 視為 `client side`，負責`接收`的 mail server 則為 `server side`

### SMTP

`SMTP`協定主要作用於傳送 message from `sender mail server to receiver mail server`，由於電郵是相當有歷史的，所以會有一些歷史上的限制，好比當初設計時，`SMTP`限定了所有`message body`為`7-bit ASCII`，在以前的年代或許7-bit是足夠的，但對於今天而已這樣的設計是種折磨，以致於現今得再進入`SMTP`時做出轉碼以及解碼的過程。

值得注意的一點為，`SMTP並不透過中繼server去傳達mail`，也就是若今日sender在香港，receiver在澳洲，那麼兩台的連線也是直接從香港到澳洲的。

![https://ithelp.ithome.com.tw/upload/images/20190110/20107670IyADlnZAB6.png](https://ithelp.ithome.com.tw/upload/images/20190110/20107670IyADlnZAB6.png)

### SMTP & HTTP

簡單比較一下`SMTP`以及`HTTP`協定的相似處以及相異處，如上線介紹的兩者同樣都是以`TCP`為底做為傳輸協定，同樣保證了資料的準確傳遞，而同時也都是`persistent connections`，也就是`tcp connection`維持暢通，message都可以透過同一條通道傳遞。

相異處在於`HTTP is mainly a pull protocol`，也就是`TCP connection`主要是因為`sender side想要獲取檔案`或資料而`主動initiate`，`SMTP 則是 push protocol`，主要觸發點為想要`發送資訊到receiver side`。
再來是`SMTP`對於message的限制為`7-bit ASCII`，`HTTP`並沒有此限制。

再來是message encapsulate的差異，`Http`是將個別的request file封裝於個別的response message，而email則是將所有message object 放在同一個response message裡面，也就是說，假使今天同樣要求含有文字與圖片的request，`HTTP`會將文字以及圖片分為兩個resonse message回傳，email則是包在同一個message回傳。

### Mail Access Protocols

如上述所說的，email的傳遞是直接透過雙方的agen以及mail server做傳導，也代表著，若其中一方的host關機的話，另一方的信件不就會一直嘗試連接失敗，然後被放棄，為了因應這種狀況的不便之處，於是有了`Access Protocols`的產生，讓B方可以在想要的時候再從`B mail server`去接收信件。常見的有以下`Post Office
Protocol—Version 3 (POP3), Internet Mail Access Protocol (IMAP), and HTTP`

#### POP3

相對簡易的access protocol，可使用的functionality相對少了點，主要進入點為當`client 連接 tcp connection 到 mail server`建立時，`POP3`主要有三個階段`Authorization、transaction、update`

Authorization - user agent會送出一組使用者名稱以及密碼用以認證user
Transaction - user agent 接收到messages，並在此階段，user agent擁有可以對message做上 `deletion mark or remove deletion mark and obtain mail statistics`，也可以`issued command`
update - 當client端發起 `QUIT command`，結束`POP3 session`，此時mail server 會刪除擁有 deletion mark的訊息

![https://ithelp.ithome.com.tw/upload/images/20190110/20107670tW3PICkRWh.png](https://ithelp.ithome.com.tw/upload/images/20190110/20107670tW3PICkRWh.png)

#### HTTP

當今主流都是透過瀏覽器傳遞郵件如google、yahoo，在此舉例中，`user agent便是web browser`，瀏覽器透過`HTTP`與`遠端的mailbox server連結`，所以程序上會變成 A -> browser -> mail server -> B mail server -> B browser -> B，而在mail server傳遞之間注意到， message的傳送與接收仍然是透過`SMTP`協定提供服務

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)