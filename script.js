// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.classList.toggle('dark', currentTheme === 'dark');

themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.classList.contains('dark');
    htmlElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter Animation for Community Stats
function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for Counter Animation
const statsSection = document.querySelector('section[class*="bg-primary-500"]');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = question.querySelector('.faq-icon');
        
        // Close other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                const otherAnswer = item.querySelector('.faq-answer');
                const otherIcon = item.querySelector('.faq-icon');
                otherAnswer.style.maxHeight = '0';
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current FAQ item
        if (answer.style.maxHeight === '0px' || !answer.style.maxHeight) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.style.transform = 'rotate(45deg)';
        } else {
            answer.style.maxHeight = '0';
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

// Screenshots Carousel Functionality
class Carousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.nextButton = document.querySelector('.carousel-next');
        this.prevButton = document.querySelector('.carousel-prev');
        this.currentSlide = 0;
        
        if (this.track && this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.nextButton?.addEventListener('click', () => this.nextSlide());
        this.prevButton?.addEventListener('click', () => this.prevSlide());
        
        // Auto-play carousel
        this.autoPlay = setInterval(() => this.nextSlide(), 5000);
        
        // Pause auto-play on hover
        this.track.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlay);
        });
        
        this.track.addEventListener('mouseleave', () => {
            this.autoPlay = setInterval(() => this.nextSlide(), 5000);
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.updateCarousel();
    }
    
    updateCarousel() {
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});

// Demo Video Click Handler
document.getElementById('demo-player')?.addEventListener('click', () => {
    // In a real implementation, this would open a modal with the actual video
    alert('Demo video would play here! 🎥\n\nThis would typically open a modal with an embedded video player showing the product walkthrough.');
});

// Scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation styles and observe elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('section > div > div');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });
});

// Mobile Menu Toggle (for responsive navigation)
const mobileMenuToggle = () => {
    const nav = document.querySelector('nav div div');
    const navLinks = nav.querySelector('div:nth-child(2)');
    
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.className = 'md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors';
        
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('hidden');
        });
        
        nav.appendChild(menuButton);
    }
};

// Call mobile menu setup on load and resize
window.addEventListener('load', mobileMenuToggle);
window.addEventListener('resize', mobileMenuToggle);

// Button Hover Effects
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'translateY(-1px)';
    });
    
    button.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'translateY(0)';
    });
});

// Navbar Background on Scroll
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.backgroundColor = navbar.classList.contains('dark') ? 
            'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.backgroundColor = navbar.classList.contains('dark') ? 
            'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollTop = scrollTop;
});

// Form Validation (for future forms)
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Loading Animation for buttons
const addLoadingState = (button, originalText) => {
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
    
    setTimeout(() => {
        button.disabled = false;
        button.innerHTML = originalText;
    }, 2000);
};

// Add click handlers for CTA buttons
document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Start Free') || button.textContent.includes('Get Started')) {
        button.addEventListener('click', (e) => {
            const originalText = e.target.innerHTML;
            addLoadingState(e.target, originalText);
            
            // In a real application, this would redirect to the signup page
            setTimeout(() => {
                console.log('Redirecting to signup...');
            }, 2000);
        });
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Escape key closes any open modals or menus
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navLinks = document.querySelector('nav div div div:nth-child(2)');
        if (navLinks && !navLinks.classList.contains('hidden')) {
            navLinks.classList.add('hidden');
        }
    }
    
    // Tab key navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Lazy load images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Console welcome message
console.log(`
🚀 Welcome to FreemiumPro!
Built with ❤️ using HTML, Tailwind CSS, and JavaScript.
Theme: ${localStorage.getItem('theme') || 'light'}
Version: 1.0.0
`);
