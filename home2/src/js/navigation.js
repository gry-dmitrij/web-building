const nav = document.querySelector('#main-nav');
const links = document.querySelectorAll('a');
const pages = document.querySelectorAll('.context-page');

links.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        const ref = event.target.hash;
        pages.forEach(item => {
            if ('#' + item.id === ref) {
                item.classList.remove('visually-hidden');
            } else {
                item.classList.add('visually-hidden');
            }
        })
    });
})