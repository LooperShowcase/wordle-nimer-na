let chars = 5;
let words = 6;

let gameDiv = document.getElementById("game");

for (let j = 0; j < words; j++) {
  let wordsDiv = document.createElement("div");
  wordsDiv.className = "word";
  for (let i = 0; i < chars; i++) {
    let charDiv = document.createElement("div");
    charDiv.className = "letter";
    wordsDiv.appendChild(charDiv);
  }
  gameDiv.appendChild(wordsDiv);
}

let curWord = 0;
let curChar = 0;
let heading = document.getElementById("heading");

document.addEventListener("keydown", async function (event) {
  let wordDiv = gameDiv.children[curWord];
  if (event.code == "Backspace") {
    let charToDel = wordDiv.children[curChar - 1];
    charToDel.innerHTML = "";
    curChar--;
  } else if (curChar < chars && isLetter(event.key)) {
    let charArr = wordDiv.children[curChar];
    charArr.innerHTML = event.key;
    curChar++;
  }
  if (curChar === 5 && event.code == "Enter") {
    animateCSS(wordDiv, "bounceIn");
    const word = getCurrentWord();
    const result = await (await fetch("/wordle/" + word)).json();
    for (let i = 0; i < result.length; i++) {
      wordDiv.children[i].style.background = result[i];
    }
    curWord++;
    curChar = 0;
  }
});
function getCurrentWord() {
  let word = "";
  let wordDiv = gameDiv.children[curWord];
  for (let i = 0; i < chars; i++) {
    let charDiv = wordDiv.children[i];
    word = word + charDiv.innerHTML;
  }
  return word;
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

const animateCSS = (element, animation, prefix = "animate__") =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });

animateCSS("charDiv", "animate__flipInX");
//animateCSS("charDiv", "animate__bounceIn");
//animateCSS("charDiv", "animate__bounceIn");
