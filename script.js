let firstSongPlayed = false;
let secondSongPlayed = false;

// Start music and navigate to the Terms page when the "Start" button is clicked
function startMusicAndGoToTerms() {
    // Start the background music immediately on the home page
    const music = document.getElementById('background-music');
    music.play(); // Play the song
    firstSongPlayed = true;

    // Hide "Start" and "Support" buttons after clicking
    document.querySelector('.proceed-btn').style.display = 'none';
    document.querySelector('.support-btn').style.display = 'none';
    
    // Navigate to the terms page and start music
    setTimeout(() => {
        location.href = 'terms.html';
    }, 500);
}

// Play the audio after user interaction (to bypass autoplay restrictions)
document.body.addEventListener('click', () => {
    if (!firstSongPlayed) {
        document.getElementById('background-music').play();
    }
});

// Start the game and change background after clicking "Start" button on the next page
function startGame() {
    // Change background image after clicking the "Start" button
    document.body.style.backgroundImage = "url('assets/start_background_after_click.jpg')";
    
    // Stop the first song and start the second song
    const firstSong = document.getElementById('background-music');
    if (firstSong) firstSong.pause(); // Stop the first song

    const secondSong = document.getElementById('background-music-2');
    secondSong.play(); // Start the second song

    // Hide "Start" button after clicking
    document.getElementById('start-btn').style.display = 'none';

    // Show the question popup
    document.getElementById('popup').style.display = 'block';
}

// Check if the answer is correct
function checkAnswer(isCorrect) {
    if (isCorrect) {
        // Stop music before playing the video
        const secondSong = document.getElementById('background-music-2');
        secondSong.pause();

        // Play the video after the correct answer
        startVideo();
    } else {
        // Move popup if answer is wrong
        const popup = document.getElementById('popup');
        const randomTop = Math.floor(Math.random() * 80) + 'vh';
        const randomLeft = Math.floor(Math.random() * 80) + 'vw';
        popup.style.top = randomTop;
        popup.style.left = randomLeft;
    }
}

// Start the video
function startVideo() {
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('game-video');
    videoContainer.style.display = 'block';
    video.play();

    // Hide the question popup once the video starts playing
    document.getElementById('popup').style.display = 'none';

    // Disable controls during video play
    video.onplaying = function() {
        document.body.style.pointerEvents = 'none'; // Disable clicks
        video.muted = false;  // Ensure sound is on
        video.volume = 1;     // Full volume
    };

    // Close the tab after video ends
    video.onended = function() {
        window.close(); // Close the tab
    };
}
