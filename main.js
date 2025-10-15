document.addEventListener('DOMContentLoaded', () => {
    // Replace feather icons
    if (window.feather) {
        feather.replace();
    }

    // Animate cards with .card-hover
    animateCards('.card-hover', 'card-animate', 'card-animate-in', 100);

    // Animate project items with .project-item
    animateProjectItems();

    // Set current year in footer
    setCurrentYear('currentYear');

    // Contact form handling
    handleContactForm('contactForm', 'submitBtn', 'formMessage');
});

// Helper: Animate cards by toggling classes
function animateCards(selector, initialClass, animateInClass, delay) {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, index) => {
        card.classList.add(initialClass);
        setTimeout(() => {
            card.classList.add(animateInClass);
        }, delay * index);
    });
}

// Helper: Animate project items with direct style manipulation
function animateProjectItems() {
    const projects = document.querySelectorAll('.project-item');
    projects.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 150 * index);
    });
}

// Helper: Set current year in footer
function setCurrentYear(spanId) {
    const yearSpan = document.getElementById(spanId);
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Helper: Handle contact form submission
function handleContactForm(formId, btnId, msgId) {
    const contactForm = document.getElementById(formId);
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById(btnId);
        const formMessage = document.getElementById(msgId);

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        formMessage.classList.add('hidden');

        fetch('https://formsubmit.co/ajax/6f2d0c3575e2310a918c8439560f4636', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                _subject: "New Contact Form Submission"
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.classList.remove('hidden', 'text-red-500');
                formMessage.classList.add('text-green-500');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            formMessage.textContent = 'Failed to send message. Please try again.';
            formMessage.classList.remove('hidden', 'text-green-500');
            formMessage.classList.add('text-red-500');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        });
    });
}