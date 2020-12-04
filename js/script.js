window.addEventListener('DOMContentLoaded', () => {
    
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


    // class
    

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

    // getResourse('http://localhost:3000/menu ')    // Получаем Массив из BD
    //   .then(data => {
        //   data.forEach(({img, altimg, title, descr, price}) => {
        //       new MenuCard(img, altimg, title, descr, price,'.menu .container').render();
        //   });
    //   });
    
     
    // axios.get('http://localhost:3000/menu ')
    // .then(data => {
    //     data.data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price,'.menu .container').render();
    //     });
    // });
    // ===

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



    //slider

    const slides = document.querySelectorAll('.offer__slide'),
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

    next.addEventListener('click', () => {
        if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
            offset = 0; 
        }  else  {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length){
            slideIndex = 1;
        }  else {
            slideIndex++;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        }   else  {
            current.textContent = slideIndex
        }
    });


    prev.addEventListener('click', () => {
        if(offset == 0){
            offset = +width.slice(0, width.length - 2) * (slides.length  - 1)
        }  else  {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (slideIndex == 1){
            slideIndex = slides.length;
        }  else {
            slideIndex--;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        }   else  {
            current.textContent = slideIndex
        }
    });
          
    // showSlides(slideIndex);  
    
    // if (slides.length < 10 ){
    //     total.textContent = `0${slides.length}`;
    // }  else {
    //     total.textContent = slides.length;
    // }
          

    // function showSlides(n){
    //     if (n > slides.length){
    //         slideIndex = 1;
    //     }

    //     if (n < 1){
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

        // if (slides.length < 10 ){
        //     current.textContent = `0${slideIndex}`;
        // }  else {
        //     current.textContent = slideIndex;
        // }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n)
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // })
          
    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // })
              
});    