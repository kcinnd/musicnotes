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

        notesData.push({
            element: note,
            x: randomX,
            y: randomY,
            audio: new Audio('path/to/your/audio/note' + i + '.mp3') // Update path as needed
        });
    }
    
    container.addEventListener('click', function(event) {
        let x = event.pageX - this.offsetLeft;
        let y = event.pageY - this.offsetTop;

        lightUp(x, y); // Restore the light-up effect for the clicked area

        notesData.forEach(note => {
            if (Math.abs(x - note.x) < 20 && Math.abs(y - note.y) < 20) { // Threshold for detecting click near note
                note.element.style.visibility = 'visible'; // Make the note visible
                if (note.audio.paused) {
                    note.audio.play();
                } else {
                    note.audio.pause();
                    note.audio.currentTime = 0; // Reset audio to start
                }
            }
        });
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
    
