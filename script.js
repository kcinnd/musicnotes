document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const notesData = [];

    for (let i = 1; i <= 19; i++) {
        let note = document.getElementById(`note${i}`);
        let randomX = Math.floor(Math.random() * (containerWidth - note.offsetWidth));
        let randomY = Math.floor(Math.random() * (containerHeight - note.offsetHeight));

        note.style.left = `${randomX}px`;
        note.style.top = `${randomY}px`;
        note.style.visibility = 'hidden'; // Start with the note hidden

        // Assign the test audio file to each note
        let audio = new Audio('https://audio.jukehost.co.uk/aOz6KfillnraJHw8E38nj0c8T4uJk3uG.mp3');

        notesData.push({
            element: note,
            x: randomX,
            y: randomY,
            audio: audio
        });

        // Directly click on the note to play/pause the audio
        note.addEventListener('click', function() {
            if (this.style.visibility === 'visible') { // Ensure the note is visible
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                    audio.currentTime = 0; // Reset audio to start
                }
            }
        });
    }

    container.addEventListener('click', function(event) {
        let x = event.pageX - this.offsetLeft;
        let y = event.pageY - this.offsetTop;

        // Check if any note is close to the clicked position
        notesData.forEach(note => {
            if (Math.abs(x - note.x) < 20 && Math.abs(y - note.y) < 20) { // Threshold for detecting click near note
                note.element.style.visibility = 'visible'; // Make the note visible
            }
        });

        lightUp(x, y); // Glow effect for the clicked area
    });
});

function lightUp(x, y) {
    let light = document.createElement('div');
    light.style.position = 'absolute';
    light.style.left = `${x - 25}px`; // Centering the glow effect
    light.style.top = `${y - 25}px`;
    light.style.width = '50px';
    light.style.height = '50px';
    light.style.borderRadius = '50%';
    light.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Semi-transparent white for the glow center
    light.style.boxShadow = '0 0 15px 10px rgba(255, 255, 255, 0.5)'; // Soft white glow
    document.getElementById('container').appendChild(light);
    // The glow effect will remain permanently
}
