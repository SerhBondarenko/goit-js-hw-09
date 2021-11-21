import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
 //console.log(shouldResolve)
  return new Promise((resolve, reject) => {
  
    setTimeout(() => {
     if (shouldResolve) {
       resolve ({position, delay});
  } else {
     reject ({position, delay});
      };
    }, delay);
  });
  
};
const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(el) {
  el.preventDefault();
  let {delay, step, amount} = el.currentTarget;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);

  for (let position = 1; position <= amount; position +=1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    
  })
      .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
delay += step
  };
};

