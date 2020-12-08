          import timer from'./modules/timer';
          import tabs  from'./modules/tabs';
          import slider  from'./modules/slider';
          import modal  from'./modules/modal';
          import form  from'./modules/form';
          import cards  from'./modules/cards';
          import calc  from'./modules/calc';

window.addEventListener('DOMContentLoaded', () => {
    
          
    
    modal('[data-modal]', '.modal');
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2020-12-15');
    cards();
    calc();
    form('form');
    slider({
        container:'.offer__slider',
        nextArrow:'.offer__slider-next',
        prevArrow:'.offer__slider-prev',
        slide:'.offer__slide',
        totalCounter:'#total',
        currentCounter:'#current',
        wrapper:'.offer__slider-wrapper',
        field:'.offer__slider-inner'
    });

                                   
});    