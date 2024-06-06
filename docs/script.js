//Star background--------------------------------------------------
// Initializing variables to keep track of stars
let currentStars = 0; // Current number of stars
const maxStars = 25; // Maximum number of stars allowed on the screen
let starCount = 0; // Count of total stars generated
let rareStarActive = false; // Flag to track if a rare star is active

// Function to create a star
function createStar() {
  // Check if the maximum number of stars has been reached
  if (currentStars >= maxStars) {
    return; // Exit the function if the maximum stars limit has been reached
  }

  // Creating a new star element
  const star = document.createElement('div');
  star.classList.add('star'); // Adding CSS class for styling

  // Setting the position of the star
  star.style.top = '0px'; // Starting from the top
  star.style.left = `${Math.random() * window.innerWidth}px`; // Random horizontal position within the window width

  // Randomizing the size and duration of the star animation
  let size;
  let duration;
  let isRareStar;

  // Check if a rare star is already active
  if (rareStarActive) {
    isRareStar = false; // If a rare star is already active, create a normal star
  } else {
    // Determine if this star will be a rare star
    isRareStar = Math.random() < 1 / 10; // 1 in 10 chance for a star to be rare
  }

  // Setting size and duration based on rarity
  if (isRareStar) {
    // Rare star properties
    const minRareSize = 150;
    const maxRareSize = 275;
    size = Math.floor(Math.random() * (maxRareSize - minRareSize + 1)) + minRareSize;
    duration = (size / minRareSize) * 45; // Adjusting duration based on size
    rareStarActive = true; // Setting the rare star active flag
  } else {
    // Normal star properties
    const minSize = 2;
    const maxSize = 5;
    size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
    if (size <= 2) {
      duration = size * 2; // Slower animation for smaller stars
    } else {
      duration = size * 10;
    }
  }

  // Setting size and animation duration
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.animationDuration = `${duration}s`;

  // Styling for rare stars
  if (isRareStar) {
    const rareStarColors = ['rgb(190, 183, 223)', 'rgb(4, 139, 168)', 'rgb(242, 211, 152)', 'rgb(144, 50, 61)', 'rgb(86, 71, 135)']; // Possible rare star colors
    let randomColor = rareStarColors[Math.floor(Math.random() * rareStarColors.length)];
    star.classList.add('rare-star');
    star.style.backgroundColor = randomColor;
    star.style.opacity = 1; // Making rare stars fully visible
    star.style.zIndex = '-900'; // Adjusting z-index for rare stars
    star.style.boxShadow = `0 0 10px ${randomColor}`; // Adding a glowing effect
    const spinDirection = Math.random() < 0.5 ? 1 : -1; // Randomizing spin direction
    star.style.setProperty('--direction', spinDirection); // Setting CSS custom property for spin direction
    const minSpinSpeed = 10;
    const maxSpinSpeed = 30;
    const spinSpeed = Math.random() * (maxSpinSpeed - minSpinSpeed) + minSpinSpeed; // Randomizing spin speed
    star.style.setProperty('--direction', spinDirection === 1 ? 1 : -1); // Setting CSS custom property for spin speed
  }

  // Appending the star to the document body
  document.body.appendChild(star);

  // Updating star counts
  currentStars++;
  starCount++;

  // Removing the star after the animation ends
  star.addEventListener('animationend', () => {
    star.remove();
    currentStars--;
    if (isRareStar) {
      rareStarActive = false; // Resetting the rare star active flag
    }
  });
}

// Function to generate stars at regular intervals
function generateStars() {
  setInterval(createStar, 1750); // Adjust the interval to control the rate of star generation
}

// Starting star generation when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', generateStars);

