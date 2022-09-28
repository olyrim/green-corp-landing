const INCREASE_NUMBER_ANIMATION_SPEED = 20; // скорость анимации
let animationInited = false; // анимация цифр ещё не запускалась
// шаг анимации
function increaseNumberAnimationStep(i, element, endNumber) {
      // i — счетчик анимации. Он будет принимать значение от 0 до 5000 и каждый кадр анимации увеличиваться на 1.
      // element — html-элемент тега с числом. За один кадр анимации значение внутри element мы будем менять на i.
      // endNumber — значение, когда анимация остановится. В нашем случае — 5000.
      if (i <= endNumber) {
         if (i === endNumber) {
           element.innerText = i + '+';
         } else {
           element.innerText = i;
         }
     
         i = i+100;
           
         // 
         // setTimeout(increaseNumberAnimationStep(i, element, endNumber), INCREASE_NUMBER_ANIMATION_SPEED);
         setTimeout(function() {
            increaseNumberAnimationStep(i, element, endNumber);
          }, INCREASE_NUMBER_ANIMATION_SPEED);
      }
 }

 // инициализирует и запускает increaseNumberAnimationStep.
 function initIncreaseNumberAnimation() {
   let element = document.querySelector(".features__clients-count");
   increaseNumberAnimationStep(0, element, 5000);
 }
//  initIncreaseNumberAnimation();

 //change - специальное событие, которое вызывается при выборе новой опции в селекте. 
 document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
   if (event.target.value === 'other') {
     const formContainer = document.createElement('div');
     formContainer.classList.add('form__group');
     formContainer.classList.add('form__other-input'); // Задание 1
  
     const input = document.createElement('input');
     input.placeholder = "Введите ваш вариант";
     input.type = "text"; // Задание 2
       
     formContainer.appendChild(input);
     document.querySelector('#form form').insertBefore(formContainer, document.querySelector('.form__submit')); // Задание 3
     console.log('da');
   }
  
   const otherInput = document.querySelector('.form__other-input');
   if (event.target.value !== 'other' && otherInput) { // Задание 5
   document.querySelector('#form form').removeChild(otherInput); // Задание 4
   }
 });
 
//  функция-колбек, которая будет вызываться при изменении скролла
function updateScroll() {
   //  window.scrollY - позиция скролла
   if (window.scrollY > 0) {
      document.querySelector('header').classList.add('header__scrolled');
   } else {
      document.querySelector('header').classList.remove('header__scrolled');
   }
   // Запуск анимации увеличения числа
   let windowBottomPosition = window.scrollY + window.innerHeight;
   let countElementPosition = document.querySelector('.features__clients-count').offsetTop;
   if (windowBottomPosition >= countElementPosition && !animationInited) {
      animationInited = true;
      initIncreaseNumberAnimation();
   }
 }
 window.addEventListener('scroll', updateScroll);