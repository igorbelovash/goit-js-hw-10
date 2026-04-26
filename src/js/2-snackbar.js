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

    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })
        .then((data) => {
            iziToast.show({
                message: `✅ Fulfilled promise in ${data}ms`,
                messageColor: '#FFFFFF',
                messageSize: '16px',
                messageLineHeight: '150%',
                color: '#59A10D',
            });
            console.log(`Fulfilled promise in ${data}ms`);
        })
        .catch((error) => {
            iziToast.show({
                message: `❌ Rejected promise in ${error}ms`,
                messageColor: '#FFFFFF',
                messageSize: '16px',
                messageLineHeight: '150%',
                color: '#EF4040',
            });
            console.log(`Rejected promise in ${error}ms`);
        });
    
    formEl.reset();
}