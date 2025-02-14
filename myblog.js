document.addEventListener("DOMContentLoaded", function () {
  const toggle_mode_btn = document.getElementById("toggle_mode_btn");
  const storedTheme = localStorage.getItem("theme");

  // If a theme preference is stored, apply it to the body classList
  if (storedTheme) {
    document.body.classList.add(storedTheme);
  }

  if (toggle_mode_btn) {
    // got error message bc was trying to attach this eventListener in ConstantSourceNode.html even tho doesn't exist
    toggle_mode_btn.addEventListener("click", function () {
      document.body.classList.toggle("dark_mode");
      // Update the theme preference in localStorage
      const currentTheme = document.body.classList.contains("dark_mode")
        ? "dark_mode"
        : "";
      localStorage.setItem("theme", currentTheme);
    });
  }

  // Get the current page pathname
  var currentPagePath = window.location.pathname;

  // Select all navigation links
  var navLinks = document.querySelectorAll("nav a");

  // Loop through each navigation link
  navLinks.forEach(function (link) {
    // Check if the link's href attribute matches the current page pathname
    if (link.pathname === currentPagePath) {
      // style background of the active link
      link.style.fontWeight = "bolder";
    }
  });

  // Select the progress bar element
  const progressBar = document.getElementById("progress_bar");
  const scrollableHeight =
    document.documentElement.scrollHeight - // Total height of the document, including content not currently visible on the screen.
    document.documentElement.clientHeight; // Height of the visible part of the webpage (the viewport).
  // Subtracting these gives the height of the part of the page that's scrollable.

  console.log(scrollableHeight);

  // Add a scroll event listener
  window.addEventListener("scroll", () => {
    // calculate how far the user has scrolled vertically.
    // Distance scrolled in the <body> element (for older browsers).
    // Distance scrolled in the <html> element (modern browsers).
    // The || operator ensures compatibility with both modern and older browsers.
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    console.log(scrollTop);

    const scrollPercent = scrollTop / scrollableHeight;
    // Update the progress bar's width
    progressBar.style.width = `${scrollPercent * 100}%`;
  });
});
