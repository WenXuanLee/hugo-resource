+++
date = "2018-11-13"
title = "Network Attack"
tags = [
  "Network Security",
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

## Networks under attack

### malware 惡意軟體

透過Internet的傳遞，我們的機器很可能被有意地傳送惡意軟體，例如以前常見的`email`釣魚信件，一旦我們的本機成為了受侵入的`compromised host`，就也有極大可能被hackers拿來當作`botnet`，繼續散步惡意軟體。

多數的惡意軟體都是能自我增值的，也就是一旦有一台主機被侵入，惡意軟體就可以根據被侵入的主機繼續尋找可以侵入下一台主機的機會，也因此惡意軟體一旦散布出去後，是成指數成長的。常見的惡意軟體主要分為兩種`type`

`Virus` - 必須透過`使用者的互動`才會受到侵入，例如釣魚信件裡的附件，開啟附件後才會被侵入。
`Worm`  - 不必使用者互動就有可能受到侵入，例如在不安全的網站下，就有可能遭受到攻擊。

### Dos attacks (denial-of-service)

`Dos attack`攻擊network的服務，讓合法使用者無法正常使用network service。

`Vulnerability attack` - 在netowrk過程中塞入惡意message，當packet順序偶然按照惡意訊息的順序接受到，就會受到惡意攻擊。
`Bandwidth flooding` - 送出海量的垃圾封包，讓目標host的packet堵塞，讓其訊息無法送達server
`Connection flooding` - 在target host建立大量開放式或半開放式的TCP connections，讓封包進入這些意的connection之後就中斷了

`DDoS` - 則是應用第二種攻擊方式，由單一source傳送大量垃圾封包是容易被發現並被阻擋的，而DDoS則是透過一台source將海量封包分配到`botnet`下再由這群botnet送至`destination`，造成堵測的問題

### Sniff

在現代網路access方便的年代，例如Wifi，同時也隱藏的網路安全危機，由於只要在附近的的人都可以連取到，同一個發收器訊號，也意味著，當訊息傳遞時，附近所有的人同時也是`passive receiver`有權去記錄`copy of packet`，若包含重要的隱私訊息也同樣會被複製下來，而較常見的解法變是加密，待`packet`到目的地時在解密。由於這種手法是被動接受的，相對難以偵測。

### masquerade

透過自己製作一個封包並帶著`false ip address`，送入internet裡面傳遞，在`route`的接受過程中，是有可能把`人工的packet`認為是可信任的封包，並繼續接下來的SOP。而這也能達成偽裝成其他使用者的目的，通常這種把帶有假IP address的packet注入到Internet裡面稱之為`IP spoofing`，是偽裝方式中常見的的一種方式。

要防範此種行為，便是在`end-point`加上驗證的階段，有了驗證的機制去確認此封包到底是不是我們所認為的封包。

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)