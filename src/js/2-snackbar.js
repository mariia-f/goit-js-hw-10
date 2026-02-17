import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const makePromise = ({ delay, shouldResolve }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay); 
      } else {
        reject(delay);   
      }
    }, delay);
  });
};


const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); 


  const delay = +document.querySelector(".input-snackbar").value;
  const checked = document.querySelector(".check-btn:checked");
  const shouldResolve = checked.value === "fulfilled"; 


  makePromise({ delay, shouldResolve })
    .then((delay) => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.success({
        title: "Успіх!",
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
      });
    })
    .catch((delay) => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.error({
        title: "Помилка!",
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
      });
    });
});

