const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGameBtn = document.querySelector('.btn__reset');
let missed = 0;

const phrases = [
    "A blessing in disguise",
    "A dime a dozen",
    "Beat around the bush",
    "Better late than never",
    "A Piece of Cake"
];

function getRandomPhraseAsArray(arr){
    const randomNumber = Math.floor(Math.random() * (arr.length));
    const randomPhrase = arr[randomNumber];
    const characterArray = randomPhrase.split(" ");
    return characterArray;
}

startGameBtn.addEventListener('click',(e)=>{
    e.target.parentNode.style.visibility = "hidden";
});

