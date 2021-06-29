// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let wordToScore = ""

function initialPrompt() {
  wordToScore = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   return wordToScore
};

function simpleScore (word) {
  word = word.toUpperCase();
  simpleScoreArray = word.split('');
  scrabblePoints = simpleScoreArray.length

  return scrabblePoints
};  

function vowelBonusScore (word) {
  word = word.toUpperCase();
  vowelBonusScoreArray = word.split('');
  scrabblePoints= 0
  for (let i = 0; i < vowelBonusScoreArray.length; i++) {
    if (vowelBonusScoreArray[i] === 'A', 'E', 'I', 'O', 'U') {
      scrabblePoints += 3
    } else {
      scrabblePoints += 1
    }
  }
  return scrabblePoints
};

function scrabbleScore (word) {
  word = word.toLowerCase();
  scrabblePoints = 0;
  for (let i = 0; i < word.length; i++) {
    scrabblePoints += newPointStructure[word[i]];
  }
  return scrabblePoints;
};

let simpleScoreObj = {
  name: 'Simple Score',
  description: "Each letter is worth 1 point.",
  scoringFunction: simpleScore
};
  
let vowelBonusScoreObj = {
  name: "Bonus Vowels",
  description: "Vowels are 3 points.",
  scoringFunction: vowelBonusScore
}

let scrabbleScoreObj = {
  name: "Scrabble",
  description: "Uses scrabble point system.",
  scoringFunction: scrabbleScore
}

const scoringAlgorithms = [simpleScoreObj, vowelBonusScoreObj, scrabbleScoreObj]

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?\n\n");
  for(let i = 0; i<scoringAlgorithms.length; i++){
    console.log(`${i} – ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
  }
  scorerPromptToScore = input.question("Enter 0, 1, or 2: ");
  scorerPromptToScore = Number(scorerPromptToScore)
  console.log (`Score for '${wordToScore}': ${scoringAlgorithms[scorerPromptToScore].scoringFunction(wordToScore)}`)
} 

function transform(pointStructure) {
  let newPointStructure = {};
  for (key in pointStructure) {
    for (let i = 0; i < pointStructure[key].length; i++) {
      let letters = pointStructure[key][i];
      letters = letters.toLowerCase();
      newPointStructure[`${letters}`] = Number(key);
    };
  };
  return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[" "] = 0;

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

