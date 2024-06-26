const timelineContainer = document.querySelector('.timeline-container');
const timeline = document.querySelector('.timeline');
const popupContent = document.querySelector('.popup-content');
const popupText = document.querySelector('.popup-text');
const popupClose = document.querySelector('.popup-close');

let isDown = false;
let startX;
let scrollLeft;

timelineContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    timelineContainer.classList.add('active');
    startX = e.pageX - timelineContainer.offsetLeft;
    scrollLeft = timelineContainer.scrollLeft;
});

timelineContainer.addEventListener('mouseleave', () => {
    isDown = false;
    timelineContainer.classList.remove('active');
});

timelineContainer.addEventListener('mouseup', () => {
    isDown = false;
    timelineContainer.classList.remove('active');
});

timelineContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - timelineContainer.offsetLeft;
    const walk = (x - startX) * 2; // multiplier le déplacement pour plus de vitesse
    timelineContainer.scrollLeft = scrollLeft - walk;
});

// Contrôle de la frise avec la molette de la souris
timelineContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY); // Direction du défilement de la molette
    const step = 100; // Ajuster la vitesse de défilement ici

    timelineContainer.scrollLeft += delta * step;
});

// Ajouter un événement au clic sur chaque événement pour afficher le contenu
const events = document.querySelectorAll('.event');

events.forEach(event => {
    event.addEventListener('click', () => {
        const content = event.getAttribute('data-content');
        popupText.innerHTML = content;
        popupContent.style.display = 'block';
    });
});

// Fermer la boîte de contenu
popupClose.addEventListener('click', () => {
    popupContent.style.display = 'none';
});

// Fermer la popup en cliquant en dehors
document.addEventListener('click', (e) => {
    if (popupContent.style.display === 'block' && !popupContent.contains(e.target) && !e.target.closest('.event')) {
        popupContent.style.display = 'none';
    }
});

// Slider functionality
let slideIndex = 0;
const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const showSlide = (index) => {
    if (index >= slide.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slide.length-1;
    } else {
        slideIndex = index;
    }
    slides.style.transform = `translateX(${-slideIndex * 100}%)`;
};

prev.addEventListener('click', () => {
    showSlide(slideIndex - 1);
});

next.addEventListener('click', () => {
    showSlide(slideIndex + 1);
});
