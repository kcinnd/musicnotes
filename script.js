document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const canvas = document.getElementById('overlay');
    const ctx = canvas.getContext('2d');
    const notesData = [];
    const beamColors = [
    ['rgba(255, 0, 0, 0.8)', 'rgba(255, 0, 0, 0)'], // Neon Red
    ['rgba(255, 105, 180, 0.8)', 'rgba(255, 105, 180, 0)'], // Neon Pink
    ['rgba(255, 165, 0, 0.8)', 'rgba(255, 165, 0, 0)'], // Neon Orange
    ['rgba(255, 255, 0, 0.8)', 'rgba(255, 255, 0, 0)'], // Neon Yellow
    ['rgba(0, 255, 0, 0.8)', 'rgba(0, 255, 0, 0)'], // Neon Green
    ['rgba(0, 255, 255, 0.8)', 'rgba(0, 255, 255, 0)'], // Neon Cyan
    ['rgba(0, 0, 255, 0.8)', 'rgba(0, 0, 255, 0)'], // Bright Blue
    ['rgba(75, 0, 130, 0.8)', 'rgba(75, 0, 130, 0)'], // Indigo
    ['rgba(238, 130, 238, 0.8)', 'rgba(238, 130, 238, 0)'], // Violet
    ['rgba(255, 20, 147, 0.8)', 'rgba(255, 20, 147, 0)'], // Deep Pink
];
    
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
    if (clearOverlay) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
    }

    // Select a random color gradient for the flashlight beam
    const selectedGradient = beamColors[Math.floor(Math.random() * beamColors.length)];
    let gradient = ctx.createRadialGradient(x, y, 1, x, y, 50);
    gradient.addColorStop(0, selectedGradient[0]); // Start color
    gradient.addColorStop(1, selectedGradient[1]); // End color (transparent)

    ctx.shadowBlur = 25;
    ctx.shadowColor = selectedGradient[0]; // Use the start color for the shadow

    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2, false);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.shadowBlur = 0; // Reset shadowBlur for future drawings
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
