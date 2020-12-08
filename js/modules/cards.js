import form from "./form";
import {getResourse} from '../services/services';

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

export default cards;