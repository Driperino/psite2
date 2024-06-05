# Vincent Winkler Personal Site

Welcome to the source code for Vincent Winkler's personal website. This project showcases my portfolio, personal projects, and contact information.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [File Structure](#file-structure)
4. [Setup and Installation](#setup-and-installation)
5. [Features](#features)
6. [Usage](#usage)
7. [Credits](#credits)

## Project Overview

This website serves as a personal portfolio for Vincent Winkler. It includes sections for an about page, contact information, and links to various projects. The site features a dynamic background with animated stars, a typewriter effect for displaying text, and a responsive design.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Google Icons
- Web3 Forms

## File Structure

`root/`<br>
`├── index.html`<br>
`├── about.html`<br>
`├── contact.html`<br>
`├── psite.html`<br>
`├── capstone.html`<br>
`├── games.html`<br>
`├── styles.css`<br>
`├── script.js`<br>
`├── assets/`<br>
`│ └── noise.png`<br>
`└── README.md`<br>

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vincentwinkler/personal-site.git
   ```
2. Navigate to the project directory:
   ```bash
   cd VincentWinklerSite
   ```
3. Open `index.html` in your preferred web browser to view the site locally.

## Features

### Star Background Animation

The background features an animated star field where stars fall from the top to the bottom of the screen. Occasionally, a larger "rare star" (styled as a planet) appears with unique colors, a spinning animation, and a noise map.

### Typewriter Effect

The text in the `#textBox` element is revealed using a typewriter effect, with specific words highlighted based on the current page.

### Responsive Design

The layout is responsive and adjusts for different screen sizes, ensuring usability on both desktop and mobile devices.

### Navigation Bar

The site includes a fixed navigation bar with links to the about page, contact page, and a dropdown menu for different projects.

### Footer

The footer includes links to social media profiles and other external sites, with hover effects to enhance user interaction.

## Usage

### Adding New Projects

To add a new project to the dropdown menu:

1. Open `index.html`.
2. Locate the dropdown menu in the navigation bar.
3. Add a new `<a>` element within the `<div class="dropdown-content">` section with the appropriate link and project name.

### Customizing the Typewriter Effect

To customize the words highlighted by the typewriter effect:

1. Open `script.js`.
2. Modify the `wordsToColor` array within the `writeStringWithColor` function to include the words you want to highlight for each page.

### Star Animation Configuration

To adjust the star animation settings, you can modify the following constants in the `script.js` file:

- `maxStars`: Maximum number of stars on the screen.
- `rareStarActive`: Controls whether rare stars (planets) are currently active.
- `star.style.animationDuration`: Adjusts the duration of the star falling animation.

## Credits

- **Vincent Winkler** - Design and Development
- **Google Icons** - Icons used throughout the site

For any further questions or contributions, please contact me at [your email address].

Enjoy exploring the site!

&copy; 2024 Vincent Winkler
