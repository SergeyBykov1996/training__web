/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc(){
    //Calc
    
    
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;                               // Это я забивл в конце

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }  else {
        sex = 'female';
        localStorage.setItem('sex','female');
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    }  else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector)

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass); 
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass)
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){   // Если нет пола, веса и тд.
            result.textContent = '____';
            return                                        // Прерывает функцию если хоть 1 не походит 
        }

        if(sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio) ;  
        }  else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass){         
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                }  else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                } 
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                })
    
                e.target.classList.add(activeClass);
                
                calcTotal();
            })
        })
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');      // Пол / Активность
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');   
    


    function getDinamicInformation(selector){                  //Работа с инпутами 
        const input = document.querySelector(selector);

        

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
               input.style.border = '1px solid red';
            }  else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }  
            calcTotal();
        });
        
    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards(){
    //Class

    class MenuCard {
        constructor (src, alt, title, descr, prise, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.prise = prise;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); //Создали для карточек родителя 
            this.transfer = 27;
            this.changeToUAH () ;
        }

        changeToUAH (){
            this.prise = this.prise * 27 ;    // Метод для расчета гривны
        }
         
        render(){    // Метод для создания карточек   
        const element = document.createElement('div');  
        
        if (this.classes.length === 0){
            this.element = 'menu__item';
            element.classList.add('this.element');
        }  else {
            this.classes.forEach(className => element.classList.add(className));
        }
        
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.prise}</span> грн/день
                </div>
                </div>
            `;

                  this.parent.append(element);
                
        }
    } 

    const getResourse = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();       
    };

    

    getResourse('http://localhost:3000/menu ')
    .then(data => createCard(data) );

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');

            function money$ (){
                price = price * 27;       
            }
            money$();

            element.classList.add('menu__item');

            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price}</span> грн/день
                </div>
                </div>
            `;

            document.querySelector('.menu .container').append(element);
        });
    }
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((module) => {

function form(){
        //Form

    const forms = document.querySelectorAll('form');

    const message = {
        loading : 'img/form/spinner.svg',
        success : 'Спасибо.Мы с вами свяжемся',
        failure : 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data ) => {
        const res = await fetch(url,{           //res Это promiss
            method: 'POST',     
            headers: {
                'Content-type': 'application/json'               // post Data Посылает запрос на сервер , получает ответ и трансформ. ответ в JSON 
            },
            body: data
        });
     
        return await res.json();       
    };

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');    
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `                         
                display : block ;
                margin : 0 auto ;
            `;
            
            form.insertAdjacentElement('afterend', statusMessage);   //svg img status message встанет по середине в нижней форме 

        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // const object = {};
            //     formData.forEach(function (value, key) {     это 2 вариант 
            //         object[key] = value; 
            //     });
                 
            postData( 'http://localhost:3000/requests', json)   // 2 вариант JSON.stringify(object)
              .then(data =>{
                console.log(data);
                showThanksModal(message.success); 
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();       // Сбрасывает форму 
            });

            // request.addEventListener('load', () => {
            //     if(request.status === 200){
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset(); // Сбрасывает форму  
            //         statusMessage.remove();
            //     }   else {
            //         showThanksModal(message.failure);
            //     }   
            // });
        }); 
    }

    
    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');

        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = "modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }


    // fetch('http://localhost:3000/menu')
    //   .then(data => data.json())
    //   .then(res => console.log(res));
}

module.exports = form;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal(){
        //modal window

    
        const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'); 
            
        
    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
         document.body.style.overflow = 'hidden';    //Отвечает за прокрутку 
            // clearInterval(modalTimer);
    }
           
    modalTrigger.forEach(btn => {
         btn.addEventListener('click', openModal);
    });

    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }    

    modal.addEventListener('click', (e) => {
        if (e.target ===  modal || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')){                         // закроет модалку через escp
            closeModal();
        }
    });


    // const modalTimer = setTimeout( openModal, 3000 );
    
    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.       // функция для показа при скроле 
            scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);    // Удаляет обработчик показа 
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider(){

    //slider

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          next = document.querySelector('.offer__slider-next'),
          prev = document.querySelector('.offer__slider-prev'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;
  
          let slideIndex = 1;
          let offset = 0;         //Отступ

    if (slides.length < 10 ){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }  else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = width;    
    })


    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if(i == 0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function addZero(){
        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        }   else  {
            current.textContent = slideIndex
        }
    }

    function transformOffset(){
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function changesColorDot(){
        dots.forEach(dot => {
            dot.style.opacity = '.5'
        });
        dots[slideIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits(str){
        return +str.replace(/\D/g, '');
    }


    next.addEventListener('click', () => {
        if(offset == deleteNotDigits(width) * (slides.length - 1)){
            offset = 0; 
        }  else  {
            offset += deleteNotDigits(width);
        }

        transformOffset();

        if (slideIndex == slides.length){
            slideIndex = 1;
        }  else {
            slideIndex++;
        }

        addZero();

        changesColorDot();

    });


    prev.addEventListener('click', () => {
        if(offset == 0){
            offset = deleteNotDigits(width) * (slides.length  - 1)
        }  else  {
            offset -= deleteNotDigits(width);
        }

        transformOffset();
        
        if (slideIndex == 1){
            slideIndex = slides.length;
        }  else {
            slideIndex--;
        }

        addZero();

        changesColorDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo  - 1);

            transformOffset();

            if(slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            }   else  {
                current.textContent = slideIndex
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        })
    });
         
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs(){
    //tabs
    
    const tab = document.querySelectorAll('.tabheader__item'),
    tabContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');
    
   
    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
       
        tab.forEach ( item => {
            item.classList.remove('tabheader__item_active');
        });

    } 

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tab[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')){
            tab.forEach((item, i) => {
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                } 
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer(){
    
    //timer 

    const deadLine = '2020-12-7';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
           days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days' : days,
            'hours': hours,
            'minutes': minutes,
            'seconds' : seconds
        };
    }
    
    function getZero (num){
        if (num >= 0 && num < 10){
            return `0${num}`;                          //func get Zero - добавляет ноль перед цифрой 
        }  else {
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

            updateClock();  // недочет с обновлением страницы 


        function updateClock(){ 
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }    
        
    }
    setClock('.timer', deadLine);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener('DOMContentLoaded', () => {
    
    const timer  = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
           tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
           slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
           modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
           form = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js"),
           cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
           calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
    
    timer();
    tabs();
    slider();
    modal();
    form();
    cards();
    calc();                               
});    
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map