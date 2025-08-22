// Function to load HTML components
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    
    // Initialize mobile menu after navbar is loaded
    if (componentPath.includes('navbar')) {
      // Small delay to ensure DOM is fully updated
      setTimeout(() => {
        initializeMobileMenu();
      }, 10);
    }
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const dropdowns = document.querySelectorAll('.dropdown');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle-btn');
  const dropdownLinks = document.querySelectorAll('.dropdown > a');

  // Check if elements exist before proceeding
  if (!mobileMenuToggle || !navMenu) {
    console.warn('Navbar elements not found, retrying...');
    setTimeout(initializeMobileMenu, 100);
    return;
  }

  // Toggle mobile menu
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      navOverlay.classList.toggle('active');
      navOverlay.setAttribute('aria-hidden', isExpanded);
      document.body.classList.toggle('menu-open');
    });
  }

  // Close mobile menu when overlay is clicked
  if (navOverlay) {
    navOverlay.addEventListener('click', function() {
      closeMobileMenu();
    });
  }

  // Handle dropdowns for mobile
  dropdowns.forEach(function(dropdown, index) {
    const toggleBtn = dropdown.querySelector('.dropdown-toggle-btn');
    const dropdownLink = dropdown.querySelector('a');
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Close all other dropdowns
        dropdowns.forEach(function(otherDropdown, otherIndex) {
          if (otherIndex !== index) {
            otherDropdown.classList.remove('active');
            const otherToggle = otherDropdown.querySelector('.dropdown-toggle-btn');
            const otherLink = otherDropdown.querySelector('a');
            if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
            if (otherLink) otherLink.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current dropdown
        dropdown.classList.toggle('active');
        this.setAttribute('aria-expanded', !isExpanded);
        dropdownLink.setAttribute('aria-expanded', !isExpanded);
      });
    }

    // Handle dropdown link clicks on mobile
    if (dropdownLink) {
      dropdownLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const toggleBtn = dropdown.querySelector('.dropdown-toggle-btn');
          if (toggleBtn) {
            toggleBtn.click();
          }
        }
      });
    }
  });

  // Keyboard navigation support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  // Close mobile menu function
  function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    
    // Close all dropdowns
    dropdowns.forEach(function(dropdown) {
      dropdown.classList.remove('active');
      const toggleBtn = dropdown.querySelector('.dropdown-toggle-btn');
      const dropdownLink = dropdown.querySelector('a');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      if (dropdownLink) dropdownLink.setAttribute('aria-expanded', 'false');
    });
  }

  // Close dropdowns when resizing to desktop (>768px)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    }, 250);
  });

  // Close mobile nav and dropdowns when clicking a link (UX best practice)
  document.querySelectorAll('.nav-menu a[href]').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768 && this.getAttribute('href') !== '#') {
        closeMobileMenu();
      }
    });
  });

  // Focus management for mobile menu
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      if (navMenu.classList.contains('active')) {
        // Focus first focusable element in menu
        const firstFocusable = navMenu.querySelector('a, button');
        if (firstFocusable) {
          setTimeout(() => firstFocusable.focus(), 100);
        }
      }
    });
  }

  // Trap focus in mobile menu
  navMenu.addEventListener('keydown', function(e) {
    if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
      const focusableElements = navMenu.querySelectorAll('a, button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }
  });

  console.log('Mobile menu initialized successfully');
}

// Load components when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar', 'components/navbar.html');
  loadComponent('footer', 'components/footer.html');
});
