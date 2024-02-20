document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('overlay');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('container');
    const notesData = [];

    // Function to resize the canvas to fill the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Re-apply the black overlay to the resized canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Redraw glow effects if any were added before resizing
        notesData.forEach(note => {
            if (note.glow) {
                createGlow(note.glow.x, note.glow.y);
            }
        });
    }

    // Resize the canvas initially and whenever the window size changes
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Function to create a glow effect at a given position
    function createGlow(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI); // Adjust the radius as needed for the glow size
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over'; // Reset the composite operation
    }

    for (let i = 1; i <= 19; i++) {
        let note = document.getElementById(`note${i}`);
        let randomX = Math.floor(Math.random() * (canvas.width - 20)); // Adjust for note size
        let randomY = Math.floor(Math.random() * (canvas.height - 20)); // Adjust for note size

        note.style.left = `${randomX}px`;
        note.style.top = `${randomY}px`;
        note.style.visibility = 'hidden'; // Start with the note hidden

        notesData.push({
            element: note,
            x: randomX,
            y: randomY,
            audio: new Audio('https://audio.jukehost.co.uk/aOz6KfillnraJHw8E38nj0c8T4uJk3uG.mp3'), // Test audio file
            glow: null // Store glow position for redrawing if needed
        });
    }

    canvas.addEventListener('mousedown', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        createGlow(x, y); // Create the glow effect where the user clicks

        notesData.forEach(note => {
            if (Math.abs(x - note.x) < 20 && Math.abs(y - note.y) < 20) { // Threshold for detecting click near note
                note.element.style.visibility = 'visible'; // Reveal the note
                note.glow = { x, y }; // Store the glow position for this note
            }
        });
    });
});
