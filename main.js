const API_KEY = `b9c04ba68b8046a7bf9e0e85c8566e32`
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async()=>{
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log("data",data)
        if(response.status===200){
            if(data.articles.length===0){
                throw new Error("검색결과 없음!")
            }
            newsList = data.articles;
            totalResults = data.totalResults
            redner();
            paginationReder();
        }else{
            throw new Error(data.message)
        }
       
    }catch(error){
        console.log("error",error);
        errorRender(error.message)
    }
    
}

const getLatestNews = async ()=>{
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`); //인스턴스
    // const response = await fetch(url); //await을 쓰면 pedding 상태를 기다려줘
    // const data = await response.json() //json으로 뽑아와야한다.
    // newsList = data.articles;
    // redner();
    // console.log('rrr',newsList)
    getNews()
};

const getNewsByCategory=async(event)=>{
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    // const response = await fetch(url);
    // const data = await response.json();
    // console.log(data)
    // newsList = data.articles; //새로 불러오니깐 재정의하는 것이다.
    // redner();
    getNews()
};

const getnewsBykeyword=async()=>{
    const keyword = document.getElementById("search-input").value;
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log("key",data)
//   newsList = data.articles;
//   redner(); 
    getNews()
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
};

const errorRender =(error)=>{
    const errorHTML = `
    <div class="alert alert-danger" role="alert">
        ${error}
    </div>`;

    document.getElementById("news-board").innerHTML=errorHTML
};

const paginationReder=()=>{
    //pageGroup
    const pageGroup = Math.ceil(page/groupSize);
    //lastPage
    const lastPage = pageGroup * groupSize;
    //firstPage
    const firstPage = lastPage - (groupSize - 1);

    let paginationHTML = ``

    for(let i=firstPage;i<=lastPage;i++){
        paginationHTML+=`<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
    }

    document.querySelector(".pagination").innerHTML = paginationHTML

//     <nav aria-label="...">
//   <ul class="pagination">
//     <li class="page-item disabled">
//       <a class="page-link">Previous</a>
//     </li>
//     <li class="page-item"><a class="page-link" href="#">1</a></li>
//     <li class="page-item active" aria-current="page">
//       <a class="page-link" href="#">2</a>
//     </li>
//     <li class="page-item"><a class="page-link" href="#">3</a></li>
//     <li class="page-item">
//       <a class="page-link" href="#">Next</a>
//     </li>
//   </ul>
// </nav>
}

getLatestNews();

// const callAPI = async() =>{
//     let url = new URL(`url 주소`);
//     let header = new Headers({헤더내용}) // 이거 필요한 경우만
//     let response = await fetch(url,{headers:header})
//     let data = await response.json
// }