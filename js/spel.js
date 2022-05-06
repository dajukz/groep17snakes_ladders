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
    const btn = document.querySelector('.btn');
    const geworpen = document.querySelector('.geworpen');
    const boxes = document.querySelectorAll('.box');
    const pawns = document.querySelectorAll('.pawns');
    let index = 0;

    const gooien = () => {
        dobbelsteen.gooi();
        geworpen.innerHTML = dobbelsteen.geefLaatsteWorp();
        return dobbelsteen.geefLaatsteWorp();
    }
    const movePawn = (index, pion) => {
        boxes[index - 1].appendChild(pawns[pion]);
    }

    const overflow = (dobbel) => {
        let bool;
        if (index === 0) {
            index += dobbel;
            bool = false;
        } else {
            bool = true;
        }

        if (dobbel > (100 - index)) {
            index = (100 - ((dobbel + index) - 100));
        } else if (bool) {
            index += dobbel;
        }

        return index;
    }

    btn.addEventListener('click', function () {
        let geworpen = gooien();
        movePawn(overflow(geworpen), 1);

    });

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