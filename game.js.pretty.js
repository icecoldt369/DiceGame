// let playGameStage = false;
let answer = "";
let numberOfDice = 0;
let rounds = 0;
let rollDices = false;
let totalPoint = 0;
let result = [];
let average = 0;
let restart = true;
const startbtn = document.querySelector("#start");
const playbtn = document.querySelector("#playButton");
playbtn.style.display = "none";
// let points = 0;
function addDices(diceNumber) {
    document.getElementsByClassName('container')[0];
    let isection = document.createElement('section');
    let ip = document.createElement('p');
    let iimg = document.createElement('img');
    ip.className = `Dice${diceNumber}`
    ip.innerHTML = `Dice ${diceNumber}`
    iimg.src = "dice6.png"
    iimg.className = `img${diceNumber}`
    iimg.alt = `Dice Number ${diceNumber}`
    isection.appendChild(ip)
    isection.appendChild(iimg)
    isection.className = 'dice';
    document.getElementsByClassName('container')[0].appendChild(isection);

}


function rollTheDice(diceNumber) {
    randomNumber = Math.floor(Math.random() * 6) + 1;
    document.querySelector(".img" + diceNumber).setAttribute("src", "dice" + randomNumber + ".png");
    result[diceNumber - 1] = randomNumber;
}

function isIncreasing(xs) {
    let prev, cur;
    let res = false;
    prev = xs[0];
    for (let i = 1; i <= xs.length; i++) {
        cur = xs[i];
        if (cur === prev + 1) {
            res = true;
        } else {
            return false;
        }
    }
    return res;
}


function setupGame() {

    if (restart) {
        location.reload();
    } else
        playbtn.style.display = "";
    {
        for (i = 1; i <= numberOfDice; i++) {
            rollTheDice(i);
        }
        rounds++;
        let sum = result.reduce((a, b) => a + b, 0);
        let elementcounts = {};
        result.forEach(element => { elementcounts[element] = (elementcounts[element] || 0) + 1 });
        let matchedValues = Object.values(elementcounts);
        let numMatched = Math.max.apply(null, matchedValues);
        let resultType = ""
        if (numMatched === numberOfDice) {
            resultType = "All " + numberOfDice + " dices have the same value";
            sum += 60;
        } else if (numMatched === numberOfDice - 1) {
            resultType = "" + numberOfDice + " -1 dices have the same value";
            sum += 40;
        } else if (numMatched === 1) {
            result.sort(function (a, b) { return a - b });
            //console.log(result);
            resultType = "All " + numberOfDice + " dices are differents ";
            sum = isIncreasing(result) ? sum + 20 : sum;
            resultType = isIncreasing(result) ? resultType + " is Run" : resultType + " is NOT Run";
        } else {
            sum = 0;
        }
        totalPoint += sum;

        document.querySelector("h1").innerHTML = `Round ${rounds} : ${sum} Points Balance: ${totalPoint} Points`;
    }
}


function displayResult() {
    if (!restart) {
        // document.getElementById("playButton").innerHTML="Setup Game";
        // document.getElementById("exitButton").innerHTML="Exit";
        average = totalPoint > 0 && rounds > 0 ? parseFloat((totalPoint / rounds).toFixed(1)) : 0;
        document.querySelector("h1").innerHTML = `Played ${rounds} rounds\n Balance: ${totalPoint} Points\n Average: ${average} Points`;
        rounds = 0;
        totalPoint = 0;
        document.getElementsByClassName("butn").disabled = true;
        average = 0;
        result = [];
        sum = 0;
        restart = true;
    } else {
        window.close();
    }
}

function startGame() {
    do {
        answer = document.querySelector("#answer").value;
        numberOfDice = parseInt(answer);
        playGameStage = (numberOfDice >= 3 && numberOfDice <= 6);
        if (!numberOfDice || !playGameStage) {
            showMessage("You didn't enter the correct number of dice to play. Please try again.");
            clearMessage();
            continue;
        }
    } while (!numberOfDice || !playGameStage);
    for (let diceNo = 1; diceNo <= numberOfDice; diceNo++) {
        addDices(diceNo);
    }
    result = new Array(numberOfDice);
    restart = false;
    playGameStage = true;
    setupGame();
    startbtn.style.display = "none";
    document.querySelector("#answer").style.visibility = "hidden";

}


function showMessage(message, style) {
    let m1 = document.getElementById("m1");
    m1.innerHTML = message;
    m1.style.display = "block";
    m1.className = style;
}

function clearMessage() {
    let m1 = document.getElementById(" m1 ");
    m1.style.display = "none";
}
