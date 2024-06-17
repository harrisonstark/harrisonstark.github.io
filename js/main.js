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

// profile button

const cmmLink = "https://www.youtube.com/watch?v=fWNaR-rxAic"
const cwLink = "https://www.youtube.com/watch?v=izGwDsrQ1eQ"

function cmmcw() {
  document.querySelector('.profile-link').setAttribute("href", (Date.now() % 2 == 0 ? cmmLink : cwLink));
}