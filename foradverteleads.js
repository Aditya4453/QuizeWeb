document.addEventListener('DOMContentLoaded', function() {
    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Card flip functionality for touch devices
    const cards = document.querySelectorAll('.benefit-card, .industry-item');
    
    cards.forEach(card => {
        const cardInner = card.querySelector('.card-inner');
        
        // Handle click/tap events
        card.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                // On mobile, toggle flip on click
                cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' 
                    ? 'rotateY(0deg)' 
                    : 'rotateY(180deg)';
            }
        });
        
        // Handle hover for desktop
        if (window.innerWidth > 768) {
            card.addEventListener('mouseenter', function() {
                cardInner.style.transform = 'rotateY(180deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                cardInner.style.transform = 'rotateY(0deg)';
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const cards = document.querySelectorAll('.benefit-card, .industry-item');
        cards.forEach(card => {
            const cardInner = card.querySelector('.card-inner');
            if (window.innerWidth <= 768) {
                // Reset transform on mobile
                cardInner.style.transform = 'rotateY(0deg)';
            }
        });
    });
    
    // Smooth scrolling for anchor links
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
    
    // Add loading animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for animation
    const animatedCards = document.querySelectorAll('.benefit-card, .industry-item');
    animatedCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
});
