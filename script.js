const API_KEY = 'AIzaSyDpifV8J2_NIouCqiTBiQFTiAt-YH-XNWU';

async function fetchVideos() {
    const grid = document.getElementById('video-grid');
    const status = document.getElementById('status');
    
    // Increased maxResults to 20 to ensure we get plenty of data
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=20&key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log("Full API Response:", data); // Check this in F12 Console
        grid.innerHTML = ''; 
        
        data.items.forEach(video => {
            const duration = video.contentDetails.duration;
            
            // Filter: Only exclude if it's explicitly a Short (no "M" in duration)
            if (duration.includes('M')) {
                grid.innerHTML += `
                    <div class="cursor-pointer hover:opacity-75 transition" onclick="window.location.href='watch.html?id=${video.id}'">
                        <img src="${video.snippet.thumbnails.high.url}" class="rounded-xl w-full aspect-video object-cover shadow-md">
                        <h2 class="font-bold mt-3 text-gray-900">${video.snippet.title}</h2>
                    </div>
                `;
            }
        });
    } catch (err) {
        status.innerText = "Error loading videos. Check your Console (F12).";
    }
}

fetchVideos();
