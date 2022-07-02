// HTML naming
var table = document.getElementById("table");
var tableBody = document.getElementById("tableBody");
var guessArea = document.getElementById("type-guess");
var currentGuess = JSON.parse(localStorage.getItem('currentGuess'));
let gamesPlayed = JSON.parse(localStorage.getItem('gamesPlayed'));
let gamesWon = JSON.parse(localStorage.getItem('gamesWon'));
let currentStreak = JSON.parse(localStorage.getItem('currentStreak'));
let winPercentage = gamesWon / gamesPlayed * 100;
let maxStreak = JSON.parse(localStorage.getItem('maxStreak'));
let oneGuess = JSON.parse(localStorage.getItem('oneGuess'));
let twoGuesses = JSON.parse(localStorage.getItem('twoGuesses'));
let threeGuesses = JSON.parse(localStorage.getItem('threeGuesses'));
let fourGuesses = JSON.parse(localStorage.getItem('fourGuesses'));
let fiveGuesses = JSON.parse(localStorage.getItem('fiveGuesses'));
let sixGuesses = JSON.parse(localStorage.getItem('sixGuesses'));
let sevenGuesses = JSON.parse(localStorage.getItem('sevenGuesses'));
let eightGuesses = JSON.parse(localStorage.getItem('eightGuesses'));
guessArea.placeholder = "Guess " + `${currentGuess}` + " of 8";

