const API_KEY = 'AIzaSyDpifV8J2_NIouCqiTBiQFTiAt-YH-XNWU';

async function fetchVideos(query = 'documentary') {
    const grid = document.getElementById('video-grid');
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=20&key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    grid.innerHTML = '';
    
    for (const item of data.items) {
        const details = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&id=${item.id.videoId}&key=${API_KEY}`).then(r => r.json());
        const video = details.items[0];
        
        // Duration Check: Must be >= 210 seconds (3:30 mins)
        const durationSeconds = parseISO8601Duration(video.contentDetails.duration);
        if (durationSeconds >= 210) {
            grid.innerHTML += `
                <div class="bg-white p-4 rounded-xl border hover:shadow-lg cursor-pointer" onclick="window.location.href='watch.html?id=${item.id.videoId}'">
                    <img src="${video.snippet.thumbnails.high.url}" class="rounded-lg w-full">
                    <h3 class="font-bold mt-3">${video.snippet.title}</h3>
                    <p class="text-sm text-gray-600">${video.snippet.channelTitle}</p>
                </div>`;
        }
    }
}

function parseISO8601Duration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    return (parseInt(match[1]) || 0) * 3600 + (parseInt(match[2]) || 0) * 60 + (parseInt(match[3]) || 0);
}

document.getElementById('search-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') fetchVideos(e.target.value); });
fetchVideos();
