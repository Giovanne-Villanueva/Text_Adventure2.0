document.addEventListener("DOMContentLoaded", function () {
    const userMenuButton = document.getElementById("user-menu-button");
    const userMenu = document.getElementById("user-menu");
  
    userMenuButton.addEventListener("click", function () {
      if (userMenu.style.display === "none") {
        userMenu.style.display = "block";
      } else {
        userMenu.style.display = "none";
      }
    });
  
    // Close the dropdown when clicking outside of it
    document.addEventListener("click", function (event) {
      if (!userMenu.contains(event.target) && !userMenuButton.contains(event.target)) {
        userMenu.style.display = "none";
      }
    });
  });