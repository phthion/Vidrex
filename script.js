const API_KEY = 'AIzaSyDpifV8J2_NIouCqiTBiQFTiAt-YH-XNWU';
const API_BASE = 'https://www.googleapis.com/youtube/v3';

const app = {
    async fetch(query) {
        const grid = document.getElementById('grid');
        grid.innerHTML = '<p>Verifying human content metadata...</p>';
        try {
            const response = await fetch(`${API_BASE}/search?part=snippet&q=${query}&type=video&maxResults=24&key=${API_KEY}`);
            const data = await response.json();
            this.render(data.items);
        } catch (e) { grid.innerHTML = 'Error: Cannot establish connection to API.'; }
    },
    async render(items) {
        const grid = document.getElementById('grid');
        grid.innerHTML = '';
        for (const item of items) {
            const vData = await fetch(`${API_BASE}/videos?part=snippet,contentDetails,statistics&id=${item.id.videoId}&key=${API_KEY}`).then(r => r.json());
            const v = vData.items[0];
            // Duration filter: Only accept 3:30+
            if (this.isHumanLongForm(v.contentDetails.duration)) {
                grid.innerHTML += `
                    <div class="card" onclick="window.location.href='watch.html?id=${v.id}'">
                        <img src="${v.snippet.thumbnails.high.url}" class="rounded w-full">
                        <h3 class="font-bold mt-4">${v.snippet.title}</h3>
                        <p class="text-sm text-gray-600">${v.snippet.channelTitle}</p>
                    </div>`;
            }
        }
    },
    isHumanLongForm(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const sec = (parseInt(match[1]) || 0) * 3600 + (parseInt(match[2]) || 0) * 60 + (parseInt(match[3]) || 0);
        return sec >= 210; 
    }
};
document.getElementById('search-bar').addEventListener('keypress', (e) => { if(e.key === 'Enter') app.fetch(e.target.value); });
app.fetch('documentaries');
