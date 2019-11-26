+++
date = "2019-01-08"
title = "Peer-to-Peer Applications"
tags = [
  "Application Layer",
  "P2P",
  "BitTorrent"
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

## Peer-to-Peer Applications

  探討適合用於P2P設計的application，主要分於兩部分，第一部分為`file distribution`，介紹檔案如何從單一來源分配至多數的peers，這部分清楚的展示了`P2P架構的 self-scalability`，主要透過BitTorrent system為範例。第二部分則會探討 `database distributed over a large community of peers`。

### P2P File Distribution

  每個peer都可以提供自己的capacity來幫助server distribute 檔案，不同於client-server的模式，在分配檔案時，server不需要copy每一份檔案給peers，反之，只要其中一個peer擁有檔案之後便可以透過此peer重新再分配檔案到其他peers。放一張比較圖

### BitTorrent

  Torrent在此的定義為，所有參與同一檔案distribution的peers的集合，每個於此Torrent的peer都會下載同樣容量的`chunks`，通常為256KBytes為一個chunk，當peer首次加入torrent並無任何chunk，隨著時間他會存入越來越多chunk，下載的同時也成為upload的來源之一，但檔案完成後可以選擇繼續留著torrent當為upload source之一繼續提供流量或者就離開torrent。

  每一個torrent會擁有基本的node called tracker，當peer加入torrent時，會把自己註冊進tracker裡面並固定一小段時間通知tracker我還在torrent裡面。當一個新的peer加入時，tracker會隨機挑出一個peers子集合以及這群子集合的IP address丟給新的peer，擁有這些資訊後，新的peer便能與這群子集合建立TCP connection，通常這樣的子集合群稱為`neighboring peers`，建立TCP連結後便能從這群peers裡面獲取需要的chunks。

  **rarest first** 決定取得chunck採用的技術之一，會從使用者當前沒有的chunks裡面去判斷，這些尚未擁有的chunck哪些是在`neiboring peers`重複性最低的，優先抓取此chunk。目標在於讓此rarest chunk更快的能在torrent裡面擁有與其他chunks一樣多的copies。

  在BitTorrent協定中，主要根據peers內擁有最高的傳輸速率作為respond的判斷依據，也就是說，每十秒使用者會偵測接受到的rate以及upload rate，這個符合最高速率的set稱為`unchoked`，而每三十秒會隨機抓取一個額外的`neighboring peer`傳送chunck，此額外的peer稱為`optimistically unchoked`，若此peer正好速率高過於unchoked的其中一個，則此會替代成為`unchoked`之一，相對來說，若互相都滿足彼此的highest rate，則互為`unchoked`之一。

  其他`neighboring peer`則稱為`choked`也就是不再`top four peers(unchoked) and one probing peer(optimistically unchoked`裡面，`choked`並不會接受從使用者接收到chunks。

### Distributed Hash Tables(DHTs)

  P2P系統裡，每一個peer會存取一小部分的key-value pairs，每一個peer都可以發出query到distributed database獲取對應的value，收到query後database作抓取擁有此key值value的peer並回傳給發出query之peer，任何一個peer都准許插入新的 key-value paris到database裡面，這樣的設計稱為 `distributed hash table`

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)