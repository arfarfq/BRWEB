// -------------------------
// Toggle handler (Spotify / Apple)
// -------------------------
function setupToggle(container) {
  if (!container) return;

  const spotifyBtn = container.querySelector('.toggle-buttons button:nth-child(1)');
  const appleBtn = container.querySelector('.toggle-buttons button:nth-child(2)');
  const spotifyEmbeds = container.querySelectorAll('.spotify-embed');
  const appleEmbeds = container.querySelectorAll('.apple-embed');

  if (!spotifyBtn || !appleBtn) return;

  spotifyBtn.addEventListener('click', () => {
    spotifyEmbeds.forEach(el => el.style.display = 'block');
    appleEmbeds.forEach(el => el.style.display = 'none');
    spotifyBtn.classList.add('active');
    appleBtn.classList.remove('active');
  });

  appleBtn.addEventListener('click', () => {
    spotifyEmbeds.forEach(el => el.style.display = 'none');
    appleEmbeds.forEach(el => el.style.display = 'block');
    appleBtn.classList.add('active');
    spotifyBtn.classList.remove('active');
  });
}

// Apply to Artist page sections if present
setupToggle(document.querySelector('#latest'));
setupToggle(document.querySelector('#discography'));


// -------------------------
// Carousel (Producer page)
// -------------------------
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  if (!track) return; // exit if no carousel on page

  const albums = Array.from(track.children);
  const prevButton = document.querySelector('.carousel-btn.prev');
  const nextButton = document.querySelector('.carousel-btn.next');
  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = albums[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function nextSlide() {
    if (currentIndex < albums.length - 3) {
      currentIndex++;
    } else {
      currentIndex = 0; // loop back to start
    }
    updateCarousel();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = albums.length - 3; // jump to last full set
    }
    updateCarousel();
  }

  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  // ✅ Autoplay every 5 seconds
  setInterval(nextSlide, 3000);

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
});



// -------------------------
// Gear Section (PIN unlock)
// -------------------------
function unlockGear() {
  const pinInput = document.getElementById('gear-pin');
  const gearLocked = document.getElementById('gear-locked');
  const gearContent = document.getElementById('gear-content');

  if (!pinInput || !gearLocked || !gearContent) return;

  const correctPin = atob("emVkbGVwcGVsaW4=");
  if (pinInput.value === correctPin) {
    gearLocked.style.display = "none";
    gearContent.style.display = "block";
  } else {
    alert("Incorrect PIN. Try again.");
  }
}

// Make unlockGear globally available
window.unlockGear = unlockGear;


