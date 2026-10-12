// Portfolio Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all features
    initSmoothScrolling();
    initFadeInAnimations();
    initMobileMenu();
    initNavigation();
    initContactForm();
    initScrollEffects();
    initParticles();
    initProjectCards();
    initTimelineAnimation();
    initSkillBars();
    initTypingEffect();
    init3DCube();
}

// Smooth Scrolling & SPA Page Transitions
let currentActivePageId = '';
let isNavigationClick = false;

function switchToPage(targetId) {
    if (!targetId.startsWith('#')) return;

    const targetSection = document.querySelector(targetId);
    if (!targetSection || !targetSection.classList.contains('page-section')) return;

    const activeSection = document.querySelector('.page-section.active-page');

    // If targeted section is already active, do nothing
    if (activeSection && activeSection.id === targetId.substring(1)) {
        return;
    }

    // Disable interactions during transition
    document.body.classList.add('loading');

    if (activeSection) {
        if (isNavigationClick) {
            // Fade out current section
            activeSection.style.opacity = '0';
            activeSection.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                // Remove active class from old section
                activeSection.classList.remove('active-page');
                activeSection.style.opacity = '';

                // Add active class to new section
                targetSection.classList.add('active-page');

                // Fade in new section
                targetSection.style.opacity = '0';
                targetSection.style.transition = 'opacity 0.3s ease';

                // Force reflow
                targetSection.offsetHeight;

                targetSection.style.opacity = '1';

                // Update active state in Navigation Links
                updateActiveNavigationLink(targetId);

                // Smooth scroll to the section
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Re-enable interactions after transition
                setTimeout(() => {
                    document.body.classList.remove('loading');
                    targetSection.style.opacity = '';
                    targetSection.style.transition = '';
                    isNavigationClick = false;
                }, 600);
            }, 300);
        } else {
            // Normal scroll transition (keep existing effects)
            activeSection.classList.remove('active-page');
            targetSection.classList.add('active-page');
            updateActiveNavigationLink(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                document.body.classList.remove('loading');
            }, 800);
        }
    } else {
        // Initial page load switch
        targetSection.classList.add('active-page');
        updateActiveNavigationLink(targetId);
        document.body.classList.remove('loading');
    }

    currentActivePageId = targetId;
}

function updateActiveNavigationLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // Set flag to indicate this is a navigation click (for fade transition)
            isNavigationClick = true;

            // Navigate via hash changes to naturally update browser history
            location.hash = targetId;
            closeMobileMenu();
        });
    });

    // Watch for hash changes (handles forward/backward browser buttons)
    window.addEventListener('hashchange', function() {
        const targetId = location.hash || '#hero';
        switchToPage(targetId);
    });

    // Vertical scroll detection for transitions
    window.addEventListener('scroll', handleVerticalScroll, { passive: true });

    // Initial page set based on initial URL hash
    const initialHash = location.hash || '#hero';

    // Initialize standard active state cleanly on startup
    const targetSection = document.querySelector(initialHash);
    if (targetSection) {
        // Ensure all other page sections are hidden initially
        const allSections = document.querySelectorAll('.page-section');
        allSections.forEach(section => {
            section.classList.remove('active-page');
        });

        targetSection.classList.add('active-page');
        updateActiveNavigationLink(initialHash);
    }
}

function handleVerticalScroll() {
    const sections = document.querySelectorAll('.page-section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            if (!section.classList.contains('active-page')) {
                section.classList.add('active-page');
                updateActiveNavigationLink('#' + section.id);
                location.hash = section.id;
            }
        } else {
            section.classList.remove('active-page');
        }
    });
}

// Fade-in Animations on Scroll
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for project cards
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCards();
                }
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in, .project-card');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('mobile-menu-enter');
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

