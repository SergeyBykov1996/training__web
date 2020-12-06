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