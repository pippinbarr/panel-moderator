/**
Moderator
Pippin Barr (with text by Claudia Molinari)

Based on something I saw Aymeric Mansoux do for a panel. A way to bring up prompts for discussion without a moderator. In this case it's items from Claudia Molinari's Mindful Game Design Manifesto.

In essence it does a "wheel of fortune" spin through items from the manifesto, eventually landing on one for the panel to talk through.
*/

"use strict";

// The manifesto we're spinning through
const manifesto = [
    "1. your game is born the moment you feel excited about the thought of it",
    "2. your game is a game if you say so",
    "3. make a game that embraces all that is you",
    "4. make a game to inspire others to be better",
    "5. make a game to build values you can be proud of",
    "6. make a game for you first, then for the others",
    "7. respect and admire everyone in the team",
    "8. the things that matter the most are the ones you learn from the design and development process",
    "9. respect and admire the design and development process",
    "10. design the conditions to enjoy the process",
    "11. design the conditions to love your game",
    "12. your game process is never late, unless you make it so",
    "13. change the conditions that stop excitement to flow",
    "14. give your game a purpose",
    "15. design your game with a vision",
    "16. allow good intentions, allow culture in",
    "17. allow good intentions, allow art in",
    "18. allow good intentions, allow knowledge in",
    "19. take care of yourself when making a game",
    "20. take care of others when making a game",
    "21. do not ruin your daily result by mourning about what must be done tomorrow",
    "22. it is you who creates what you feel about your game, be solid",
    "23. it is your game that creates what you feel about yourself, be fluid",
    "24. accept the feelings of hate, failure, anxiety and despair, then move on",
    "25. when lost, think about the step not the stair in front of you",
    "26. when lost, read or write a poem to your game, it will thank you later",
    "27. don’t believe everything you think about your game, believe everything you feel",
    "28. great game ideas can die, let them go",
    "29. stay present, your game is not what it was or what it will be, it is what it is now",
    "30. every game idea will end in different ways and will have its own life cycle, respect it",
    "31. respect the shape your game takes",
    "32. make a game for its process not for its outcome",
    "33. you might not always know where your game is heading to, but your game does",
    "34. appreciate and be grateful about the result of your game",
    "35. your game is beautiful",
];

// The prompt element on the page
const prompt = document.getElementById("prompt");
// Our sound effect for the "wheel"
const tick = new Audio("assets/sounds/click.wav")
// It spins on a click
document.addEventListener("click", spinThatWheel);

/**
 * Start spinning the wheel
 */
function spinThatWheel() {
    spin(99 + Math.random() * 2, 1, undefined);
}

/**
 * Spins the wheel one notch, then recalculates the remaining
 * count and delay, remembers the previous item so we don't
 * show the same thing twice;
 */
function spin(count, delay, previous) {
    // Choose the next item to show
    let next;
    do {
        next = random(manifesto);
    } while (next === previous);

    // Show it
    prompt.innerText = next;
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
    count--;

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