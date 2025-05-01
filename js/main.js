/**
Moderator
Pippin Barr (with text by Claudia Molinari)

Based on something I saw Aymeric Mansoux do for a panel. A way to bring up items for discussion without a moderator. In this case it's items from Claudia Molinari's Mindful Game Design Manifesto.

In essence it does a "wheel of fortune" spin through items from the manifesto, eventually landing on one for the panel to talk through.
*/

"use strict";

// The manifesto we're spinning through
const manifesto = [
    "your game is born the moment you feel excited about the thought of it",
    "your game is a game if you say so",
    "make a game that embraces all that is you",
    "make a game to inspire others to be better",
    "make a game to build values you can be proud of",
    "make a game for you first, then for the others",
    "respect and admire everyone in the team",
    "the things that matter the most are the ones you learn from the design and development process",
    "respect and admire the design and development process",
    "design the conditions to enjoy the process",
    "design the conditions to love your game",
    "your game process is never late, unless you make it so",
    "change the conditions that stop excitement to flow",
    "give your game a purpose",
    "design your game with a vision",
    "allow good intentions, allow culture in",
    "allow good intentions, allow art in",
    "allow good intentions, allow knowledge in",
    "take care of yourself when making a game",
    "take care of others when making a game",
    "do not ruin your daily result by mourning about what must be done tomorrow",
    "it is you who creates what you feel about your game, be solid",
    "it is your game that creates what you feel about yourself, be fluid",
    "accept the feelings of hate, failure, anxiety and despair, then move on",
    "when lost, think about the step not the stair in front of you",
    "when lost, read or write a poem to your game, it will thank you later",
    "don’t believe everything you think about your game, believe everything you feel",
    "great game ideas can die, let them go",
    "stay present, your game is not what it was or what it will be, it is what it is now",
    "every game idea will end in different ways and will have its own life cycle, respect it",
    "respect the shape your game takes",
    "make a game for its process not for its outcome",
    "you might not always know where your game is heading to, but your game does",
    "appreciate and be grateful about the result of your game",
    "your game is beautiful",
];

// The item element on the page
const number = document.getElementById("number");
const item = document.getElementById("item");
// Our sound effect for the "wheel"
const tick = new Audio("assets/sounds/click.wav")
// It spins on a click
document.addEventListener("click", spinThatWheel);

/**
 * Start spinning the wheel
 */
function spinThatWheel() {
    spin(98 + Math.floor(Math.random() * 4), 1, undefined);
}

/**
 * Spins the wheel one notch, then recalculates the remaining
 * count and delay, remembers the previous item so we don't
 * show the same thing twice;
 */
function spin(count, delay, previous) {
    console.log(count);

    // Choose the next item to show
    let next;
    do {
        next = random(manifesto);
    } while (next === previous);

    // Show it
    number.innerText = manifesto.indexOf(next) + 1 + ". ";
    item.innerText = next;
    // Remember it for the next spin to avoid repetition
    previous = next;

    // Play the ticking sound
    tick.currentTime = 0;
    tick.play(0);

    // Depending on the count, adopt different delays
    // before we show the next one.
    // I broke out the 2 and 1 counts to control the comedy of
    // it slowing down and landing on the final choice
    if (count === 0) return;
    if (count === 1) {
        delay = 1500 + Math.random() * 1500;
        if (Math.random() < 0.2) {
            delay = 4000;
        }
    }
    else if (count === 2) {
        delay = 1000 + Math.random() * 1000;
    }
    else {
        delay *= 1.065 + Math.random() * 0.001;
    }
    // Decrease the count, since we just showed one
    count -= 1;

    // Schedule the next ticking into place
    setTimeout(() => {
        spin(count, delay, previous);
    }, delay);
}

/**
 * Returns a random array element from the provided array 
 */
function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}