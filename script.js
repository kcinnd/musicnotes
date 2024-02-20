document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const canvas = document.getElementById('overlay');
    const ctx = canvas.getContext('2d');
    const notesData = []; // Array to hold data for each note
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
    
 function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawNotes(); // Redraw notes on canvas resize to ensure they remain visible
    }

    function drawNotes() {
        noteImages.forEach((imageSrc, index) => {
            const noteImage = new Image();
            noteImage.src = imageSrc;
            noteImage.onload = () => {
                const x = Math.random() * (canvas.width - noteImage.width);
                const y = Math.random() * (canvas.height - noteImage.height);
                ctx.drawImage(noteImage, x, y);
                notesData.push({ image: noteImage, x, y, width: noteImage.width, height: noteImage.height, revealed: false });
            };
        });
    }

    function createGlow(x, y) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous glow effect
        resizeCanvas(); // Redraw background and notes
        const glowRadius = 50;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
        gradient.addColorStop(0, 'rgba(255, 255, 100, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 100, 0)');
        ctx.beginPath();
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    function checkNoteReveal(x, y) {
        notesData.forEach(note => {
            if (!note.revealed && x > note.x && x < note.x + note.width && y > note.y && y < note.y + note.height) {
                note.revealed = true; // Mark the note as revealed
                // Logic to "reveal" the note, e.g., play a sound or change its appearance
            }
        });
    }

    canvas.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createGlow(x, y); // Create a glow effect around the mouse cursor
    });

    canvas.addEventListener('mousedown', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        checkNoteReveal(x, y); // Check if a note should be revealed
    });

    resizeCanvas(); // Initial canvas setup
});
