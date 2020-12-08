import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

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
        }); 
    }

    
    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        prevModalDialog.classList.add('hide');
        openModal('.modal');

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
            closeModal('.modal');
        }, 4000);
    }


    // fetch('http://localhost:3000/menu')
    //   .then(data => data.json())
    //   .then(res => console.log(res));
}

export default form;