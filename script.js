// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TextPlugin, DrawSVGPlugin, MotionPathPlugin, Flip, Draggable, InertiaPlugin, Observer, GSDevTools);

// Global variables
let currentTheme = 'dark';
let scrollSmoother;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    setupScrollSmoother();
    setupNavigation();
    setupScrollAnimations();
    // setupThemeToggle();
    setupMobileMenu();
    initializeAllDemos();
}

// Setup ScrollSmoother
function setupScrollSmoother() {
    scrollSmoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true
    });
}

// Setup Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-section a');
    const sections = document.querySelectorAll('.content-section');
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                scrollSmoother.scrollTo(targetSection, true, "top 100px");
                updateActiveNav(this);
            }
        });
    });
    
    // Update active navigation on scroll
    ScrollTrigger.batch(sections, {
        onEnter: (elements) => {
            const id = elements[0].id;
            const correspondingLink = document.querySelector(`a[href="#${id}"]`);
            if (correspondingLink) {
                updateActiveNav(correspondingLink);
            }
        },
        onLeave: (elements) => {
            // Handle when leaving sections
        },
        onEnterBack: (elements) => {
            const id = elements[0].id;
            const correspondingLink = document.querySelector(`a[href="#${id}"]`);
            if (correspondingLink) {
                updateActiveNav(correspondingLink);
            }
        }
    });
}

