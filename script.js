
function updateVisitorCount() {
    let visitCount = localStorage.getItem('visitCount');
    if (visitCount === null) {
        visitCount = 0;
    }
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('visitCount', visitCount);
    document.getElementById('visitor-count').textContent = visitCount;
}

window.onload = updateVisitorCount;


const button = document.querySelector('.buttons');

const displayButton = () => {
    window.addEventListener('scroll', () => {
        console.log(window.scrollY);

        if (window.scrollY > 1000) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    });
};

const scrollToTop = () => {
    button.addEventListener("click", () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        console.log(event);
    });
};

displayButton();
scrollToTop();

// sticky nav bar 

$(window).scroll(function(){
    if($(this).scrollTop() > 100){
        $('.nav').addClass('sticky')
    } else{
        $('.nav').removeClass('sticky')
    }
});






