const timeForQuestion = 20000;
var level = 1;
var isTrue;
var time = timeForQuestion;
var interval;
countTime();
function processing(id) {
    if (id.substr(6) === isTrue + "") {
        level++;
    } else {
        document.getElementById("play-over-game").style.zIndex = 1;
        level = 1;
        stop();
        return;
    }
    document.getElementById("level").innerHTML = "Level: " + level;
    document.getElementById("score").innerHTML = "Score : " + (level - 1) * 5;
    countTime();
}

function startGame() {
    document.getElementById("play-over-game").style.zIndex = -1;
    document.getElementById("level").innerHTML = "Level: " + level;
    document.getElementById("score").innerHTML = "Score : " + (level - 1) * 5;
    countTime();
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function questionRamdom() {
    let numberA = Math.floor(Math.random() * 1000);
    let numberB = Math.floor(Math.random() * 1000);

    let operator = getRandomItem(["+", "-", "*"]);
    let mathQuiz = numberA + ' ' + operator + ' ' + numberB;
    document.getElementById("math-quiz").innerHTML = mathQuiz;

    isTrue = getRandomItem([true, false]);

    if (!isTrue) {
        let operatorRandom = getRandomItem(["+", "-"]);
        let numberInRange = getRandomInRange(-10, 10);
        // console.log('before : ' + numberInRange);
        if (operatorRandom === "-" && numberInRange < 0) {
            numberInRange = Math.abs(numberInRange);
        } else if (numberInRange === 0) {
            numberInRange++;
        }
        // console.log('After: ' + numberInRange);
        mathQuiz += operatorRandom + numberInRange;
    }

    document.getElementById("result").innerHTML = eval(mathQuiz);

}
function countTime() {
    stop();
    time = timeForQuestion;
    questionRamdom();
    interval = setInterval(function () {
        time -= 50
        document.getElementById("progress-time").style.width = ((time - 50) * 100 / timeForQuestion) + '%';
        if (time === 0) {
            stop();
            alert('Time out');
            countTime();
        }
    }, 50);
}

function stop() {
    clearInterval(interval);
}




