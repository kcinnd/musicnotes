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
    // First, clear the area if needed to reveal any hidden notes beneath the canvas
    if (clearOverlay) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2, false);
        ctx.fill();
    }

    // Set the composite operation back to draw the glow effect on top
    ctx.globalCompositeOperation = 'source-over';

    // Create a radial gradient for the glow effect
    let gradient = ctx.createRadialGradient(x, y, 0, x, y, 30); // Adjust the outer radius for a larger glow
    gradient.addColorStop(0, 'rgba(255, 255, 0, 1)'); // Bright yellow center
    gradient.addColorStop(0.2, 'rgba(255, 255, 0, 0.5)'); // Less intense yellow
    gradient.addColorStop(0.4, 'rgba(255, 255, 0, 0.2)'); // Fading glow
    gradient.addColorStop(1, 'rgba(255, 255, 0, 0)'); // Transparent at the edges

    // Apply shadow to create a softer glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = "yellow";

    // Draw the glow effect using the radial gradient
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2, false); // Use the same outer radius as the gradient
    ctx.fillStyle = gradient;
    ctx.fill();

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
