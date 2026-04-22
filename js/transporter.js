// Future development plans are to improve setup automation in the interests of making it easier to adapt, ie take a user supplied
// div per row with the text, with a special character (maybe ¬) denoting lines, and ignoring spaces, then calculate end 
// coordinates for each. Correctly calculating positions according to all font parameters is not feasible so manual 
// adjustment by eye is necessary. I could include a function in the program that overlayed calculated text and lines
// on a reference text box version allowing you to align by eye more easily, outputting as a string to the console, which
// could then be incorporated into the program. As it is the data need creating by hand.
// 
// I also want to be able to encode pauses, this is an important control. Maybe additional divs in the sequence; ID's 'lxxp'
// or something similar with timings in the div. Lxx to give its place in the sequence and the p to trigger a pause state.
//
// Sound events are also possible. However, within the limited objectives I set this currently does the job nicely.
//
// Note that whole words can be sent at once by having the whole word in one location, ie one ID. It is simple to have
// different fonts and other css styling on any element in the animation.
// 
// Another idea: trailing letters. Push the preceding coordinates into what I've discovered is called an 'evicting stack'
// before updating to new coordinates, then moving trailing letters to the stored coordinates (nts:draw order?). If I create one
// array per trail 'level', then keep track of which is the primary array, it automatically overwrites the oldest coordinates
// and avoids shuffling values around between arrays en masse. I can see why they're also called circular stacks, which seems 
// more apt.

// --------------------------------------------------< TO ADD LETTERS >---------------------------------------------------
// ***************** Create a div containing the letter. Give it an ID in accordance with its place in *******************
// ***************** the sequence (l1, l2..ln). Shuffle all the susequent ID's up one to accomodate. *********************
// ***************** Insert the coordinates, final font size and weight into the correct array positions. ****************
// ***************** I've marked all the places that need modifying or cloning with (&&&&). ******************************
// -----------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------< TO ADD LINES >-----------------------------------------------------
// ******* Lines are treated the same as letters except for scaling, datum still being top-left. *************************
// ******* Font-size/weight don't affect them but values are needed in the arrays to maintain index **********************
// ******* alignment. I've marked all the places that need modifying or cloning with (++++). *****************************
// -----------------------------------------------------------------------------------------------------------------------


// Style any lines - the lines need special handling because they scale width rather than font-size.
$("#l18").css({"position":"absolute", "color":"white", "height":"0.01px", "width":"602px", "border":"0.0333rem solid white"});// (++++)


// A string of ID's EXCLUDING any lines.
let lettersOnly = '#l1, #l2, #l3, #l4, #l5, #l6, #l7, #l8, #l9, #l10, #l11, #l12, #l13, #l14, #l15, #l16, #l17, #l19, #l20, #l21, #l22, #l23, #l24, #l25, #l26, #l27, #l28, #l29, #l30, #l31, #l32, #l33, #l34';// (&&&&)

// Declare Variables.

let numLetters = 34;                        // Includes letters and lines. (&&&&) (++++)
let lettersSent = 0;
let letterDelay = 15;                       // Number of masterTicks between sending letters - this will speed up / slow down the animation.
let pathIncrements = 100;                   // Changing this goes faster/slower but quality may suffer - it's akin to frame rate so eyeball it. Use letterDelay to speed up the animation.
let blockScaleThreshold = 1.25;            // Adjusts the width maximum scaling kicks in at on the title block - 1 is 1200px, 1.25 is 1500px etc...
                                            // To change the reference width change the blockScale definition below (I haven't tested that however).

// Read screen width and height, the basis for scaling the title block.

let scrWidth = window.innerWidth;
let scrHeight = window.innerHeight;

let blockScale = (scrWidth / 1200);         // Scales down for small screens, based on a nominal width of 1200px.

if (blockScale > blockScaleThreshold) {    // Stops scaling when threshold value is reached.
    blockScale = blockScaleThreshold;
}

// Calculated text positions are relative to this centre.

let xCentre = scrWidth/2;
let yCentre = scrHeight/2;

// Adjust centre when menu is popped out to the left. This is specific to my web page and is optional, my popout being fixed position and sitting over other page content.

if (scrWidth >= 1200) {
    xCentre = ((scrWidth - 300) / 2) + 300;
} else if (scrWidth >= 576) {
    xCentre = ((scrWidth - 150) / 2) + 150;
}

// -----------------------------------------------------------------------------------------------------------------------
// ************************  Each letter has its own clock, denoting progress along a path  ******************************
// ************************  from 0,0 to endX,endY. I've made an array for each to simplify ******************************
// ************************  indexing. I've used signed 16bit Int arrays for coordinates,   ******************************
// ************************  an unsigned 8 bit array for the tick, 0-255 should be plenty.  ******************************
// -----------------------------------------------------------------------------------------------------------------------

// Coordinates
let letterEndX = new Int16Array([-176,-116, -66,-18,19,77, 133,148,  -305,-200,-119,-81, 0,90,171,210,243, -293,  -298, -270,-235, -163, -112,-57,-22, 29,71,104,134,169,183,220,257,291]); //(++++) (&&&&)
let letterEndY = new Int16Array([-144,-144, -144,-144,-144,-144, -144,-144,  -65,-65,-65,-65, -65,-65,-65,-65,-65, 98,  105, 105,105, 105, 105,105,105, 105,105,105,105,105,105,105,105,105]); //(++++) (&&&&)

