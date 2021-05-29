require('./style.css');
const { Board, Proximity } = require("johnny-five");
const board = new Board({
    repl: false
});

let currentMoney = 0;
let hasHappend = "nietgebeurd";


board.on("ready", () => {
    //board.on("ready", () => init());
    const proximity = new Proximity({
        controller: "HCSR04",
        pin: 7
    });

    proximity.on("change", () => {
        const { centimeters } = proximity;
        checkBudget(centimeters)
    });
});

const checkBudget = (newValue) => {
    const geld = document.querySelector(".geld")
    if (newValue > 30 && hasHappend == "nietgebeurd") {
        console.log("idle")
    }
    else if (newValue < 23 && newValue > 14 && hasHappend == "nietgebeurd") {
        hasHappend = "gebeurd"
        currentMoney = currentMoney + 500;
        console.log(500);
        geld.textContent = `€${currentMoney}`;
        setTimeout(() => { hasHappend = "nietgebeurd" }, 5000);
    } else if (newValue < 14 && newValue > 6 && hasHappend == "nietgebeurd") {
        hasHappend = "gebeurd"
        currentMoney = currentMoney + 100;
        console.log(100);
        geld.textContent = `€${currentMoney}`;
        setTimeout(() => { hasHappend = "nietgebeurd" }, 5000);
    }
    else if (newValue < 6 && hasHappend == "nietgebeurd") {
        hasHappend = "gebeurd"
        currentMoney = currentMoney + 250;
        console.log(250);
        geld.textContent = `€${currentMoney}`;
        setTimeout(() => { hasHappend = "nietgebeurd" }, 5000);
    }
}

const clock = () => {
    const tijd = document.querySelector(".tijd")
    const game = document.querySelector(".game")
    const rick = document.querySelector(".rick")
    var myTimer = setInterval(myClock, 1000);
    var c = 60;
    function myClock() {
        --c;
        var minutes = Math.floor(c / 60);
        var seconds = c - minutes * 60;
        tijd.innerHTML = (`${minutes}:${seconds}`)
        if (c == 0) {
            clearInterval(myTimer);
            game.style.display = "none"
            rick.style.display = "block"
            
        }
    }
}
const init = () => {

};

init();
clock();

