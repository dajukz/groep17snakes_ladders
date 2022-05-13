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
    let pion = 0;
    const spelerInput = document.querySelector('#spelerinput');
    let spelers = 0;
    const start = document.querySelector('#start');
    const error = document.querySelector('#error');
    const slangen = [[36, 50, 56, 87, 92, 99],[3, 14, 41, 64, 71, 62]];
    const ladders = [[2, 9, 49, 55, 61],[43, 34, 89, 76, 98]];

    const gooien = () => {
        dobbelsteen.gooi();
        geworpen.innerHTML = dobbelsteen.geefLaatsteWorp();
        return dobbelsteen.geefLaatsteWorp();
    }
    const movePawn = () => {
        boxes[index[pion] - 1].appendChild(pawns[pion]);
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

        slangen[0].forEach(e =>{
            if (index[pion]===e){
                index[pion]=slangen[1][slangen[0].indexOf(e)];
            } else if(index[pion]===e){
                index[pion]=ladders[1][slangen[0].indexOf(e)];
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
            switch (pion){
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
            switch (pion){
                case 0:
                    pion = 1;
                    break;
                case 1:
                    pion = 0;
                    break;
            }
        }
    }

    dobbel.addEventListener('click', function () {
        if (spelers!==0){
            let geworpen = gooien();
            plaatsbepaling(geworpen);
            movePawn();
            nextSpeler();
        }else if (spelers===0){
            error.innerHTML = (`Start eerst het spel aub!`);
        }
    });

    const isValid = () => {
        if (spelerInput.value >= 1 && spelerInput.value <= 4) {
            error.innerHTML = (`Gestart`);
            return true;
        } else {
            error.innerHTML = (`Aantal spelers moet tussen 1 en 4 liggen.`);
            return false;
        }
    }
    start.addEventListener('click', function () {
        if (isValid()) {
            spelers = spelerInput.value;
            for (let t = 0 ; t<spelers ; t++){
                index.push(0);
            }
        }
    })

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