const log = console.log;

function game() {
    // Word Options
    let words = ['cat', 'gorilla', 'turtle', 'bird', 'common'];
    // let words = ['cat', 'gorilla'];

    let wordChosen = '';
    let lettersKeyed = [];
    let underscores = [];
    let gameWon = false;
    let addingLastLetter = true;

    let tries = 10;
    let wins = 0;

    updateScoreTable();

    // display scores
    function updateScoreTable() {
        $('.tries_counter').text(tries);
        $('.wins_counter').text(wins);
    }

    // Chooses a random word for me
    function randomWord(array) {
        const word = Math.floor((Math.random() * array.length))
        return array[word];
    }

    // displaying underscores
    function displayUnderscores(word) {
        log(`Word: ${word}`);
        lettersKeyed = [];
        wordChosen = word;
        underscores = [];

        if (!gameWon && words.length !== 0) {
            for (let i = 0; i < word.length; i++) {
                underscores.push('_');
            }
        }
        $('p.underscores').text(underscores.join(' '));
    }

    // displaying underscores for the total underscore total 
    if (words.length !== 0 && !gameWon) {
        displayUnderscores(randomWord(words));
    }

    // $("#hi").keypress(function(e) {
        
    // });

    document.addEventListener('keypressed', e => {
        var charTyped = String.fromCharCode(e.which);
        if (/[a-z\d]/i.test(charTyped)) {
            alert("Letter or number typed: " + charTyped);
        }
    })
    // Keyup - allows to access key value
    document.addEventListener('keyup', function (e) {
        var indexOfLetter = '';
        log(`Key pressed: ${e.key}`);
        log('--------------------------');

        // If there is a letter that exists that the user chooses then make letter appear in the correct spot
        if (wordChosen.indexOf(e.key) >= 0) {
            indexOfLetter = wordChosen.indexOf(e.key);

            // display any duplicate letters in the chosen word
            for (let i = 0; i < wordChosen.length; i++) {
                if (e.key == wordChosen[i]) {
                    underscores[i] = e.key;
                }
            }
            $('p.underscores').text(underscores.join(' '));

            // add to wins total if there are no underscores in underscore array
            if (underscores.indexOf('_') === -1) {
                wins++;
                updateScoreTable();

                let newWordsList = [];
                words.forEach((word, index) => {
                    // if the word chosen does not equal the word in the words List then push it to the newWordsList array
                    if (wordChosen !== word) {
                        newWordsList.push(word)
                    }
                });

                words = newWordsList;
                if (!gameWon) {
                    displayUnderscores(randomWord(words));
                }
                addingLastLetter = false;

                if (words.length === 0) {
                    alert(`You've won the game!`);
                    gameWon = true;
                }
            }

            // This letter is not in the word && it already has been choosen
        } else if (wordChosen.indexOf(e.key) === -1 && lettersKeyed.indexOf(e.key) === -1) {
            tries--;
            alert(`This letter is not in the word. Choose another letter!`);


            if (tries === 0) {
                // lettersKeyed = [];
                if (!gameWon) {
                    displayUnderscores(randomWord(words));
                }
                alert('Guess this new word!')
            }
            updateScoreTable();
        }


        // Track letters keyed
        trackLetters(e.key);


        // addingLastLetter = true;

    })

    function trackLetters(letter_keyed) {
        // If letter does not exist in letters keyed array then add it/ else tell them to pick another letter
        if (lettersKeyed.indexOf(letter_keyed) === -1) {
            if (addingLastLetter) {
                lettersKeyed.unshift(letter_keyed);
            }
            addingLastLetter = true;
        } else {
            alert(`The letter has been choosen. Pick another letter.`);
        }
        $('.letters_keyed').text(lettersKeyed.join(' '));
    }

}

$(document).ready(function () {
    game();
})