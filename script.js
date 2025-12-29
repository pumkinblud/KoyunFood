// Function to hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('loaded');
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); // Match this with the CSS transition time
    }
}

// Wait for everything to load
window.addEventListener('load', function() {
    // Add a small delay for better UX (optional)
    setTimeout(hideLoadingScreen, 1000);
});

// Function to initialize the hero slideshow
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
        // Initialize first slide
        slides[0].classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
        
        // Add shadow to navbar when scrolled
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '20px 0';
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.');
            this.reset();
        });
    }
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Initialize animations
    animateOnScroll();
});

    // Cookie Consent
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    function checkCookieConsent() {
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieConsent.classList.add('visible');
            }, 2000);
        }
    }
    
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.classList.remove('visible');
        });
    }
    
    // Load Google Reviews
    function loadGoogleReviews() {
        // Replace with your actual Google Place ID
        const placeId = 'YOUR_GOOGLE_PLACE_ID';
        const apiKey = 'YOUR_GOOGLE_API_KEY';
        const reviewsContainer = document.getElementById('google-reviews');
        
        if (!reviewsContainer) return;
        
        // Fallback reviews in case API fails
        const fallbackReviews = [
            {
                author_name: 'Max Mustermann',
                rating: 5,
                text: 'Ausgezeichnetes Essen und sehr freundlicher Service! Wir kommen gerne wieder.',
                relative_time_description: 'vor einem Monat',
                profile_photo_url: ''
            },
            {
                author_name: 'Anna Schmidt',
                rating: 4,
                text: 'Sehr leckeres Essen, besonders das Lamm ist zu empfehlen. Freundliche Bedienung!',
                relative_time_description: 'vor 2 Wochen',
                profile_photo_url: ''
            },
            {
                author_name: 'Thomas Weber',
                rating: 5,
                text: 'Absolut empfehlenswert! Das beste türkische Restaurant in der Stadt.',
                relative_time_description: 'vor einem Monat',
                profile_photo_url: ''
            }
        ];
        
        function displayReviews(reviews) {
            reviewsContainer.innerHTML = '';
            
            reviews.slice(0, 3).forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card fade-in';
                
                const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                const firstLetter = review.author_name.charAt(0).toUpperCase();
                
                reviewCard.innerHTML = `
                    <div class="review-header">
                        <div class="reviewer-avatar">${firstLetter}</div>
                        <div class="reviewer-info">
                            <h4>${review.author_name}</h4>
                            <div class="review-stars" title="${review.rating} von 5 Sternen">
                                ${stars}
                            </div>
                            <div class="review-date">${review.relative_time_description}</div>
                        </div>
                    </div>
                    <div class="review-text">
                        ${review.text}
                    </div>
                `;
                
                reviewsContainer.appendChild(reviewCard);
            });
            
            // Trigger animations
            setTimeout(() => {
                document.querySelectorAll('.review-card').forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
            }, 100);
        }
        
        // Try to load actual Google reviews if API key is provided
        if (apiKey && apiKey !== 'YOUR_GOOGLE_API_KEY' && placeId && placeId !== 'YOUR_GOOGLE_PLACE_ID') {
            // This is a simplified example - in a real implementation, you would need to use
            // the Google Places API with your API key and handle the response accordingly
            // For security reasons, this should be done on the server side
            
            // For now, we'll use the fallback reviews
            displayReviews(fallbackReviews);
        } else {
            // Use fallback reviews if API key is not provided
            displayReviews(fallbackReviews);
        }
    }
    
    // Update Google review button link
    function updateGoogleReviewLink() {
        const reviewButton = document.querySelector('.google-review-link a');
        if (reviewButton) {
            // Replace with your actual Google Maps place URL
            reviewButton.href = 'https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID';
        }
    }
    
    // Initialize all features
    function init() {
        checkCookieConsent();
        loadGoogleReviews();
        updateGoogleReviewLink();
    }
    
    // Initialize the slideshow
    function initSlideshow() {
        const slideshow = document.querySelector('.slideshow');
        const slides = slideshow.querySelectorAll('.slide');
        let currentSlide = 0;
        
        function showSlide() {
            slides.forEach((slide, index) => {
                slide.style.display = index === currentSlide ? 'block' : 'none';
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide();
        }
        
        slideshow.querySelector('.prev').addEventListener('click', prevSlide);
        slideshow.querySelector('.next').addEventListener('click', nextSlide);
        
        // Auto cycle through slides
        setInterval(nextSlide, 5000);
        
        showSlide();
    }
    
    // Run initialization when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            initSlideshow();
        });
    } else {
        init();
        initSlideshow();
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
