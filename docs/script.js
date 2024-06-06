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
// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
  // Check if the current page is calendar.html
  if (window.location.pathname.endsWith('/calendar.html')) {
    // Your calendar-specific JavaScript code goes here
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
          // Remove the selected class from all calendar-day elements
          const allCalendarDays = document.querySelectorAll('.calendar-day');
          allCalendarDays.forEach(calendarDay => {
            calendarDay.classList.remove('calendar-day--selected');
          });

          // Add the selected class to the clicked day element
          dayElement.classList.add('calendar-day--selected');

          // Create a new Date object for the clicked date
          const clickedDate = new Date(year, month, day);
          // Display the full date below the calendar
          fullDateDisplay.textContent = `${clickedDate.toLocaleString('default', { weekday: 'long' })}, ${clickedDate.toLocaleString('default', { month: 'long' })} ${day}${getDaySuffix(day)}, ${year}`;

          // Check if the clicked date is today's date
          if (isToday(clickedDate)) {
            // If it's today's date, display "This is today!"
            daysYearsDisplay.textContent = 'This is today!';
          } else {
            // Calculate the difference in milliseconds between the clicked date and the current date
            const timeDifference = clickedDate.getTime() - Date.now();
            const daysDifference = Math.ceil(Math.abs(timeDifference) / (1000 * 60 * 60 * 24)); // Use Math.ceil to round up

            const yearsDifference = Math.floor(daysDifference / 365);
            const remainingDays = daysDifference % 365;

            // Display the difference in days and years
            if (timeDifference < 0) {
              // If the clicked date is before today's date
              if (yearsDifference > 0) {
                // If the difference is more than 1 year, display years and remaining days
                daysYearsDisplay.textContent = `Days since this date: ${yearsDifference} year${yearsDifference > 1 ? 's' : ''}, ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
              } else {
                // Otherwise, display only the remaining days
                daysYearsDisplay.textContent = `Days since this date: ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
              }
            } else {
              // If the clicked date is after today's date
              if (yearsDifference > 0) {
                // If the difference is more than 1 year, display years and remaining days
                daysYearsDisplay.textContent = `Days until this date: ${yearsDifference} year${yearsDifference > 1 ? 's' : ''}, ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
              } else {
                // Otherwise, display only the remaining days
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

    // Add event listener for prevMonthBtn (previous month button)
    prevMonthBtn.addEventListener('click', function () {
      // Move currentDate to the previous month
      currentDate.setMonth(currentDate.getMonth() - 1);
      // Render the calendar for the new month
      renderCalendar();
    });

    // Add event listener for nextMonthBtn (next month button)
    nextMonthBtn.addEventListener('click', function () {
      // Move currentDate to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
      // Render the calendar for the new month
      renderCalendar();
    });

    // Initial rendering of the calendar
    renderCalendar();
  }
});


//----------------------------------------------------------------