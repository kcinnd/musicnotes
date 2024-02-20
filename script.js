document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('overlay');
    const ctx = canvas.getContext('2d');
    const notesData = []; // Array to hold data for each note
    const litAreas = []; // Array to track lit areas
    const beamRadius = 50; // Radius of the flashlight beam
    const noteSize = 50; // Fixed size for the notes
    
    const beamColors = [
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

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawNotes(); // Redraw notes on canvas resize to ensure they remain visible
    }

    function preloadNotes() {
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
   
   noteImages.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                let x, y, overlaps;
                do {
                    x = Math.random() * (canvas.width - noteSize);
                    y = Math.random() * (canvas.height - noteSize);
                    overlaps = notesData.some(note => {
                        const dx = note.x - x;
                        const dy = note.y - y;
                        return Math.sqrt(dx * dx + dy * dy) < noteSize; // Ensuring notes are not overlapping
                    });
                } while (overlaps);

                notesData.push({
                    img: img,
                    x: x,
                    y: y,
                    width: noteSize,
                    height: noteSize,
                    revealed: false
                });
            };
        });
    }

    function redrawCanvas() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        litAreas.forEach(area => {
            const selectedColor = beamColors[Math.floor(Math.random() * beamColors.length)];
            const gradient = ctx.createRadialGradient(area.x, area.y, 0, area.x, area.y, beamRadius);
            gradient.addColorStop(0, selectedColor[0]);
            gradient.addColorStop(1, selectedColor[1]);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(area.x, area.y, beamRadius, 0, 2 * Math.PI);
            ctx.fill();
        });

        notesData.forEach(note => {
            if (note.revealed) {
                ctx.drawImage(note.img, note.x, note.y, note.width, note.height);
            }
        });
    }

    function createGlow(x, y) {
        // Select a color for this lit area
        const selectedColor = beamColors[Math.floor(Math.random() * beamColors.length)];

        // Add the lit area with its color to the array
        litAreas.push({ x, y, color: selectedColor });

        // Reveal notes if they are within the beam's radius
        notesData.forEach(note => {
            if (!note.revealed && Math.hypot(x - (note.x + note.width / 2), y - (note.y + note.height / 2)) <= beamRadius) {
                note.revealed = true;
            }
        });

        redrawCanvas();
    }

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createGlow(x, y);
    });

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    preloadNotes();
});
