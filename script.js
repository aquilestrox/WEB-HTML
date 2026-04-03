// --- LÓGICA DEL RATÓN PREMIUM (GPU OPTIMIZED) ---
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

let mouseX = 0, mouseY = 0; 
let outlineX = 0, outlineY = 0; 

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Uso de translate3d para mejor rendimiento
    dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;

    const isHoverable = e.target.closest('a, button, input, textarea, .skill-card-glass');
    document.body.classList.toggle('cursor-active', !!isHoverable);
});

function animateOutline() {
    // Lerp suavizado al 12% para efecto cinematográfico
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;

    outline.style.transform = `translate3d(${outlineX - 15}px, ${outlineY - 15}px, 0)`;

    requestAnimationFrame(animateOutline);
}
animateOutline();

// --- MONITOR 3D SMOOTH MOTION ---
const monitor = document.getElementById('monitor-3d');
const hero = document.getElementById('hero');

hero.addEventListener('mousemove', (e) => {
    const { width, height, left, top } = hero.getBoundingClientRect();
    
    const relX = (e.clientX - left) / width - 0.5;
    const relY = (e.clientY - top) / height - 0.5;

    // Límites controlados para no romper la estética
    const rotateY = relX * 25; 
    const rotateX = relY * -25;

    monitor.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
});

hero.addEventListener('mouseleave', () => {
    monitor.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

// --- DINAMISMO NAVBAR ---
window.addEventListener('scroll', () => {
    const header = document.getElementById('header-wrapper');
    header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// --- FORMULARIO FEEDBACK ---
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const originalText = btn.innerText;
    
    btn.innerText = "¡Enviado!";
    btn.style.background = "#28a745";
    btn.style.boxShadow = "0 0 20px rgba(40, 167, 69, 0.4)";
    
    form.reset();
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
        btn.style.boxShadow = "";
    }, 3000);
    
});
document.addEventListener('DOMContentLoaded', () => {

    // 1. LÓGICA DE FILTRADO
    const botones = document.querySelectorAll('.filter-btn');
    const tarjetas = document.querySelectorAll('.video-card');

    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            // Cambiar clase active
            botones.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filtro = btn.getAttribute('data-filter');

            // Mostrar/Ocultar con lógica estricta
            tarjetas.forEach(card => {
                if (card.getAttribute('data-category') === filtro) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. LÓGICA DE FORMULARIO (PARA QUE NO DE ERROR)
    const formulario = document.querySelector('form');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Formulario enviado");
        });
    }

});
