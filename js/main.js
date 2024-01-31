// page load

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

// nav button

const toggleBtn = document.querySelector('.navbar-toggle');
const toggleBtnImg = document.querySelector('.navbar-toggle-img');
const navbar = document.querySelector('.navbar');
const content = document.querySelector('.content');

toggleBtn.addEventListener('click', () => {
  navbar.classList.toggle('raise');
  content.classList.toggle('raise');
  toggleBtnImg.classList.toggle('flip');
});