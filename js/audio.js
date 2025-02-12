let isPlaying = false;
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audio;

async function setupAudio() {
    try {
        const response = await fetch('assets/audio/om-namah-shivaya.mp3');
        const arrayBuffer = await response.arrayBuffer();
        audio = await audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
        console.log('Error loading audio:', error);
    }
}

document.getElementById('playButton').addEventListener('click', () => {
    if (!isPlaying) {
        const source = audioContext.createBufferSource();
        source.buffer = audio;
        source.connect(audioContext.destination);
        source.start();
        document.querySelector('.play-icon').textContent = '⏸';
        document.querySelector('#playButton span:last-child').textContent = 'Pause Chant';
    } else {
        audioContext.suspend();
        document.querySelector('.play-icon').textContent = '▶';
        document.querySelector('#playButton span:last-child').textContent = 'Play Chant';
    }
    isPlaying = !isPlaying;
});

document.getElementById('volumeControl').addEventListener('input', (e) => {
    const volume = parseFloat(e.target.value);
    if (audioContext.createGain) {
        const gainNode = audioContext.createGain();
        gainNode.gain.value = volume;
    }
});

// Initialize audio
setupAudio();
