const hamburgerIcon = document.querySelector('.mobile__hamburger');
const mobileMenu = document.querySelector('.mobile__menu');
const form = document.querySelector('#form');
const formList = document.querySelector('.form__list');
const urlData = [];
hamburgerIcon.addEventListener('click', function() {
    mobileMenu.classList.toggle('mobile__menu--visible');
});
form.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const input = event.target.enteredUrl.value;
    const res = await resolveUrl(input);
    if (res !== undefined) urlData.push(res);
    if (urlData.length > 0) renderResult(urlData);
});
const resolveUrl = async (url)=>{
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const res = await response.json();
    if (!res.ok) return alert('Error');
    return res.result;
};
const renderResult = (urlData1)=>{
    const elements = urlData1.map((el)=>`
    <li class="form__item">
        <a class="form__left">${el.original_link}</a>
        <div class="form__right">
        <a href="${el.full_short_link}" class="form__link"
            >${el.full_short_link}</a
        >
        <button class="form__action" onclick="handleButtonCopy()" value="${el.full_short_link}">Copy</button>
        </div>
    </li>   
    `
    );
    formList.innerHTML = elements.join('');
};
const handleButtonCopy = (el)=>{
    console.log();
}; /* const formActionsButton = document.querySelectorAll('.form__action')

formActionsButton.forEach(element => {
    element.addEventListener('click', (event) => {
        console.log('raid')
        event.target.classList.add("form__action--copied")
        event.target.textContent = "Copied"
    })
}); */ 

//# sourceMappingURL=index.72be8890.js.map
