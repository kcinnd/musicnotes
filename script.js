document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const canvas = document.getElementById('overlay');
    const ctx = canvas.getContext('2d');
    const beamColors = [
    // Existing colors...
    ['rgba(255, 0, 0, 0.8)', 'rgba(255, 0, 0, 0)'], // Red
    ['rgba(255, 105, 180, 0.8)', 'rgba(255, 105, 180, 0)'], // Neon Pink
    ['rgba(255, 165, 0, 0.8)', 'rgba(255, 165, 0, 0)'], // Neon Orange
    ['rgba(255, 255, 0, 0.8)', 'rgba(255, 255, 0, 0)'], // Neon Yellow
    ['rgba(0, 255, 0, 0.8)', 'rgba(0, 255, 0, 0)'], // Neon Green
    ['rgba(0, 255, 255, 0.8)', 'rgba(0, 255, 255, 0)'], // Neon Cyan
    ['rgba(75, 0, 130, 0.8)', 'rgba(75, 0, 130, 0)'], // Indigo
    ['rgba(238, 130, 238, 0.8)', 'rgba(238, 130, 238, 0)'], // Violet
    // Additional new colors
    ['rgba(64, 224, 208, 0.8)', 'rgba(64, 224, 208, 0)'], // Turquoise
    ['rgba(255, 69, 0, 0.8)', 'rgba(255, 69, 0, 0)'], // Red-Orange
    ['rgba(255, 215, 0, 0.8)', 'rgba(255, 215, 0, 0)'], // Gold
    ['rgba(0, 100, 0, 0.8)', 'rgba(0, 100, 0, 0)'], // Dark Green
    ['rgba(106, 90, 205, 0.8)', 'rgba(106, 90, 205, 0)'], // Slate Blue
    ['rgba(72, 209, 204, 0.8)', 'rgba(72, 209, 204, 0)'], // Medium Turquoise
    ['rgba(147, 112, 219, 0.8)', 'rgba(147, 112, 219, 0)'], // Medium Purple
    ['rgba(255, 20, 147, 0.8)', 'rgba(255, 20, 147, 0)'], // Deep Pink
    ['rgba(255, 140, 0, 0.8)', 'rgba(255, 140, 0, 0)'], // Dark Orange
    ['rgba(0, 191, 255, 0.8)', 'rgba(0, 191, 255, 0)'], // Deep Sky Blue
    ['rgba(220, 20, 60, 0.8)', 'rgba(220, 20, 60, 0)'] // Crimson
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

    // Function to create a glow effect and optionally clear the overlay
function createGlow(x, y) {
        const selectedColor = beamColors[Math.floor(Math.random() * beamColors.length)];
        let gradient = ctx.createRadialGradient(x, y, 1, x, y, 50);
        gradient.addColorStop(0, selectedColor[0]); // Intense color at the center
        gradient.addColorStop(1, selectedColor[1]); // Fade to transparent

        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    // Listen for clicks on the canvas to create the flashlight beam effect
    canvas.addEventListener('mousedown', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createGlow(x, y);
    });


        notesData.forEach(note => {
            if (Math.abs(x - note.x) < 20 && Math.abs(y - note.y) < 20 && !note.uncovered) {
                note.element.style.visibility = 'visible';
                note.uncovered = true; // Mark the note as uncovered
            }
        });

        createGlow(x, y, true); // Create the glow effect and clear the overlay
    });
});
