const toggleButton = document.getElementById("dark-mode-toggle");
const icon = document.getElementById("icon-mode");
const menuToggleButton = document.getElementById('menu-toggle');
const menuSheet = document.getElementById('menu-sheet');
const closeMenuButton = document.getElementById('close-menu');

// Toggle dark mode
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const iconMode = document.getElementById('icon-mode');

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode-toggle");
  const isDarkMode = document.body.classList.contains("dark-mode-toggle");

  // Update icon
  icon.setAttribute("data-lucide", isDarkMode ? "sun" : "moon");

  // Reinitialize Lucide icons to reflect changes
  lucide.createIcons();
});

// Initialize Lucide icons on page load
lucide.createIcons();


// Open the menu sheet
menuToggleButton.addEventListener('click', () => {
  menuSheet.classList.toggle('open');
});

// Close the menu sheet when the close button is clicked
closeMenuButton.addEventListener('click', () => {
  menuSheet.classList.remove('open');
});


darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  // Change icon based on dark mode state
  if (body.classList.contains('dark-mode')) {
    iconMode.setAttribute('data-lucide', 'sun');
  } else {
    iconMode.setAttribute('data-lucide', 'moon');
  }
});
