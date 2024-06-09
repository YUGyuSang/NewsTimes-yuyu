const API_KEY = `b9c04ba68b8046a7bf9e0e85c8566e32`
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

const getLatestNews = async ()=>{
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`); //인스턴스
    const response = await fetch(url); //await을 쓰면 pedding 상태를 기다려줘
    const data = await response.json() //json으로 뽑아와야한다.
    newsList = data.articles;
    redner();
    console.log('rrr',newsList)
};

const getNewsByCategory=async(event)=>{
    const category = event.target.textContent.toLowerCase();
    console.log("hi",category)
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    newsList = data.articles; //새로 불러오니깐 재정의하는 것이다.
    redner();
};

const getnewsBykeyword=async()=>{
    const keyword = document.getElementById("search-input").value;
  console.log('hi',keyword);
  const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
  const response = await fetch(url);
  const data = await response.json();
  console.log("key",data)
  newsList = data.articles;
  redner();  
};

const redner=()=>{
    const newsHTML=newsList.map(item=>`<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src=${item.urlToImage} alt="그림">
    </div>
    <div class="col-lg-8">
        <h2>${item.title}</h2>
        <p>
            ${item.description}
        </p>
        <div>
            ${item.source.name} ${item.publishedAt}
        </div>
    </div>
    </div>`).join('')

    document.getElementById('news-board').innerHTML = newsHTML
}

getLatestNews();

// const callAPI = async() =>{
//     let url = new URL(`url 주소`);
//     let header = new Headers({헤더내용}) // 이거 필요한 경우만
//     let response = await fetch(url,{headers:header})
//     let data = await response.json
// }