//Star background--------------------------------------------------
let currentStars = 0;
const maxStars = 25;
let starCount = 0;
let rareStarActive = false; // Flag to track if a rare star is active

function createStar() {
  if (currentStars >= maxStars) {
    return;
  }

  const star = document.createElement('div');
  star.classList.add('star');

  // Set the vertical position to always start at the top
  star.style.top = '0px';

  // Set the horizontal position to a random value within the window width
  star.style.left = `${Math.random() * window.innerWidth}px`;

  // Randomize the size of the star
  let size;
  let duration;
  let isRareStar;

  // Check if a rare star is already active
  if (rareStarActive) {
    isRareStar = false; // If a rare star is already active, create a normal star
  } else {
    // Determine if this star will be a rare star
    isRareStar = Math.random() < 1 / 150;
  }

  if (isRareStar) {
    const minRareSize = 200;
    const maxRareSize = 550;
    size = Math.floor(Math.random() * (maxRareSize - minRareSize + 1)) + minRareSize;
    // Slow down the animation based on size
    duration = (size / minRareSize) * 20; // Example calculation
    // Set the rare star active flag
    rareStarActive = true;
    console.log('Creating rare star!!');
  } else {
    const minSize = 2;
    const maxSize = 5;
    size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
    // Randomize the animation duration for normal stars
    const minDuration = 3;
    const maxDuration = 9;
    duration = Math.floor(Math.random() * (maxDuration - minDuration) + minDuration);
  }

  console.log(`Creating star of size: ${size}px with duration: ${duration}s`); // Debugging output
  console.log(`Number of stars generated: ${starCount}`); // Debugging output

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.animationDuration = `${duration}s`;

  if (isRareStar) {
    star.classList.add('rare-star');
  }

  document.body.appendChild(star);
  currentStars++;
  starCount++;

  // Destroy the star after the animation ends
  star.addEventListener('animationend', () => {
    star.remove();
    currentStars--;
    if (isRareStar) {
      rareStarActive = false; // Reset the rare star active flag
    }
  });
}

function generateStars() {
  setInterval(createStar, 1000); // CHANGE THIS TO CONTROL # OF STARS
}

document.addEventListener('DOMContentLoaded', generateStars);

//----------------------------------------------------------------
//Contact Form ---------------------------------------------------

