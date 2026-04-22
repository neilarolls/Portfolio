$(document).ready(function() {                                                              // Only run once DOM has loaded

  let button = document.querySelector("#bm-menu-button");                                   // Get menu button element
  let menu = document.querySelector("#bm-display");                                         // Get display element
  let bmPosition = true;                                                                   // Indicates current menu position (on or off screen)
  let clicked = false;
  let shownByUser = false;

  function bmSlideLeft() {

    if (bmPosition) {                                                                       // If menu position is currently shown (true) then slide items left,
        $("#bm-display div").css({"left":"-155px"});                                        // transitions should do the rest. (chuck 'em in a bucket as opposed
        $("#popout-target-1").css({"left":"-155px","transition":"left 0.6s linear"});       // to slide right's controlled positioning).
        $("#popout-target-2").css({"left":"-155px","transition":"left 0.6s linear"});
        $("#popout-target-3").css({"left":"-155px","transition":"left 0.6s linear"});
        $("#popout-target-4").css({"left":"-155px","transition":"left 0.6s linear"});

      bmPosition = false;                                                                   // Set bmPosition to false
    }
  }

  bmSlideLeft();

  function bmSlideRight() {

    if (!bmPosition) {                                                                      // If menu position is currently hidden (false) then slide items right,
      $("#bm-display div").css({"left":"0px"});                                             // transitions should do the rest.

      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;


      if (currentHeight < 360 && currentWidth < 1200) {

        $("#popout-target-1").css({"left":"35px"});
        $("#popout-target-2").css({"left":"35px"});
        $("#popout-target-3").css({"left":"83px"});
        $("#popout-target-4").css({"left":"83px"});

      } else if (currentHeight < 360 && currentWidth >= 1200) {

        $("#popout-target-1").css({"left":"86px","transition":"left 0.05s linear"});
        $("#popout-target-2").css({"left":"86px","transition":"left 0.05s linear"});
        $("#popout-target-3").css({"left":"180px","transition":"left 0.05s linear"});
        $("#popout-target-4").css({"left":"180px","transition":"left 0.05s linear"});

      }

      if (currentHeight >= 360 && currentHeight < 720 && currentWidth < 1200) {

        $("#popout-target-1").css({"left":"20.4px"});
        $("#popout-target-2").css({"left":"20.4px"});
        $("#popout-target-3").css({"left":"89.6px"});
        $("#popout-target-4").css({"left":"89.6px"});

      } else if (currentHeight >= 360 && currentHeight < 720 && currentWidth >= 1200) {

        $("#popout-target-1").css({"left":"78px","transition":"left 0.05s linear"});
        $("#popout-target-2").css({"left":"78px","transition":"left 0.05s linear"});
        $("#popout-target-3").css({"left":"180px","transition":"left 0.05s linear"});
        $("#popout-target-4").css({"left":"180px","transition":"left 0.05s linear"});

      }

      if (currentHeight >= 720 && currentHeight < 1080 && currentWidth < 1200) {

        $("#popout-target-1").css({"left":"13.2px"});
        $("#popout-target-2").css({"left":"13.2px"});
        $("#popout-target-3").css({"left":"88px"});
        $("#popout-target-4").css({"left":"88px"});

      } else if (currentHeight >= 720 && currentHeight < 1080 && currentWidth >= 1200) {

        $("#popout-target-1").css({"left":"52px","transition":"left 0.05s linear"});
        $("#popout-target-2").css({"left":"52px","transition":"left 0.05s linear"});
        $("#popout-target-3").css({"left":"170px","transition":"left 0.05s linear"});
        $("#popout-target-4").css({"left":"170px","transition":"left 0.05s linear"});

      }

      if (currentHeight >= 1080 && currentWidth < 1200) {

        $("#popout-target-1").css({"left":"35px"});
        $("#popout-target-2").css({"left":"35px"});
        $("#popout-target-3").css({"left":"35px"});
        $("#popout-target-4").css({"left":"35px"});

      } else if (currentHeight >= 1080 && currentWidth >= 1200) {

        $("#popout-target-1").css({"left":"94px","transition":"left 0.05s linear"});
        $("#popout-target-2").css({"left":"94px","transition":"left 0.05s linear"});
        $("#popout-target-3").css({"left":"94px","transition":"left 0.05s linear"});
        $("#popout-target-4").css({"left":"94px","transition":"left 0.05s linear"});

      }


      bmPosition = true;                                                                    // Set bmPosition to true
    }
  }

  function updateOnClick() {                                                                // Clicking the menu button (only visible < 576px) will toggle the menu on or off
    if (bmPosition && clicked && window.innerWidth < 576) {
      bmSlideLeft();
      shownByUser = false;
    } else if (!bmPosition && clicked && window.innerWidth < 576) {
      bmSlideRight();
      shownByUser = true;
    }
  }

  function updateOnResize() {                                                               // Equivalent to a @media call to show/hide menu at the 576px width breakpoint
    if (bmPosition && window.innerWidth < 576 && !shownByUser) {
      bmSlideLeft();
    } else if (!bmPosition && window.innerWidth >= 576) {
      bmSlideRight();
    } else if (window.innerWidth >= 576) {
      bmPosition = false;
      bmSlideRight();
      shownByUser = false;
    } else if (bmPosition && window.innerWidth < 576 && shownByUser) {
      bmPosition = false;
      $("#popout-target-1").css({"transition":"left 0.05s linear"});
      $("#popout-target-2").css({"transition":"left 0.05s linear"});
      $("#popout-target-3").css({"transition":"left 0.05s linear"});
      $("#popout-target-4").css({"transition":"left 0.05s linear"});
      bmSlideRight();
    }
  }


  if (button && menu) {                                                       // Good practice is to check that things exist before using them to avoid errors.

      button.addEventListener("click", function() {                           // Attaches event listener to button listening for a click event, attaching the anonymous function

        clicked = true;

        updateOnClick();                                                      // Calls function 

        clicked = false;

        sound.play();                                                         // plays 'click' audio
      });

  }

  window.addEventListener('resize', updateOnResize);                          // Adds event listener to watch for window resizing, triggering a media width check and conditional hide/show of menu.

  updateOnResize();                                                           // Checks when first loaded or the page could be displayed incorrectly

});