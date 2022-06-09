"use strict";

(function () {

    class Dobbelsteen {
        constructor(min, max) {
            this.min = min;
            this.max = max;
            this.worp = min;
        }

        gooi() {
            this.worp = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
        }

        geefLaatsteWorp() {
            return this.worp;
        }
    }

    const dobbelsteen = new Dobbelsteen(1, 6);
    const dobbel = document.querySelector('#dobbel');
    const boxes = document.querySelectorAll('.box');
    const pawns = document.querySelectorAll('.pawns');
    const index=[];
    let hasOverlap = []; // pas true als er 1 van de pionnen op de positie van een andere terechtkomt
    let pion = 0;
    const spelerInput = document.querySelector('#spelerinput');
    let spelers = 0;
    const start = document.querySelector('#start');
    const error = document.querySelector('#error');
    let slangen = [[], []];
    let ladders = [[], []];
    const slangen1 = [[36, 50, 56, 87, 92, 99], [3, 14, 41, 64, 71, 62]];
    const slangen2 = [[37, 56, 67, 91, 96, 99], [2, 43, 35, 72, 64, 62]];
    const slangen3 = [[30, 42, 56, 88, 94, 98], [13, 4, 15, 67, 66, 61]];
    const slangen4 = [[42, 50, 66, 76, 88, 96], [4, 12, 26, 55, 67, 58]];
    const ladders1 = [[2, 9, 49, 55, 61], [43, 34, 89, 76, 98]];
    const ladders2 = [[3, 10, 38, 51], [26, 33, 59, 87]];
    const ladders3 = [[2, 28, 35, 40], [44, 69, 65,  59]];
    const ladders4 = [[2, 25, 28, 62], [44, 46, 69, 83]];
    const cube = document.querySelector('.cube');
    let currentClass = '';
    let randomBord = Math.floor(Math.random() * (4) + 1);

    switch (randomBord) {
        case 1:
            slangen = slangen1;
            ladders = ladders1;
            document.getElementById("spelbordImg").src = "../img/Spelbord1.png";
            break;
        case 2:
            slangen = slangen2;
            ladders = ladders2;
            document.getElementById("spelbordImg").src = "../img/Spelbord2.png";
            break;
        case 3:
            slangen = slangen3;
            ladders = ladders3;
            document.getElementById("spelbordImg").src = "../img/Spelbord3.png";
            break;
        case 4:
            slangen = slangen4;
            ladders = ladders4;
            document.getElementById("spelbordImg").src = "../img/Spelbord4.png";
            break;
    }

    const gooien = () => {
        dobbelsteen.gooi();
        return dobbelsteen.geefLaatsteWorp();
    }
    const movePawn = () => {
        for (let i = 0; i<index.length; i++){
            if (index[i]){
                let currentpawn = pawns[i];
                let box = boxes[index[i] - 1].getBoundingClientRect();
                let cpawn = currentpawn.getBoundingClientRect();
                const body = document.body.getBoundingClientRect();
                //bron getBoundingClientRect: https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
                let offsettop = box.top - (body.top);
                let offsetBottom = box.bottom - (body.top);
                let offsetleft = box.left - (body.left);
                let offsetRight = box.right - (body.left);

                currentpawn.classList.add('pawnsmoved');
                switch (i) {
                    case 0:
                        currentpawn.style.top = `${offsettop + (cpawn.height / 4)}px`;
                        currentpawn.style.left = `${offsetleft + (cpawn.width / 4)}px`;
                        break;
                    case 1:
                        currentpawn.style.top = `${offsettop + (cpawn.height / 3.6)}px`;
                        currentpawn.style.left = `${offsetRight - (cpawn.width ) }px`;
                        break;
                    case 2:
                        currentpawn.style.top = `${offsetBottom - (cpawn.height)}px`;
                        currentpawn.style.left = `${offsetleft + (cpawn.width / 3)}px`;
                        break;
                    case 3:
                        currentpawn.style.top = `${offsetBottom - (cpawn.height)}px`;
                        currentpawn.style.left = `${offsetRight - (cpawn.width)}px`;
                        break;
                }
            }

        }

    }

    const beurtOverslaan = () => {

        if (hasOverlap.includes(true)) {
            if (hasOverlap[pion]) {
                hasOverlap[pion] = false;
                window.alert(`${pion+1} moet een beurt overslaan`);
                return true;
            }
        }
        return false;
    }

    const whereWinner = () => {
        if(index.includes(100)) {
            return index.indexOf(100);
        }
        return null;
    }

    const plaatsbepaling = (dobbel) => {
        let bool;
        if (index[pion] === 0) {
            index[pion] += dobbel;
            bool = false;
        } else {
            bool = true;
        }

        if (dobbel > (100 - index[pion])) {
            index[pion] = (100 - ((dobbel + index[pion]) - 100));
        } else if (bool) {
            index[pion] += dobbel;
        }

        for (let t = 0; t < (slangen[0].length); t++) {
            if (index[pion] === slangen[0][t]) {
                index[pion] = slangen[1][t];
            } else if (index[pion] === ladders[0][t]) {
                index[pion] = ladders[1][t];
            }
        }

        for (let i = 0 ; i<index.length ; i++){
            if (i!==pion){
                if (index[i]===index[pion]){
                    hasOverlap[pion] = true;
                }
            }
        }

    }

    const nextSpeler = () => {
        if (spelers === "4") {
                switch (pion){
                    case 0:
                        pion = 1;
                        break;
                    case 1:
                        pion = 2;
                        break;
    
                    case 2:
                        pion = 3;
                        break;
    
                    case 3:
                        pion = 0;
                        break;
    
                }
        } else if (spelers === "3") {
            switch (pion) {
                case 0:
                    pion = 1;
                    break;
                case 1:
                    pion = 2;
                    break;

                case 2:
                    pion = 0;
                    break;
            }
        } else if (spelers === "2") {
            switch (pion) {
                case 0:
                    pion = 1;
                    break;
                case 1:
                    pion = 0;
                    break;
            }
        }
    }

    const rollDice = () => {
        //bron: vorig project Siemen
        let randNum = dobbelsteen.geefLaatsteWorp();
        let showClass = 'show-' + randNum;
        if (currentClass) {
            cube.classList.remove(currentClass);
        }
        cube.classList.add(showClass);
        currentClass = showClass;
    };


    dobbel.addEventListener('click', function () {
        if (spelers!==0){
            error.innerHTML=(`${spelers} spelers. Huidige speler: ${pion+1}`)
            if (whereWinner() !== null) {
                document.querySelector(".scene").remove();
                movePawn();
                window.location.href = "/endGame.html";
            } else if (!beurtOverslaan()){
                let geworpen = gooien();
                plaatsbepaling(geworpen);
                movePawn();
                nextSpeler();
                rollDice();
            }else {
                nextSpeler();
            }
        }else if (spelers===0){
            window.alert('Start eerst het spel aub!')
        }
    });

    const isValid = () => {
        if (spelerInput.value >= 1 && spelerInput.value <= 4) {
            error.innerHTML = (`Gestart met ${spelerInput.value} spelers. Eerste speler: ${pion + 1}`);
            return true;
        } else {
            window.alert(`Aantal spelers moet tussen 1 en 4 liggen.`);
            return false;
        }
    }
    start.addEventListener('click', function () {
        if (isValid()) {
            spelers = spelerInput.value;
            for (let t = 0; t < spelers; t++) {
                index.push(0);
                hasOverlap.push(false);
            }
        }
    })
    window.onresize = (movePawn);

})()