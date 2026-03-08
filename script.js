const API_KEY = 'AIzaSyDpifV8J2_NIouCqiTBiQFTiAt-YH-XNWU';

async function fetchVideos() {
    const grid = document.getElementById('video-grid');
    
    // We fetch 15 popular videos from the US
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&regionCode=US&maxResults=15&key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // DEBUG: This line prints the data to your browser's Console (F12)
        console.log("YouTube API Data:", data);

        if (!data.items) {
            grid.innerHTML = `<p>Error: Could not retrieve videos. Check API Key restrictions.</p>`;
            return;
        }

        grid.innerHTML = ''; // Clear loading text
        
        data.items.forEach(video => {
            const duration = video.contentDetails.duration;
            
            // Logic: A valid video usually has 'M' for minutes. 
            // Shorts are often 'PTxS' (no M) or 'PT0M'
            if (duration.includes('M') && !duration.includes('PT0M')) {
                grid.innerHTML += `
                    <div class="cursor-pointer hover:opacity-80" onclick="window.location.href='watch.html?id=${video.id}'">
                        <img src="${video.snippet.thumbnails.high.url}" class="rounded-xl w-full">
                        <h2 class="font-bold mt-2 text-sm">${video.snippet.title}</h2>
                    </div>
                `;
            }
        });
    } catch (err) {
        console.error("Fetch Error:", err);
        grid.innerHTML = `<p>Failed to connect to YouTube.</p>`;
    }
}

fetchVideos();
