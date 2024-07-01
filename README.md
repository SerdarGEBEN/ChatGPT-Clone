## API


##

- API'ye istek atabilmemiz için inputun içerisinde ki ddeğeri almamız gerekir.

- Bu değeri alırken send butonuna tıkladığımızda alacağız.

- Inputun içerisindeki değeri kullanıcı profilinin yanına eklememiz gerekir.

- Bunu gerçekleştirirken yeniden kullanabileceğimiz ` createElement` fonksiyonu oluşturduk ve buna iki parametre gönderdik.
    1- Parametre chat-container a eklemek istediğimiz html yapısıdır.
    2- parametre ise eklemek istediğimiz HTML in class ismidir.

- Kullanıcı veriyi girdikten sonra animasyonu ` showTypingAnimation` fonksiyonunu  ekrana bastık. Sonrasında kullanıcının girdiği veriye göre ` getChatResponse` fonksiyonu ile API' ye istek atmamız gerekir.  

- istek atarken asenkron işlem olduğu için async await ile bekledik.

- ` getChatResponse` fonksiyonu parametre olarak incomingChatDiv i gönderdik. Çünkü veri tabanından geklen veriyi incomingChatDiv in içerisinde bulununan typingAnimation yerine aktaracağız.# ChatGPT-Clone
