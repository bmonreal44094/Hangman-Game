//add this all to an object once I get it finshed
var wins = 0;
var guessesLeft;
var guessesSoFar = [];
var timesRun = 0;
var wordArray = ["universe", "galaxy", "multiverse", "string", "theory"]; //, "membrain", "heavy", "gravity", "black", "hole", "neutron", "star", "gamma", "ray", "burst", "dwarf", "giant", "supergiant", "pulsar", "binary", "red", "brown", "white", "blue", "cepheid"];
var word;
var currentImage = [];
var wordArrayParse = [];
var blank = " _ ";
var hiddenWord = [];
var gameOver = "true";

//Runs when computer lets up on a key and picks a value fromthe alphabet array.
//The compairs the user guess against the computer pick.
document.onkeyup = function(event) {

	// Determines which key was pressed and converts it to lowercase
	var userInput = event.key;
	userInput = userInput.toLowerCase();

	if (gameOver === "true") {
		chooseWord();
		//guessesSoFar.pop();
		}

	chosenYet();

	//Used to take an itinial key stroke and not store it as a guess
	function storeOrNot () {
		if (gameOver === "true") {
			gameOver = "false";
		}

		else {
			guessesSoFar.push(userInput);
			compareLetter();
			guessesLeft--;
		}
	}

	//Choses a word from the wordArray, loads a blank version into hiddenWord
	//and then calles the loadParse function
	function chooseWord () {
		word = wordArray[Math.floor(Math.random() * wordArray.length)];
		guessesLeft = (wordArray.length +1) * 2;
		for (var i = 0; i < word.length; i++) {
			hiddenWord.push(blank);
		}
		loadParse();
	}

	//Determines if the user has chosen a value yet so as not to take duplicates
	function chosenYet () {
		if (guessesSoFar.indexOf(userInput) === -1) {

			//Pushes the userInput into the guessedSoFar array, calls the compareLetter function
			//and dectraments the guessesLeft
			storeOrNot();			
		}

		else {
			//put some message about you choase this already
		}
	}

	//Compares the userInput to the wordArrayParse and if correct splices the value
	//into the hiddenWord Array
	function compareLetter() {
		for (var i = 0; i < wordArrayParse.length; i++) {
			if (userInput === wordArrayParse[i]) {
				hiddenWord.splice(i, 1, userInput);
			}
		}
	}

	//Loads the chosen word into the wordArrayParse letter by letter
	function loadParse() {
		for (var i = 0; i < word.length; i++) {
			var parsedLetter = word.charAt(i);
			wordArrayParse.push(parsedLetter);
		}
	}

	//Refreshes the screen so the current values show
	function refreshScreen() {
		document.querySelector("#wins").innerHTML = wins;
		document.querySelector("#guessesLeft").innerHTML = guessesLeft;
		//displays the contents of these arrays in a clean format
		var resultHiddenWord = "";
		for (i = hiddenWord.length - 1; i > -1; i--) {
			resultHiddenWord = hiddenWord[i] + resultHiddenWord;
		}
		document.querySelector("#currentWord").innerHTML = resultHiddenWord;
		var resultGuessesSoFar = "";
		for (i = guessesSoFar.length - 1; i > -1; i--) {
			resultGuessesSoFar = guessesSoFar[i] + resultGuessesSoFar;
		}
		document.querySelector("#guessesSoFar").innerHTML = resultGuessesSoFar;
		winOrLose();
	}

	//Resets the values on the screen and variables that will change on the new word
	function reset() {
		document.querySelector("#guessesSoFar").innerHTML = "";
		document.querySelector("#guessesLeft").innerHTML = "";
		document.querySelector("#currentWord").innerHTML = "";
		hiddenWord = [];
		wordArrayParse = [];
		guessesSoFar = [];
		gameOver = "true";
	}

	//if player or computer win this gives an alert and calls the reset function
	function winOrLose() {
		if (hiddenWord.indexOf(blank) < 0) {
			//refreshScreen();
			wins++;
			reset();
			document.querySelector("#wins").innerHTML = "You Win Pal!";

		}
		else if (guessesLeft <= 0) {
			reset();
			document.querySelector("#wins").innerHTML = "Sorry, You Lose Pal!";
			chooseWord();
		}
		else if (wins >= 10) {
			reset();
			document.querySelector("#wins").innerHTML = "You Won the Whole Thing Pal!!!";
		}
	}

	refreshScreen();
	
	//Hidden value that lets me know how many times the object ran
	timesRun++;
 }

 	
