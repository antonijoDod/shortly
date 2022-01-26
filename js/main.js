// TODO - Save data in local storage
// TODO - When request to server occur, set loading state
// TODO - If url is wrong, show alert or similar error
// TODO - Optimize results render

const hamburgerIcon = document.querySelector('.mobile__hamburger')
const mobileMenu = document.querySelector('.mobile__menu')
const form = document.querySelector('#form')
const formInput = document.querySelector('.form__input')
const formList = document.querySelector('.form__list')

// Toggle show and hide mobile menu
hamburgerIcon.addEventListener('click', function() {
    mobileMenu.classList.toggle('mobile__menu--visible')
})

// Array where resolved url is saved 
const urlData = [];

// AddEventListener for when form is submitted
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = event.target.enteredUrl.value;
    const res = await resolveUrl(input);

    // If response is not undefine, then save resolved url in array
    if(res !== undefined) {
       urlData.push(res)
    }
    // If  array is not empty, render data
    if(urlData.length > 0) {
        renderResult(urlData)
    }

    // After results are render, add event listener for copy button
    const formActionsButton = document.querySelectorAll('.form__action')

    formActionsButton.forEach(element => {
        element.addEventListener('click', (event) => {
            // Copy value from button (short url)
            let copyText = event.target.value;
            navigator.clipboard.writeText(copyText)

            // Change button look
            event.target.classList.add("form__action--copied")
            event.target.textContent = "Copied"
        })
    });

    formInput.value = ""

})

// Send request to server and get resolved (short link)
const resolveUrl = async(url) => {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    const res = await response.json();

    if(!res.ok) {
        return alert('Error')
    }
    return res.result;
}

// Render results from array
const renderResult = (urlData) => {
   const elements = urlData.map(el =>`
    <li class="form__item">
        <a class="form__left">${el.original_link}</a>
        <div class="form__right">
        <a href="${el.full_short_link}" class="form__link"
            >${el.full_short_link}</a
        >
        <button class="form__action" value="${el.full_short_link}">Copy</button>
        </div>
    </li>   
    `);
    formList.innerHTML = elements.join('')
}
