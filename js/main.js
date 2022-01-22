const hamburgerIcon = document.querySelector('.mobile__hamburger')
const mobileMenu = document.querySelector('.mobile__menu')

hamburgerIcon.addEventListener('click', function() {
    mobileMenu.classList.toggle('mobile__menu--hidden')
})