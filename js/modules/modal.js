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

export default modal;
export {closeModal};
export {openModal};