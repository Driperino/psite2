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
    isRareStar = Math.random() < 1 / 10;
  }

  if (isRareStar) {
    const minRareSize = 150;
    const maxRareSize = 275;
    size = Math.floor(Math.random() * (maxRareSize - minRareSize + 1)) + minRareSize;
    // Slow down the animation based on size
    duration = (size / minRareSize) * 45; // Example calculation
    // Set the rare star active flag
    rareStarActive = true;
  } else {
    const minSize = 2;
    const maxSize = 5;
    size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
    // Randomize the animation duration for normal stars
    // const minDuration = 12;
    // const maxDuration = 20;
    if (size <= 2) {
      duration = size * 2;
    } else {
      duration = size * 10;
    }
  }

  console.log(`Creating star of size: ${size}px with duration: ${duration}s`); // Debugging output
  console.log(`Number of stars generated: ${starCount}`); // Debugging output

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.animationDuration = `${duration}s`;

  // Styling for the Rare stars - They're planets but i dont wanna change all the names in the code.......
  if (isRareStar) {
    const rareStarColors = ['rgb(190, 183, 223)', 'rgb(4, 139, 168)', 'rgb(242, 211, 152)', 'rgb(144, 50, 61)', 'rgb(86, 71, 135)']; // Add more colours here
    let randomColor = rareStarColors[Math.floor(Math.random() * rareStarColors.length)];
    star.classList.add('rare-star');
    star.style.backgroundColor = randomColor;
    star.style.opacity = 1;
    star.style.zIndex = '-900'; // BG is -1000 navbar and footer is +1000
    star.style.boxShadow = `0 0 10px ${randomColor}`;
    // Randomize the spin direction
    const spinDirection = Math.random() < 0.5 ? 1 : -1;
    star.style.setProperty('--direction', spinDirection);
    // Randomize the spin speed
    const minSpinSpeed = 10;
    const maxSpinSpeed = 30;
    const spinSpeed = Math.random() * (maxSpinSpeed - minSpinSpeed) + minSpinSpeed;
    star.style.setProperty('--direction', spinDirection === 1 ? 1 : -1);
    console.log(`Creating rare star with color: ${randomColor} and spin speed: ${spinSpeed}s`); // Debugging output
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
  setInterval(createStar, 1750); // CHANGE THIS TO CONTROL # OF STARS - higher is less
}

document.addEventListener('DOMContentLoaded', generateStars);

//----------------------------------------------------------------
// Typewriter effect--------------------------------------------------
function writeStringWithColor() {
  const textBox = document.getElementById('textBox');
  let originalHTML = textBox.innerHTML; // Store the original HTML content as a variable
  const fileName = window.location.pathname.split('/').pop();
  let word = fileName.split('/').pop().split('.').shift(); // Extract the word from the file name

  // Check if the word is "psite" and replace it with alternative words
  if (word === "psite") {
    const alternativeWords = ["personal website", "personal site", "portfolio site"];
    for (let i = 0; i < alternativeWords.length; i++) {
      const alternative = alternativeWords[i];
      const regex = new RegExp(`\\b${alternative}\\b`, 'gi'); // Create a regular expression to match each alternative word
      originalHTML = originalHTML.replace(regex, `<span class="colored-word">${alternative}</span>`); // Replace all instances of the alternative word with a span containing the word
    }
  }

  let index = 0;

  function revealCharacterAndColor() {
    if (index < originalHTML.length) {
      // Add the current character to the textBox
      const currentText = originalHTML.substr(0, index + 1); // Get the current substring
      textBox.innerHTML = currentText;

      index++;
      // Call revealCharacterAndColor recursively after a delay
      setTimeout(revealCharacterAndColor, 2); // Adjust the delay as needed for desired typing speed
    }
  }

  // Clear the existing text content of the textBox
  textBox.innerHTML = '';

  // Start revealing characters after a short delay
  setTimeout(revealCharacterAndColor, 500); // Adjust the delay as needed before text starts appearing
}

// Call the function to start the reveal animation with word coloring
writeStringWithColor();

//----------------------------------------------------------------