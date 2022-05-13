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
    const geworpen = document.querySelector('.geworpen');
    const boxes = document.querySelectorAll('.box');
    const pawns = document.querySelectorAll('.pawns');
    const index=[];
    let pion = 0;
    const spelerInput = document.querySelector('#spelerinput');
    let spelers = 0;
    const start = document.querySelector('#start');
    const error = document.querySelector('#error');

    const gooien = () => {
        dobbelsteen.gooi();
        geworpen.innerHTML = dobbelsteen.geefLaatsteWorp();
        return dobbelsteen.geefLaatsteWorp();
    }
    const movePawn = () => {
        boxes[index[pion] - 1].appendChild(pawns[pion]);
    }

    const overflow = (dobbel) => {
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
            overflow(geworpen);
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