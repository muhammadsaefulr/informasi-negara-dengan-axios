document.addEventListener("DOMContentLoaded", function() {
    const changeThemeButton = document.getElementById("changeThemeMode");
    const htmlElement = document.documentElement;
  
    changeThemeButton.addEventListener("click", function() {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme === "dark") {
        localStorage.setItem("theme", "light");
        htmlElement.classList.remove("dark");
        changeThemeButton.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
      } else {
        localStorage.setItem("theme", "dark");
        htmlElement.classList.add("dark");
        changeThemeButton.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
      }
    });
  
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      htmlElement.classList.add("dark");
      changeThemeButton.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
      htmlElement.classList.remove("dark");
      changeThemeButton.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
  });
  