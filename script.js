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
    "https://static.vecteezy.com/system/resources/previews/024/091/810/original/music-note-in-star-neon-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/024/091/600/non_2x/music-notes-and-stars-neon-free-png.png",
    // The same URL is listed twice in your provided links, ensure to replace one if it was a mistake
    "https://static.vecteezy.com/system/resources/previews/024/091/600/non_2x/music-notes-and-stars-neon-free-png.png",
    "https://www.pngall.com/wp-content/uploads/13/Neon-Music-PNG-Images.png",
    "https://totalpng.com//public/uploads/preview/glowing-music-png-11656425559snjsvmu6wj.png",
    "https://totalpng.com//public/uploads/preview/neon-music-png-transparent-images-free-download-11668596591kmtn8fnv3c.png",
    "https://images.pngnice.com/download/2314/Neon-Light-PNG-File.png",
    "https://w7.pngwing.com/pngs/414/573/png-transparent-musical-note-musical-notation-trill-musical-instruments-musical-note-purple-violet-neon.png",
    // Note: This URL might not be direct to an image file. Ensure it's correct or replace it.
    "https://www.bhmpics.com/downloads/neon-music-notes-wallpaper-/30.beautiful-black-background-of-neon-musical-note-icon.jpg",
    // The next URLs might not directly link to images or are from video stock websites, ensure to replace them with direct image links
    "https://media.istockphoto.com/id/1211986724/video/beautiful-black-background-of-neon-musical-note-icon.jpg?s=640x640&k=20&c=jYolNxQssxkXObohhpywSJiR5_whNeYoIcnnF273nZo=",
    "https://media.istockphoto.com/id/1349681167/video/glowing-colorful-neon-line-treble-clef-icon-isolated-on-black-animated-treble-clef-sign.jpg?s=640x640&k=20&c=RQ8BQKU18SND4ns7q5aFgEBXESKfZSuT3ezAI7qSjdk=",
    "https://i.pinimg.com/564x/71/89/4a/71894afad2fea688b5a6914f8bcb85ea.jpg",
    "https://static.vecteezy.com/system/resources/previews/008/959/114/original/green-neon-note-sign-on-a-black-background-vector.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/012/939/577/small/pink-neon-note-sign-on-a-black-background-vector.jpg",
    "https://st4.depositphotos.com/21557188/23279/v/450/depositphotos_232798686-stock-illustration-headphones-music-wave-min-volume.jpg",
    "https://images.assetsdelivery.com/compings_v2/fokaspokas/fokaspokas1808/fokaspokas180802442.jpg",
    "https://i.pinimg.com/736x/a8/0c/86/a80c86aca3d06da45f7934d9b571572a.jpg",
    "https://www.shutterstock.com/shutterstock/videos/1109339305/thumb/4.jpg?ip=x480",
    "https://i.pinimg.com/1200x/21/90/5d/21905dbb8598de8d025b29b04c0b1f5e.jpg"
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
        tooClose = isTooClose(randomX, randomY, 50); // Using 100px as minimum distance
    } while (tooClose);

    // Create and position music notes, then store their data in notesData
    for (let i = 0; i < 19; i++) {
        let note = document.createElement('div');
        note.className = 'music-note';
        note.style.backgroundImage = `url('${noteImages[i % noteImages.length]}')`;
        let randomX = Math.random() * (canvas.width - 50); // Assuming 50px is the max size of a note
        let randomY = Math.random() * (canvas.height - 50);
        note.style.left = `${randomX}px`;
        note.style.top = `${randomY}px`;
        container.appendChild(note);

        notesData.push({ element: note, x: randomX, y: randomY, uncovered: false });
    }

    // Function to create a glow effect with a realistic flashlight beam
    function createGlow(x, y) {
    const selectedColors = beamColors[Math.floor(Math.random() * beamColors.length)];
    let gradient = ctx.createRadialGradient(x, y, 0, x, y, 50); // Reduced radius to 50 for a smaller beam

    gradient.addColorStop(0, selectedColors[0]);
    gradient.addColorStop(0.6, selectedColors[1]);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * Math.PI); // Match the radius used for the gradient
    ctx.fillStyle = gradient;
    ctx.fill();
}

    // Event listener for mouse clicks on the canvas to reveal notes and create glow
    canvas.addEventListener('mousedown', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        notesData.forEach(note => {
            let distance = Math.sqrt(Math.pow(x - (note.x + 25), 2) + Math.pow(y - (note.y + 25), 2)); // Center of note
            if (distance < 50 && !note.uncovered) { // Click within 50px radius of note center
                note.element.style.visibility = 'visible';
                note.uncovered = true;
            }
        });

        createGlow(x, y);
    });
});
