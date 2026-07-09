$(document).ready(function() {                                                              // Only run once DOM has loaded

  let button = document.querySelector("#bm-menu-button");                                   // Get menu button element
  let menu = document.querySelector("#bm-display");                                         // Get display element
  let bmShown = true;                                                                       // Indicates current menu position (on or off screen)
  let clicked = false;
  let shownByUser = false;

  function bmSlideLeft() {

    if (bmShown) {                                                                          // If menu position is currently shown (true) then slide items left,
        $("#bm-display div").css({"left":"-155px"});                                        // transitions should do the rest. (chuck 'em in a bucket as opposed
        $("#popout-target-1").css({"left":"-155px","transition":"left 0.6s linear"});       // to slide right's controlled positioning).
        $("#popout-target-2").css({"left":"-155px","transition":"left 0.6s linear"});
        $("#popout-target-3").css({"left":"-155px","transition":"left 0.6s linear"});
        $("#popout-target-4").css({"left":"-155px","transition":"left 0.6s linear"});

      bmShown = false;                                                                   // Set bmShown to false
    }
  }

  bmSlideLeft();

  function bmSlideRight() {

    if (!bmShown) {                                                                      // If menu position is currently hidden (false) then slide items right,
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


      bmShown = true;                                                                    // Set bmShown to true
    }
  }

  function bmButtonOpen() {
    const top = document.getElementById('burger-bar-top');
    const mid = document.getElementById('burger-bar-middle');
    const bot = document.getElementById('burger-bar-bottom');
    if (!top || !mid || !bot) return;

    // Ensure transform origin and initial transition settings
    [top, mid, bot].forEach(el => {
      el.style.transformOrigin = 'center';
      el.style.willChange = 'transform, opacity';
    });

    // Compute vertical offsets to move top/bottom to the vertical centre of the middle bar
    const topRect = top.getBoundingClientRect();
    const midRect = mid.getBoundingClientRect();
    const botRect = bot.getBoundingClientRect();
    const midCenter = midRect.top + midRect.height / 2;
    const dyTop = midCenter - (topRect.top + topRect.height / 2);
    const dyBot = midCenter - (botRect.top + botRect.height / 2);

    // Phase 1: translate top/bottom to the middle (no rotation yet)
    top.style.transition = 'transform 160ms ease';
    bot.style.transition = 'transform 160ms ease';
    mid.style.transition = 'transform 160ms ease, opacity 160ms ease';

    // apply translate only
    top.style.transform = `translateY(${dyTop}px) rotate(0deg)`;
    bot.style.transform = `translateY(${dyBot}px) rotate(0deg)`;
    mid.style.transform = `rotate(0deg)`;

    // Phase 2: after translate completes, rotate all bars to form the X
    setTimeout(() => {
      top.style.transition = 'transform 160ms ease';
      bot.style.transition = 'transform 160ms ease';
      mid.style.transition = 'transform 160ms ease';

      top.style.transform = `translateY(${dyTop}px) rotate(45deg)`;
      bot.style.transform = `translateY(${dyBot}px) rotate(45deg)`;
      mid.style.transform = `translateY(0px) rotate(-45deg)`;
    }, 170);
  }

  function bmButtonClose() {
    const top = document.getElementById('burger-bar-top');
    const mid = document.getElementById('burger-bar-middle');
    const bot = document.getElementById('burger-bar-bottom');
    if (!top || !mid || !bot) return;

    // Recompute offsets in case layout changed since opening
    const topRect = top.getBoundingClientRect();
    const midRect = mid.getBoundingClientRect();
    const botRect = bot.getBoundingClientRect();
    const midCenter = midRect.top + midRect.height / 2;
    const dyTop = midCenter - (topRect.top + topRect.height / 2);
    const dyBot = midCenter - (botRect.top + botRect.height / 2);

    // Phase 1: rotate back to 0 while keeping translate (undo the X)
    top.style.transition = 'transform 160ms ease';
    bot.style.transition = 'transform 160ms ease';
    mid.style.transition = 'transform 160ms ease, opacity 160ms ease';

    top.style.transform = `translateY(${dyTop}px) rotate(0deg)`;
    bot.style.transform = `translateY(${dyBot}px) rotate(0deg)`;
    mid.style.transform = `translateY(0px) rotate(0deg)`;

    // Phase 2: after rotation, move top/bottom back to their original positions
    setTimeout(() => {
      top.style.transition = 'transform 160ms ease';
      bot.style.transition = 'transform 160ms ease';
      mid.style.transition = 'transform 160ms ease';

      top.style.transform = '';
      bot.style.transform = '';
      mid.style.transform = '';
    }, 170);
  }

  function updateOnClick() {                                                                // Clicking the menu button (only visible < 576px) will toggle the menu on or off
    if (bmShown && clicked && window.innerWidth < 576) {
      bmSlideLeft();
      bmButtonClose();
      shownByUser = false;
    } else if (!bmShown && clicked && window.innerWidth < 576) {
      bmSlideRight();
      bmButtonOpen();
      shownByUser = true;
    }
  }

  // Equivalent to a @media call to show/hide menu at the 576px width breakpoint.
  function updateOnResize() {
    // Hide menu when moving to a small screen ( < 576px) unless the user opened the menu.
    if (bmShown && window.innerWidth < 576 && !shownByUser) {
      bmSlideLeft();
    // Show menu and hide button when moving to a display >= 576px.
    } else if (!bmShown && window.innerWidth >= 576) {
      bmSlideRight();
      bmButtonClose();
      shownByUser = false;
    } else if (bmShown && window.innerWidth >= 576) {
      bmShown = false;
      bmSlideRight();
      bmButtonClose();
      shownByUser = false;
    } else if (bmShown && window.innerWidth < 576 && shownByUser) {
      bmShown = false;
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