"use strict";


/*(function (){



   /* kleur boxes aanpassen indien dynamisch
    const color = ()=>{
        const boxes = document.querySelectorAll('.box');
        for (let t =0 ; t<boxes.length ; t++){
            if (t%2===0){
                boxes[t].classList.add("red");
            }else {
                boxes[t].classList.add("white");
            }
        }
    }*/

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
    const geworpen = document.querySelector('.geworpen');
    const boxes = document.querySelectorAll('.box');
    const pawns = document.querySelectorAll('.pawns');
    const index=[];
    let hasOverlap = [false, false, false, false]; // pas true als er 1 van de pionnen op de positie van een andere terechtkomt
    let pion = 0;
    const spelerInput = document.querySelector('#spelerinput');
    let spelers = 0;
    const start = document.querySelector('#start');
    const error = document.querySelector('#error');
    const slangen = [[36, 50, 56, 87, 92, 99], [3, 14, 41, 64, 71, 62]];
    const ladders = [[2, 9, 49, 55, 61], [43, 34, 89, 76, 98]];
    const slangen1 = [[36, 50, 56, 87, 92, 99], [3, 14, 41, 64, 71, 62]];
    const slangen2 = [[37, 56, 67, 91, 96, 99], [2, 43, 35, 72, 64, 62]];
    const slangen3 = [[30, 42, 56, 88, 94, 98], [13, 4, 15, 67, 66, 61]];
    const slangen4 = [[42, 50, 66, 76, 88, 96], [4, 12, 26, 55, 67, 58]];
    const ladders1 = [[2, 9, 49, 55, 61], [43, 34, 89, 76, 98]];
    const ladders2 = [[3, 10, 38, 51, 61], [26, 33, 59, 87, 83]];
    const ladders3 = [[2, 28, 35, 40, 70, 76], [44, 69, 65, 90, 97]];
    const ladders4 = [[2, 25, 28, 57, 62], [44, 46, 69, 78, 83]];
    const cube = document.querySelector('.cube');
    let currentClass = '';

    const gooien = () => {
        dobbelsteen.gooi();
        geworpen.innerHTML = dobbelsteen.geefLaatsteWorp();
        return dobbelsteen.geefLaatsteWorp();
    }
    const movePawn = () => {
        index.forEach((e) => {
            if (e) {
                let currentpawn = pawns[index.indexOf(e)];
                let box = boxes[index[index.indexOf(e)] - 1].getBoundingClientRect();
                let cpawn = currentpawn.getBoundingClientRect();
                const body = document.body.getBoundingClientRect();
                let offsettop = box.top - (body.top);
                let offsetBottom = box.bottom - (body.top);
                let offsetleft = box.left - (body.left);
                let offsetRight = box.right - (body.left);

                currentpawn.classList.add('pawnsmoved');
                switch (index.indexOf(e)) {
                    case 0:
                        currentpawn.style.top = `${offsettop + (cpawn.height / 4)}px`;
                        currentpawn.style.left = `${offsetleft + (cpawn.width / 3)}px`;
                        break;
                    case 1:
                        currentpawn.style.top = `${offsettop + (cpawn.height / 4)}px`;
                        currentpawn.style.left = `${offsetRight - (cpawn.width / 1.5) - 2}px`;
                        break;
                    case 2:
                        currentpawn.style.top = `${offsetBottom - (cpawn.height * 0.8)}px`;
                        currentpawn.style.left = `${offsetleft + (cpawn.width / 3)}px`;
                        break;
                    case 3:
                        currentpawn.style.top = `${offsetBottom - (cpawn.height * 0.8)}px`;
                        currentpawn.style.left = `${offsetRight - (cpawn.width / 1.5) - 2}px`;
                        break;
                }
            }
        })
    }

    const beurtOverslaan = () => {
        if (hasOverlap.includes(true)) {
            if (hasOverlap[pion]) {
                hasOverlap[pion] = false;
                console.log(`${pion} moet een beurt overslaan`);
                nextSpeler();
                
            }
        }
        return null;
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
        index.forEach(element => {
            if (index.indexOf(element) === pion) {
                return;
            } else if (element === index[pion]) {
                hasOverlap[pion] = true;
            }
        })

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
        let randNum = dobbelsteen.geefLaatsteWorp();
        let showClass = 'show-' + randNum;
        if (currentClass) {
            cube.classList.remove(currentClass);
        }
        cube.classList.add(showClass);
        currentClass = showClass;
    };

    const truthOrDare = () => {
        const kader = document.createElement("div");
        const titel = document.createElement("h3");
        const instructie = document.createElement("p");
        const yesNoDiv = document.createElement("div");
        const yes = document.createElement("button");
        const no = document.createElement("button");
        let t =0;
        yesNoDiv.appendChild(yes);
        yesNoDiv.appendChild(no);

        titel.innerText = (`Challenge Snake?`);
        yes.innerText = (`Yes`);
        no.innerText = (`No`);
        yes.addEventListener('click', function () {
            if (t===0){
                instructie.innerText = (`Truth of Dare?`);
                yes.innerText = (`Truth`);
                no.innerText = (`Dare`);
                t++;
            }
            if (t ===1){
            }

        })
    };

    dobbel.addEventListener('click', function () {
        if (spelers!==0){
            error.innerHTML=(`${spelers} spelers. Huidige speler: ${pion+1}`)
            if (whereWinner() !== null) {
                document.querySelector(".scene").remove();
                movePawn();
            } else {
                beurtOverslaan();
                let geworpen = gooien();
                plaatsbepaling(geworpen);
                movePawn();
                nextSpeler();
                rollDice();
            }
        }else if (spelers===0){
            error.innerHTML = (`Start eerst het spel aub!`);
        }
    });

    const isValid = () => {
        if (spelerInput.value >= 1 && spelerInput.value <= 4) {
            error.innerHTML = (`Gestart met ${spelerInput.value} spelers. Eerste speler: ${pion + 1}`);
            return true;
        } else {
            error.innerHTML = (`Aantal spelers moet tussen 1 en 4 liggen.`);
            return false;
        }
    }
    start.addEventListener('click', function () {
        if (isValid()) {
            spelers = spelerInput.value;
            for (let t = 0; t < spelers; t++) {
                index.push(0);
            }
        }
    })
    window.onresize = (movePawn);

    /* kleur boxes aanpassen indien dynamisch
     const color = ()=>{
         const boxes = document.querySelectorAll('.box');
         for (let t =0 ; t<boxes.length ; t++){
             if (t%2===0){
                 boxes[t].classList.add("red");
             }else {
                 boxes[t].classList.add("white");
             }
         }
     }*/
})()