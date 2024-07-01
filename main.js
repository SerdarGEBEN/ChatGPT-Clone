//! HTML den gelenler

const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const defaultText = document.querySelector(".default-text");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
console.log(deleteButton);

let userText = null;

//! Gönderdiğimiz html ve class ismine göre bize bir html oluşturur.
const createElement = (html, className) => {
  //*Yeni bir div oluştur.
  const chatDiv = document.createElement("div");

  //* Bu oluşturduğumuz dive chat ve dışardan parametre olarak gelen classı ver.
  chatDiv.classList.add("chat", className);
  //* Oluşturduğumuz divin içerisine ddışardan parametre olarak gelen html parametresini ekle
  chatDiv.innerHTML = html;
  //   console.log(chatDiv);

  return chatDiv;
};

const getChatResponse = async (incomingChatDiv) => {
  //* API den gelecek cevabı içerisine aktaracağım bir p etiketi oluşturduk.
  const pElement = document.createElement("p");
  console.log(pElement);
  //* 1.adım:URL'i tanımla
  const url = "https://chatgpt-42.p.rapidapi.com/conversationgpt4-2";
  const options = {
    method: "POST", //* atacağımız isteğin tipidir.
    //* API keyimiz bulunur.
    headers: {
      "x-rapidapi-key": "8c2e9804dfmshc875bb7f07d85f1p10958djsn65334f790735",
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: `${userText}`,
        },
      ],
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false,
    }),
  };
  //   //* 3.adım:API'ye istek at
  //    fetch(url, options)
  //     //*gelen cevabı yakala ve jsona çevir.
  //    .then((res) => res.json())
  //     //* jsona çevrilmiş veriyi yakalayıp işlemler gerçekleştirebiliriz.
  //     .then((data) => console.log(data.result))
  //     //*hata varsa yakalar
  //     .catch((error) => console.error(error));

  try {
    //* API ye url i optionsu kullanarak istek at ve bekle
    const response = await fetch(url, options);
    //* gelen cevabı json a çevir ve bekle
    const result = await response.json();
    //* API den gelen cevabı oluşturduğumuz p etiketinin içerisine aktardık.
    pElement.innerHTML = result.result;
  } catch (error) {
    console.log(error);
  }
  console.log(incomingChatDiv);
  //* animasyonu kaldırabilmek için querySelector ile seçtik ve ekrandan remove ile kaldırdık.
  incomingChatDiv.querySelector(".typing-animation").remove();
  //* API den gelen cevabı ekrana aktarabilmek için chat --detailsi seçip bir değişkene aktardık.
  //   const detailDiv = incomingChatDiv.querySelector(".chat-details");
  //   //* bu detail içerisine oluşturduğumuz pElement etiketini aktardık.
  //   detailDiv.appendChild(pElement);

  incomingChatDiv.querySelector(".chat-details").appendChild(pElement);

  chatInput.value = null;
};

const showTypingAnimation = () => {
  const html = `
          <div class="chat-content">
          <div class="chat-details">
            <img src="/image/chatbot.jpg" alt="" />
            <div class="typing-animation">
              <div class="typing-dot" style="--delay: 0.2s"></div>
              <div class="typing-dot" style="--delay: 0.3s"></div>
              <div class="typing-dot" style="--delay: 0.4s"></div>
            </div>
          </div>
        </div>
              `;

  const incomingChatDiv = createElement(html, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  getChatResponse(incomingChatDiv);
};

const handleOutGoingChat = () => {
  userText = chatInput.value.trim(); //* İnputun içerisindeki değeri al ve fazladan bulunan boşlukları sil.

  //*İnputun içerisinde veri yoksa fonksiyonu durdur.
  if (!userText) {
    alert("Bir veri giriniz!!!");

    return;
  }
  const html = `
     <div class="chat-content">
        <div class="chat-details">
            <img src="/image/user.jpg" alt="" />
            <p></p>
        </div>
     </div>
              
              `;
  //* Kullanıcının mesajını içeren bir div oluştur ve bunu chatContainer yapısına ekle.
  const outgoingChatDiv = createElement(html, "outgoing");
  defaultText.remove(); //! başlangıçta gelen varsayılan yazıyı kaldırdık.
  outgoingChatDiv.querySelector("p").textContent = userText;
  chatContainer.appendChild(outgoingChatDiv);
  setTimeout(showTypingAnimation, 500);
};

//! Olay İzleyicileri
sendButton.addEventListener("click", handleOutGoingChat);
//* textarea içerisinde klavyeden herhangi bir tuşa bastığımız anda bu olay izleyicisi çalışır.
chatInput.addEventListener("keydown", (e) => {
  //* klavyeden Enter tuşuna basıldığı anda handleOutGoingChat fonksiyonunu çalıştır.
  if (e.key === "Enter") {
    handleOutGoingChat();
  }
});

//* themeButtona her tıkladığımızda bodye light mode clasını ekle ve çıkar.
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  //* body light-mode classsını içeriyorsa themeButton içerisindeki yazıyı dark_mode yap. İçermiyorsa light_mode yap.
  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";
});

//* sil butonuna tıkladığımızda chat-container divini sil ve yerine defaultText i aktar.
deleteButton.addEventListener("click", () => {
  if (confirm("Tüm sohbetleri silmek istediğinize emin misiniz.")) {
    chatContainer.remove();
  }

  const defaultText = `
  <div class="default-text">
      <h1>ChatGPT Clone</h1>
    </div>
    <div class="chat-container">  </div>
     <div class="typing-container">
      <div class="typing-content">
        <div class="typing-textarea">
          <textarea
            id="chat-input"
            placeholder="Aratmak istediğiniz veriyi giriniz..."
          ></textarea>
          <span class="material-symbols-outlined" id="send-btn"> send </span>
        </div>
        <div class="typing-controls">
          <span class="material-symbols-outlined" id="theme-btn">
            light_mode
          </span>
          <span class="material-symbols-outlined" id="delete-btn">
            delete
          </span>
        </div>
      </div>
    </div>
      
  `;
  document.body.innerHTML = defaultText;
});
