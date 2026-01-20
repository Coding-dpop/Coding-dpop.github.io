// Left-side navigation toggle

const leftNav = document.getElementById('leftNav');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const body = document.body;


hamburgerMenu.addEventListener('click', () => {
    leftNav.classList.toggle('open');
    body.classList.toggle('nav-open');
    
});

// Close navigation when clicking outside on mobile

document.addEventListener('click', (event) => {
    const isMobile = window.innerWidth <= 992;
    
    if (isMobile && leftNav.classList.contains('open')) {
        const isClickInsideNav = leftNav.contains(event.target);
        const isClickOnHamburger = hamburgerMenu.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger) {
            leftNav.classList.remove('open');
            body.classList.remove('nav-open');
            
        }
    }
});

// Set active navigation link on click

document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
        }
        
        // Remove active class from all links

        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        

        this.classList.add('active');
        
        // Close navigation on mobile after clicking

        if (window.innerWidth <= 800 && leftNav.classList.contains('open')) {
            leftNav.classList.remove('open');
            body.classList.remove('nav-open');
            const icon = hamburgerMenu.querySelector('i');
            icon.classList.remove('☆');
            icon.classList.add('>');
        }
    });
});

// Carousel functionality

const carouselSlides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(index) {

    // Hide all slides

    carouselSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide

    carouselSlides[index].classList.add('active');
    currentSlide = index;
}

// Next slide

nextBtn.addEventListener('click', () => {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= carouselSlides.length) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
});

// Previous slide

prevBtn.addEventListener('click', () => {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
        prevIndex = carouselSlides.length - 1;
    }
    showSlide(prevIndex);
});

// Auto-rotate carousel

let carouselInterval = setInterval(() => {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= carouselSlides.length) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
}, 5000);

// Pause auto-rotation on hover

const carousel = document.querySelector('.hero-carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= carouselSlides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }, 5000);
});

// Smooth scrolling for anchor links need some improvements

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if(this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

 // Add active class to current section in view based on the top of the section

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // change active state when scrolling

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href !== '#') {
            item.classList.remove('active');
            if (href === `#${currentSection}`) {
                item.classList.add('active');
            }
        }
    });
});



/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
