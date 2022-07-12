// Drug of the day
var today = new Date();
var origin = new Date(2022,6,13,0,0,0,0);
var difference = (today - origin);
var days = Math.floor(difference / 864e5);
const answerDrugIndexNumber = randomizedIndexes[days]; /* Array index number of answer */
const answerDrug = drugs[answerDrugIndexNumber]; /* array of answer drug name*/
const printAnswerDrug = listDrugs[answerDrugIndexNumber];

// Drug of the day class and indication
const answerClassIndex = drugClass[answerDrugIndexNumber]; /* answer class in array */
const answerIndicationIndex = drugIndication[answerDrugIndexNumber]; /* answer indication in array */
const answerDosageFormsIndex = drugDosageForms[answerDrugIndexNumber]; /* answer dosage forms in array */
const answerDrugImage = "<img class='images' src='images/answers/index" + answerDrugIndexNumber + "Answer.png'>";
const answerHintImage = "<img class='images' src='images/hints/index" + answerDrugIndexNumber + "Hint.png'>";

if (! localStorage.noFirstVisit) {
    document.getElementById("question-mark-popup").style.display = "block";

    // check this flag for escaping this if block next time
    localStorage.noFirstVisit = "1";
};

if (days > JSON.parse(localStorage.getItem('days'))) {
    localStorage.setItem('winToday', "no");
    localStorage.setItem('tableCounter', 0);
    localStorage.setItem('table',"");
    localStorage.setItem('currentGuess', 1);
    localStorage.setItem('days', days);
};

let tableCounter = JSON.parse(localStorage.getItem('tableCounter'));

// Bar Graph Modal
var modalGraph = document.getElementById("graph-popup");

var btnGraph = document.getElementById("bar-graph");

var closeGraph = document.getElementById("graph-close");

btnGraph.onclick = function() {
	modalGraph.style.display = "block";
}

closeGraph.onclick = function() {
	modalGraph.style.display = "none";
}

// Question Mark Modal
var modalQuestionMark = document.getElementById("question-mark-popup");

var btnQuestionMark = document.getElementById("question-mark");

var closeQuestionMark = document.getElementById("question-close");

btnQuestionMark.onclick = function() {
	modalQuestionMark.style.display = "block";
}

closeQuestionMark.onclick = function() {
	modalQuestionMark.style.display = "none";
}

// Image Hint Modal
var modalImage = document.getElementById("image-hint-popup");

var btnImage = document.getElementById("image-hint");

var closeImage = document.getElementById("image-close");

if (tableCounter === 8 && localStorage.getItem('winToday') === "no") {
	btnImage.onclick = function() {
		modalGameOver.style.display = "block";
	};
	document.getElementById("wrongAnswer").innerHTML =`${printAnswerDrug}` + " was the correct answer";
	} else {
	btnImage.onclick = function() {
		modalImage.style.display = "block";
	}
};
if (localStorage.getItem('winToday') === 'yes') {
	btnImage.onclick = function() {
		modalCorrect.style.display = "block";
	};
	document.getElementById("correctAnswer").innerHTML =`${printAnswerDrug}`;
} else {
	btnImage.onclick = function() {
		modalImage.style.display = "block";
	};
};

closeImage.onclick = function() {
	document.getElementById("image-hint-content-enter").id = "image-hint-content-exit";
	document.getElementById("image-hint-content-exit").addEventListener("animationend", function() {
		document.getElementById("image-hint-content-exit").id = "image-hint-content-enter";
		modalImage.style.display = "none";
	});
}

// Game over modal
var modalGameOver = document.getElementById("game-over-popup");

var closeGameOver = document.getElementById("lose-close");

closeGameOver.onclick = function() {
	document.getElementById("wrong-content-enter").id = "wrong-content-exit";
	document.getElementById("wrong-content-exit").addEventListener("animationend", function() {
		document.getElementById("wrong-content-exit").id = "wrong-content-enter";
		modalGameOver.style.display = "none";
	});
}

// Correct modal
var modalCorrect = document.getElementById("correct-popup");

var closeCorrect = document.getElementById("win-close");

closeCorrect.onclick = function() {
	document.getElementById("correct-content-enter").id = "correct-content-exit";
	document.getElementById("correct-content-exit").addEventListener("animationend", function() {
		document.getElementById("correct-content-exit").id = "correct-content-enter";
		modalCorrect.style.display = "none";
	});
}

// Close Modals By Clicking Outside Of The Modals
window.onclick = function(event) {
	if (event.target == modalQuestionMark) {
		modalQuestionMark.style.display = "none";
	}
	if (event.target == modalGraph) {
		modalGraph.style.display = "none";
	}
	if (event.target == modalImage) {
		modalImage.style.display = "none";
	}
	if (event.target == modalGameOver) {
		modalGameOver.style.display = "none";
	}
	if (event.target == modalCorrect) {
		modalCorrect.style.display = "none";
	}
};

// Return progres
if (JSON.parse(localStorage.getItem('tableCounter')) > 0) {
	document.getElementById('table').innerHTML = JSON.parse(localStorage.getItem('table'));
	document.getElementById("table").style.display = "block";
};
if (JSON.parse(localStorage.getItem('currentGuess')) === null) {
	localStorage.setItem('currentGuess', 1);
}

// open stats page when opening site after winning or directions if first visit
window.onload = function() {
	if (tableCounter === 8 && localStorage.getItem('winToday') === "no") {
		guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Try again tomorrow!";
		modalGraph.style.display = "block";
		btnImage.onclick = function() {
            modalGameOver.style.display = "block";
        };
	};
	if (localStorage.getItem('winToday') === 'yes') {
		modalGraph.style.display = "block";
		guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Great job!";
		btnImage.onclick = function() {
            modalCorrect.style.display = "block";
        };
	};
	document.getElementById("table").scrollTo(0, document.getElementById("table").scrollHeight);
};