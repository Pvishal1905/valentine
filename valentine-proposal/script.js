document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const noCountSpan = document.getElementById('noCount');
    const statsDiv = document.getElementById('stats');
    
    let noCount = 0;

    // Runaway logic for NO button
    if (noBtn) {
        noBtn.addEventListener('mouseover', () => {
            moveButton(noBtn);
            noCount++;
            noCountSpan.innerText = noCount;
            statsDiv.classList.remove('hidden');
        });

        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveButton(noBtn); // Just in case they manage to click it
        });
    }

    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            window.location.href = 'yes.html';
        });
    }

    function moveButton(btn) {
        const padding = 20;
        const card = document.querySelector('.glass-card');
        const cardRect = card.getBoundingClientRect();
        
        // Boundaries within the card or slightly outside
        const maxX = cardRect.width - btn.offsetWidth - padding;
        const maxY = cardRect.height - btn.offsetHeight - padding;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        btn.style.left = randomX + 'px';
        btn.style.top = randomY + 'px';
    }

    // Carousel Logic
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

        // Auto play carousel
        setInterval(() => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(currentIndex);
        }, 3000);
    }
});
