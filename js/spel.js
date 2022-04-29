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
    btn.classList.add("red");
    const geworpen = document.querySelector('.geworpen');

    const gooien = () => {
        dobbelsteen.gooi();
        return dobbelsteen.geefLaatsteWorp();
    }
    btn.addEventListener('click', function () {
            let worp;
            worp = gooien();
            geworpen.innerHTML=(worp);

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