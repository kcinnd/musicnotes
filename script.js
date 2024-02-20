document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const notesData = [];

    for (let i = 1; i <= 19; i++) {
        let note = document.getElementById(`note${i}`);
        let randomX = Math.floor(Math.random() * (containerWidth - note.offsetWidth));
        let randomY = Math.floor(Math.random() * (containerHeight - note.offsetHeight));

        note.style.left = `${randomX}px`;
        note.style.top = `${randomY}px`;
        note.style.visibility = 'hidden'; // Start with the note hidden
        notesData.push({
            element: note,
            x: randomX,
            y: randomY,
            audio: new Audio('path/to/your/audio/note' + i + '.mp3') // Update path as needed
        });
    }
    
    container.addEventListener('click', function(event) {
        let x = event.pageX - this.offsetLeft;
        let y = event.pageY - this.offsetTop;

        // Light-up effect for the clicked area
        lightUp(x, y);

        // Check if any note is close to the clicked position
        notesData.forEach(note => {
            if (Math.abs(x - note.x) < 20 && Math.abs(y - note.y) < 20) { // Threshold for detecting click near note
                note.element.style.visibility = 'visible'; // Make the note visible
                // Toggle audio playback
                if (note.audio.paused) {
                    note.audio.play();
                } else {
                    note.audio.pause();
                    note.audio.currentTime = 0; // Reset audio to start
                }
            }
        });
    });
});

function lightUp(x, y) {
  let light = document.createElement('div');
  light.style.position = 'absolute';
  light.style.left = `${x - 25}px`; // Centering the glow effect
  light.style.top = `${y - 25}px`;
  light.style.width = '50px';
  light.style.height = '50px';
  light.style.borderRadius = '50%';
  light.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Semi-transparent white for the glow center
  light.style.boxShadow = '0 0 15px 10px rgba(255, 255, 255, 0.5)'; // Soft white glow
  document.getElementById('container').appendChild(light);
}

const notes = [
  { id: 'note1', x: 100, y: 150 },
  { id: 'note2', x: 200, y: 250 },
  { id: 'note3', x: 300, y: 350 },
  { id: 'note4', x: 400, y: 450 },
  { id: 'note5', x: 500, y: 100 },
  { id: 'note6', x: 600, y: 200 },
  { id: 'note7', x: 700, y: 300 },
  { id: 'note8', x: 800, y: 400 },
  { id: 'note9', x: 900, y: 500 },
  { id: 'note10', x: 150, y: 550 },
  { id: 'note11', x: 250, y: 650 },
  { id: 'note12', x: 350, y: 750 },
  { id: 'note13', x: 450, y: 850 },
  { id: 'note14', x: 550, y: 950 },
  { id: 'note15', x: 650, y: 1050 },
  { id: 'note16', x: 750, y: 1150 },
  { id: 'note17', x: 850, y: 1250 },
  { id: 'note18', x: 950, y: 1350 },
  { id: 'note19', x: 1050, y: 1450 }
];

document.getElementById('container').addEventListener('click', function(event) {
  let x = event.pageX - this.offsetLeft;
  let y = event.pageY - this.offsetTop;
  lightUp(x, y);

  notes.forEach(note => {
    let dx = Math.abs(x - note.x);
    let dy = Math.abs(y - note.y);
    if (dx < 20 && dy < 20) { // Threshold for "close enough"
      document.getElementById(note.id).style.display = 'block';
    }
container.addEventListener('click', function(event) {
        let x = event.pageX - this.offsetLeft;
        let y = event.pageY - this.offsetTop;

        // Check each note to see if the click was within its area
        notes.forEach(note => {
            if (Math.abs(x - note.x) < 20 && Math.abs(y - note.y) < 20) { // Adjust threshold as needed
                note.element.style.visibility = 'visible'; // Reveal the note
                if (note.audio.paused) {
                    note.audio.play();
                } else {
                    note.audio.pause();
                    note.audio.currentTime = 0;
                }
            }
        });
    });
});
