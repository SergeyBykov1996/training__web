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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item'
    ).render();
    
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем <br> не только красивый дизайн упаковки, но и качественное исполнение блюд.<br> Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        'menu__item'
    ).render();
    


    //Form

    const forms = document.querySelectorAll('form');

    const message = {
        loading : 'img/form/spinner.svg',
        success : 'Спасибо.Мы с вами свяжемся',
        failure : 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');    //
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display : block ;
                margin : 0 auto ;
            `;
            
            form.insertAdjacentElement('afterend', statusMessage);   //svg img status message встанет по середине в нижней форме 
        
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};
                formData.forEach(function (key,value) {
                    object[key] = value;
                });
            
            const json = JSON.stringify(object);
            
            request.send(json);

            request.addEventListener('load', () => {
                if(request.status === 200){
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset(); // Сбрасывает форму  
                    statusMessage.remove();
                }   else {
                    showThanksModal(message.failure);
                }

                
            });
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

});    