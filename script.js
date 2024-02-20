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
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function isTooClose(x, y, minDistance) {
        return notesData.some(note => {
            const dx = x - note.x;
            const dy = y - note.y;
            return Math.sqrt(dx * dx + dy * dy) < minDistance;
        });
    }

    for (let i = 0; i < 19; i++) {
        let note, randomX, randomY, tooClose;
        do {
            note = document.createElement('div');
            note.className = 'music-note';
            randomX = Math.random() * (canvas.width - 50);
            randomY = Math.random() * (canvas.height - 50);
            tooClose = isTooClose(randomX, randomY, 50);
        } while (tooClose);

        note.style.left = `${randomX}px`;
        note.style.top = `${randomY}px`;
        note.style.backgroundImage = `url('${noteImages[i % noteImages.length]}')`;
        container.appendChild(note);

        // Add coverage property here
        notesData.push({ element: note, x: randomX, y: randomY, uncovered: false, coverage: 0 });
    }

    function createGlow(x, y) {
        const beamRadius = 75; // Define beam radius
        const selectedColors = beamColors[Math.floor(Math.random() * beamColors.length)];
        let gradient = ctx.createRadialGradient(x, y, 0, x, y, beamRadius);

        gradient.addColorStop(0, selectedColors[0]);
        gradient.addColorStop(0.6, selectedColors[1]);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(x, y, beamRadius, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    canvas.addEventListener('mousedown', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        notesData.forEach(note => {
            let distance = Math.sqrt(Math.pow(x - (note.x + 25), 2) + Math.pow(y - (note.y + 25), 2));
            if (distance < 75 && !note.uncovered) { // Use beamRadius if defined outside
                note.coverage += 1;
                if (note.coverage > 10) { // Threshold to fully reveal the note
                    note.element.style.visibility = 'visible';
                    note.uncovered = true;
                    note.element.addEventListener('click', function() {
                        // Logic to play music here
                    });
                }
            }
        });

        createGlow(x, y);
    });
});
