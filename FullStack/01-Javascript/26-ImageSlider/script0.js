// --- 1. SCROLL LOGIC ---
const track = document.getElementById('track');
let scrollState = { current: 0, target: 0, limit: 0 };

function initScroll() {
    updateLimit();
    window.addEventListener('resize', updateLimit);
    window.addEventListener('wheel', handleWheel);
    requestAnimationFrame(animateScroll);
}

function updateLimit() {
    scrollState.limit = track.scrollWidth - window.innerWidth;
}

function handleWheel(e) {
    if(!lightbox.classList.contains('active')) {
        scrollState.target += e.deltaY;
    }
}

function animateScroll() {
    scrollState.target = Math.max(0, Math.min(scrollState.target, scrollState.limit));
    scrollState.current += (scrollState.target - scrollState.current) * 0.08;
    track.style.transform = `translateX(${-scrollState.current}px)`;
    requestAnimationFrame(animateScroll);
}

// --- 2. LIGHTBOX LOGIC ---
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbTitle = document.getElementById('lb-title');
const lbDesc = document.getElementById('lb-desc');
const lbClose = document.getElementById('lb-close');

const wrappers = Array.from(document.querySelectorAll('.img-wrapper'));
const galleryData = wrappers.map(wrapper => ({
    src: wrapper.querySelector('img').src,
    title: wrapper.getAttribute('data-title'),
    desc: wrapper.getAttribute('data-desc')
}));

let currentIndex = 0;

wrappers.forEach((wrapper, index) => {
    wrapper.addEventListener('click', () => {
        currentIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    updateContent();
    lightbox.classList.add('active');
}

function updateContent() {
    const item = galleryData[currentIndex];
    lbImg.src = item.src;
    lbTitle.innerText = item.title;
    lbDesc.innerText = item.desc;
}

lbClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

window.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('active')) return;
    if(e.key === 'Escape') lightbox.classList.remove('active');
    if(e.key === 'ArrowRight') changeSlide(1);
    if(e.key === 'ArrowLeft') changeSlide(-1);
});

// --- 3. SWIPE LOGIC ---
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;

lbImg.addEventListener('mousedown', dragStart);
lbImg.addEventListener('touchstart', dragStart);

lbImg.addEventListener('mousemove', dragMove);
lbImg.addEventListener('touchmove', dragMove);

lbImg.addEventListener('mouseup', dragEnd);
lbImg.addEventListener('touchend', dragEnd);
lbImg.addEventListener('mouseleave', dragEnd);

function dragStart(e) {
    isDragging = true;
    startPos = getPositionX(e);
    lbImg.style.transition = 'none'; 
}

function dragMove(e) {
    if(!isDragging) return;
    const currentPosition = getPositionX(e);
    currentTranslate = currentPosition - startPos;
    lbImg.style.transform = `translateX(${currentTranslate}px)`;
}

function dragEnd() {
    if(!isDragging) return;
    isDragging = false;
    const threshold = 100;
    
    if (currentTranslate < -threshold) {
        changeSlide(1);
    } else if (currentTranslate > threshold) {
        changeSlide(-1);
    } else {
        lbImg.style.transition = 'transform 0.3s ease';
        lbImg.style.transform = `translateX(0px)`;
    }
    currentTranslate = 0;
}

function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= galleryData.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = galleryData.length - 1;
    
    // Slide Out
    lbImg.style.opacity = 0;
    lbImg.style.transform = `translateX(${direction * -50}px)`;
    
    // Hide text during transition
    lbTitle.style.opacity = 0;
    lbDesc.style.opacity = 0;

    setTimeout(() => {
        updateContent();
        lbImg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        lbImg.style.opacity = 1;
        lbImg.style.transform = `translateX(0px)`;
        
        // Bring text back
        lbTitle.style.opacity = 1;
        lbDesc.style.opacity = 1;
    }, 300);
}

function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

initScroll();