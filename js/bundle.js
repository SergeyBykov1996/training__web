/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "./js/modules/form.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



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

    

    

    (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.getResourse)('http://localhost:3000/menu ')
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector){
        //Form

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading : 'img/form/spinner.svg',
        success : 'Спасибо.Мы с вами свяжемся',
        failure : 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    

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
                 
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)( 'http://localhost:3000/requests', json)   // 2 вариант JSON.stringify(object)
              .then(data =>{
                console.log(data);
                showThanksModal(message.success); 
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();       // Сбрасывает форму 
            });
        }); 
    }

    
    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal');

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }


    // fetch('http://localhost:3000/menu')
    //   .then(data => data.json())
    //   .then(res => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "closeModal": () => /* binding */ closeModal,
/* harmony export */   "openModal": () => /* binding */ openModal
/* harmony export */ });
function openModal(modalSelector){
    modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
     document.body.style.overflow = 'hidden';    //Отвечает за прокрутку 
        // clearInterval(modalTimer);
}

function closeModal(modalSelector){
    modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}   


function modal(triggerSelector, modalSelector){
        //modal window

    
        const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector); 
            

           
    modalTrigger.forEach(btn => {
         btn.addEventListener('click', () => openModal(modalSelector));  // Стрелочная функия оборачивает функцию и вызывает ее поле клика 
    });

     

    modal.addEventListener('click', (e) => {
        if (e.target ===  modal || e.target.getAttribute('data-close') == ''){
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')){                         // закроет модалку через escp
            closeModal(modalSelector);
        }
    });


    // const modalTimer = setTimeout( openModal, 50000 );
    
    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.       // функция для показа при скроле 
            scrollHeight){
            openModal(modalSelector);
            window.removeEventListener('scroll', showModalByScroll);    // Удаляет обработчик показа 
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){

    //slider

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          next = document.querySelector(nextArrow),
          prev = document.querySelector(prevArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
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
    });


    slider.style.position = 'relative';

    // const indicators = document.createElement('ol');
    //       dots = [];
    // indicators.classList.add('carousel-indicators');
    // indicators.style.cssText = `
    //     position: absolute;
    //     right: 0;
    //     bottom: 0;
    //     left: 0;
    //     z-index: 15;
    //     display: flex;
    //     justify-content: center;
    //     margin-right: 15%;
    //     margin-left: 15%;
    //     list-style: none;
    // `;
    // slider.append(indicators);

    // for (let i = 0; i < slides.length; i++){
    //     const dot = document.createElement('li');
    //     dot.setAttribute('data-slide-to', i + 1);
    //     dot.style.cssText = `
    //         box-sizing: content-box;
    //         flex: 0 1 auto;
    //         width: 30px;
    //         height: 6px;
    //         margin-right: 3px;
    //         margin-left: 3px;
    //         cursor: pointer;
    //         background-color: #fff;
    //         background-clip: padding-box;
    //         border-top: 10px solid transparent;
    //         border-bottom: 10px solid transparent;
    //         opacity: .5;
    //         transition: opacity .6s ease;
    //     `;
    //     if(i == 0){
    //         dot.style.opacity = 1;
    //     }
    //     indicators.append(dot);
    //     dots.push(dot);
    // }

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

    // function changesColorDot(){
    //     dots.forEach(dot => {
    //         dot.style.opacity = '.5'
    //     });
    //     dots[slideIndex - 1].style.opacity = 1;
    // }

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

        // changesColorDot();

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

        // changesColorDot();
    });

    // dots.forEach(dot => {
    //     dot.addEventListener('click', (e) => {
    //         const slideTo = e.target.getAttribute('data-slide-to');

    //         slideIndex = slideTo;
    //         offset = deleteNotDigits(width) * (slideTo  - 1);

    //         transformOffset();

    //         if(slides.length < 10) {
    //             current.textContent = `0${slideIndex}`;
    //         }   else  {
    //             current.textContent = slideIndex
    //         }

    //         dots.forEach(dot => dot.style.opacity = '.5');
    //         dots[slideIndex - 1].style.opacity = 1;
    //     })
    // });
         
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabsSelector,  tabContentSelector, tabParentSelector, activeClass){
    //tabs
    
    const tab = document.querySelectorAll(tabsSelector),
    tabContent = document.querySelectorAll(tabContentSelector),
    tabsParent = document.querySelector(tabParentSelector);
    
   
    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
       
        tab.forEach ( item => {
            item.classList.remove(activeClass);
        });

    } 

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tab[i].classList.add(activeClass);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(id, deadLine){
    
    //timer 

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
    setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
          
          
          
          
          
          
          

window.addEventListener('DOMContentLoaded', () => {
    
          
    
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal]', '.modal');
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_0__.default)('.timer', '2020-12-15');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__.default)('form');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__.default)({
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

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResourse": () => /* binding */ getResourse
/* harmony export */ });


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

const getResourse = async (url) => {
    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();       
};




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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map