function checkGuess() {
    let guess = guessArea.value;
    let guessIndexNumber = listDrugs.indexOf(guess); /* Array index number of guess */
    let guessDrug = drugs[guessIndexNumber]; /* array of guess drug name */
    let spannedGuessDrug = guessDrug.slice(0); /* copy of guessDrug array to span matches */
    let guessClass = drugClass[guessIndexNumber]; /* array of guess drug class */
    let spannedGuessClass = guessClass.slice(0); /* copy of guessClass array to span matches */
    let guessIndication = drugIndication[guessIndexNumber]; /* array of guess drug indication */
    let spannedGuessIndication = guessIndication.slice(0); /* copy of guessIndication array to span matches */
    let guessDosageForms = drugDosageForms[guessIndexNumber]; /*array of guess dosage forms */
    let spannedGuessDosageForms = guessDosageForms.slice(0); /* copy of guessDosageForms array to span matches */
    let row = document.getElementById("row-" + `${currentGuess}`);
    let columnGuess = document.getElementById("nameCell-" + `${currentGuess}`);
    let columnClass = document.getElementById("classCell-" + `${currentGuess}`);
    let columnIndication = document.getElementById("indicationCell-" + `${currentGuess}`);
    let columnDosageForms = document.getElementById("dosageFormsCell-" + `${currentGuess}`);
    
        // check drug match, color
    function colorDrugColumn() {
            for(let i = 0; i < answerDrug.length; i++) {
                for(let j = 0; j < guessDrug.length; j++) {
                    if (answerDrug[i] === guessDrug[j] && answerDrug[i] !== "/ " && guessDrug[j] !== "/ " && answerDrug[i] !== " " && guessDrug[j] !== " ") {
                        columnGuess.style.backgroundColor = "#FFFF00";
                        spannedGuessDrug.splice(j, 1, '<span class="match">' + guessDrug[j] + '</span>')
                        columnGuess.innerHTML = spannedGuessDrug.join("");
                        row.style.display = "table-row"
                    } else {
                        columnGuess.innerHTML = spannedGuessDrug.join("");
                        row.style.display = "table-row"
                    }
                }
            }
        }
        //check class match, color
        function colorClassColumn() {
                for(let i = 0; i < answerClassIndex.length; i++) {
                    for(let j = 0; j < guessClass.length; j++) {
                        if (answerClassIndex[i] === guessClass[j] && answerClassIndex[i] !== "/ " && guessClass[j] !== "/ " && answerClassIndex[i] !== " " && guessClass[j] !== " " && answerClassIndex[i] !== "-" && guessClass[j] !== "-" && answerClassIndex[i] !== "Blocker" && guessClass[j] !== "Blocker" && answerClassIndex[i] !== "Antagonist" && guessClass[j] !== "Antagonist" && answerClassIndex[i] !== "Agonist" && guessClass[j] !== "Agonist") {
                            columnClass.style.backgroundColor = "#FFFF00";
                            spannedGuessClass.splice(j, 1, '<span class="match">' + guessClass[j] + '</span>')
                            columnClass.innerHTML = spannedGuessClass.join("");
                            tableBody.appendChild(row);
                        } else {
                            columnClass.innerHTML = spannedGuessClass.join("");
                            tableBody.appendChild(row);
                        }
                    }
                }
            }
        //check indication match, color
        function colorIndicationColumn() {
                for(let i = 0; i < answerIndicationIndex.length; i++) {
                    for(let j = 0; j < guessIndication.length; j++) {
                        if (answerIndicationIndex[i] === guessIndication[j] && answerIndicationIndex[i] !== ", " && guessIndication[j] !== ", " && answerIndicationIndex[i] !== " " && guessIndication[j] !== " " && answerIndicationIndex[i] !== "/ " && guessIndication[j] !== "/ ") {
                            columnIndication.style.backgroundColor = "#FFFF00";
                            spannedGuessIndication.splice(j, 1, '<span class="match">' + guessIndication[j] + '</span>')
                            columnIndication.innerHTML = spannedGuessIndication.join("");
                            tableBody.appendChild(row);
                        } else {
                            columnIndication.innerHTML = spannedGuessIndication.join("");
                            tableBody.appendChild(row);
                        }
                    }
                }
            }
        // check dosage form match, color
        function colorDosageFormsColumn() {
                for(let i = 0; i < answerDosageFormsIndex.length; i++) {
                    for(let j = 0; j < guessDosageForms.length; j++) {
                        if (answerDosageFormsIndex[i] === guessDosageForms[j]) {
                            columnDosageForms.style.backgroundColor = "#FFFF00";
                            spannedGuessDosageForms.splice(j, 1, '<span class="match">' + guessDosageForms[j] + '</span>')
                            columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
                            tableBody.appendChild(row);
                        } else {
                            columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
                            tableBody.appendChild(row);
                        }
                    }
                }
            };
    if (answerDrug === guessDrug) { /* win */
        modalCorrect.style.display = "block";
        guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Great job!";
        document.getElementById("correctAnswer").innerHTML =`${printAnswerDrug}`;
        gamesPlayed++;
        gamesWon++;
        currentStreak++;
        currentGuessMax();
        localStorage.setItem('gamesPlayed', gamesPlayed);
        localStorage.setItem('gamesWon', gamesWon);
        localStorage.setItem('currentStreak', currentStreak);
        if (currentGuess === 1) {
            oneGuess++;
            localStorage.setItem('oneGuess', oneGuess);
            document.getElementById("one").innerHTML = oneGuess;
        } else if (currentGuess === 2) {
            twoGuesses++;
            localStorage.setItem('twoGuesses', twoGuesses);
            document.getElementById("two").innerHTML = twoGuesses;
        } else if (currentGuess === 3) {
            threeGuesses++;
            localStorage.setItem('threeGuesses', threeGuesses);
            document.getElementById("three").innerHTML = threeGuesses;
        } else if (currentGuess === 4) {
            fourGuesses++;
            localStorage.setItem('fourGuesses', fourGuesses);
            document.getElementById("four").innerHTML = fourGuesses;
        } else if (currentGuess === 5) {
            fiveGuesses++;
            localStorage.setItem('fiveGuesses', fiveGuesses);
            document.getElementById("five").innerHTML = fiveGuesses;
        } else if (currentGuess === 6) {
            sixGuesses++;
            localStorage.setItem('sixGuesses', sixGuesses);
            document.getElementById("six").innerHTML = sixGuesses;
        } else if (currentGuess === 7) {
            sevenGuesses++;
            localStorage.setItem('sevenGuesses', sevenGuesses);
            document.getElementById("seven").innerHTML = sevenGuesses;
        } else if (currentGuess === 8) {
            eightGuesses++;
            localStorage.setItem('eightGuesses', eightGuesses);
            document.getElementById("eight").innerHTML = eightGuesses;
        }
        record();
        document.getElementById("games-played").innerHTML = JSON.parse(localStorage.getItem('gamesPlayed'));
        document.getElementById("current-streak").innerHTML = currentStreak;
        document.getElementById("max-streak").innerHTML = JSON.parse(localStorage.getItem('maxStreak'));
        document.getElementById("win-percentage").innerHTML = (gamesWon / gamesPlayed * 100).toPrecision(3) + "%";
        graphHeights();
        columnGuess.style.backgroundColor = "#00B140";
        columnGuess.innerHTML = spannedGuessDrug.join("");
        columnGuess.style.fontWeight = "bolder";
        columnClass.style.backgroundColor = "#00B140";
        columnClass.innerHTML = spannedGuessClass.join("");
        columnClass.style.fontWeight = "bolder";
        columnIndication.style.backgroundColor = "#00B140";
        columnIndication.innerHTML = spannedGuessIndication.join("");
        columnIndication.style.fontWeight = "bolder";
        columnDosageForms.style.backgroundColor = "#00B140";
        columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
        columnDosageForms.style.fontWeight = "bolder";
        tableBody.appendChild(row);
        row.style.display = "table-row";
        btnImage.onclick = function() {
            modalCorrect.style.display = "block";
        };
        localStorage.setItem('winToday', 'yes');
    } else if (currentGuess === 8) { /* lose */
        modalGameOver.style.display = "block";
        guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Try again tomorrow!";
        document.getElementById("wrongAnswer").innerHTML =`${printAnswerDrug}` + " was the correct answer";
        gamesPlayed++;
        localStorage.setItem('gamesPlayed', gamesPlayed);
        localStorage.setItem('currentStreak', 0);
        record();
        document.getElementById("games-played").innerHTML = JSON.parse(localStorage.getItem('gamesPlayed'));
        document.getElementById("current-streak").innerHTML = 0;
        document.getElementById("max-streak").innerHTML = JSON.parse(localStorage.getItem('maxStreak'));
        document.getElementById("win-percentage").innerHTML = (gamesWon / gamesPlayed * 100).toPrecision(3) + "%";
        colorDrugColumn();
        colorClassColumn();
        colorIndicationColumn();
        colorDosageFormsColumn();
        columnGuess.innerHTML = spannedGuessDrug.join("");
        columnClass.innerHTML = spannedGuessClass.join("");
        columnIndication.innerHTML = spannedGuessIndication.join("");
        columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
        tableBody.appendChild(row);
        currentGuessMax();
        btnImage.onclick = function() {
            modalGameOver.style.display = "block";
        };
    } else { /* use a guess and go to next turn */
        currentGuess++;
        guessArea.placeholder = "Guess " + `${currentGuess}` + " of 8";
        guessArea.value = "";
        colorDrugColumn();
        if (JSON.stringify(answerClassIndex) === JSON.stringify(guessClass)) {
            columnClass.style.backgroundColor = "#00B140";
            columnClass.innerHTML = spannedGuessClass.join("");
            columnClass.style.fontWeight = "bolder";
            tableBody.appendChild(row);
        } else {
            colorClassColumn();
        }
        if (JSON.stringify(answerIndicationIndex) === JSON.stringify(guessIndication)) {
            columnIndication.style.backgroundColor = "#00B140";
            columnIndication.innerHTML = spannedGuessIndication.join("");
            columnIndication.style.fontWeight = "bolder";
            tableBody.appendChild(row);
        } else {
           colorIndicationColumn();
        }
        if (JSON.stringify(answerDosageFormsIndex) === JSON.stringify(guessDosageForms)) {
            columnDosageForms.style.backgroundColor = "#00B140";
            columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
            columnDosageForms.style.fontWeight = "bolder";
            tableBody.appendChild(row);
        } else {
           colorDosageFormsColumn();
        }
        currentGuessMax();
    }
    table.style.display = "block";
    table.scrollTo(0, table.scrollHeight);
    if (tableCounter < 9) {
        tableCounter++;
        localStorage.setItem('tableCounter',tableCounter);
    };
    }

