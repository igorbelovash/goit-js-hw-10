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
                resolve(`Fulfilled promise in ${delay}ms`);
            } else {
                reject(new Error(`Rejected promise in ${delay}ms`));
            }
        }, delay);
    })
        .then((data) => {
            iziToast.show({
                message: `✅ ${data}`,
                messageColor: '#FFFFFF',
                messageSize: '16px',
                messageLineHeight: '150%',
                color: '#59A10D',
            });
            console.log(data);
        })
        .catch((error) => {
            iziToast.show({
                message: `❌ ${error.message}`,
                messageColor: '#FFFFFF',
                messageSize: '16px',
                messageLineHeight: '150%',
                color: '#EF4040',
            });
            console.log(error);
        });
    
    formEl.reset();
}