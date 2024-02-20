document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const canvas = document.getElementById('overlay');
    const ctx = canvas.getContext('2d');
    const notesData = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Reveal notes that were previously uncovered
        notesData.forEach(note => {
            if (note.uncovered) {
                createGlow(note.x, note.y, true);
            }
        });
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Function to create a glow effect and optionally clear the overlay
 function createGlow(x, y, clearOverlay = false) {
    // Create a radial gradient for the glow effect
    let gradient = ctx.createRadialGradient(x, y, 1, x, y, 20);
    gradient.addColorStop(0, 'rgba(255, 255, 224, 0.8)'); // Bright center
    gradient.addColorStop(0.4, 'rgba(255, 255, 224, 0.6)'); // Fading yellow
    gradient.addColorStop(1, 'rgba(255, 255, 224, 0)'); // Transparent outer edge

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, false);
    ctx.fillStyle = gradient;

    if (clearOverlay) {
        ctx.globalCompositeOperation = 'destination-out'; // Clear the overlay to reveal notes
        ctx.fill();
        ctx.globalCompositeOperation = 'destination-over'; // Draw the glow beneath the overlay
    }

    ctx.fill(); // Draw the glow

    // Reset shadowBlur for future drawings
    ctx.shadowBlur = 0;
}

    for (let i = 1; i <= 19; i++) {
        let note = document.createElement('div');
        note.className = 'music-note';
        let randomX = Math.random() * (canvas.width - 20);
        let randomY = Math.random() * (canvas.height - 20);
        note.style.left = `${randomX}px`;
        note.style.top = `${randomY}px`;
        container.appendChild(note);

        let audio = new Audio('https://audio.jukehost.co.uk/aOz6KfillnraJHw8E38nj0c8T4uJk3uG.mp3');
        notesData.push({ element: note, x: randomX, y: randomY, audio: audio, uncovered: false });

        note.addEventListener('click', function(e) {
            e.stopPropagation();
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    }

    canvas.addEventListener('mousedown', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        notesData.forEach(note => {
            if (Math.abs(x - note.x) < 20 && Math.abs(y - note.y) < 20 && !note.uncovered) {
                note.element.style.visibility = 'visible';
                note.uncovered = true; // Mark the note as uncovered
            }
        });

        createGlow(x, y, true); // Create the glow effect and clear the overlay
    });
});
