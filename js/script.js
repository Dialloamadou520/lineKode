// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Sticky Navbar on Scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Construire le message WhatsApp
        let whatsappMessage = '📞 *Nouveau message de contact - Linekode*\n\n';
        whatsappMessage += '👤 *Nom:* ' + name + '\n';
        whatsappMessage += '📧 *Email:* ' + email + '\n';
        if (phone) whatsappMessage += '📱 *Téléphone:* ' + phone + '\n';
        whatsappMessage += '📋 *Sujet:* ' + subject + '\n\n';
        whatsappMessage += '💬 *Message:*\n' + message;
        
        // Encoder le message pour l'URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Numéro WhatsApp (format international sans le +)
        const whatsappNumber = '221773525382';
        
        // Créer l'URL WhatsApp
        const whatsappURL = 'https://api.whatsapp.com/send?phone=' + whatsappNumber + '&text=' + encodedMessage;
        
        // Ouvrir WhatsApp dans un nouvel onglet
        window.open(whatsappURL, '_blank');
    });
}

// Smooth Scroll for Anchor Links
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

// Animate elements on scroll
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

// Observe elements with animation
const animateElements = document.querySelectorAll('.feature-box, .testimonial-card, .course-card, .value-card, .team-member, .stat-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Animate stat numbers when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            if (number) {
                entry.target.textContent = '0';
                animateCounter(entry.target, number);
                // Add back any non-numeric characters
                setTimeout(() => {
                    entry.target.textContent = text;
                }, 2000);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Add active class to current page in navigation
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentLocation || (currentLocation === '' && linkPath === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Form validation enhancement
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#d1d5db';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#0ea5e9';
    });
});

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add loading state to buttons
const buttons = document.querySelectorAll('button[type="submit"]');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.form && this.form.checkValidity()) {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
                this.disabled = false;
            }, 2000);
        }
    });
});

// ===== Modal d'inscription =====
const inscriptionModal = document.getElementById('inscriptionModal');
const inscriptionForm = document.getElementById('inscriptionForm');
const inscriptionSuccess = document.getElementById('inscriptionSuccess');
const openModalButtons = document.querySelectorAll('.open-inscription-modal');
const closeModalButton = document.querySelector('.modal-close');

// Ouvrir la modal
function openInscriptionModal(e) {
    if (e) e.preventDefault();
    inscriptionModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fermer la modal
function closeInscriptionModal() {
    inscriptionModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Réinitialiser le formulaire après fermeture
    setTimeout(() => {
        inscriptionForm.reset();
        inscriptionSuccess.classList.remove('show');
        inscriptionForm.style.display = 'block';
        // Retirer toutes les erreurs
        document.querySelectorAll('.modal-form .error-message').forEach(error => {
            error.classList.remove('show');
        });
        document.querySelectorAll('.modal-form input, .modal-form select').forEach(input => {
            input.classList.remove('error');
        });
    }, 300);
}

// Ajouter les événements aux boutons d'ouverture
openModalButtons.forEach(button => {
    button.addEventListener('click', openInscriptionModal);
});

// Fermer avec le bouton X
if (closeModalButton) {
    closeModalButton.addEventListener('click', closeInscriptionModal);
}

// Fermer en cliquant en dehors de la modal
inscriptionModal.addEventListener('click', (e) => {
    if (e.target === inscriptionModal) {
        closeInscriptionModal();
    }
});

// Fermer avec la touche Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && inscriptionModal.classList.contains('active')) {
        closeInscriptionModal();
    }
});

// Validation du formulaire d'inscription
if (inscriptionForm) {
    inscriptionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Valider tous les champs requis
        const requiredFields = inscriptionForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            const errorMessage = field.parentElement.querySelector('.error-message');
            
            if (field.type === 'checkbox') {
                if (!field.checked) {
                    isValid = false;
                    if (errorMessage) errorMessage.classList.add('show');
                    field.classList.add('error');
                } else {
                    if (errorMessage) errorMessage.classList.remove('show');
                    field.classList.remove('error');
                }
            } else if (field.value.trim() === '') {
                isValid = false;
                if (errorMessage) errorMessage.classList.add('show');
                field.classList.add('error');
            } else {
                if (errorMessage) errorMessage.classList.remove('show');
                field.classList.remove('error');
            }
        });
        
        // Validation email
        const emailField = document.getElementById('email_inscription');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField && !emailRegex.test(emailField.value)) {
            isValid = false;
            const errorMessage = emailField.parentElement.querySelector('.error-message');
            if (errorMessage) errorMessage.classList.add('show');
            emailField.classList.add('error');
        }
        
        if (isValid) {
            // Récupérer les données du formulaire
            const prenom = document.getElementById('prenom').value;
            const nom = document.getElementById('nom').value;
            const email = emailField.value;
            const telephone = document.getElementById('telephone').value;
            const age = document.getElementById('age').value;
            const formation = document.getElementById('formation').value;
            const niveau = document.getElementById('niveau').value;
            const motivation = document.getElementById('motivation').value;
            const newsletter = document.getElementById('newsletter').checked;
            
            // Construire le message WhatsApp
            let message = `🎓 *Nouvelle inscription - Linekode*\n\n`;
            message += `👤 *Nom complet:* ${prenom} ${nom}\n`;
            message += `📧 *Email:* ${email}\n`;
            message += `📱 *Téléphone:* ${telephone}\n`;
            if (age) message += `🎂 *Âge:* ${age} ans\n`;
            message += `📚 *Formation:* ${formation}\n`;
            message += `📊 *Niveau:* ${niveau}\n`;
            if (motivation) message += `💭 *Motivation:* ${motivation}\n`;
            message += `📬 *Newsletter:* ${newsletter ? 'Oui' : 'Non'}\n`;
            
            // Encoder le message pour l'URL
            const encodedMessage = encodeURIComponent(message);
            
            // Numéro WhatsApp (format international sans le +)
            const whatsappNumber = '221773525382';
            
            // Créer l'URL WhatsApp (api.whatsapp.com est plus fiable)
            const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
            
            // Ouvrir WhatsApp dans un nouvel onglet
            window.open(whatsappURL, '_blank');
            
            // Afficher le message de succès
            inscriptionForm.style.display = 'none';
            inscriptionSuccess.classList.add('show');
            
            // Scroll vers le haut de la modal
            document.querySelector('.modal-content').scrollTop = 0;
        } else {
            // Scroll vers la première erreur
            const firstError = inscriptionForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Retirer les erreurs lors de la saisie
    const formInputs = inscriptionForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorMessage = this.parentElement.querySelector('.error-message');
            if (errorMessage) errorMessage.classList.remove('show');
            this.classList.remove('error');
        });
        
        input.addEventListener('change', function() {
            const errorMessage = this.parentElement.querySelector('.error-message');
            if (errorMessage) errorMessage.classList.remove('show');
            this.classList.remove('error');
        });
    });
}

// Console welcome message
console.log('%cBienvenue sur Linekode! 🚀', 'color: #0284c7; font-size: 20px; font-weight: bold;');
console.log('%cSite développé avec HTML, CSS et JavaScript', 'color: #6b7280; font-size: 14px;');
