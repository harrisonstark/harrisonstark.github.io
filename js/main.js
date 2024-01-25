// page load

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

// nav button

const toggleBtn = document.querySelector('.navbar-toggle');
const body = document.querySelector('body');

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('raise');
});