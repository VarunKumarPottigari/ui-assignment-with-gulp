// responsive navbar click handler

(function () {
    let toggleBar = document.querySelector('#toggle');
    toggleBar.addEventListener('click', toggleBarClick, false);

    function toggleBarClick() {
        this.classList.toggle('on');
        let navBar = document.querySelector('#resize');
        navBar.classList.toggle('active');
        let body = document.body;
        if (body.style.overflow == 'hidden') {
            body.style.overflow = 'auto'
        } else {
            body.style.overflow = 'hidden';
        }
    }
})();

// event listeners for small screen nav bar element click
(function() {
    let navElements = document.querySelectorAll('#resize .nav-item');
    // add listener to only first 3 elements
    // schedule, overview, articles
    for (let i = 0; i < 3; i++) {
        navElements[i].addEventListener('click', refreshPage);
    }

    // refresh the page
    function refreshPage() {
        window.location.reload();
    }
})();
