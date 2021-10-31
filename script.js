
let wordsList =new Array(30); 
wordsList[0] = 'revise';
wordsList[1] = 'rock';
wordsList[2] = 'jump';
wordsList[3] = 'excavate';
wordsList[4] = 'mature';
wordsList[5] = 'leadership';
wordsList[6] = 'ignorance';
wordsList[7] = 'carry';
wordsList[8] = 'peak';
wordsList[9] = 'bake';
wordsList[10] = 'identification';
wordsList[11] = 'tongue';
wordsList[12] = 'adoption';
wordsList[13] = 'tribe';
wordsList[14] = 'meaning';
wordsList[15] = 'necklace';
wordsList[16] = 'highway';
wordsList[17] = 'jealous';
wordsList[18] = 'parade';
wordsList[19] = 'inspire';
wordsList[20] = 'terrify';
wordsList[21] = 'liberal';
wordsList[22] = 'aeroplane';
wordsList[23] = 'football';
wordsList[24] = 'closet';
wordsList[25] = 'restroom';
wordsList[26] = 'diamond';
wordsList[27] = 'guitar';
wordsList[28] = 'pressure';
wordsList[29] = 'however';




let words = 0;
let guessedWords = 0;
let guessedLetters = 0;
let streak = 0;
let points = 0;
let pointsToWin = 2;
let wordToGuess = '';
let modifiedWord = '';
let wordSize = 0;
let wrongLetters = 0;
let finalRound = false;



const createKeyboard = () =>{
	 for(let i=65,j=-1;i<91;i++){
		 const newDiv = document.createElement("div"); 
		 const newP = document.createElement('P');
		 newDiv.className = "key";
		 newDiv.setAttribute('id', i);
		 newDiv.addEventListener('click', function(){ readTheKeyPressed(j)});
		 let node = document.createTextNode( String.fromCharCode(i));
		 newP.appendChild(node);
		 newDiv.appendChild(newP);
		 document.getElementById("keyboard").appendChild(newDiv); 
		 j++;
	}
}

const readTheKeyPressed = (l) =>{
	const keyboard = document.getElementById('keyboard');
	const children = keyboard.children[l];
	const currentLetter = children.innerText;

	if(!isPressed(l)){
		isLetterInWord(wordToGuess, currentLetter);
	}

	else{
		playSound("wrong");
	}
	
	
} 



const showTheMan = (element, property)  => {
	switch(element){
		case 1:
			document.getElementById("head").style.visibility = property;
			break;

		case 2:
			document.getElementById("body").style.visibility = property
			break;

		case 3:
			document.getElementById("rightHand").style.visibility = property;
			break;

		case 4:
			document.getElementById("leftHand").style.visibility = property;
			break;

		case 5:
			document.getElementById("rightLeg").style.visibility = property;
			break;

		case 6:
			document.getElementById("leftLeg").style.visibility = property;;
			break;

		default:
			break;	

	}
	
}

const displayWordPattern = (word ) => {
	let node = '';
	for(let i=0; i<word.length; i++){
		 const newDiv = document.createElement("div");
		 const newP = document.createElement('P') 
		 newDiv.className = "letter";
		 node = document.createTextNode('_');	
		 newP.appendChild(node);
		 newDiv.appendChild(newP);
		 document.getElementById("word").appendChild(newDiv); 
	}
}



const isLetterInWord = (word, letter) =>{
	let found = false;
	for(let i=0; i<word.length; i++){
		if(letter === word[i]){
			document.getElementsByClassName("letter")[i].innerHTML = `<p>${letter.toUpperCase()}</p>`;
			document.getElementById(letter.charCodeAt()).style.backgroundColor = "green";
			modifiedWord = modifiedWord.substring(0, i) + '-' + modifiedWord.substring(i + 1);
			found = true;
			guessedLetters++;
		}
	}
	if(!found){
		document.getElementById(letter.charCodeAt()).style.backgroundColor = "red";
		wrongLetters++;
		showTheMan(wrongLetters,"visible");

		if(wrongLetters === 7){
			streak = 0;
			finalRound = true;
		}
		playSound("incorrect"); 
	}

	else{
		playSound("correct");
		if(guessedLetters === wordSize ){
			guessedWords++;
			points += pointsToWin;
			streak++;
			finalRound = true;
			playSound("victory");
			
		}

	}

	if(finalRound){
		words++;
		wrongLetters = 0;
		guessedLetters = 0 ;
		finalRound = false;
		revealTheWord(wordToGuess);
		setTimeout(newRound, 3000);

	}
}

const deleteAllChildrenFromParent = id =>{
	const parent = document.getElementById(id);
        var child = parent.lastElementChild;  
        while (child) { 
            parent.removeChild(child); 
            child = parent.lastElementChild; 

        } 
}


const nextRound = () =>{
	for(let i=1; i<=6;i++){
		showTheMan(i, "hidden");
	}
    deleteAllChildrenFromParent("keyboard");
    deleteAllChildrenFromParent("word");

}

const revealTheWord = word =>{
	for(let i=0; i< word.length; i++){
		document.getElementsByClassName("letter")[i].innerHTML = `<p>${word[i].toUpperCase()}</p>`;
	}
}

const displayScore = () =>{
	 const score = document.getElementById("score");
	 score.children[1].innerText = `${guessedWords}/${words} words`;
	 score.children[2].innerText = `${points} points`;
	 score.children[3].innerText = `streak:${streak}`;
	
	
}

const playSound = select =>{
	switch(select){
		case "correct":
			document.getElementById("correct").play();
			break;

		case "incorrect":
			document.getElementById("incorrect").play();
			break;

		case "wrong":
			document.getElementById("wrong").play();
			break;

		case "victory":
			document.getElementById("victory").play();
			break;

		default:
			break;	


	}
}

const isPressed = button =>document.getElementById(button+65).style.backgroundColor === "green" || 
						   document.getElementById(button+65).style.backgroundColor === "red" ? true : false;



const initializeParameters = () =>{
	wordToGuess = wordsList[Math.floor(Math.random()*wordsList.length)].toUpperCase();
	modifiedWord = wordToGuess;
	wordSize = wordToGuess.length;
	pointsToWin = 2;
	document.getElementById("hint").disabled = false;
	document.getElementById("hint").style.cursor = "pointer";
	if(streak>0 && streak%5 === 0){
		points +=5;
	}
}

const useHint = () =>{
	let l ='-'
	while(l === '-'){
		l = modifiedWord[Math.floor(Math.random()* modifiedWord.length)];
		console.log(l);
	}
	pointsToWin--;
	if(pointsToWin === 0){
		document.getElementById("hint").disabled = true;
		document.getElementById("hint").style.cursor = "not-allowed";
	}
	isLetterInWord( wordToGuess,l);	


} 

const newRound = () =>{
	nextRound();
	Init();
}

const Init = () =>{
	createKeyboard();
	initializeParameters();
	displayWordPattern(wordToGuess); 
	displayScore();
}

const resetGame = () =>{
	words = 0;
	guessedWords = 0;
    guessedLetters = 0;
	streak = 0;
	points = 0;
	pointsToWin = 2;
	wrongLetters = 0;
	finalRound = false;
	newRound();
}


Init();













