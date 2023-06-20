// Buat dropdown dan hamburger function
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdown");
const links = document.querySelectorAll(".dropdown a");
const hamburger =  document.querySelector(".hamburger");

function setAriaExpandedFalse() {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenu() {
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const dropdownIndex = e.currentTarget.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);

    dropdownElement.classList.toggle("active");
    dropdown.forEach((drop) => {
      if (drop.id !== btn.dataset["dropdown"]) {
        drop.classList.remove("active");
      }
    });
    e.stopPropagation();
    btn.setAttribute(
      "aria-expanded",
      btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
});

// close dropdown menu when the dropdown links are clicked
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
  })
);

// close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
  closeDropdownMenu();
  setAriaExpandedFalse();
});

// close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenu();
    setAriaExpandedFalse();
  }
});

function toggleHamburger() {
  const navBar = document.querySelector('.nav-menu');
  hamburger.classList.toggle('opened');
  navBar.classList.toggle('opened');
}

const filterButtons = document.getElementsByClassName("filter-menu");
const menuItems = document.getElementsByClassName("menu");
const searchInput = document.getElementById("search-input");
const notFoundMessage = document.getElementById("not-found-message");

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function() {
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }
    
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");

    let foundItems = 0;
    for (let k = 0; k < menuItems.length; k++) {
      const menuItem = menuItems[k];
      
      if (menuItem.classList.contains(filterValue) || filterValue === "all") {
        menuItem.style.display = "";
        foundItems++;
      } else {
        menuItem.style.display = "none";
      }
    }

    if (foundItems > 0) {
      notFoundMessage.style.display = "none";
    } else {
      notFoundMessage.style.display = "block";
    }
  });
}

searchInput.addEventListener("input", function() {
  const searchTerm = searchInput.value.toLowerCase();

  let foundItems = 0;
  for (let k = 0; k < menuItems.length; k++) {
    const menuItem = menuItems[k];

    const activeFilter = document.querySelector(".filter-menu.active");
    const filterValue = activeFilter.getAttribute("data-filter");

    if ((menuItem.classList.contains(filterValue) || filterValue === "all") &&
        menuItem.textContent.toLowerCase().includes(searchTerm)) {
      menuItem.style.display = "";
      foundItems++;
    } else {
      menuItem.style.display = "none";
    }
  }

  if (foundItems > 0) {
    notFoundMessage.style.display = "none";
  } else {
    notFoundMessage.style.display = "block";
  }
});


