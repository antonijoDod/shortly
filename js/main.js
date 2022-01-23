const hamburgerIcon = document.querySelector('.mobile__hamburger')
const mobileMenu = document.querySelector('.mobile__menu')
const form = document.querySelector('#form')
const formResults = document.querySelector('.form__list')

const urlData = [];

hamburgerIcon.addEventListener('click', function() {
    mobileMenu.classList.toggle('mobile__menu--visible')
})

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = event.target.enteredUrl.value;
    const res = await resolveUrl(input);
    if(res !== undefined) {
       urlData.push(res)
    }
    if(urlData.length > 0) {
        renderResult(urlData)
    }
})

const resolveUrl = async(url) => {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    const res = await response.json();

    if(!res.ok) {
        return alert('Error')
    }
    return res.result;
}

const renderResult = (urlData) => {
    const elements = urlData.map(el =>
        `<li class="form__item">${el.full_short_link}</li>`
    );
   formResults.innerHTML = elements.join('')
}


/* 
Get value from form
*/