function createVideoCard(video){

const videoId = video.id.videoId
const title = video.snippet.title
const thumb = video.snippet.thumbnails.medium.url
const channel = video.snippet.channelTitle

return `

<div class="video-card">

<a href="https://youtube.com/watch?v=${videoId}" target="_blank">

<img src="${thumb}">

<h3>${title}</h3>

<p>${channel}</p>

</a>

</div>

`

}

function renderVideos(videos){

const grid = document.getElementById("videoGrid")

grid.innerHTML=""

videos.forEach(v => {

grid.innerHTML += createVideoCard(v)

})

}
