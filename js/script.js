

window.addEventListener('DOMContentLoaded', () => {
    
    const timer  = require('./modules/timer'),
           tabs = require('./modules/tabs'),
           slider = require('./modules/slider'),
           modal = require('./modules/modal'),
           form = require('./modules/form'),
           cards = require('./modules/cards'),
           calc = require('./modules/calc');
    
    timer();
    tabs();
    slider();
    modal();
    form();
    cards();
    calc();                               
});    