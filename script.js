document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const noCountSpan = document.getElementById('noCount');
    const statsDiv = document.getElementById('stats');

    let noCount = 0;

    // Floating Hearts Generation - Premium & Optimized
    function createHeart() {
        const isMobile = window.innerWidth <= 480;
        const maxHearts = isMobile ? 15 : 30;

        if (document.querySelectorAll('.heart').length >= maxHearts) return;

        const heart = document.createElement('div');
        heart.classList.add('heart');

        // Premium touch: Randomize emojis and sizes
        const emojis = ['❤️', '💖', '💝', '💕', '💗'];
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

        const size = Math.random() * (isMobile ? 15 : 25) + 10;
        heart.style.fontSize = size + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.opacity = Math.random() * 0.5 + 0.3;

        // Optimized movement: translateZ(0) for GPU
        const duration = 6 + Math.random() * 6;
        const tx = (Math.random() - 0.5) * (isMobile ? 100 : 200);
        const ty = -(100 + Math.random() * 50) + 'vh';
        const rot = (Math.random() - 0.5) * 360;

        heart.style.setProperty('--duration', duration + 's');
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty);
        heart.style.setProperty('--rot', rot + 'deg');

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Smoother spawning interval
    setInterval(createHeart, 1000);

    // Initial burst (Subtle for performance)
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(createHeart, i * 500);
        }
    }, 1000);

    // Runaway logic for NO button
    if (noBtn) {
        noBtn.addEventListener('mouseover', () => {
            moveButton(noBtn);
            noCount++;
            if (noCountSpan) noCountSpan.innerText = noCount;
            if (statsDiv) statsDiv.classList.remove('hidden');
        });

        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveButton(noBtn);
            // Create mini explosion of hearts on attempt to click no
            for (let i = 0; i < 5; i++) createHeart();
        });
    }

    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            window.location.href = 'yes.html';
        });
    }

    function moveButton(btn) {
        const padding = 50;
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();

        // Boundaries within the viewport to make it harder to catch
        const maxX = window.innerWidth - btn.offsetWidth - padding;
        const maxY = window.innerHeight - btn.offsetHeight - padding;

        const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

        // Use fixed positioning relative to viewport once it starts moving
        // to escape the button-group constraints
        btn.style.position = 'fixed';
        btn.style.left = randomX + 'px';
        btn.style.top = randomY + 'px';
        btn.style.zIndex = '1000';
    }

    // Carousel Logic for yes.html
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carouselItems.length > 0) {
        let currentIndex = 0;

        function showSlide(index) {
            carouselItems.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % carouselItems.length;
                showSlide(currentIndex);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
                showSlide(currentIndex);
            });
        }

        setInterval(() => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(currentIndex);
        }, 3000);
    }
});
