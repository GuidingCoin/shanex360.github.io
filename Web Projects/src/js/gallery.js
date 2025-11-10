document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const rows = document.querySelectorAll('.img-row');
  const btnLeft = document.querySelector('.carousel-btn.left');
  const btnRight = document.querySelector('.carousel-btn.right');

  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100; // each row is 100% width
    track.style.transform = `translateX(${offset}%)`;
  }

  btnLeft.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : rows.length - 1;
    updateCarousel();
  });

  btnRight.addEventListener('click', () => {
    currentIndex = (currentIndex < rows.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });
});

document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', () => {
    const gameID = img.dataset.game;
    window.location.href = `/src/games/${gameID}.html`;
  });
});