+++
date = "2018-12-05"
title = "Web Caching"
tags = [
  "Application Layer",
  "Web Caching",
]
categories = [
  "Network Layer",
  "Tech Note"
]
+++

## Web Caching

`Web Cache`，aka `proxy server`，`network`用於代替`Origin Web server`滿足`HTTP request`的機制，web cache擁有自己的storage空間，並會把最近收到請求的objects存在storage，user browser可以透過config讓所有的request都先被轉到web cache裡。

假使今天client端發送出一個request，一樣會建立一條TCP connection至web cache，接著web cache檢查是否有一份備分的object在儲存空間裡，若有的話，web cache直接代替server送回response，若無的話則送出request建立TCP connection至 origin server，取得response後在自己的storage 備份object，接著再送回clicent side。

web cache 同時是`client & server`，web cache主要應用有兩個原因，一者為`減少response time for client request`尤其當client to server 的頻寬小於 client to web cache時候，二者為`減少traffic`，若request並無真的發至origin server 可以減輕server的負擔並減少access to internet的traffic，因此可以對此設計提升效能。

![https://ithelp.ithome.com.tw/upload/images/20190110/20107670wt8j4hoVRv.png](https://ithelp.ithome.com.tw/upload/images/20190110/20107670wt8j4hoVRv.png)

## The Conditional GET

上述提到Web cache的好處，但也有一個隱憂是，假使 origin server的檔案在web cache儲存後有所更動的話，該怎麼處理，HTTP提供一個機制讓web cache可以去確認 object是否為up to date，這機制稱為`Condition GET`，符合`conditional GET`的條件為

1. request message 用的method 為GET
2. request message header line 夾帶 `IF-modified-since`

記得在`response message`有著一筆`Last-Modified`的紀錄，而當web cache再次收到request時，web cache會觸發`up-to-date check` 發出一筆`condition GET`夾帶`If-modified-since`，若web server判斷無modified的話，則會回傳`response without requested object`，並在status line帶著`status code 304 not modified`

***

### Reference
1.  [Computer Network](https://www.pearson.com/us/higher-education/product/Kurose-Computer-Networking-A-Top-Down-Approach-6th-Edition/9780132856201.html)