/* enter to select */ guessArea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && listDrugs.includes(guessArea.value)) {
        checkGuess(e);
    }
})

/* click to select */ document.getElementById("awesomplete_list_1").onclick = function() {
    if (listDrugs.includes(guessArea.value)) {
        checkGuess();
    }
}

// Display Statistics
document.getElementById("games-played").innerHTML = gamesPlayed;
document.getElementById("current-streak").innerHTML = currentStreak;
document.getElementById("max-streak").innerHTML = maxStreak;
document.getElementById("win-percentage").innerHTML = winPercentage.toPrecision(3) + "%";
document.getElementById("one").innerHTML = oneGuess;
document.getElementById("two").innerHTML = twoGuesses;
document.getElementById("three").innerHTML = threeGuesses;
document.getElementById("four").innerHTML = fourGuesses;
document.getElementById("five").innerHTML = fiveGuesses;
document.getElementById("six").innerHTML = sixGuesses;
document.getElementById("seven").innerHTML = sevenGuesses;
document.getElementById("eight").innerHTML = eightGuesses;

function currentStreakToZero() {
    if (currentStreak === null) {
        localStorage.setItem('currentStreak', 0);
        document.getElementById("current-streak").innerHTML = 0;
    }
}

function gamesPlayedToZero() {
    if (gamesPlayed === null || gamesPlayed === 0) {
        localStorage.setItem('gamesPlayed', 0);
        document.getElementById("games-played").innerHTML = 0;
        document.getElementById("win-percentage").innerHTML = 0 + "%";
    }
}

