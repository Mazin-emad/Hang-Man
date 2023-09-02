//
const letters = "abcdefghijklmnopqrstuvwxyz";

let letterArr = Array.from(letters);
// console.log(letterArr);

// letters container
let lettersContainer = document.querySelector(".letters");
// console.log(lettersContainer);

// Generate letters
letterArr.forEach((letter) => {
  let span = document.createElement("span");

  let letterText = document.createTextNode(letter);

  span.appendChild(letterText);

  span.classList.add("letters-box");

  lettersContainer.appendChild(span);
});

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
    "HTML",
    "CSS",
    "Java",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
    "Lionel Messi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
  BarclonaPleyers: ["Mazin Emad", "Lional Messi", "De Jung"],
};

// Get Random Property
let allKeys = Object.keys(words);

let random = Math.floor(Math.random() * allKeys.length);

// category
let randomKey = allKeys[random];

let randomPropValeu = words[randomKey];

let randomIndx = Math.floor(Math.random() * randomPropValeu.length);

let chosenWord1 = randomPropValeu[randomIndx];

// append the random catgory to the page
document.querySelector(".game-info .category span").innerHTML = randomKey;

// select letter guess container
let guesContainer = document.querySelector(".letter-guess");

let guessLetters = Array.from(chosenWord1);

guessLetters.forEach((letter) => {
  let emteySpan = document.createElement("span");

  if (letter == " ") {
    emteySpan.className = "space";
  }
  guesContainer.appendChild(emteySpan);
});

// select spans
let guessSpans = document.querySelectorAll(".letter-guess span");

// wrong 
let wrongAttempes = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// handel cheking on letters
document.addEventListener("click", (e) => {
  let stat = false;
  if (e.target.className == "letters-box") {
    e.target.classList.add("clicked");

    // get clicked letter
    let clickedletter = e.target.innerHTML.toLowerCase();
    // the chosen word
    let chosenWord2 = Array.from(chosenWord1.toLowerCase());
    chosenWord2.forEach((wordLetter, wordIndex) => {
      if (wordLetter == clickedletter) {
        
        // loop on guess spans
        guessSpans.forEach((span, index)=>{
          if(wordIndex === index){

            stat = true;

            span.innerHTML = clickedletter;
          }
        })
      }
    });
    if(stat !== true){
      wrongAttempes++;
      
      theDraw.classList.add(`wrong-${wrongAttempes}`)

      document.querySelector(".fail").play();
    }else{
      document.querySelector(".success").play();
    }

    if(wrongAttempes == 8){

      lettersContainer.classList.add("finshed")

      endGame()
    }
  }
});

// End Game
function endGame(){
  let end = document.createElement("div");

  let endText = document.createTextNode(`Game Over, The Word Is ${chosenWord1}`);

  end.className = "popup"

end.appendChild(endText);

document.body.append(end)
}