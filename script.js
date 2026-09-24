class AI {
    constructor(name, AIfunction) {
        this.name = name;
        this.function = AIfunction;
        this.cookies = 0;
        this.totalCookies = 0;
        this.clickPower = 1;
        this.passiveClick = 0;

        this.clickPowerPrice = 10;
        this.passiveClickPrice = 50;
    }

    click() {
        this.updateCookies(this.clickPower)
    }

    buyClickPower() {
        if (this.cookies >= this.clickPowerPrice) {
            this.clickPower++;
            this.cookies -= this.clickPowerPrice;
            this.clickPowerPrice += 5;
        }
    }

    buyPassiveClick() {
        if (this.cookies >= this.passiveClickPrice) {
            this.passiveClick++;
            this.cookies -= this.passiveClickPrice;
            this.passiveClickPrice += 12;
        }
    }

    updateCookies(amount){
        this.cookies += amount;
        this.totalCookies += amount;
    }
}

function bobsFunction(bob) {
    console.log("Bob has", bob.cookies, "cookies and ", bob.totalCookies, " total cookies");

    bob.cookies += bob.passiveClick;

    if(bob.cookies >= bob.passiveClickPrice){
        bob.buyPassiveClick();
    } else {
        bob.click();
    }
}

function tomsFunction(tom) {
    console.log("Tom has", tom.cookies, "cookies and ", tom.totalCookies, " total cookies");

    tom.cookies += tom.passiveClick;

    if(tom.cookies >= tom.clickPowerPrice){
        tom.buyClickPower();
    } else {
        tom.click();
    }
}

function johnsFunction(john) {
    console.log("John has", john.cookies, "cookies and ", john.totalCookies, " total cookies");

    john.cookies += john.passiveClick;

    if(john.cookies >= john.clickPowerPrice){
        john.buyClickPower();
    } else if(john.cookies >= john.passiveClickPrice){
        john.buyPassiveClick();
    }else {
        john.click();
    }
}

const AIs = [
    new AI("Bob", bobsFunction),
    new AI("Tom", tomsFunction),
    new AI("John", johnsFunction)
];

function updateAIs() {
    AIs.forEach(ai => {
        ai.function(ai);
    });
    var totalCookies = 0
    AIs.forEach(ai => {
        totalCookies += ai.totalCookies;
    });
    for(let i = 0; i < AIs.length; i++){
        let ai = AIs[i];
        let percentCookies = ai.totalCookies / totalCookies;
        let progressBar = document.getElementById("progress-bar" + i);
        progressBar.style.width = percentCookies * 100 + "%";
        progressBar.textContent = ai.totalCookies;
    }
}

function updatePasiveClick() {
    AIs.forEach(ai => {
        ai.updateCookies(ai.passiveClick);
    });
}

const intervalId = setInterval(updateAIs, 200);

const secondIntervalId = setInterval(updatePasiveClick, 100);

// Start the game
updateScore();