const apiurl = 'https://api.quotable.io/quotes/random';
let isAudioPlaying = false; // Variable to track whether the audio is playing

async function getQuote(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('data', data);

        return data; // Return the data so it can be used outside the function
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

    let btn = document.querySelector("#Qbtn");
    let playBtn = document.querySelector(".custom-btn1");
    let quote = document.querySelector(".quote");
    let writer = document.querySelector(".writer");



    btn.addEventListener("click", async function () {
        try {
            const data = await getQuote(apiurl);
            
            quote.innerHTML = data[0].content;
            writer.innerHTML = `- ` + data[0].author;
        } catch (error) {
            console.error('Error updating UI with quote:', error);
        }
    });

    playBtn.addEventListener("click", () => {
        const iconSpan = playBtn.querySelector("span");
        if (!isAudioPlaying) {
            let utterance = new SpeechSynthesisUtterance(`${quote.innerText}`);
            utterance.addEventListener('start', () => {
                isAudioPlaying = true;
                // Customize background color and icon when the audio starts playing

                playBtn.style.backgroundColor = '#262626'; // Set the background color you want
                playBtn.style.cursor = 'none';
                playBtn.disabled = true;

            });
            utterance.addEventListener('end', () => {
                isAudioPlaying = false;
                // Reset background color and icon when the audio completes

                playBtn.style.backgroundColor = '#0076C8'; // Set the background color you want
                playBtn.disabled = false;
                playBtn.innerHTML = 'Play';
            });
            speechSynthesis.speak(utterance);
        }
    });

// Add a click event listener to the text element
writer.addEventListener("click", () => {
    const searchText = writer.innerText;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
    window.open(googleSearchUrl, '_blank');
});