// Navigation Active State (now handled dynamically by page transitions)
function initNavigation() {
    // Dynamic page swapping sets active link classes on switchToPage()
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (!validateForm(formData)) {
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="spinner inline-block mr-2"></div>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual implementation)
            setTimeout(() => {
                showSuccessMessage();
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function validateForm(data) {
    if (!data.name || !data.email || !data.message) {
        showErrorMessage('Please fill in all fields');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        showErrorMessage('Please enter a valid email address');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message fixed top-20 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    message.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Message sent successfully!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function showErrorMessage(text) {
    const message = document.createElement('div');
    message.className = 'success-message fixed top-20 right-6 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    message.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${text}`;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Scroll Effects
function initScrollEffects() {
    let lastScroll = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Hide/show navigation on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Particle Background
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (10 + Math.random() * 10) + 's';
    container.appendChild(particle);
}

// Project Cards Animation
function initProjectCards() {
    const projectCards = document.querySelectorAll('#projects .fade-in');
    projectCards.forEach(card => {
        card.classList.add('project-card');
    });
}

function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card:not(.visible)');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100);
    });
}

// Timeline Animation
function initTimelineAnimation() {
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach(dot => {
        dot.classList.add('timeline-dot');
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.flex.items-center.justify-between');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

function animateSkillBar(bar) {
    const stars = bar.querySelectorAll('.fa-star');
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.transform = 'scale(1.2)';
            setTimeout(() => {
                star.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid #3b82f6';
        
        let index = 0;
        function type() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        }
        
        // Start typing after page load
        setTimeout(type, 500);
    }
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Mouse Move Effect
function initMouseMoveEffect() {
    const cards = document.querySelectorAll('.card-hover');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;
            
            const angleX = (e.clientY - cardY) * 0.01;
            const angleY = (e.clientX - cardX) * -0.01;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
    });
}

// Initialize additional effects
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    initMouseMoveEffect();
});

// Performance optimization
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Update scroll-based animations
    ticking = false;
}

// Add resize handler
window.addEventListener('resize', function() {
    // Recalculate positions if needed
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Touch gestures for mobile
let touchStartY = 0;
document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > 50) {
        // Handle swipe gestures if needed
    }
});

// Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
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
}

// Initialize lazy loading
initLazyLoading();

