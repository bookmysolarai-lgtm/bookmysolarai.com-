// Sticky Navbar on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation using Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once revealed
        }
    });
}, revealOptions);

revealElements.forEach(element => {
    revealOnScroll.observe(element);
});

// Simulate new incoming calls in the dashboard mockup
const callLogContainer = document.querySelector('.call-log');

const mockCalls = [
    { name: "Sarah Jenkins (Nevada)", speed: "38 seconds", status: "Qualified", type: "success" },
    { name: "Michael Carter (California)", speed: "55 seconds", status: "Booked", type: "success" },
    { name: "Robert Lewis (Texas)", speed: "42 seconds", status: "Not Interested", type: "warning" }
];

let callIndex = 0;

function addNewCall() {
    if(!callLogContainer) return;
    
    if (callIndex < mockCalls.length) {
        const call = mockCalls[callIndex];
        
        const callHTML = `
            <div class="log-item" style="opacity: 0; transform: translateY(-10px); transition: all 0.5s ease;">
                <div class="log-icon"><i class="fa-solid fa-phone-volume"></i></div>
                <div class="log-details">
                    <strong>${call.name}</strong>
                    <span>Speed to lead: ${call.speed}</span>
                </div>
                <div class="tag ${call.type}">${call.status}</div>
            </div>
        `;
        
        // Add to top of list
        callLogContainer.insertAdjacentHTML('afterbegin', callHTML);
        
        // Trigger reflow & animate in
        setTimeout(() => {
            const newItem = callLogContainer.firstElementChild;
            newItem.style.opacity = '1';
            newItem.style.transform = 'translateY(0)';
        }, 50);
        
        // Remove oldest if there are more than 3
        if (callLogContainer.children.length > 3) {
            const lastChild = callLogContainer.lastElementChild;
            lastChild.style.opacity = '0';
            setTimeout(() => {
                callLogContainer.removeChild(lastChild);
            }, 500);
        }
        
        callIndex = (callIndex + 1) % mockCalls.length;
    }
}

// Add a new call every 5 seconds for visual effect
setInterval(addNewCall, 5000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const yOffset = -80; // Account for fixed navbar
            const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    });
});