//----------------------------------------------------------------
// Typewriter effect AND recolour --------------------------------------------------
function writeStringWithColor() {
  // Checking if the textBox element exists on the page
  const textBox = document.getElementById('textBox');
  if (!textBox) return; // If textBox doesn't exist, we can't do anything

  // Storing the original HTML content of the textBox
  let originalHTML = textBox.innerHTML;
  // Extracting the word from the file name in the URL
  const fileName = window.location.pathname.split('/').pop();
  let word = fileName.split('.').shift(); // Extracting the word part from the file name

  // Defining the list of words to be colored based on the file name word
  const wordsToColor = word === "psite"
    ? ["personal website", "personal site", "portfolio site"] // If the word is "psite", we have these words to color
    : [word]; // Otherwise, we just use the word itself for coloring

  // Creating regex patterns for each word to color
  const regexPatterns = wordsToColor.map(altWord => new RegExp(`(${altWord.replace(/ /g, '\\s')})`, 'gi'));

  // Replacing each word in the originalHTML with a span containing the original matched word for coloring
  regexPatterns.forEach((regex, index) => {
    originalHTML = originalHTML.replace(regex, (match) => {
      return `<span class="colored-word">${match}</span>`;
    });
  });

  // Starting index for revealing characters
  let index = 0;

  function revealCharacterAndColor() {
    if (index < originalHTML.length) {
      // Adding the current character to the textBox
      const currentText = originalHTML.substr(0, index + 1);
      textBox.innerHTML = currentText;

      index++;
      // Recursive call to continue revealing characters after a delay
      setTimeout(revealCharacterAndColor, 2); // Adjust the delay as needed for desired typing speed
    }
  }

  // Clearing the existing text content of the textBox
  textBox.innerHTML = '';

  // Starting to reveal characters after a short delay
  setTimeout(revealCharacterAndColor, 500); // Adjust the delay as needed before text starts appearing
}

// Calling the function to start the reveal animation with word coloring
writeStringWithColor();

//----------------------------------------------------------------
//Calendar
// Waiting for the page to load completely before running the script
document.addEventListener('DOMContentLoaded', function () {
  // Checking if the current page is the calendar page
  if (window.location.pathname.endsWith('/calendar.html')) {
    // All the fun stuff happens here for the calendar
    // Getting references to different parts of the calendar
    const calendarContainer = document.getElementById('calendar');
    const monthYearDisplay = document.getElementById('monthYear');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const fullDateDisplay = document.getElementById('fullDateDisplay'); // This is where we'll show the full date
    const daysYearsDisplay = document.getElementById('daysYearsDisplay'); // This is where we'll show days and years

    // Initializing the current date to today
    let currentDate = new Date();

    // Function to draw the calendar
    function renderCalendar() {
      // Clearing the calendar before drawing
      calendarContainer.innerHTML = '';
      // Extracting the month and year from the current date
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();

      // Showing the month and year in the header
      monthYearDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

      // Finding out the first day of the month and the total number of days in the month
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Creating blank spots for the days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        calendarContainer.appendChild(emptyDay);
      }

      // Drawing each day of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.className = 'calendar-day';
        calendarContainer.appendChild(dayElement);

        // Adding a click event listener for each day
        dayElement.addEventListener('click', function () {
          // All the magic happens when a day is clicked
          const clickedDate = new Date(year, month, day);
          // Showing the full date below the calendar
          fullDateDisplay.textContent = `${clickedDate.toLocaleString('default', { weekday: 'long' })}, ${clickedDate.toLocaleString('default', { month: 'long' })} ${day}${getDaySuffix(day)}, ${year}`;

          // Checking if the clicked date is today
          if (isToday(clickedDate)) {
            // If it's today, let the user know
            daysYearsDisplay.textContent = 'This is today!';
          } else {
            // Otherwise, do some math to show the number of days since or until the date
            const timeDifference = Math.abs(clickedDate.getTime() - Date.now());
            const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            const yearsDifference = Math.floor(daysDifference / 365);
            const remainingDays = daysDifference % 365;

            if (timeDifference < 0) {
              // If it's in the past
              if (yearsDifference > 0) {
                daysYearsDisplay.textContent = `Days since this date: ${yearsDifference} year${yearsDifference > 1 ? 's' : ''}, ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
              } else {
                daysYearsDisplay.textContent = `Days since this date: ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
              }
            } else {
              // If it's in the future
              if (yearsDifference > 0) {
                daysYearsDisplay.textContent = `Days until this date: ${yearsDifference} year${yearsDifference > 1 ? 's' : ''}, ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
              } else {
                daysYearsDisplay.textContent = `Days until this date: ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
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

    // Function to get the suffix for a day number (e.g., 1st, 2nd, 3rd, ...)
    function getDaySuffix(day) {
      if (day >= 11 && day <= 13) {
        return 'th';
      }
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }

    // Event listener for the previous month button
    prevMonthBtn.addEventListener('click', function () {
      // Moving to the previous month
      currentDate.setMonth(currentDate.getMonth() - 1);
      // Drawing the new month
      renderCalendar();
    });

    // Event listener for the next month button
    nextMonthBtn.addEventListener('click', function () {
      // Moving to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
      // Drawing the new month
      renderCalendar();
    });

    // Drawing the initial calendar
    renderCalendar();
  }
});

//----------------------------------------------------------------