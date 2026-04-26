import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const elements = event.target.elements;
    const delay = Number(elements.delay.value);
    const state = elements.state.value;

    if (!delay) {
        return;
    }

    setTimeout(() => {
        new Promise((resolve, reject) => {
            if (state === "fulfilled") {
                iziToast.show({
                    message: `✅ Fulfilled promise in ${delay}ms`,
                    messageColor: '#FFFFFF',
                    messageSize: '16px',
                    messageLineHeight: '150%',
                    color: '#59A10D',
                });
                resolve(`Fulfilled promise in ${delay}ms`);
            }
            else {
                iziToast.show({
                    message: `❌ Rejected promise in ${delay}ms`,
                    messageColor: '#FFFFFF',
                    messageSize: '16px',
                    messageLineHeight: '150%',
                    color: '#EF4040',
                });
                reject(new Error(`Rejected promise in ${delay}ms`));  
            }
        })
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    }, delay)
    
    formEl.reset();
}