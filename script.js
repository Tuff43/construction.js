// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Transform hamburger to X
      const bars = document.querySelectorAll('.bar');
      if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'translateY(8px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      });
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
      const header = document.querySelector('.header');
      if (window.scrollY > 100) {
        header.style.padding = '10px 0';
      } else {
        header.style.padding = '15px 0';
      }
    });
    
    // Hero Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    function showSlide(n) {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remove active class from all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the current slide and activate the current dot
      slides[n].classList.add('active');
      dots[n].classList.add('active');
      
      currentSlide = n;
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    }
    
    // Add event listeners to slider controls
    document.querySelector('.next-btn').addEventListener('click', nextSlide);
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);
    
    // Add event listeners to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        showSlide(index);
      });
    });
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', function() {
      slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Testimonial Slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const tDots = document.querySelectorAll('.t-dot');
    const totalTestimonials = testimonials.length;
    
    function showTestimonial(n) {
      // Hide all testimonials
      testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
      });
      
      // Remove active class from all dots
      tDots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the current testimonial and activate the current dot
      testimonials[n].classList.add('active');
      tDots[n].classList.add('active');
      
      currentTestimonial = n;
    }
    
    function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
      showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
      currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
      showTestimonial(currentTestimonial);
    }
    
    // Add event listeners to testimonial controls
    document.querySelector('.testimonial-next').addEventListener('click', nextTestimonial);
    document.querySelector('.testimonial-prev').addEventListener('click', prevTestimonial);
    
    // Add event listeners to testimonial dots
    tDots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        showTestimonial(index);
      });
    });
    
    // Auto slide testimonials
    let testimonialInterval = setInterval(nextTestimonial, 6000);
    
    // Pause auto slide on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', function() {
      clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
      testimonialInterval = setInterval(nextTestimonial, 6000);
    });
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        projectItems.forEach(item => {
          if (filter === 'all') {
            item.style.display = 'block';
          } else if (item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter-number');
    const counterSection = document.querySelector('.counter-section');
    let counted = false;
    
    function startCounting() {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(startCounting, 30);
        } else {
          counter.innerText = target;
        }
      });
    }
    
    // Start counter animation when counter section is in viewport
    window.addEventListener('scroll', function() {
      const counterPosition = counterSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (counterPosition < screenPosition && !counted) {
        counted = true;
        startCounting();
      }
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name === '' || email === '' || subject === '' || message === '') {
          formMessage.textContent = 'Please fill in all fields';
          formMessage.classList.add('error');
          formMessage.classList.remove('success');
          return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(function() {
          // Success message
          formMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
          formMessage.classList.add('success');
          formMessage.classList.remove('error');
          
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          
          // Hide success message after 5 seconds
          setTimeout(function() {
            formMessage.style.display = 'none';
          }, 5000);
        }, 1500);
      });
    }
  });