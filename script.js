// DOM Elements
        const cursor = document.querySelector('.cursor');
        // const cursorFollower = document.querySelector('.cursor-follower');
        const scrollProgressBar = document.querySelector('.scroll-progress-bar');
        const backToTop = document.querySelector('.back-to-top');
        const navLinks = document.querySelectorAll('.nav-links a');
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinksList = document.querySelector('.nav-links');
        const fadeElements = document.querySelectorAll('.fade-in');
        const contactForm = document.getElementById('contactForm');
        const yearSpan = document.getElementById('year');
        
        // Update year automatically
        yearSpan.textContent = new Date().getFullYear();
        
        // Custom cursor
        // document.addEventListener('mousemove', (e) => {
        //     cursor.style.left = e.clientX + 'px';
        //     cursor.style.top = e.clientY + 'px';
            
        //     // Add delay to follower
        //     setTimeout(() => {
        //         cursorFollower.style.left = e.clientX + 'px';
        //         cursorFollower.style.top = e.clientY + 'px';
        //     }, 50);
        // });
        
        // // Hide cursor when on touchscreen devices
        // if ('ontouchstart' in window) {
        //     cursor.style.display = 'none';
        //     cursorFollower.style.display = 'none';
        // }
        
        // Scroll progress bar
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            scrollProgressBar.style.width = scrollPercent + '%';
            
            // Show/hide back to top button
            if (scrollTop > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            
            // Animate elements on scroll
            fadeElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    el.classList.add('animated');
                }
            });
        });
        
        // Back to top functionality
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Close mobile menu if open
                navLinksList.classList.remove('active');
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Mobile menu toggle
        mobileToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            
            // Change icon
            const icon = mobileToggle.querySelector('i');
            if (navLinksList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Update active nav link based on scroll position
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset + 100;
            
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = '#' + section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
        
        // Sticky header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && subject && message) {
                // In a real scenario, you would send this data to a server
                // For this demo, we'll just show a success message
                alert(`Thank you, ${name}! Your message has been sent successfully. This is a demo form - in a real portfolio, this would send your message.`);
                
                // Reset form
                contactForm.reset();
            } else {
                alert('Please fill out all fields.');
            }
        });
        
        // Typing animation for the hero text
        document.addEventListener('DOMContentLoaded', () => {
            const typingText = document.querySelector('.typing-animation');
            const originalText = typingText.textContent;
            
            // Clear the text first
            typingText.textContent = '';
            
            // Type out the text
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    typingText.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            // Start typing after a short delay
            setTimeout(typeWriter, 1000);
            
            // Initial check for fade-in elements
            setTimeout(() => {
                fadeElements.forEach(el => {
                    const elementTop = el.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementTop < window.innerHeight - elementVisible) {
                        el.classList.add('animated');
                    }
                });
            }, 300);
        });
        
        // Animation on hover for buttons and links
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .stat-item, .social-links a');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.2)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
        
        // Parallax effect for hero section
        document.addEventListener('mousemove', (e) => {
            const heroContent = document.querySelector('.hero-content');
            const moveX = (e.clientX - window.innerWidth / 2) / 30;
            const moveY = (e.clientY - window.innerHeight / 2) / 30;
            
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });