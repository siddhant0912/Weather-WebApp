console.log('JavaScript File Loaded');


const weatherBu = document.querySelector('.search-button');
const search = document.querySelector('.search-text');
const msg1 = document.querySelector('.err-msg');
const msg2 = document.querySelector('.data-msg');


weatherBu.addEventListener('click', (e) => {
    e.preventDefault();
    const loc = search.value;

    msg1.textContent = 'Searching....';
    msg2.textContent = '';
    fetch(`http://localhost:3000/weather?address=${loc}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
            } else {
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;

            }
        });
    });


})