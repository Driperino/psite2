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
// Typewriter effect AND recolour --------------------------------------------------
function writeStringWithColor() {
  const textBox = document.getElementById('textBox');
  let originalHTML = textBox.innerHTML; // Store the original HTML content as a variable
  const fileName = window.location.pathname.split('/').pop();
  let word = fileName.split('.').shift(); // Extract the word from the file name

  // Define the list of words to be colored based on the file name word
  const wordsToColor = word === "psite"
    ? ["personal website", "personal site", "portfolio site"]
    : [word]; // Use the word itself for coloring if not "psite"

  const regexPatterns = wordsToColor.map(altWord => new RegExp(`(${altWord.replace(/ /g, '\\s')})`, 'gi')); // Create regex for each word to color

  regexPatterns.forEach((regex, index) => {
    originalHTML = originalHTML.replace(regex, (match) => {
      return `<span class="colored-word">${match}</span>`; // Replace each word with a span containing the original matched word
    });
  });

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
//Calendar
// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
  // Get references to DOM elements
  const calendarContainer = document.getElementById('calendar');
  const monthYearDisplay = document.getElementById('monthYear');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const fullDateDisplay = document.getElementById('fullDateDisplay'); // New element for displaying full date
  const daysYearsDisplay = document.getElementById('daysYearsDisplay'); // New element for displaying days and years

  // Initialize currentDate to the current date
  let currentDate = new Date();

  // Function to render the calendar
  function renderCalendar() {
    // Clear the calendar container before rendering
    calendarContainer.innerHTML = '';
    // Get the month and year from currentDate
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Display the month and year in the header
    monthYearDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    // Get the first day of the month and the total days in the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create empty day elements for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyDay = document.createElement('div');
      calendarContainer.appendChild(emptyDay);
    }

    // Create day elements for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.textContent = day;
      dayElement.className = 'calendar-day';
      calendarContainer.appendChild(dayElement);

      // Event listener to handle click on a date
      dayElement.addEventListener('click', function () {
        // Remove 'calendar-day--selected' class from all elements
        document.querySelectorAll('.calendar-day--selected').forEach(el => el.classList.remove('calendar-day--selected'));
        // Add 'calendar-day--selected' class to the clicked element
        dayElement.classList.add('calendar-day--selected');

        // Create a new Date object for the clicked date
        const clickedDate = new Date(year, month, day);
        // Display the full date below the calendar
        fullDateDisplay.textContent = clickedDate.toLocaleString('default', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });

        // Check if the clicked date is today's date
        if (isToday(clickedDate)) {
          // If it's today's date, display "This is today!"
          daysYearsDisplay.textContent = 'This is today!';
        } else {
          // Otherwise, calculate the difference in days and years
          // Calculate the difference in milliseconds between the clicked date and the current date
          // Calculate the absolute difference in milliseconds between the clicked date and the current date
          const timeDifference = Math.abs(clickedDate.getTime() - Date.now());
          const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Use Math.ceil to round up

          const yearsDifference = Math.floor(daysDifference / 365);
          const remainingDays = daysDifference % 365;

          // Display the difference in days and years
          if (timeDifference < 0) {
            // If the clicked date is before today's date
            if (yearsDifference > 0) {
              // If the difference is more than 1 year, display years and remaining days
              daysYearsDisplay.textContent = `Days since this date: ${yearsDifference} years, ${remainingDays} days`;
            } else {
              // Otherwise, display only the remaining days
              daysYearsDisplay.textContent = `Days since this date: ${remainingDays} days`;
            }
          } else {
            // If the clicked date is after today's date
            if (yearsDifference > 0) {
              // If the difference is more than 1 year, display years and remaining days
              daysYearsDisplay.textContent = `Days until this date: ${yearsDifference} years, ${remainingDays} days`;
            } else {
              // Otherwise, display only the remaining days
              daysYearsDisplay.textContent = `Days until this date: ${remainingDays} days`;
            }
          }
        }
      });
    }
  }

  // Function to check if a date is today's date
  function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  // Event listener for the previous month button
  prevMonthBtn.addEventListener('click', function () {
    // Move currentDate to the previous month
    currentDate.setMonth(currentDate.getMonth() - 1);
    // Render the calendar for the new month
    renderCalendar();
  });

  // Event listener for the next month button
  nextMonthBtn.addEventListener('click', function () {
    // Move currentDate to the next month
    currentDate.setMonth(currentDate.getMonth() + 1);
    // Render the calendar for the new month
    renderCalendar();
  });

  // Initial rendering of the calendar
  renderCalendar();
});
//----------------------------------------------------------------