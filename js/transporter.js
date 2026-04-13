$("#l18").css({"position":"absolute", "color":"white", "height":"0.01px", "width":"602px", "border":"0.5px solid white"});   // Style the line

// Declare Variables.

let numLetters = 34;
let lettersSent = 0;
let letterDelay = 15;                    // Number of masterTicks between sending letters
let pathIncrements = 100;                // Changing this goes faster/slower but quality may suffer - eyeball it. (Investigating how to implement VBlank testing)
let blockScaleThreshhold = 1.25;         // Adjusts the maximum scaling on the title block - 1 is 1200, 1.25 is around 1450-1500.

// Read screen width and height, the basis for scaling the title block.

let scrWidth = window.innerWidth;
let scrHeight = window.innerHeight;

let blockScale = (scrWidth / 1200);     // Scales down for small screens

if (blockScale > blockScaleThreshhold) {                   // Stops scaling when threshhold value is reached
    blockScale = blockScaleThreshhold;
}

    // Calculated text positions are relative to this centre.

let xCentre = scrWidth/2;
let yCentre = scrHeight/2;

    // Adjust centre when menu is popped out to the left.

if (scrWidth >= 1200) {
    xCentre = ((scrWidth - 300) / 2) + 300;
} else if (scrWidth >= 576) {
    xCentre = ((scrWidth - 150) / 2) + 150;
}

    // Each letter has its own clock, denoting progress along a path
    // from 0,0 to endX,endY. I've made an array for each
    // to simplify indexing. Signed 16bit int arrays for coordinates,
    // Unsigned 8 bit array for the tick, 0-255 should be plenty.

let letterEndX = new Int16Array([-176,-116, -66,-18,19,77, 133,148,  -305,-200,-119,-81, 0,90,171,210,243, -293,  -298, -270,-235, -163, -112,-57,-22, 29,71,104,134,169,183,220,257,291]);
let letterEndY = new Int16Array([-146,-146, -146,-146,-146,-146, -146,-146,  -65,-65,-65,-65, -65,-65,-65,-65,-65, 100,  105, 105,105, 105, 105,105,105, 105,105,105,105,105,105,105,105,105]);
let finalFontSize = new Float32Array([4.2,4.2, 4.2,4.2,4.2,4.2, 4.2,4.2,  9.2,9.2,9.2,9.2, 9.2,9.2,9.2,9.2,9.2, 0.125,  3.94, 3.94,3.94, 3.94, 3.94,3.94,3.94, 3.94,3.94,3.94,3.94,3.94,3.94,3.94,3.94,3.94])
let fontWeight = new Int16Array([400,400, 400,400,400,400, 400,400,  500,500,500,500, 500,500,500,500,500, 200,  300, 300,300, 300, 300,300,300, 300,300,300,300,300,300,300,300,300])
let tick = new Uint8Array(numLetters);                                // Change to Uint16 if you fancy doing whole paragraphs
let masterTick = 0;                                                   // Used to coordinate timings

// Move all letters to centre

function moveAllToCentre() {

    for (let i = 0; i < numLetters; i++) {
        
        let letterID = `#l${i+1}`;

        // console.log(letterID)

        $(letterID).css({"top": yCentre, "left": 0, "display": "none"});
    }
}

moveAllToCentre();

// Handle window resizing - resets timing and status variables to initial settings, recalculates screen and scaling values, then moves
// letters back to centre.

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

    if (blockScale > blockScaleThreshhold) {                   // Stops scaling when threshhold value is reached
        blockScale = blockScaleThreshhold;
    }

    if (scrWidth >= 1200) {                                     // Adjusts centre to allow for popup menu, which is Fixed position
        xCentre = ((scrWidth - 300) / 2) + 300;
    } else if (scrWidth >= 576) {
        xCentre = ((scrWidth - 150) / 2) + 150;
    }

    moveAllToCentre();

}

resizeRedraw();

$(window).on('resize', resizeRedraw);                                                       // Add event handler for window resize



function advanceText() {                                                                    // Check if new letter is due and move letters

    if (lettersSent < (masterTick / letterDelay) && lettersSent < numLetters) {             // Start sending a new letter as masterTick passes multiples of letterDelay
        tick[lettersSent] = 1;                                                              // if there are any left to send, then increment count of letters sent
        lettersSent++;
    }

    for (let i = 0; i < lettersSent; i++) {                                                 // Move letters to new position

        if (tick[i] < pathIncrements) {                                                     // Stop redrawing when letter at full extent
            let currentScale = tick[i] / pathIncrements;
            let newX = ((letterEndX[i] * currentScale) * blockScale) - (blockScale * 15);             // Calculate x,y coords for each letter
            let newY = ((letterEndY[i] * currentScale)  * blockScale) + yCentre - (blockScale * 45);   // blockScale is also adjusting for the top-left box offset at the end

            letterID = `#l${i+1}`;                                                                // Makes selector for current letter element with string literal
            fontSizeText = `${(currentScale * blockScale) * finalFontSize[i]}rem`;                // Calculates font size in string literal

            if (i === 17) {                                                                       // The line needs to be kept hidden until all letters are in place
                let newWidth = 602 * currentScale * blockScale;
                $("#l18").css({"width": newWidth, "top": newY, "left": newX});       // Update line
            } else {
                $(letterID).css({"top": newY, "left": newX, "font-size": fontSizeText, "font-weight": fontWeight[i], "display": "block"});  // Update letter
            }
        }
    }

    for (let i = 0; i < lettersSent; i++) {                                                 // Increment letter ticks...
        
        if (tick[i] < pathIncrements && tick[i] > 0) {                                      // ...only if they are active and haven't reached the end

            tick[i]++;
        }
    }
}




// Main loop - Asynchronous

let counter = 0;

(async () => {
    do {
        await new Promise(resolve => setTimeout(resolve, 1));

        scrWidth = window.innerWidth;
        scrHeight = window.innerHeight;

        advanceText();

        if ( lettersSent === numLetters && masterTick > ((numLetters + 5) * letterDelay)) {     // jQuery FadeIn of line after a short pause (change n in "numLetters + n" to adjust)
            $("#l18").fadeIn(3000);
        }

        // counter++;                                                                       // Had a finite loop for testing - typing counter = 1 in the console will exit the loop
        masterTick++;

    } while (counter < 1);

})();