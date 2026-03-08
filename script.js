const API_KEY = 'AIzaSyDpifV8J2_NIouCqiTBiQFTiAt-YH-XNWU';
const BLOCKED_LIST = { channels: ['AdsBot'], keywords: ['promo', 'sponsored'] };

async function fetchVideos(query = 'popular') {
    const grid = document.getElementById('video-grid');
    const url = query === 'popular' 
        ? `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=18&key=${API_KEY}`
        : `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=18&key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderGrid(data.items);
    } catch (err) {
        grid.innerHTML = `<p class="text-red-500 text-center col-span-3">Connection error. Please verify your API Key and network.</p>`;
    }
}

function renderGrid(items) {
    const grid = document.getElementById('video-grid');
    grid.innerHTML = '';
    items.forEach(item => {
        const title = item.snippet.title;
        if (!BLOCKED_LIST.keywords.some(word => title.toLowerCase().includes(word))) {
            const id = item.id.videoId || item.id;
            grid.innerHTML += `
                <div class="card-bg p-4 rounded-2xl shadow-sm hover:shadow-xl transition cursor-pointer" onclick="window.location.href='watch.html?id=${id}'">
                    <img src="${item.snippet.thumbnails.high.url}" class="rounded-xl w-full aspect-video object-cover">
                    <h3 class="font-bold mt-4 line-clamp-2 text-sm">${title}</h3>
                    <p class="text-xs text-gray-500 mt-1">${item.snippet.channelTitle}</p>
                </div>`;
        }
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

// Event Listeners
document.getElementById('search-input').addEventListener('keydown', (e) => {
    if(e.key === 'Enter') fetchVideos(e.target.value);
});

if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
fetchVideos();
