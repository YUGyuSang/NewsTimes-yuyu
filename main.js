const API_KEY = `b9c04ba68b8046a7bf9e0e85c8566e32`
const getLatestNews = async ()=>{
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`); //인스턴스
    const response = await fetch(url); //await을 쓰면 pedding 상태를 기다려줘
    const data = await response.json() //json으로 뽑아와야한다.
    console.log('rrr',data)
}

getLatestNews();