// 3D Horizontal Carousel
function init3DCube() {
    const carousel = document.getElementById('project-carousel');
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const hoverLeft = document.getElementById('carousel-hover-left');
    const hoverRight = document.getElementById('carousel-hover-right');
    const items = document.querySelectorAll('.carousel-item');
    
    if (!carousel || items.length === 0) return;
    
    let currentIndex = 0;
    let isAnimating = false;
    let hoverNavigationTimeout;
    let isHoverNavigating = false;
    
    // Initialize carousel
    initializeCarousel();
    updateCarouselPositions();
    
    // Hover navigation - Left zone (previous project)
    hoverLeft?.addEventListener('mouseenter', () => {
        if (!isHoverNavigating && !isAnimating) {
            isHoverNavigating = true;
            hoverNavigationTimeout = setTimeout(() => {
                navigateCarousel(-1);
                isHoverNavigating = false;
            }, 300); // 300ms delay before navigation
        }
    });
    
    hoverLeft?.addEventListener('mouseleave', () => {
        if (hoverNavigationTimeout) {
            clearTimeout(hoverNavigationTimeout);
        }
        isHoverNavigating = false;
    });
    
    // Hover navigation - Right zone (next project)
    hoverRight?.addEventListener('mouseenter', () => {
        if (!isHoverNavigating && !isAnimating) {
            isHoverNavigating = true;
            hoverNavigationTimeout = setTimeout(() => {
                navigateCarousel(1);
                isHoverNavigating = false;
            }, 300); // 300ms delay before navigation
        }
    });
    
    hoverRight?.addEventListener('mouseleave', () => {
        if (hoverNavigationTimeout) {
            clearTimeout(hoverNavigationTimeout);
        }
        isHoverNavigating = false;
    });
    
    // Navigation buttons
    prevBtn?.addEventListener('click', () => {
        if (!isAnimating) {
            navigateCarousel(-1);
        }
    });
    
    nextBtn?.addEventListener('click', () => {
        if (!isAnimating) {
            navigateCarousel(1);
        }
    });
    
    // Indicator dots
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (!isAnimating && index !== currentIndex) {
                goToSlide(index);
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && !isAnimating) {
            navigateCarousel(-1);
            e.preventDefault();
        } else if (e.key === 'ArrowRight' && !isAnimating) {
            navigateCarousel(1);
            e.preventDefault();
        }
    });
    
    // Mouse wheel support
    carousel.addEventListener('wheel', (e) => {
        if (!isAnimating) {
            e.preventDefault();
            if (e.deltaY > 0) {
                navigateCarousel(1);
            } else {
                navigateCarousel(-1);
            }
        }
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isAnimating) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                navigateCarousel(1); // Swipe left, go next
            } else {
                navigateCarousel(-1); // Swipe right, go previous
            }
        }
    }
    
    function initializeCarousel() {
        // Set initial positions for 3-project view
        items.forEach((item, index) => {
            item.classList.remove('center', 'left', 'right', 'hidden');
            if (index === 0) {
                item.classList.add('center');
            } else if (index === 1) {
                item.classList.add('right');
            } else if (index === items.length - 1) {
                item.classList.add('left');
            } else {
                item.classList.add('hidden');
            }
        });
        
        // Set initial indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === 0);
        });
        
        // Add hover listeners to each item
        items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                if (!isAnimating) {
                    handleItemHover(index);
                }
            });
        });
    }
    
    function navigateCarousel(direction) {
        if (isAnimating) return;
        
        isAnimating = true;
        const oldIndex = currentIndex;
        currentIndex = (currentIndex + direction + items.length) % items.length;
        
        // Update positions with animation
        updateCarouselPositions();
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Add haptic feedback for mobile (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }
    
    function goToSlide(targetIndex) {
        if (isAnimating || targetIndex === currentIndex) return;
        
        isAnimating = true;
        currentIndex = targetIndex;
        
        updateCarouselPositions();
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Add haptic feedback for mobile (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }
    
    function updateCarouselPositions() {
        items.forEach((item, index) => {
            // Remove all position classes
            item.classList.remove('center', 'left', 'right', 'hidden');
            
            // Calculate relative position
            let relativeIndex = index - currentIndex;
            if (relativeIndex < 0) relativeIndex += items.length;
            
            // Apply appropriate class based on position for 3-project view
            switch(relativeIndex) {
                case 0:
                    item.classList.add('center');
                    break;
                case 1:
                    item.classList.add('right');
                    break;
                case items.length - 1:
                    item.classList.add('left');
                    break;
                default:
                    item.classList.add('hidden');
                    break;
            }
        });
        
        // Update screen reader project name announcement
        if (typeof updateCurrentProjectName === 'function') {
            updateCurrentProjectName(currentIndex);
        }
    }
    
    function handleItemHover(hoveredIndex) {
        if (hoveredIndex === currentIndex) return; // Already center
        
        isAnimating = true;
        const oldIndex = currentIndex;
        currentIndex = hoveredIndex;
        
        // Update positions with animation
        updateCarouselPositions();
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Add haptic feedback for mobile (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    // Visual feedback on hover zones - navigate to left/right project
    hoverLeft?.addEventListener('mouseenter', () => {
        if (!isAnimating) {
            // Find the left project index
            const leftItem = Array.from(items).find(item => item.classList.contains('left'));
            if (leftItem) {
                const leftIndex = Array.from(items).indexOf(leftItem);
                handleItemHover(leftIndex);
            }
        }
    });
    
    hoverRight?.addEventListener('mouseenter', () => {
        if (!isAnimating) {
            // Find the right project index
            const rightItem = Array.from(items).find(item => item.classList.contains('right'));
            if (rightItem) {
                const rightIndex = Array.from(items).indexOf(rightItem);
                handleItemHover(rightIndex);
            }
        }
    });
    
    // Add accessibility announcements for carousel
    const announceProject = (projectIndex) => {
        const projectNames = [
            'E-Commerce Platform',
            'Portfolio Website', 
            'Task Tracker',
            'Restaurant Landing',
            'Event Booking',
            'Quiz App'
        ];
        
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Now viewing: ${projectNames[projectIndex]}`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    };
    
    // Add focus management for accessibility
    carousel.setAttribute('tabindex', '0');
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'Projects gallery 3D carousel');
    
    // Update announcements when project changes
    const originalNavigateCarousel = navigateCarousel;
    navigateCarousel = function(direction) {
        originalNavigateCarousel(direction);
        announceProject(currentIndex);
    };
    
    const originalGoToSlide = goToSlide;
    goToSlide = function(targetIndex) {
        originalGoToSlide(targetIndex);
        announceProject(targetIndex);
    };
    
    // Add screen reader friendly controls
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'sr-only';
    controlsContainer.innerHTML = `
        <div id="cube-controls-info">
            <p>Use arrow keys to navigate between projects, or click the navigation buttons.</p>
            <p>Current project: <span id="current-project-name">E-Commerce Platform</span></p>
        </div>
    `;
    document.body.appendChild(controlsContainer);
    
    // Update current project name
    function updateCurrentProjectName(faceIndex) {
        const projectNames = [
            'E-Commerce Platform',
            'Portfolio Website',
            'Task Tracker', 
            'Restaurant Landing',
            'Event Booking',
            'Quiz App'
        ];
        
        const nameElement = document.getElementById('current-project-name');
        if (nameElement) {
            nameElement.textContent = projectNames[faceIndex];
        }
    }
    
    // Performance optimization: use requestAnimationFrame for smooth animations
    let rafId;
    function smoothRotate(targetRotation) {
        if (rafId) cancelAnimationFrame(rafId);
        
        function animate() {
            // Smooth rotation logic here if needed
            rafId = requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    }
