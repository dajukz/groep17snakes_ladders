"use strict";
(() => {
    let ariaToggle = document.querySelector("footer");

    window.onresize  = function changeHTML() {
        if (window.innerWidth < 500) {
            ariaToggle.ariaHidden = "true"
        } else {
            ariaToggle.ariaHidden = "false"
        }
    };
    
})();