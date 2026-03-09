const searchBtn =
document.getElementById("searchBtn")

const input =
document.getElementById("searchInput")


searchBtn.addEventListener("click",runSearch)

input.addEventListener("keydown",e=>{

if(e.key==="Enter"){
runSearch()
}

})


async function runSearch(){

const query = input.value.trim()

if(!query) return

const videos = await searchVideos(query)

renderVideos(videos)

}
