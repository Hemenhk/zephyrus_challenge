const menuToggleButton = document.getElementById("menu-toggle");
const menuSheet = document.getElementById("menu-sheet");
const closeMenuButton = document.getElementById("close-menu");

const toggleButton = document.getElementById("dark-mode-toggle");
const icon = document.getElementById("icon-mode");

// Open the menu sheet
menuToggleButton.addEventListener("click", () => {
  menuSheet.classList.toggle("open");
});

// Close the menu sheet when the close button is clicked
closeMenuButton.addEventListener("click", () => {
  menuSheet.classList.remove("open");
});


document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const iconMoon = document.getElementById("icon-moon");
  const iconSun = document.getElementById("icon-sun");

  // Ensure Lucide icons are initialized first
  lucide.createIcons();

  // Function to toggle dark mode and update the icons
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");

    // Toggle visibility of the icons
    if (document.body.classList.contains("dark-mode")) {
      iconMoon.style.display = "none";
      iconSun.style.display = "inline";
    } else {
      iconMoon.style.display = "inline";
      iconSun.style.display = "none";
    }
  };

  // Add event listener to the dark mode toggle button
  darkModeToggle.addEventListener("click", toggleDarkMode);
});
