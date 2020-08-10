/////////////////
//Variables
/////////////////
const overlay = document.getElementById("overlay");
const title = overlay.firstElementChild;
const phrase = document.getElementById("phrase");
const ul = phrase.firstElementChild;
const keyboard = document.getElementById('qwerty');
let startGameButton = document.getElementsByClassName('btn__reset')[0];
let matchingLetters = []
let chosenKeys = []
let missed = 0;


//Phrase options for the player to guess
const phrases = [
    "Prove them wrong",
    "Black lives matter",
    "It is well",
    "every moment matters",
    "passion over perfection",
    "On your left",
    "See you good",
    "What the fork",
    "Whatever it takes",
];

/////////////////
//Helper Functions
/////////////////

const setOverlay = (winOrLose, titleInnerText) => {
    overlay.classList.remove("start")
    overlay.classList.add(winOrLose)
    overlay.style.visibility = "visible"
    title.innerText = titleInnerText
    startGameButton.innerText = "play again?"
}

/////////////////
//Feature Functions
/////////////////

//chooses item from phrases array and converst to character array
const getRandomPhraseAsArray = (array) => {
    const randomPhraseIndex = Math.floor(Math.random() * (array.length));
    const randomPhrase = array[randomPhraseIndex];
    const phraseCharacterArray = randomPhrase.split("");
    return phraseCharacterArray;

}

//displays chosesn character array
const addPhraseToDisplay = (characterArray) => {
    for (i = 0; i < characterArray.length; i++) {
        let li = document.createElement("LI");
        li.innerText = characterArray[i];
        if (li.innerText != 0) {
            li.classList.add('letter')
        } else {
            li.classList.add('space')
        }
        ul.appendChild(li);
    }
}

//checks if button pressed is included in object of elements with class "letter"
const checkLetter = (button) => {
    let buttonText = button.innerText;
    let letters = document.getElementsByClassName("letter");
    for (i = 0; i < letters.length; i++) {
        if (buttonText === letters[i].innerText.toLowerCase()) {
            letters[i].classList.add('show')
            matchingLetters.push(buttonText)
        }
    }
    if (matchingLetters[matchingLetters.length - 1] === buttonText) {
        return buttonText
    } else {
        return null
    }
}

//checks if player has won the game
const checkWin = () => {
    let letters = document.getElementsByClassName("letter");
    let lettersShown = document.getElementsByClassName("show");
    if (letters.length === lettersShown.length) {
        setOverlay ("win", "You Win!")
    } else if (missed >= 5) {
        setOverlay ("lose", "Sorry, you lost =(")
    }
}

//resets game features after play again button clicked
const resetGame = () => {
    phraseArray = getRandomPhraseAsArray(phrases)
    addPhraseToDisplay(phraseArray);
    if (startGameButton.innerHTML === "play again?") {
        //resets lives
        missed = 0
        let tries = document.getElementsByClassName("tries")
        let keys = document.getElementsByTagName("button")
        let childLI = ul.lastElementChild;
        for (i = 0; i < tries.length; i++)
            if (tries[i].firstElementChild.getAttribute("src") === "images/lostHeart.png") {
                tries[i].firstElementChild.setAttribute("src", "images/liveHeart.png")
            }
        //removes chosen class from keyboard letters
        for (i = 0; i < keys.length; i++) {
            keys[i].classList.remove("chosen")
            keys[i].removeAttribute("disabled")
        }
        //Remove old phrase
        while (childLI) {
            ul.removeChild(childLI);
            childLI = ul.lastElementChild;
        }

        //chooses and displays new phrase
        phraseArray = getRandomPhraseAsArray(phrases)
        addPhraseToDisplay(phraseArray);

        //remove lose and win class from overlay
        overlay.classList.remove("lose")
        overlay.classList.remove("win")
    }
}

/////////////////
//Events
/////////////////

//removes overlay when start game butten clicked
startGameButton.addEventListener("click", (e) => {
    //hides overlay
    e.target.parentNode.style.visibility = "hidden";
    //chooses and displays new phrase
    resetGame()
})

//runs checkLetter function when keyboard button is clicked and adds classes to button
keyboard.addEventListener("click", (e) => {
    if (e.target.tagName === 'BUTTON') {
        let button = e.target;
        let letterFound = checkLetter(button)
        button.classList.add("chosen");
        button.setAttribute("disabled", "");
        //changes Heart picture on next scorebaoard li to lost Heart pic
        if (letterFound === null) {
            let tries = document.getElementsByClassName("tries")
            for (i = 0; i < tries.length; i++)
                if (tries[i].firstElementChild.getAttribute("src") === "images/liveHeart.png") {
                    tries[i].firstElementChild.setAttribute("src", "images/lostHeart.png")
                    break
                }
            missed = missed + 1
        }
    }
    //checks if player won or lost after letter selection
    checkWin();
})

