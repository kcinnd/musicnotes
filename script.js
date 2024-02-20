document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('overlay');
    const ctx = canvas.getContext('2d');
    const notesData = []; // Array to hold data for each note
    const beamRadius = 50;
    const beamColor = [
    ['rgba(255, 7, 58, 1)', 'rgba(255, 7, 58, 0)'],
    ['rgba(189, 0, 255, 1)', 'rgba(189, 0, 255, 0)'],
    ['rgba(0, 145, 255, 1)', 'rgba(0, 145, 255, 0)'],
    ['rgba(0, 255, 25, 1)', 'rgba(0, 255, 25, 0)'],
    ['rgba(255, 0, 110, 1)', 'rgba(255, 0, 110, 0)'],
    ['rgba(255, 255, 0, 1)', 'rgba(255, 255, 0, 0)'],
    ['rgba(0, 255, 255, 1)', 'rgba(0, 255, 255, 0)'],
    ['rgba(255, 165, 0, 1)', 'rgba(255, 165, 0, 0)'],
    ['rgba(204, 51, 255, 1)', 'rgba(204, 51, 255, 0)'],
    ['rgba(191, 255, 0, 1)', 'rgba(191, 255, 0, 0)'],
    ['rgba(64, 224, 208, 1)', 'rgba(64, 224, 208, 0)'],
    ['rgba(255, 0, 255, 1)', 'rgba(255, 0, 255, 0)'],
    ['rgba(255, 215, 0, 1)', 'rgba(255, 215, 0, 0)'],
    ['rgba(148, 0, 211, 1)', 'rgba(148, 0, 211, 0)'],
    ['rgba(135, 206, 235, 1)', 'rgba(135, 206, 235, 0)'],
    ['rgba(255, 111, 97, 1)', 'rgba(255, 111, 97, 0)'],
    ['rgba(75, 0, 130, 1)', 'rgba(75, 0, 130, 0)'],
    ['rgba(252, 142, 172, 1)', 'rgba(252, 142, 172, 0)'],
    ['rgba(0, 255, 195, 1)', 'rgba(0, 255, 195, 0)']
    ];
    
    // Array of music note image URLs
    const noteImages = [
    "https://i.imgur.com/CJ09TQq.png",
    "https://i.imgur.com/b5fsfMv.png",
    "https://i.imgur.com/iAKvZfs.png",
    "https://i.imgur.com/qBMF0fz.png",
    "https://i.imgur.com/OGFu1Le.png",
    "https://i.imgur.com/iEUHvIc.png",
    "https://i.imgur.com/14w5V4V.png",
    "https://i.imgur.com/U0aP5pi.png",
    "https://i.imgur.com/ZbZ7sqd.png",
    "https://i.imgur.com/Y6GtKc3.png",
    "https://i.imgur.com/vxsTh2E.png",
    "https://i.imgur.com/nttMAYw.png",
    "https://i.imgur.com/lkUVei7.png",
    "https://i.imgur.com/MENQtiW.png",
    "https://i.imgur.com/GXPMynI.png",
    "https://i.imgur.com/Mlj0CoI.png",
    "https://i.imgur.com/NmYfUe8.png",
    "https://i.imgur.com/Mz5cEJR.png",
    "https://i.imgur.com/IVHM0uZ.png"
    ];
    // Preload images and store note data without drawing them
   
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    noteImages.forEach(src => {
        const img = new Image();
        img.onload = () => {
            let x, y, overlaps;
            do {
                x = Math.random() * (canvas.width - 50); // Assuming notes are 50x50 for positioning
                y = Math.random() * (canvas.height - 50);
                overlaps = notesData.some(note => {
                    const dx = note.x - x;
                    const dy = note.y - y;
                    return Math.sqrt(dx * dx + dy * dy) < beamRadius * 2; // Ensuring notes are spaced out
                });
            } while (overlaps);

            notesData.push({
                x: x,
                y: y,
                width: img.width,
                height: img.height,
                image: img,
                revealed: false // Notes are not revealed initially
            });
        };
        img.src = src;
    });

    // Function to draw notes if they have been revealed
    function drawNotes() {
        notesData.forEach(note => {
            if (note.revealed) {
                ctx.drawImage(note.image, note.x, note.y, note.width, note.height);
            }
        });
    }

    // Function to create the flashlight beam effect and reveal notes
    function createGlow(x, y) {
        // Use a composite operation to "mask" the black canvas and reveal where the beam is
        ctx.globalCompositeOperation = 'destination-out';
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, beamRadius);
        gradient.addColorStop(0, beamColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transition to transparent
        ctx.beginPath();
        ctx.arc(x, y, beamRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Reset composite operation to default
        ctx.globalCompositeOperation = 'source-over';

        // Redraw all revealed notes
        drawNotes();
    }

    // Draw the flashlight beam
    const selectedColor = beamColors[Math.floor(Math.random() * beamColors.length)];
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, beamRadius);
    gradient.addColorStop(0, selectedColor[0]); // Intense center
    gradient.addColorStop(0.9, selectedColor[0]); // Almost at the edge, maintain intensity
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Sharp transition to transparent
    ctx.beginPath();
    ctx.arc(x, y, beamRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
}

    // Event listener for mouse movement
    canvas.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createGlow(x, y);
    });

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial setup
});
