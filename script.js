// Home page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate statistics counters
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Declare animateCounter function
    function animateCounter(element, target) {
        let count = 0;
        const counterInterval = setInterval(() => {
            if (count < target) {
                count++;
                element.textContent = count;
            } else {
                clearInterval(counterInterval);
            }
        }, 5);
    }

    // GSAP Animations for home page
    const gsap = window.gsap; // Assuming gsap is loaded globally
    if (typeof gsap !== 'undefined') {
        // Hero section animations
        const tl = gsap.timeline();
        
        tl.from('.hero-title', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-buttons .btn-primary', {
            duration: 0.6,
            x: -30,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=0.3')
        .from('.hero-buttons .btn-secondary', {
            duration: 0.6,
            x: 30,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=0.4');

        // Recycling cycle animation
        gsap.to('.recycling-cycle', {
            rotation: 360,
            duration: 20,
            ease: 'none',
            repeat: -1
        });

        gsap.to('.cycle-item', {
            rotation: -360,
            duration: 20,
            ease: 'none',
            repeat: -1
        });

        // Floating particles animation
        gsap.to('.floating-particles::before', {
            y: -20,
            duration: 3,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true
        });

        // Feature cards stagger animation
        gsap.from('.feature-card', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.features-section',
                start: 'top 80%'
            }
        });

        // Stats cards animation
        gsap.from('.stat-card', {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.stats-section',
                start: 'top 80%'
            }
        });

        // CTA section animation
        gsap.from('.cta-content', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 80%'
            }
        });

        // Parallax effect for hero background
        gsap.to('.hero-background', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Interactive hover effects for feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.3,
                    y: -10,
                    scale: 1.02,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });

        // Cycle items pulse animation
        gsap.to('.cycle-item', {
            scale: 1.1,
            duration: 2,
            ease: 'power2.inOut',
            stagger: 0.5,
            repeat: -1,
            yoyo: true
        });
    }

    // Interactive elements
    const heroButtons = document.querySelectorAll('.hero-buttons button');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 900000);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary, .btn-secondary, .btn-cta {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add dynamic background particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(76, 175, 80, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.appendChild(particle);
            
            // Animate particle
            if (typeof gsap !== 'undefined') {
                gsap.to(particle, {
                    y: -window.innerHeight - 100,
                    x: (Math.random() - 0.5) * 200,
                    duration: Math.random() * 3 + 2,
                    ease: 'none',
                    onComplete: () => {
                        particle.remove();
                    }
                });
            }
        }
    }

    // Create particles periodically
    setInterval(createParticle, 2000);
});

gsap.registerPlugin(ScrollTrigger);



// Animate all section titles
gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.fromTo(title,
        { opacity: 0, y: 60 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Parallax effect on hero video
gsap.to('.hero-video', {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});
gsap.registerPlugin(ScrollTrigger);

// Animate each testimonial card with bounce and spin
gsap.utils.toArray('.testimonial-card-v2').forEach((card, i) => {
  gsap.fromTo(card,
    {
      opacity: 0,
      scale: 0.7,
      y: 100,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      delay: i * 0.2,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    }
  );
});
// Stagger paragraph animation in about section
gsap.utils.toArray('.about-text p').forEach((p, i) => {
    gsap.fromTo(p,
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: p,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

gsap.utils.toArray('.cta-content p, h2').forEach((p,h2, i) => {
    gsap.fromTo(p,h2,
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: p,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

gsap.utils.toArray('.feature-card').forEach((card, i) => {
  gsap.fromTo(card,
    {
      opacity: 0,
      scale: 0.7,
      y: 100,
      
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      delay: i * 0.2,
      ease: 'back.inout(1.7)',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    }
  );
});

gsap.from(".site-footer", {
  opacity: 0,
  y: 80,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".site-footer",
    start: "top 90%",
  },
});