function gamesWonToZero() {
    if (gamesWon === null) {
        localStorage.setItem('gamesWon', 0);
    }
}

function maxStreakToZero() {
    if (maxStreak === null) {
        localStorage.setItem('maxStreak', 0);
        document.getElementById("max-streak").innerHTML = 0;
    }
}

function record() {
    if (currentStreak > maxStreak) {
        localStorage.setItem('maxStreak', currentStreak);
        localStorage.getItem('maxStreak');
    }
}

function guessesTrackToZero() {
    if (oneGuess === null || oneGuess === 0) {
        localStorage.setItem('oneGuess', 0);
        document.getElementById("one").innerHTML = 0;
    };
    if (twoGuesses === null || twoGuesses === 0) {
        localStorage.setItem('twoGuesses', 0);
        document.getElementById("two").innerHTML = 0;
    };
    if (threeGuesses === null || threeGuesses === 0) {
        localStorage.setItem('threeGuesses', 0);
        document.getElementById("three").innerHTML = 0;
    };
    if (fourGuesses === null || fourGuesses === 0) {
        localStorage.setItem('fourGuesses', 0);
        document.getElementById("four").innerHTML = 0;
    };
    if (fiveGuesses === null || fiveGuesses === 0) {
        localStorage.setItem('fiveGuesses', 0);
        document.getElementById("five").innerHTML = 0;
    };
    if (sixGuesses === null || sixGuesses === 0) {
        localStorage.setItem('sixGuesses', 0);
        document.getElementById("six").innerHTML = 0;
    };
    if (sevenGuesses === null || sevenGuesses === 0) {
        localStorage.setItem('sevenGuesses', 0);
        document.getElementById("seven").innerHTML = 0;
    };
    if (eightGuesses === null || eightGuesses === 0) {
        localStorage.setItem('eightGuesses', 0);
        document.getElementById("eight").innerHTML = 0;
    };
}

