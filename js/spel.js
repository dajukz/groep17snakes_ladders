"use strict";

(function (){
    const color = ()=>{
        const boxes = document.querySelectorAll('.box');
        for (let t =0 ; t<boxes.length ; t++){
            if (t%2===0){
                boxes[t].classList.add("red");
            }else {
                boxes[t].classList.add("white");
            }
        }
    }
color();

})()