const start = document.getElementById("startreset");
const correct_block = document.getElementById("correct");
const incorrect_block = document.getElementById("wrong");
const score_value = document.getElementById("scoreValue");
const time_block = document.getElementById("timeremaining");
const gameOver = document.getElementById("gameOver");
const instruction = document.getElementById("instruction");
const questionField = document.getElementById("question");
var score = 0; // score
var eq1, eq2, result;
function start_game() {
    if (start.textContent === "Start Game") {
        start.textContent = "Reset Game";
        time_block.style.display = "block";
        instruction.textContent = "Click on the correct answer";
        eq1 = equation(1, 10);
        eq2 = equation(1, 10);
        result = eq1 * eq2;
        questionField.textContent = `${eq1} x ${eq2}`;
        var all_divs = document.querySelectorAll(".box");
        var numbers = [result, generateNum(1, 100), generateNum(1, 100), generateNum(1, 100)];
        var boxes = document.querySelectorAll(".box");

        for (let i = numbers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        numbers.forEach((number, index) => {
            boxes[index].textContent = number;
        });
        all_divs.forEach(all_divs => {
            all_divs.addEventListener("click", () => {
                var selected_div = all_divs.textContent;

                if (selected_div === result.toString()) {
                    score++;
                    score_value.innerHTML = score;
                    correct_block.style.display = "block";
                    setTimeout(() => {
                        correct_block.style.display = "none";
                    }, 500);

                    eq1 = equation(1, 10);
                    eq2 = equation(1, 10);
                    result = eq1 * eq2;
                    questionField.textContent = `${eq1} x ${eq2}`;
                    numbers = [result, generateNum(1, 100), generateNum(1, 100), generateNum(1, 100)];
                    for (let i = numbers.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
                    }
                    numbers.forEach((number, index) => {
                        boxes[index].textContent = number;
                    });
                }
                else {
                    incorrect_block.style.display = "block";
                    setTimeout(() => {
                        incorrect_block.style.display = "none";
                    }, 500);
                }
            });
        });
        timer();
    }
    else {
        location.reload();
    }
}

function timer() {
    let timer = 60;
    var time_remain = () => {
        document.getElementById("timeremainingvalue").textContent = timer;
    };
    //update the timer to decrease by one second
    var timer_decrease = () => {
        if (timer > 0) {
            timer--;
            time_remain();
        }
        else {
            clearInterval(timerInterval);
            gameOver.style.display = "block";
            gameOver.innerHTML = "GAME OVER<br>YOUR SCORE: " + score;
            gameOver.style.lineHeight = "2.5em";
        }
    }
    var timerInterval = setInterval(timer_decrease, 1000);
}
function generateNum(min, max) {
    //return Math.floor(Math.random() * 99) + 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function equation(min, max) {
    //return Math.floor(Math.random() * 10) + 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