// Change heights of bar graphs
function graphHeights() {
        let oneHeight = JSON.parse(localStorage.getItem('oneGuess'));
        let twoHeight = JSON.parse(localStorage.getItem('twoGuesses'));
        let threeHeight = JSON.parse(localStorage.getItem('threeGuesses'));
        let fourHeight = JSON.parse(localStorage.getItem('fourGuesses'));
        let fiveHeight = JSON.parse(localStorage.getItem('fiveGuesses'));
        let sixHeight = JSON.parse(localStorage.getItem('sixGuesses'));
        let sevenHeight = JSON.parse(localStorage.getItem('sevenGuesses'));
        let eightHeight = JSON.parse(localStorage.getItem('eightGuesses'));
        var fullBar = Math.max(oneHeight, twoHeight, threeHeight, fourHeight, fiveHeight, sixHeight, sevenHeight, eightHeight);
        // guess one bar
        if (oneHeight === fullBar) {
            document.getElementById("oneGuess").style.height = "100%";
            document.getElementById("one").style.position = "absolute";
        } else if (oneHeight > 0 && oneHeight !== fullBar) {
            document.getElementById("oneGuess").style.height = oneHeight / fullBar * 100 + "%";
            document.getElementById("one").style.position = "absolute";
        } else {
            document.getElementById("oneGuess").style.height = "3.5vh";
            document.getElementById("one").style.position = "absolute";
        };
        // guess two bar
        if (twoHeight === fullBar) {
            document.getElementById("twoGuess").style.height = "100%";
            document.getElementById("two").style.position = "absolute";
        } else if (twoHeight > 0 && twoHeight !== fullBar) {
            document.getElementById("twoGuess").style.height = twoHeight / fullBar * 100 + "%";
            document.getElementById("two").style.position = "absolute";
        } else {
            document.getElementById("twoGuess").style.height = "3.5vh";
            document.getElementById("two").style.position = "absolute";
        };
        // guess three bar
        if (threeHeight === fullBar) {
            document.getElementById("threeGuess").style.height = "100%";
            document.getElementById("three").style.position = "absolute";
        } else if (threeHeight > 0 && threeHeight !== fullBar) {
            document.getElementById("threeGuess").style.height = threeHeight / fullBar * 100 + "%";
            document.getElementById("three").style.position = "absolute";
        } else {
            document.getElementById("threeGuess").style.height = "3.5vh";
            document.getElementById("three").style.position = "absolute";
        };
        // guess four bar
        if (fourHeight === fullBar) {
            document.getElementById("fourGuess").style.height = "100%";
            document.getElementById("four").style.position = "absolute";
        } else if (fourHeight > 0 && fourHeight !== fullBar) {
            document.getElementById("fourGuess").style.height = fourHeight / fullBar * 100 + "%";
            document.getElementById("four").style.position = "absolute";
        } else {
            document.getElementById("fourGuess").style.height = "3.5vh";
            document.getElementById("four").style.position = "absolute";
        };
        // guess five bar
        if (fiveHeight === fullBar) {
            document.getElementById("fiveGuess").style.height = "100%";
            document.getElementById("five").style.position = "absolute";
        } else if (fiveHeight > 0 && fiveHeight !== fullBar) {
            document.getElementById("fiveGuess").style.height = fiveHeight / fullBar * 100 + "%";
            document.getElementById("five").style.position = "absolute";
        } else {
            document.getElementById("fiveGuess").style.height = "3.5vh";
            document.getElementById("five").style.position = "absolute";
        };
        // guess six bar
        if (sixHeight === fullBar) {
            document.getElementById("sixGuess").style.height = "100%";
            document.getElementById("six").style.position = "absolute";
        } else if (sixHeight > 0 && sixHeight !== fullBar) {
            document.getElementById("sixGuess").style.height = sixHeight / fullBar * 100 + "%";
            document.getElementById("six").style.position = "absolute";
        } else {
            document.getElementById("sixGuess").style.height = "3.5vh";
            document.getElementById("six").style.position = "absolute";
        };
        // guess seven bar
        if (sevenHeight === fullBar) {
            document.getElementById("sevenGuess").style.height = "100%";
            document.getElementById("seven").style.position = "absolute";
        } else if (sevenHeight > 0 && sevenHeight !== fullBar) {
            document.getElementById("sevenGuess").style.height = sevenHeight / fullBar * 100 + "%";
            document.getElementById("seven").style.position = "absolute";
        } else {
            document.getElementById("sevenGuess").style.height = "3.5vh";
            document.getElementById("seven").style.position = "absolute";
        };
        // guess eight bar
        if (eightHeight === fullBar) {
            document.getElementById("eightGuess").style.height = "100%";
            document.getElementById("eight").style.position = "absolute";
        } else if (eightHeight > 0 && eightHeight !== fullBar) {
            document.getElementById("eightGuess").style.height = eightHeight / fullBar * 100 + "%";
            document.getElementById("eight").style.position = "absolute";
        } else {
            document.getElementById("eightGuess").style.height = "3.5vh";
            document.getElementById("eight").style.position = "absolute";
        };
        if (oneHeight === 0 && twoHeight === 0 && threeHeight === 0 && fourHeight === 0 && fiveHeight === 0 && sixHeight === 0 && sevenHeight === 0 && eightHeight === 0) {
            document.getElementById("oneGuess").style.height = "3.5vh";
            document.getElementById("twoGuess").style.height = "3.5vh";
            document.getElementById("threeGuess").style.height = "3.5vh";
            document.getElementById("fourGuess").style.height = "3.5vh";
            document.getElementById("fiveGuess").style.height = "3.5vh";
            document.getElementById("sixGuess").style.height = "3.5vh";
            document.getElementById("sevenGuess").style.height = "3.5vh";
            document.getElementById("eightGuess").style.height = "3.5vh";
        };
}

function addPicturesIn() {
    document.getElementById("correct-answer-image").innerHTML = answerDrugImage;
    document.getElementById("wrong-answer-image").innerHTML = answerDrugImage;
    document.getElementById("image-blur").innerHTML = answerHintImage;
};

function currentGuessMax() {
    if (currentGuess <= 8) {
        localStorage.setItem('currentGuess', currentGuess);
    };
}

function tableCounterFix() {
    if (localStorage.getItem('tableCounter') === null) {
        localStorage.setItem('tableCounter', 0);
    };
};

function whereAt() {
    if (tableCounter === 8 && localStorage.getItem('winToday') === "no") {
        guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Try again tomorrow!";
    };
    if (localStorage.getItem('winToday') === "yes") {
        guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Great job!";
    };
}

function fixWinToday() {
    if (localStorage.getItem('winToday') === null) {
        localStorage.setItem('winToday',"no");
    };
};

// house cleaning functions
graphHeights();
currentStreakToZero();
maxStreakToZero();
gamesPlayedToZero();
gamesWonToZero();
guessesTrackToZero();
addPicturesIn();
fixWinToday();
tableCounterFix();
whereAt();
