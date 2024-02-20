document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const canvas = document.getElementById('overlay');
    const ctx = canvas.getContext('2d');

    // Function to resize the canvas to fill the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Re-apply the black overlay to the resized canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Resize the canvas initially and whenever the window size changes
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Function to create a glow effect at a given position
    function createGlow(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2); // Adjust the radius as needed
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over'; // Reset to default composite operation
    }

    for (let i = 1; i <= 19; i++) {
        let note = document.createElement('div');
        note.className = 'music-note';
        note.style.left = `${Math.random() * (canvas.width - 20)}px`; // Random position, adjust for note size
        note.style.top = `${Math.random() * (canvas.height - 20)}px`; // Random position, adjust for note size
        container.appendChild(note); // Add the note to the container

        // Set up audio for each note
        let audio = new Audio('https://audio.jukehost.co.uk/aOz6KfillnraJHw8E38nj0c8T4uJk3uG.mp3');

        // Play audio when the note is clicked, and ensure the note is visible
        note.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering canvas click event
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
                audio.currentTime = 0; // Reset audio to start
            }
        });
    }

    // Listen for clicks on the canvas to create the glow effect and reveal notes
    canvas.addEventListener('mousedown', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createGlow(x, y);
    });
});