// Update active navigation
function updateActiveNav(activeLink) {
    document.querySelectorAll('.nav-section a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Setup scroll animations
function setupScrollAnimations() {
    // Animate sections on scroll
    gsap.from('.content-section', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.content-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // ScrollTrigger demos
    setupScrollTriggerDemos();
}

// Setup ScrollTrigger demos
function setupScrollTriggerDemos() {
    // Basic scroll trigger
    gsap.to("#st-box1", {
        x: 200,
        rotation: 360,
        scrollTrigger: {
            trigger: "#st-box1",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            markers: false
        }
    });
    
    // Pinned section
    ScrollTrigger.create({
        trigger: "#st-box2",
        pin: true,
        start: "top center",
        end: "+=300",
        onEnter: () => gsap.to("#st-box2", {scale: 1.2, duration: 0.5}),
        onLeave: () => gsap.to("#st-box2", {scale: 1, duration: 0.5})
    });
    
    // Scrubbed animation
    gsap.to("#st-box3", {
        y: 200,
        rotation: 180,
        borderRadius: "50%",
        scrollTrigger: {
            trigger: "#st-box3",
            start: "top 80%",
            end: "bottom 20%",
            scrub: true
        }
    });
    
    // Reveal scroll trigger boxes
    gsap.set(".scroll-trigger-box", {opacity: 0, y: 50});
    
    ScrollTrigger.batch(".scroll-trigger-box", {
        onEnter: (elements) => {
            gsap.to(elements, {
                opacity: 1, 
                y: 0, 
                duration: 1, 
                stagger: 0.2,
                ease: "power2.out"
            });
        }
    });
}

// Theme toggle
// function setupThemeToggle() {
//     const themeToggle = document.getElementById('theme-toggle');
    
//     themeToggle.addEventListener('click', function() {
//         if (currentTheme === 'dark') {
//             document.body.classList.add('light-theme');
//             themeToggle.textContent = '☀️';
//             currentTheme = 'light';
//         } else {
//             document.body.classList.remove('light-theme');
//             themeToggle.textContent = '🌙';
//             currentTheme = 'dark';
//         }
//     });
// }

// Mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const sidebar = document.getElementById('sidebar');
    
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

// Initialize all demos
function initializeAllDemos() {
    // Reset all demo elements to initial state
    gsap.set(".demo-box", {x: 0, y: 0, rotation: 0, scale: 1});
    gsap.set(".stagger-item", {scale: 1, opacity: 1});
    
    // Set up DrawSVG initial state
    gsap.set("#svg-path, #svg-circle", {drawSVG: "0%"});
}

// Demo Functions
function runBasicDemo() {
    // Reset positions first
    gsap.set("#basic-box, #basic-box2, #basic-box3", {
        x: 0, y: 0, rotation: 0, scale: 1, opacity: 1
    });
    
    // gsap.to()
    gsap.to("#basic-box", {
        x: 200,
        rotation: 360,
        duration: 2,
        ease: "power2.out"
    });
    
    // gsap.from()
    gsap.from("#basic-box2", {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "bounce.out"
    });
    
    // gsap.fromTo()
    gsap.fromTo("#basic-box3", 
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
    );
}

function runTimelineDemo() {
    // Reset positions
    gsap.set("#tl-box1, #tl-box2, #tl-box3", {
        x: 0, y: 0, rotation: 0
    });
    
    const tl = gsap.timeline();
    
    tl.to("#tl-box1", { x: 100, duration: 1, ease: "power2.out" })
      .to("#tl-box2", { y: 100, duration: 1, ease: "power2.out" }, "-=0.5")
      .to("#tl-box3", { rotation: 360, duration: 1, ease: "power2.out" }, "+=0.2");
}

function runStaggerDemo() {
    gsap.from(".stagger-item", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: {
            amount: 1.5,
            from: "center",
            grid: [3, 3]
        },
        ease: "back.out(1.7)"
    });
}

function runDrawSVGDemo() {
    // Reset SVG
    gsap.set("#svg-path, #svg-circle", {drawSVG: "0%"});
    
    const tl = gsap.timeline();
    
    tl.to("#svg-path", {
        drawSVG: "100%",
        duration: 2,
        ease: "power2.inOut"
    })
    .to("#svg-circle", {
        drawSVG: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    }, "-=1");
}

function initDraggable() {
    Draggable.create("#drag-box", {
        type: "x,y",
        bounds: ".drag-bounds",
        inertia: true,
        onDrag: function() {
            console.log("dragging");
        },
        onThrowUpdate: function() {
            console.log("throwing with inertia");
        }
    });
}

function runTextDemo() {
    // Reset text
    document.getElementById('typewriter').textContent = '';
    document.getElementById('counter').textContent = '0';
    
    // Typewriter effect
    gsap.to("#typewriter", {
        text: "Welcome to GSAP! This is amazing!",
        duration: 3,
        ease: "none"
    });
    
    // Counter animation
    gsap.to("#counter", {
        textContent: 1000,
        duration: 2,
        snap: { textContent: 1 },
        ease: "power2.out"
    });
}

function createDevTools() {
    // Reset
    gsap.set("#devtools-box", {x: 0, y: 0, rotation: 0});
    
    const tl = gsap.timeline({paused: true});
    tl.to("#devtools-box", { x: 200, duration: 1, ease: "power2.out" })
      .to("#devtools-box", { y: 100, duration: 1, ease: "power2.out" })
      .to("#devtools-box", { rotation: 360, duration: 1, ease: "power2.out" });
    
    // Create GSDevTools
    GSDevTools.create({
        animation: tl,
        globalSync: false,
        minimal: true
    });
    
    tl.play();
}

// Utility Functions
function toggleCode(codeId) {
    const codeBlock = document.getElementById(codeId);
    codeBlock.classList.toggle('active');
}

function copyCode(codeId) {
    const codeBlock = document.getElementById(codeId);
    const code = codeBlock.querySelector('code').textContent;
    
    navigator.clipboard.writeText(code).then(function() {
        // Show feedback
        showToast('Code copied to clipboard!');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-primary);
        color: var(--bg-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        font-weight: 600;
        z-index: 10000;
        box-shadow: var(--shadow);
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    gsap.from(toast, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
    });
    
    // Remove after delay
    setTimeout(() => {
        gsap.to(toast, {
            x: 100,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                document.body.removeChild(toast);
            }
        });
    }, 2000);
}

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Performance optimization
ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});
