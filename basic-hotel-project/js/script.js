//Obtaining all elements with the ID 'btn' for all the buttons.
const btn = document.getElementById('btn')
//Obtaining all elements with the ID 'paus-ed-nav' for the navigation pane.
const nav = document.getElementById('paus-ed-nav')
//Obtaining the element for the booking button.
const bookb = document.getElementById('book-btn')
//Adding a click event to the button element:
btn.addEventListener('click', () => {
    nav.classList.toggle('active'); // Enables toggle for the navigation pane.
    btn.classList.toggle('active'); // Enables toggle for the button.
});
