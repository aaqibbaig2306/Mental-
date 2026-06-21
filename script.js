// 1. Particle Backdrop & Sparkle Mechanics Engine
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas.getContext('2d');

let sparklesArray = [];
const numberOfSparkles = 25; 

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Sparkle {
    constructor(x, y, isTemporary = false) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = isTemporary ? Math.random() * 4 + 1.5 : Math.random() * 1.6 + 0.6;
        this.speedY = isTemporary ? (Math.random() - 0.5) * 6 : Math.random() * -0.15 - 0.05;
        this.speedX = isTemporary ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 0.2;
        this.opacity = isTemporary ? 1 : Math.random() * 0.5 + 0.2;
        this.pulse = Math.random() * 0.015 + 0.005;
        this.isTemporary = isTemporary;
        
        const colors = ['rgba(229, 152, 152, ', 'rgba(166, 75, 75, ', 'rgba(223, 186, 115, ', 'rgba(255, 240, 240, '];
        this.colorPrefix = isTemporary ? colors[Math.floor(Math.random() * colors.length)] : 'rgba(229, 152, 152, ';
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        
        if (!this.isTemporary && this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }

        this.opacity -= this.isTemporary ? 0.015 : this.pulse;
        if (!this.isTemporary && (this.opacity <= 0.15 || this.opacity >= 0.7)) {
            this.pulse = -this.pulse;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.colorPrefix}${this.opacity})`;
        
        if (this.isTemporary) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#e59898';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Finger Trail Particles
window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    for (let i = 0; i < 2; i++) {
        sparklesArray.push(new Sparkle(touch.clientX, touch.clientY, true));
    }
}, { passive: true });

function initSparkles() {
    sparklesArray = [];
    for (let i = 0; i < numberOfSparkles; i++) {
        sparklesArray.push(new Sparkle());
    }
}

function triggerWelcomeExplosion() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 3;
    for (let i = 0; i < 50; i++) {
        const p = new Sparkle(centerX, centerY, true);
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        p.speedX = Math.cos(angle) * speed;
        p.speedY = Math.sin(angle) * speed;
        sparklesArray.push(p);
    }
}

function animateSparkles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparklesArray = sparklesArray.filter(p => p.opacity > 0);
    for (let i = 0; i < sparklesArray.length; i++) {
        sparklesArray[i].update();
        sparklesArray[i].draw();
    }
    requestAnimationFrame(animateSparkles);
}

initSparkles();
animateSparkles();

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(triggerWelcomeExplosion, 200);
});

function createConfettiBurst(targetX, targetY, count = 25) {
    for (let i = 0; i < count; i++) {
        const particle = new Sparkle(targetX, targetY, true);
        sparklesArray.push(particle);
    }
}

// Floating Balloon Delivery Engine
function launchBalloons() {
    const container = document.getElementById('balloon-container');
    const balloonEmojis = ['🎈', '💖', '✨', '🎈', '🌸'];
    
    for (let i = 0; i < 16; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.innerText = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            balloon.style.left = Math.random() * 100 + 'vw';
            balloon.style.setProperty('--drift-x', (Math.random() * 80 - 40) + 'px');
            balloon.style.animationDuration = (Math.random() * 2 + 3) + 's';
            balloon.style.fontSize = (Math.random() * 1.5 + 1.8) + 'rem';
            
            container.appendChild(balloon);
            
            setTimeout(() => balloon.remove(), 5000);
        }, i * 150);
    }
}

// Cake Interaction Caller
function triggerCakeCelebration(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    createConfettiBurst(centerX, centerY, 55);
    launchBalloons();
}

// 2. Locket Control Logic
function unlockLocket() {
    const locket = document.getElementById('locket-container');
    const heart = document.querySelector('.locket-heart');
    const keepsakePanel = document.getElementById('keepsake-panel');
    const tiltContainer = document.querySelector('.locket-heart-tilt');

    const rect = heart.getBoundingClientRect();
    createConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

    heart.classList.add('open');
    tiltContainer.style.transform = 'scale(0.8) rotateY(180deg)';

    setTimeout(() => {
        locket.style.display = 'none';
        keepsakePanel.classList.remove('hidden');
    }, 850);
}

// 3. Messages Data
const secretLogs = {
    1: {
        title: "The Late-Night Logs 🧠",
        text: "Thank you for the countless late-night laughs and endless rants, Mental. No matter how chaotic life gets, talking to you always clears up my head and makes everything better."
    },
    2: {
        title: "Your True Sparkle ✨",
        text: "Bushra, you have this incredibly rare, beautifully authentic energy that lifts up everyone around you. Never lose that wonderfully mad vibe that makes you entirely who you are."
    },
    3: {
        title: "An Irreplaceable Bond 🔒",
        text: "You aren't just a regular best friend; you are my constant anchor and confidante. I am incredibly grateful to have someone as wonderfully real as you holding such a huge place in my heart."
    },
    4: {
        title: "To the Future 👑",
        text: "Here is to another year of you completely conquering your goals, matching my crazy energy levels, and remaining the absolute queen of best friends. Happy Birthday, Mental!"
    }
};

// State keeper to allow petal unselecting (undo feature)
let currentActivePetalId = null;

function revealSecret(id, element) {
    const screen = document.getElementById('display-screen');
    const panel = document.querySelector('.message-display-box');
    
    // Quick burst coords
    const rect = element.getBoundingClientRect();
    createConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 15);

    // UNDO CHECK: If she clicks the active petal a second time, clear it!
    if (currentActivePetalId === id) {
        element.classList.remove('active-petal');
        screen.innerHTML = `<p class="display-placeholder">Select a capsule to read the hidden logs...</p>`;
        currentActivePetalId = null;
        return;
    }

    // Otherwise, wipe old active styles from all other capsules
    document.querySelectorAll('.wheel-petal').forEach(petal => {
        petal.classList.remove('active-petal');
    });

    // Mark current petal as active glow state
    element.classList.add('active-petal');
    currentActivePetalId = id;

    // Trigger panel pop animation flash
    panel.classList.add('flash');
    setTimeout(() => panel.classList.remove('flash'), 300);

    const logs = secretLogs[id];
    screen.innerHTML = `
        <div class="active-message">
            <strong>${logs.title}</strong>
            <p>${logs.text}</p>
            <span class="close-msg-hint"> </span>
        </div>
    `;
}