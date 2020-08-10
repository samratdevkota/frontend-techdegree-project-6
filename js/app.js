const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');

const startGameBtn = document.querySelector('.btn__reset');
let missed = 0;
startGameBtn.addEventListener('click',(e)=>{
    e.target.parentNode.style.visibility = "hidden";
});

