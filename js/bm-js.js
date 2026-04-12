let button = document.querySelector("#bm-menu-button");                                   // get menu button element
let menu = document.querySelector("#bm-display");                                         // get display element


function updateMenuDisplay() {                                                            // Equivalent to @media call to display menu at 576px or greater width
  if (window.innerWidth >= 576) {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
}

if (button && menu) {                                                     // good practice is to check that variables exist before using them to avoid errors
  button.addEventListener("click", function() {                           // attaches event listener to button listening for a click event
    const isHidden = window.getComputedStyle(menu).display === "none";    // sets isHidden to true/false depending on menu visibility
    menu.style.display = isHidden ? "block" : "none";                     // toggles the menu display value dependent on value of isHidden
    sound.play();                                                         // plays 'click' audio
  });
}

window.addEventListener('resize', updateMenuDisplay);                     // adds event listener to watch for window resizing, triggering a media width check and conditional hide/show of menu.
updateMenuDisplay();                                                      // checks when first loaded or the page could be displayed incorrectly
