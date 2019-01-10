+++
date = "2018-10-02"
title = "Protocol"
tags = [
  "Protocol",
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

## Protocol

協定的存在就像是人類的語言，不同的語言交流一定會有障礙，若不是大家遵守同一套協定，說著不同的語言，那是無法溝通的，所以Protocol的存在就是讓兩台機器有一個交流的共識，如此才能辨識送過來的請求以及回送相對應的回覆，已完成我們想要達成的目的，例如從clint side 打API 從server side得到相對應的資料，中間的請求與回覆就得有一個協定存在。

### Network Protocols

網路協定的動作是由`software or hardware`執行，也就是我們的電腦、手機、路由器等等，所有在Internet上的包含`兩個或以上`遠端機器的行為都會由協定來管理監控，以一個例子來說，當我們對`Web server`發出請求時，也就是輸入一個`URL到Browser`時，我們會先從自己的`電腦發送一個request至Web server`，`Web server`接收到請求時會根據`request message`去給出一個回應`replay message`，接著我們的電腦收到`OK`的reply後，已`GET message 丟出我們輸入的URL撈取相對應的document`，接著`Web server`回傳我們要的Web page回到computer顯現。

![https://ithelp.ithome.com.tw/upload/images/20180920/20107670oVZPcXGEKU.png](https://ithelp.ithome.com.tw/upload/images/20180920/20107670oVZPcXGEKU.png)

`protocol`定義了整個溝通流程的SOP，包含初始步驟是傳遞request以及收到reply，採取什麼動作或者針對不同事件做出不同回應等，不同的`protocol`在不同的情境使用以達成不同的`communication tasks`。

## Access Network

### Home access: DSL, Cable, FTTH, Dial-Up, and Satellite

目前一般家庭最常見連結網路的方式為透過`DSL & Cable`，DSL就等同於透過電信公司提供連結管道，包含了電話與網路的ISPs，也就是中華電信那台數據機，有點像是電信公司透過電話線切割兩條線路出來，一條給家用電話，另一條就是給DSL數據機提供上網，所以大家可以理解到十年前每次有電話來就會斷網路的情況就是電話線路的切割部分沒處理好。

所以大概的架構就是家用的電話訊號以及網路訊號會傳送回電信公司也就是`DSLAM`去送回`Internet`以及`Telephone network`

## Network Core

### Store-andForward Transmission

`packet switch`在接收到整個完整data拆散後的封包才開始傳送`first bit`到外部link，也就是source -> router -> destination，source data如果切成了 packetA、packetB、packetC，在A到達之後仍會先被儲存到`router(packet switch)`待三個封包都到達之後才送往outputlink。

### Queuing Delays and Packet Loss

通常每個packet switch 會有連結許多communication links，對於每個link，packet switch會有一個`output buffer`，當packet傳送中又有另外一個packet到達時，剛到達的packet則會被放入buffer中排隊，等待傳到link上，因此就會有`queuing Delay`的問題。

而`packet loss`則是因為`buffer`區域的空間有限，當塞爆的時候，可能是剛到達的packet被丟棄，或者是在queue等待的某個packet被丟棄。

### Forwarding Tables and Routing Protocols

packet switches 如同之前所講的，有許多連結的接收communication links & output links，那麼router是怎麼決定這些link的使用?

每個end system都擁有一個`IP address`，當一台source -> destination 的過程中，這個destination位址也會一起被放在`packet header`裡面，在router根據位址匹配到鄰近的router裡面，更精準地來說，`每個router`都擁有一個`forwarding table`對應`destination address`的`outbound links`

感覺有點像是在問路，假設我想從台北開車到高雄，在桃園加油站(第一個router)，詢問店員該走哪條高速公路(forwarding table)，接著又到台中加油站做同樣的行為，這個詢問的動作就像是`router`對照`forwarding table`，最後到達目的地。

![https://ithelp.ithome.com.tw/upload/images/20181002/20107670mJZx9rwbFq.png](https://ithelp.ithome.com.tw/upload/images/20181002/20107670mJZx9rwbFq.png)

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)