// Font-size at 1:1 scale. May be scaled higher if blockScaleThreshold > 1.
let finalFontSize = new Float32Array([4.2,4.2, 4.2,4.2,4.2,4.2, 4.2,4.2,  9.2,9.2,9.2,9.2, 9.2,9.2,9.2,9.2,9.2, 0.125,  3.94, 3.94,3.94, 3.94, 3.94,3.94,3.94, 3.94,3.94,3.94,3.94,3.94,3.94,3.94,3.94,3.94])// (++++) (&&&&)
let fontWeight = new Int16Array([400,400, 400,400,400,400, 400,400,  500,500,500,500, 500,500,500,500,500, 200,  300, 300,300, 300, 300,300,300, 300,300,300,300,300,300,300,300,300])// (++++) (&&&&)

// Individual animation counters
let tick = new Uint8Array(numLetters);

// Used to coordinate animation timings.
let masterTick = 0;

// Move all letters and lines to the centre.
function moveAllToCentre() {

    for (let i = 0; i < numLetters; i++) {
        
        let letterID = `#l${i+1}`;

        $(letterID).css({"top": yCentre,
                         "left": 0, 
                         "display": "none"});

        $(lettersOnly).css({"transition":"text-shadow 0.01s linear",     // Turn glow on, quickly.
                            "text-shadow":"0 0 2rem white"});
    }
}

moveAllToCentre();

// Handles window resizing - resets animation timing and status variables to initial settings,
// recalculates screen and scaling values, and moves letters and lines back to the centre.
function resizeRedraw() {

    scrWidth = window.innerWidth;
    scrHeight = window.innerHeight;
    masterTick = 0;
    lettersSent = 0;
    xCentre = scrWidth/2;
    yCentre = scrHeight/2;
    
    for (let i = 0; i < numLetters; i++) {
        tick[i] = 0;
    }

    blockScale = (scrWidth / 1200);

    if (blockScale > blockScaleThreshold) {                    // Stops scaling when threshold value is reached.
        blockScale = blockScaleThreshold;
    }

    if (scrWidth >= 1200) {                                     // Adjusts centre to allow for popup menu, which is fixed position.
        xCentre = ((scrWidth - 300) / 2) + 300;
    } else if (scrWidth >= 576) {
        xCentre = ((scrWidth - 150) / 2) + 150;
    }

    moveAllToCentre();

}

resizeRedraw();

$(window).on('resize', resizeRedraw);                                                       // Add event handler for window resize.



function advanceText() {                 // Check if new letter is due and move letters.

    if (lettersSent < (masterTick / letterDelay) && lettersSent < numLetters) {             // Start sending a new letter as masterTick passes multiples of letterDelay.
        tick[lettersSent] = 1;                                                              // if there are any left to send, then increment count of letters sent.
        lettersSent++;
    }

    for (let i = 0; i < lettersSent; i++) {                                                 // Move the letters to new position.

        if (tick[i] <= pathIncrements) {                                                     // Stop redrawing when the letter is at the end of the animation.

            let currentScale = tick[i] / pathIncrements;                                                // currentScale is a straightforward decimal percentage denoting progress.
            let newX = ((letterEndX[i] * currentScale) * blockScale) - (blockScale * 15);               // Calculate x,y coords for each letter.
            let newY = ((letterEndY[i] * currentScale)  * blockScale) + yCentre - (blockScale * 45);    // blockScale is also adjusting for the top-left box offset at the end.

            letterID = `#l${i+1}`;                                                                      // Makes selector for current letter element with string literal.
            fontSizeText = `${(currentScale * blockScale) * finalFontSize[i]}rem`;                      // Calculates font size in string literal

            if (i === 17) {                                                                             // Updates line position and width. Remember index is 1 lower than the id. (++++)
                                                                                                        // ('OR' additional conditions for additional lines.)

                // Applies scaled line width and new coordinate values - repeat this for each line, with appropriate values. (++++)
                $("#l18").css({"width": `${602 * currentScale * blockScale}`, "top": newY, "left": newX});

            } else {

                $(letterID).css({"top": newY, "left": newX, "font-size": fontSizeText, "font-weight": fontWeight[i], "display": "block"});  // Update letter
            }
        }
    }

    for (let i = 0; i < lettersSent; i++) {                                                 // Increment letter ticks
        
        if (tick[i] < pathIncrements && tick[i] > 0) {                                      // only if they are active and haven't reached the end

            tick[i]++;
        }
    }
}




// Main loop - Asynchronous

let counter = 0;

(async () => {
    do {
        await new Promise(resolve => setTimeout(resolve, 3));
                                                                                            // Sets a timeout of 1 ms. Increase if the loop is holding up other processes on the page,
                                                                                            // but under no circumstances set it to 0. Instinct said I shouldn't, I checked, and indeed,
                                                                                            // setting 0 on timeouts is 'A Bad Thing To Do' if you want event handlers to work correctly.
        scrWidth = window.innerWidth;
        scrHeight = window.innerHeight;

        advanceText();

        if ( lettersSent === numLetters && masterTick > ((numLetters + 5) * letterDelay)) {     // jQuery FadeIn of line after a short pause (change n in "numLetters + n" to adjust pause,
                                                                                                // letterDelay is the letter frequency so n is adding extra letter ticks.
            $("#l18").fadeIn(3000 * (letterDelay / 15));                                        // Fades the line in, scaling the duration to what I consider a good letter frequency (15). (++++)
                                                                                                // Increase this to shorten the transition.
                                                                                                // Simultaneously turns off the glow, with similar scaling.

            $(lettersOnly).css({"transition":`text-shadow ${3 * (letterDelay / 15)}s linear`, "text-shadow":"none"});
        }

        // counter++;                                                                       // I had a finite loop for testing - typing 'counter = 1' in the js console (windows: ctrl +shift + j) 
                                                                                            // will exit the loop.
        masterTick++;                                                                       // Increment the main clock.

    } while (counter < 1);

})();
