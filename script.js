// Real-time Clock
function updateClock() {
    const now = new Date();
    document.querySelector('.clock').textContent = now.toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: 'numeric', 
        minute: '2-digit',
        second: '2-digit'
    });
}
setInterval(updateClock, 1000);
updateClock();

// Typing Animation
const texts = ["digital experiences.", "real-time systems.", "beautiful interfaces."];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.querySelector('.typing-text');

function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typingEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 80;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2500; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before typing new word
    }
    
    setTimeout(type, typeSpeed);
}

setTimeout(type, 500);

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.querySelector('.counter')) {
                startCounters(entry.target);
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-up').forEach((el) => {
        observer.observe(el);
    });
});

// Smooth Number Counter Animation
const startedCounters = new Set();

function startCounters(container) {
    const counters = container.querySelectorAll('.counter');
    counters.forEach(counter => {
        if (startedCounters.has(counter)) return;
        startedCounters.add(counter);
        
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        
        const easeOutQuad = t => t * (2 - t);
        let frame = 0;

        const counterInterval = setInterval(() => {
            frame++;
            const progress = easeOutQuad(frame / totalFrames);
            const currentCount = Math.round(target * progress);
            
            if (frame === totalFrames) {
                clearInterval(counterInterval);
                counter.textContent = target;
            } else {
                counter.textContent = currentCount;
            }
        }, frameDuration);
    });
}
