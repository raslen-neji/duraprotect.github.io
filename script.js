 // Loading Animation
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');

// Simulate loading progress with more realistic steps
let progress = 0;
const loadingSteps = [
  { step: 10, delay: 200 },
  { step: 25, delay: 300 },
  { step: 40, delay: 400 },
  { step: 60, delay: 500 },
  { step: 75, delay: 600 },
  { step: 90, delay: 700 },
  { step: 100, delay: 800 }
];

let currentStep = 0;

function updateLoading() {
  if (currentStep < loadingSteps.length) {
    const { step, delay } = loadingSteps[currentStep];
    progress = step;
    loadingProgress.style.width = `${progress}%`;
    currentStep++;
    
    if (progress >= 100) {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          initPage();
        }, 1000);
      }, 500);
    } else {
      setTimeout(updateLoading, delay);
    }
  }
}

// Start loading animation
setTimeout(updateLoading, 500);

// Initialize page after loading
function initPage() {
  animateText();
  animateStats();
  if (window.innerWidth > 600) {
  initParticleBackground();}
    initScrollAnimations();
  initLanguageSwitcher();
  
  // Add animation to logo after load
  const logo = document.getElementById('l1');
  setTimeout(() => {
    logo.style.transform = 'rotateY(360deg)';
    logo.style.transition = 'transform 1.5s ease';
  }, 500);
}

// Animate statistics numbers with smoother animation
function animateStats() {
  const stat1 = document.getElementById('stat1');
  const stat2 = document.getElementById('stat2');
  const stat3 = document.getElementById('stat3');
  const stat4 = document.getElementById('stat4');
  
  const targetValues = [5, 12, 98, 50];
  const durations = [2000, 2500, 1800, 3000];
  
  animateNumber(stat1, targetValues[0], durations[0], '+');
  animateNumber(stat2, targetValues[1], durations[1], '+');
  animateNumber(stat3, targetValues[2], durations[2], '%');
  animateNumber(stat4, targetValues[3], durations[3], '+');
}

function animateNumber(element, target, duration, suffix = '') {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      clearInterval(timer);
      current = target;
    }
    element.textContent = Math.floor(current) + suffix;
    
    // Add bounce effect when reaching certain milestones
    if (Math.floor(current) % 10 === 0 || current >= target) {
      element.style.transform = 'scale(1.2) translateZ(20px)';
      setTimeout(() => {
        element.style.transform = 'scale(1) translateZ(20px)';
      }, 200);
    }
  }, 16);
}

// Professional Text Animation with 3D effect
function animateText() {
  const titleText = document.getElementById('title').textContent;
  const subtitleText = document.getElementById('subtitle').textContent;
  
  const title = document.getElementById('title');
  const subtitle = document.getElementById('subtitle');
  
  // Clear existing content
  title.innerHTML = '';
  subtitle.innerHTML = '';
  
  // Animate title with 3D effect
  for (let i = 0; i < titleText.length; i++) {
    const char = document.createElement('span');
    char.className = 'char';
    char.textContent = titleText[i];
    char.style.transitionDelay = `${i * 0.05}s`;
    char.style.transformOrigin = 'bottom center';
    title.appendChild(char);
    
    // Special styling for space
    if (titleText[i] === ' ') {
      char.style.padding = '0 5px';
    }
  }
  
  // Animate subtitle with 3D effect
  for (let i = 0; i < subtitleText.length; i++) {
    const char = document.createElement('span');
    char.className = 'char';
    char.textContent = subtitleText[i];
    char.style.transitionDelay = `${0.5 + i * 0.03}s`;
    char.style.transformOrigin = 'bottom center';
    subtitle.appendChild(char);
    
    if (subtitleText[i] === ' ') {
      char.style.padding = '0 2px';
    }
  }
  
  // Trigger animation
  setTimeout(() => {
    document.querySelectorAll('#title .char').forEach(char => {
      char.classList.add('visible');
    });
  }, 300);
  
  setTimeout(() => {
    document.querySelectorAll('#subtitle .char').forEach(char => {
      char.classList.add('visible');
    });
  }, 800);
  
  // Add continuous subtle animation to title
  setInterval(() => {
    const chars = document.querySelectorAll('#title .char');
    chars.forEach((char, index) => {
      const delay = index * 0.1;
      setTimeout(() => {
        char.style.transform = 'translateY(-3px) rotateX(10deg)';
        setTimeout(() => {
          char.style.transform = 'translateY(0) rotateX(0)';
        }, 500);
      }, delay * 1000);
    });
  }, 5000);
}

// Dark mode toggle with smooth transition
const toggleBtn = document.querySelector('.toggle-mode');
const mobileToggleBtn = document.querySelector('.mobile-toggle');
const body = document.body;

function toggleDarkMode() {
  body.classList.toggle('dark');
  body.classList.toggle('light');
  const isDark = body.classList.contains('dark');
  
  // Update button text and icon
  const icon = isDark ? 'fa-moon' : 'fa-sun';
  const text = isDark ? 'Dark' : 'Light';
  
  toggleBtn.innerHTML = `<i class="fas ${icon}"></i><span>${text}</span>`;
  
  if (mobileToggleBtn) {
    mobileToggleBtn.innerHTML = `<i class="fas ${icon}"></i><span>${text} Mode</span>`;
  }
  
  // Add transition class for smooth change
  document.documentElement.style.transition = 'background 0.5s ease, color 0.5s ease';
  setTimeout(() => {
    document.documentElement.style.transition = '';
  }, 500);
}

toggleBtn.addEventListener('click', toggleDarkMode);
if (mobileToggleBtn) {
  mobileToggleBtn.addEventListener('click', toggleDarkMode);
}

// Reasons Panel Toggle with 3D effect
const whyBtn = document.getElementById('whyBtn');
const reasonsPanel = document.getElementById('reasonsPanel');
const panelOverlay = document.getElementById('panelOverlay');
const closePanel = document.getElementById('closePanel');

whyBtn.addEventListener('click', () => {
  reasonsPanel.classList.add('active');
  panelOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Add animation to reason items
  const reasonItems = document.querySelectorAll('.reason-item');
  reasonItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.transform = 'translateX(0) rotateY(0)';
      item.style.opacity = '1';
    }, index * 100);
  });
});

closePanel.addEventListener('click', () => {
  reasonsPanel.classList.remove('active');
  panelOverlay.classList.remove('active');
  document.body.style.overflow = '';
});

panelOverlay.addEventListener('click', () => {
  reasonsPanel.classList.remove('active');
  panelOverlay.classList.remove('active');
  document.body.style.overflow = '';
});

// Chatbot toggle with 3D animation
const chatbotTrigger= document.getElementById('chatbotTrigger');
const chatbot= document.getElementById('chatbot');
const chatbotClose=document.getElementById('chatbotClose');
const chatbotMessages=document.getElementById('chatbotMessages');
const chatbotInput=document.getElementById('chatbotInput');
const chatbotSend=document.getElementById('chatbotSend');
let chatbotVisible= false
function toggleChatbot(){
  chatbotVisible= !chatbotVisible;
  if(chatbotVisible){
    chatbot.classList.add('chatbot-visible');
    setTimeout(()=>{
      chatbotInput.focus()
    },100);
  }
  else{
    chatbot.classList.remove('chatbot-visible');
  }
}
chatbotTrigger.addEventListener('click', toggleChatbot);
chatbotClose.addEventListener('click',toggleChatbot);
function addMessage(text,isUser){
  if(chatbotMessages==null)return;
  const messageDiv=document.createElement('div');
  messageDiv.classList.add('message',isUser? 'user-message':'bot-message');
  messageDiv.innerHTML=text;
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  messageDiv.style.transform= isUser?
  'perspective(1000px) rotateY(10deg) translateX(10px)' :
        'perspective(1000px) rotateY(-10deg) translateX(-10px)';
        setTimeout(()=>{
          messageDiv.style.transform='perspective(1000px) rotateY(0) translateX(0)';
        },300);
        
}
const menuOptions = {
  "1": "Pour voir nos produits : Cliquez sur 'Produits' dans le menu de navigation. Vous y trouverez : Maison Intelligente, Éclairage Intelligent, Installation Réseau, Vidéosurveillance, Alarme Professionnelle, et Systèmes d'Intrusion.",
  "2": "Pour découvrir nos services : Cliquez sur 'Services' dans le menu. Nos services incluent : Sécurité, Vidéosurveillance, Domotique, Éclairage Intelligent, Réseaux, et Contrôle d'Accès.",
  "3":"Pour postuler : Allez dans la section 'Carrières'. Remplissez le formulaire en sélectionnant 'Demande de stage', 'Candidature pour emploi' ou 'Candidature spontanée'.",
  "4": "Pour nous contacter : Allez dans la section 'Contact' ou notez directement : 📞 +216 29179533 / +216 58913153 ✉️ contact@duraprotect.com",
  "5": "Pour un devis : Utilisez le formulaire de contact en sélectionnant 'Demande de devis' ou appelez-nous au +216 29179533 pour une estimation personnalisée.",
  "6" : "Pour nous localiser : Allez dans la section 'Contact' pour voir notre adresse : Bhar Lazreg, La Marsa, Tunisie et notre carte Google Maps interactive.",
  "7" : "Pour découvrir DuraProtect : Cliquez sur 'À propos' dans le menu. Vous y trouverez notre histoire, nos valeurs et notre expertise.",
  "8" : "Pour le support technique : Contactez-nous au +216 29179533 ou par email à support@duraprotect.com pour toute assistance.",
  "9" : "En cas d'urgence : Composez immédiatement le +216 29179533 pour une intervention rapide et un support d'urgence 24/7.",
  "0" : "Pour voir nos engagements : Parcourez la section principale de la page d'accueil où nous présentons nos engagements qualité et notre philosophie de service."
};

// Display initial menu when chatbot opens
function showMenu() {
  addMessage("🤖 Bienvenue sur DuraProtect !<br>Je vous guide sur le site :<br><br>1: Voir tous nos produits<br>2: Découvrir nos services<br>3: Postuler (stage/emploi)<br>4: Nous contacter<br>5: Demander un devis<br>6: Voir notre localisation<br>7: En savoir plus sur nous<br>8: Support technique<br>9: Urgence<br>0: Voir les engagements",
    false
  );
}
function handleUserInput() {
  const userText = chatbotInput.value.trim();
  if (!userText) return;
  
  addMessage(userText, true);
  chatbotInput.value = "";

  if (menuOptions[userText]) {
    // If user enters a number, show corresponding response
    setTimeout(() => addMessage(menuOptions[userText], false), 300);
    setTimeout(() => addMessage("<br>1: Voir tous nos produits<br>2: Découvrir nos services<br>3: Postuler (stage/emploi)<br>4: Nous contacter<br>5: Demander un devis<br>6: Voir notre localisation<br>7: En savoir plus sur nous<br>8: Support technique<br>9: Urgence<br>0: Voir les engagements", false), 300);
  } else {
    // If invalid input
    setTimeout(() => addMessage("Veuillez choisir un numéro valide (1-4). <br>  Choisissez une option: <br> 1: Produits <br> 2: Services <br> 3: Contact <br> 4: Urgence", false), 300);
  }
}

// Event listeners for send
chatbotSend.addEventListener("click", handleUserInput);
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleUserInput();
});

// Show menu automatically when chatbot opens
chatbotTrigger.addEventListener("click", showMenu);
// Particle background animation with interactive elements
function initParticleBackground() {
  const canvas = document.getElementById('animated-bg');
  const ctx = canvas.getContext('2d');
  const config = {
    particleCount: 100,
    particleMaxSize: 3,
    lineLength: 150,
    baseSpeed: 0.3,
    color: '#00d848',
    blur: 5
  };

  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * config.particleMaxSize + 0.5;
      this.density = (Math.random() * 30) + 1;
      this.speed = config.baseSpeed * (0.5 + Math.random() * 0.5);
      this.direction = Math.random() * Math.PI * 2;
      this.color = `hsla(${Math.random() * 60 + 180}, 80%, 60%, ${Math.random() * 0.5 + 0.3})`;
    }
    
    update() {
      this.direction += (Math.random() - 0.5) * 0.1;
      this.x += Math.cos(this.direction) * this.speed;
      this.y += Math.sin(this.direction) * this.speed;

      if (this.x < 0 || this.x > canvas.width) this.direction = Math.PI - this.direction;
      if (this.y < 0 || this.y > canvas.height) this.direction = -this.direction;

      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirection = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= Math.cos(forceDirection) * force * this.speed * 5;
          this.y -= Math.sin(forceDirection) * force * this.speed * 5;
          
          // Change color when near mouse
          this.color = `hsla(${Math.random() * 60 + 180}, 90%, 70%, 0.8)`;
        } else {
          // Return to original color
          this.color = `hsla(${Math.random() * 60 + 180}, 20%, 0%, ${Math.random() * 0.5 + 0.3})`;
        }
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.fillStyle = '#00d848';
      ctx.shadowColor = this.color;
      ctx.shadowBlur = config.blur;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < config.lineLength) {
          const opacity = 1 - dist / config.lineLength;
          ctx.beginPath();
          ctx.strokeStyle = `hsla(200, 80%, 60%, ${opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  animate();
}

// Navigation and Sections Management with smooth transitions
const navLinks = document.querySelectorAll('.nav-link');
const homeContent = document.getElementById('homeContent');
const aboutSection = document.getElementById('about');
const servicesSection = document.getElementById('services');
const productsSection = document.getElementById('products');
const careersSection = document.getElementById('careers');
const contactUsBtn = document.getElementById('contactUsBtn');

// Initialize all sections as inactive except home
aboutSection.classList.remove('active');
servicesSection.classList.remove('active');
productsSection.classList.remove('active');
careersSection.classList.remove('active');

function showSection(sectionId) {
  // Hide all sections first with animation
  homeContent.classList.add('hidden');
  aboutSection.classList.remove('active');
  servicesSection.classList.remove('active');
  productsSection.classList.remove('active');
  careersSection.classList.remove('active');
  
  // Remove active class from all links
  navLinks.forEach(l => l.classList.remove('active'));
  
  // Add active class to clicked link
  document.querySelector(`.nav-link[data-section="${sectionId}"]`).classList.add('active');
  document.querySelector(`.mobile-menu .nav-link[data-section="${sectionId}"]`).classList.add('active');
  
  // Show the selected section with animation
  if (sectionId === 'about') {
    aboutSection.classList.add('active');
    // Animate about cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('active');
      }, 200 * index);
    });
  } else if (sectionId === 'services') {
    servicesSection.classList.add('active');
    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('active');
      }, 200 * index);
    });
  } else if (sectionId === 'products') {
    productsSection.classList.add('active');
    // Animate product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('active');
      }, 200 * index);
    });
  } else if (sectionId === 'careers') {
    careersSection.classList.add('active');
  } else if (sectionId === 'home') {
    homeContent.classList.remove('hidden');
  }
  
  // Close mobile menu if open
  closeMobileMenu();
  
  // Scroll to top with smooth animation
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    showSection(sectionId);
  });
});

// Contact Us Button
contactUsBtn.addEventListener('click', () => {
  // Scroll to contact section
  const contactSection = document.querySelector('.engagements-container:last-child');
  if (contactSection) {
    window.scrollTo({
      top: contactSection.offsetTop - 100,
      behavior: 'smooth'
    });
  }
});

// Career Form Handling with animation
/*const careerForm = document.getElementById('careerForm');
if (careerForm) {
  careerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading animation
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      // Show success animation
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Envoyé!';
      submitBtn.style.background = '#4CAF50';
      
      // Reset form
      setTimeout(() => {
        careerForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'message bot-message';
        successDiv.textContent = 'Votre candidature a été envoyée avec succès! Nous vous contacterons bientôt.';
        careerForm.parentNode.insertBefore(successDiv, careerForm.nextSibling);
        
        // Animate success message
        setTimeout(() => {
          successDiv.style.opacity = '1';
          successDiv.style.transform = 'translateY(0)';
        }, 10);
      }, 1000);
    }, 2000);
  });
}*/

// Load job openings (mock data)
function loadJobOpenings() {
  const jobsList = document.querySelector('.jobs-list');
  if (!jobsList) return;
  
  // Mock data - replace with actual API call in production
  const jobs = [
    { title: "Technicien en sécurité", type: "CDI", ref: "TECH-2023" },
    { title: "Stagiaire en développement", type: "Stage 6 mois", ref: "DEV-2023" },
    { title: "Commercial B2B", type: "CDD 1 an", ref: "COM-2023" }
  ];
  
  // Clear existing content
  jobsList.innerHTML = '';
  
  // Add jobs to the list
  jobs.forEach(job => {
    const jobItem = document.createElement('div');
    jobItem.className = 'job-item';
    jobItem.innerHTML = `
      <div class="job-title">${job.title} <span class="job-type">${job.type}</span></div>
      <button class="apply-btn" data-ref="${job.ref}">Postuler</button>
    `;
    jobsList.appendChild(jobItem);
  });
  
  // Add event listeners to apply buttons
  document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const jobRef = this.getAttribute('data-ref');
      const applicationType = document.getElementById('applicationType');
      
      if (applicationType) {
        applicationType.value = jobRef.includes('TECH') || jobRef.includes('COM') ? 'emploi' : 'stage';
        applicationType.dispatchEvent(new Event('change'));
        
        // Scroll to form with animation
        const formElement = document.querySelector('.application-form');
        if (formElement) {
          window.scrollTo({
            top: formElement.offsetTop - 100,
            behavior: 'smooth'
          });
          
          // Highlight form
          formElement.style.boxShadow = '0 0 0 3px rgba(0, 216, 36, 0.5)';
          setTimeout(() => {
            formElement.style.boxShadow = '';
          }, 2000);
        }
      }
    });
  });
}

// Mobile Menu Toggle with 3D effect
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
  mobileMenuOverlay.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  
  // Animate menu items
  if (mobileMenu.classList.contains('active')) {
    const menuItems = document.querySelectorAll('.mobile-menu a, .mobile-menu button');
    menuItems.forEach((item, index) => {
      item.style.transform = 'translateX(100px) rotateY(90deg)';
      item.style.opacity = '0';
      setTimeout(() => {
        item.style.transform = 'translateX(0) rotateY(0)';
        item.style.opacity = '1';
      }, index * 100);
    });
  }
}

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Scroll to top button with smooth animation
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  // Add animation
  scrollToTopBtn.style.transform = 'scale(1.1) rotate(360deg)';
  setTimeout(() => {
    scrollToTopBtn.style.transform = 'scale(1) rotate(0)';
  }, 500);
});

// Scroll animations with intersection observer
function initScrollAnimations() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Add additional animation for specific elements
        if (entry.target.classList.contains('engagement-card')) {
          entry.target.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        } else {
          entry.target.style.transform = 'translateY(0)';
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
}

// Navbar scroll effect
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// Language Switcher with animation
function initLanguageSwitcher() {
  const languageButtons = document.querySelectorAll('.language-btn');
  
  // Check for saved language preference
  const savedLang = localStorage.getItem('duraprotect-lang');
  if (savedLang) {
    currentLang = savedLang;
    document.querySelector(`.language-btn[data-lang="${savedLang}"]`).classList.add('active');
    changeLanguage(savedLang);
  } else {
    // Default to French
    document.querySelector('.language-btn[data-lang="fr"]').classList.add('active');
  }
  
  languageButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      languageButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button with animation
      this.classList.add('active');
      this.style.transform = 'scale(1.2) rotateY(180deg)';
      
      setTimeout(() => {
        this.style.transform = 'scale(1.1) rotateY(0)';
      }, 300);
      
      // Change language
      const lang = this.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });
}

// Language translations object
const translations = {
  fr: {
    loadingText: "DuraProtect",
    loadingSubtext: "Chargement des solutions de sécurité intelligentes",
    nav: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      products: "Produits",
      careers: "Carrières"
    },
    stats: {
      years: "Années d'expérience",
      team: "Équipe professionnelle",
      satisfaction: "Satisfaction client",
      projects: "Projets réalisés"
    },
    contactBtn: "Contactez-nous",
    title: "DURAPROTECT",
    subtitle: "Solutions de sécurité innovantes pour protéger votre monde",
    whyBtn: "Pourquoi<br>DuraProtect",
    engagements: "Nos Engagements",
    engagementCards: [
      {
        title: "Protection Totale",
        text: "Protégez vos biens et vos proches avec nos systèmes de sécurité avancés"
      },
      {
        title: "Contrôle Intelligent",
        text: "Gardez la maîtrise de vos équipements où que vous soyez"
      },
      {
        title: "Automatisation",
        text: "Automatisez votre quotidien avec nos solutions intelligentes"
      },
      {
        title: "Innovation",
        text: "Intégration des dernières innovations technologiques"
      }
    ],
    contactTitle: "Contactez-nous",
    contactMethods: [
      {
        type: "Téléphone",
        values: ["+216 29179533", "+216 58913153"]
      },
      {
        type: "Email",
        values: ["contact@duraprotect.com", "support@duraprotect.com"]
      },
      {
        type: "Adresse",
        values: ["Bhar Lazreg, La Marsa, Tunisie"]
      }
    ],
    form: {
      name: "Entrez votre nom",
      email: "Entrez votre email",
      message: "Entrez votre message",
      submit: "Envoyer"
    },
    whyTitle: "Pourquoi choisir DuraProtect",
    reasons: [
      {
        title: "Expérience Professionnelle",
        text: "Notre expérience nous permet d'anticiper vos besoins et de vous proposer des solutions sur mesure, fiables et durables"
      },
      {
        title: "Haute qualité",
        text: "Nous nous engageons à fournir des services et des équipements de haute qualité, répondant aux normes les plus exigeantes du secteur"
      },
      {
        title: "Fiabilité",
        text: "Nous vous offrons des solutions de sécurité modernes, performantes et entièrement fiables, pour une tranquillité d'esprit au quotidien."
      },
      {
        title: "Flexibilité",
        text: "Nous proposons des solutions flexibles, parfaitement adaptées à vos besoins spécifiques et à l'évolution de vos exigences."
      }
    ],
    locationTitle: "Notre emplacement",
    about: {
      title: "À PROPOS",
      text: "DuraProtect est une entreprise spécialisée dans l'intégration de solutions intelligentes et sécurisées pour les particuliers, entreprises et collectivités. Avec plusieurs années d'expérience dans les domaines de la vidéosurveillance, de l'alarme, de la domotique, de l'éclairage intelligent et des réseaux, nous vous accompagnons dans tous vos projets, de l'étude à l'installation.",
      values: [
        {
          title: "Confiance",
          text: "Nous croyons que toute relation professionnelle solide repose sur la confiance. C'est pourquoi nous nous engageons à instaurer un climat de respect, d'écoute et de fiabilité, aussi bien en interne qu'avec nos clients."
        },
        {
          title: "Innovation",
          text: "Dans un monde en constante évolution, nous faisons de l'innovation un moteur de progrès. Nos équipes sont en veille permanente pour identifier, tester et intégrar les technologies les plus performantes du marché."
        },
        {
          title: "Transparence",
          text: "Nous prônons une transparence totale à chaque étape de nos projets. Qu'il s'agisse de nos offres, de nos délais ou de nos tarifs, tout est présenté avec clarté, sans zones d'ombre."
        }
      ]
    },
    services: {
      title: "Nos Services",
      intro: "Nous vous proposons une gamme complète de solutions de sécurité intelligentes et personnalisées, allant de la <strong>vidéosurveillance à l'installation d'alarmes</strong>, en passant par les <strong>systèmes de détection d'intrusion</strong>, l'<strong>éclairage connecté</strong> et les <strong>technologies de maison intelligente</strong>. Grâce à notre expertise et à l'intégration des dernières innovations, nous vous aidons à protéger efficacement vos biens, vos proches et vos espaces professionnels.",
      services: [
        {
          title: "Sécurité",
          text: "Solutions complètes de surveillance et protection pour votre domicile ou entreprise."
        },
        {
          title: "Vidéosurveillance",
          text: "Systèmes haute résolution avec accès distant et détection intelligente."
        },
        {
          title: "Domotique",
          text: "Automatisation et contrôle intelligent de votre habitat pour plus de confort."
        },
        {
          title: "Éclairage Intelligent",
          text: "Solutions d'éclairage connecté pour économie d'énergie et ambiance personnalisée."
        },
        {
          title: "Réseaux",
          text: "Installation et configuration de réseaux sécurisés et performants."
        },
        {
          title: "Contrôle d'Accès",
          text: "Systèmes avancés pour gérer les accès à vos locaux professionnels."
        }
      ]
    },
    products: {
      title: "Nos Produits",
      intro: "Découvrez notre gamme complète de produits intelligents pour votre maison et votre entreprise, conçus pour offrir sécurité, confort et efficacité énergétique.",
      products: [
        {
          title: "Smart House",
          text: "Une habitation équipée de technologies avancées qui permettent l'automatisation, la gestion centralisée et la connectivité des différents équipements domestiques."
        },
        {
          title: "Éclairage Intelligent",
          text: "Transforme la gestion de la lumière en une expérience personnalisée, économe et connectée. Grâce à des capteurs et des systèmes de commande à distance."
        },
        {
          title: "Installation Réseau",
          text: "Mise en place d'une infrastructure permettant la communication et le partage de ressources entre plusieurs dispositifs informatiques."
        },
        {
          title: "Vidéosurveillance Intelligente",
          text: "Protège efficacement les personnes, les biens et les locaux grâce à des caméras connectées, intelligentes et pilotables à distance."
        },
        {
          title: "Alarme Professionnelle",
          text: "Une étape essentielle pour garantir la sécurité de votre domicile, de vos locaux commerciaux ou industriels."
        },
        {
          title: "Système d'Intrusion",
          text: "Grâce à une combinaison de capteurs intelligents, de centrales de traitement et d'un pilotage à distance, protège efficacement les bâtiments résidentiels, commerciaux et industriels."
        }
      ]
    },
    careers: {
      title: "Rejoignez notre équipe",
      intro: "Postulez en ligne pour un stage, un emploi ou envoyez une candidature spontanée",
      form: {
        applicationType: "Type de candidature",
        selectOption: "-- Sélectionnez --",
        options: [
          "Demande de stage",
          "Candidature pour emploi",
          "Candidature spontanée"
        ],
        fullName: "Nom complet",
        email: "Email",
        phone: "Téléphone",
        cv: "CV (PDF, max 2MB)",
        motivation: "Lettre de motivation",
        submit: "Envoyer la candidature",
        sending: "Envoi en cours...",
        sent: "Envoyé!"
      },
      openings: "Offres d'emploi actuelles",
      jobs: [
        {
          title: "Technicien en sécurité",
          type: "CDI - Temps plein",
          button: "Postuler"
        },
        {
          title: "Commercial B2B",
                    type: "CDD 1 an",
          button: "Postuler"
        },
        {
          title: "Stagiaire en développement",
          type: "Stage 6 mois",
          button: "Postuler"
        }
      ]
    }
  },
  en: {
    loadingText: "DuraProtect",
    loadingSubtext: "Loading smart security solutions",
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      products: "Products",
      careers: "Careers"
    },
    stats: {
      years: "Years of experience",
      team: "Professional team",
      satisfaction: "Client satisfaction",
      projects: "Completed projects"
    },
    contactBtn: "Contact us",
    title: "DURAPROTECT",
    subtitle: "Innovative security solutions to protect your world",
    whyBtn: "Why<br>DuraProtect",
    engagements: "Our Commitments",
    engagementCards: [
      {
        title: "Total Protection",
        text: "Protect your property and loved ones with our advanced security systems"
      },
        {
        title: "Smart Control",
        text: "Keep control of your equipment wherever you are"
      },
      {
        title: "Automation",
        text: "Automate your daily life with our smart solutions"
      },
      {
        title: "Innovation",
        text: "Integration of the latest technological innovations"
      }
    ],
    contactTitle: "Contact us",
    contactMethods: [
      {
        type: "Phone",
        values: ["+216 29179533", "+216 58913153"]
      },
      {
        type: "Email",
        values: ["contact@duraprotect.com", "support@duraprotect.com"]
      },
      {
        type: "Address",
        values: ["Bhar Lazreg, La Marsa, Tunisia"]
      }
    ],
    form: {
      name: "Enter your name",
      email: "Enter your email",
      message: "Enter your message",
      submit: "Send"
    },
    whyTitle: "Why choose DuraProtect",
    reasons: [
      {
        title: "Professional Experience",
        text: "Our experience allows us to anticipate your needs and offer you tailor-made, reliable and durable solutions"
      },
      {
        title: "High quality",
        text: "We are committed to providing high quality services and equipment, meeting the most demanding standards in the industry"
      },
      {
        title: "Reliability",
        text: "We offer you modern, high-performance and completely reliable security solutions for peace of mind every day."
      },
      {
        title: "Flexibility",
        text: "We offer flexible solutions, perfectly adapted to your specific needs and the evolution of your requirements."
      }
    ],
    locationTitle: "Our location",
    about: {
      title: "ABOUT US",
      text: "DuraProtect is a company specialized in the integration of smart and secure solutions for individuals, businesses and communities. With several years of experience in the fields of video surveillance, alarms, home automation, smart lighting and networks, we support you in all your projects, from study to installation.",
      values: [
        {
          title: "Trust",
          text: "We believe that any strong professional relationship is based on trust. That's why we are committed to establishing a climate of respect, listening and reliability, both internally and with our customers."
        },
        {
          title: "Innovation",
          text: "In a constantly evolving world, we make innovation a driver of progress. Our teams are constantly on the lookout to identify, test and integrate the most efficient technologies on the market."
        },
        {
          title: "Transparency",
          text: "We advocate total transparency at every stage of our projects. Whether it's our offers, our deadlines or our prices, everything is presented clearly, without gray areas."
        }
      ]
    },
    services: {
      title: "Our Services",
      intro: "We offer you a complete range of smart and personalized security solutions, ranging from <strong>video surveillance to alarm installation</strong>, including <strong>intrusion detection systems</strong>, <strong>connected lighting</strong> and <strong>smart home technologies</strong>. Thanks to our expertise and the integration of the latest innovations, we help you effectively protect your property, your loved ones and your professional spaces.",
      services: [
        {
          title: "Security",
          text: "Complete surveillance and protection solutions for your home or business."
        },
        {
          title: "Video Surveillance",
          text: "High resolution systems with remote access and smart detection."
        },
        {
          title: "Home Automation",
          text: "Automation and smart control of your home for more comfort."
        },
        {
          title: "Smart Lighting",
          text: "Connected lighting solutions for energy savings and personalized ambiance."
        },
        {
          title: "Networks",
          text: "Installation and configuration of secure and efficient networks."
        },
        {
          title: "Access Control",
          text: "Advanced systems to manage access to your professional premises."
        }
      ]
    },
    products: {
      title: "Our Products",
      intro: "Discover our complete range of smart products for your home and business, designed to provide security, comfort and energy efficiency.",
      products: [
        {
          title: "Smart House",
          text: "A home equipped with advanced technologies that allow automation, centralized management and connectivity of various household equipment."
        },
        {
          title: "Smart Lighting",
          text: "Transforms light management into a personalized, economical and connected experience. Thanks to sensors and remote control systems."
        },
        {
          title: "Network Installation",
          text: "Implementation of an infrastructure allowing communication and resource sharing between several computer devices."
        },
        {
          title: "Smart Video Surveillance",
          text: "Effectively protects people, property and premises thanks to connected, intelligent and remotely controllable cameras."
        },
        {
          title: "Professional Alarm",
          text: "An essential step to guarantee the security of your home, your commercial or industrial premises."
        },
        {
          title: "Intrusion System",
          text: "Thanks to a combination of intelligent sensors, processing centers and remote control, effectively protects residential, commercial and industrial buildings."
        }
      ]
    },
    careers: {
      title: "Join our team",
      intro: "Apply online for an internship, a job or send a spontaneous application",
      form: {
        applicationType: "Application type",
        selectOption: "-- Select --",
        options: [
          "Internship request",
          "Job application", 
          "Spontaneous application"
        ],
        fullName: "Full name",
        email: "Email",
        phone: "Phone",
        cv: "CV (PDF, max 2MB)",
        motivation: "Cover letter",
        submit: "Send application",
        sending: "Sending...",
        sent: "Sent!"
      },
      openings: "Current job openings",
      jobs: [
        {
          title: "Security Technician",
          type: "Full-time permanent",
          button: "Apply"
        },
        {
          title: "B2B Sales Representative",
          type: "1-year contract",
          button: "Apply"
        },
        {
          title: "Development Intern",
          type: "6-month internship",
          button: "Apply"
        }
      ]
    }
  },
  ar: {
    loadingText: "دورا بروتكت",
    loadingSubtext: "تحميل حلول الأمان الذكية",
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      products: "المنتجات",
      careers: "الوظائف"
    },
    stats: {
      years: "سنوات الخبرة",
      team: "فريق محترف",
      satisfaction: "رضا العملاء",
      projects: "المشاريع المكتملة"
    },
    contactBtn: "اتصل بنا",
    title: "دورا بروتكت",
    subtitle: "حلول أمنية مبتكرة لحماية عالمك",
    whyBtn: "لماذا<br>دورا بروتكت",
    engagements: "التزاماتنا",
    engagementCards: [
      {
        title: "حماية شاملة",
        text: "احمي ممتلكاتك وأحبائك مع أنظمتنا الأمنية المتطورة"
      },
      {
        title: "تحكم ذكي",
        text: "حافظ على التحكم في معداتك أينما كنت"
      },
      {
        title: "أتمتة",
        text: "أتمتة حياتك اليومية مع حلولنا الذكية"
      },
      {
        title: "ابتكار",
        text: "دمج أحدث الابتكارات التكنولوجية"
      }
    ],
    contactTitle: "اتصل بنا",
    contactMethods: [
      {
        type: "هاتف",
        values: ["+216 29179533", "+216 58913153"]
      },
      {
        type: "بريد إلكتروني",
        values: ["contact@duraprotect.com", "support@duraprotect.com"]
      },
      {
        type: "عنوان",
        values: ["بحر الأزرق، المرسى، تونس"]
      }
    ],
    form: {
      name: "أدخل اسمك",
      email: "أدخل بريدك الإلكتروني",
      message: "أدخل رسالتك",
      submit: "إرسال"
    },
    whyTitle: "لماذا تختار دورا بروتكت",
    reasons: [
      {
        title: "الخبرة المهنية",
        text: "تتيح لنا خبرتنا توقع احتياجاتك وتقديم حلول مخصصة وموثوقة ودائمة"
      },
      {
        title: "جودة عالية",
        text: "نحن ملتزمون بتقديم خدمات ومعدات عالية الجودة تلبي أكثر المعايير صرامة في الصناعة"
      },
      {
        title: "موثوقية",
        text: "نقدم لك حلول أمنية حديثة وعالية الأداء وموثوقة تمامًا لراحة البال كل يوم."
      },
      {
        title: "مرونة",
        text: "نقدم حلولاً مرنة تتكيف تمامًا مع احتياجاتك المحددة وتطور متطلباتك."
      }
    ],
    locationTitle: "موقعنا",
    about: {
      title: "من نحن",
      text: "دورا بروتكت هي شركة متخصصة في تكامل الحلول الذكية والآمنة للأفراد والشركات والمجتمعات. مع سنوات من الخبرة في مجالات المراقبة بالفيديو والإنذار والأتمتة المنزلية والإضاءة الذكية والشبكات، ندعمك في جميع مشاريعك، من الدراسة إلى التثبيت.",
      values: [
        {
          title: "ثقة",
          text: "نعتقد أن أي علاقة مهنية قوية تقوم على الثقة. لهذا السبب نحن ملتزمون بإقامة مناخ من الاحترام والاستماع والموثوقية، سواء داخليًا أو مع عملائنا."
        },
        {
          title: "ابتكار",
          text: "في عالم يتطور باستمرار، نجعل الابتكار محركًا للتقدم. تقوم فرقنا بالبحث المستمر لتحديد واختبار ودمج أكثر التقنيات كفاءة في السوق."
        },
        {
          title: "شفافية",
          text: "نحن نؤيد الشفافية الكاملة في كل مرحلة من مراحل مشاريعنا. سواء كانت عروضنا أو مواعيدنا النهائية أو أسعارنا، يتم تقديم كل شيء بوضوح، دون مناطق رمادية."
        }
      ]
    },
    services: {
      title: "خدماتنا",
      intro: "نقدم لك مجموعة كاملة من حلول الأمان الذكية والمخصصة، بدءًا من <strong>المراقبة بالفيديو إلى تركيب الإنذار</strong>، بما في ذلك <strong>أنظمة كشف التسلل</strong>، و<strong>الإضاءة المتصلة</strong> و<strong>تقنيات المنزل الذكي</strong>. بفضل خبرتنا وتكامل أحدث الابتكارات، نساعدك على حماية ممتلكاتك وأحبائك ومساحاتك المهنية بشكل فعال.",
      services: [
        {
          title: "الأمان",
          text: "حلول المراقبة والحماية الكاملة لمنزلك أو عملك."
        },
        {
          title: "المراقبة بالفيديو",
          text: "أنظمة عالية الدقة مع وصول عن بعد وكشف ذكي."
        },
        {
          title: "الأتمتة المنزلية",
          text: "أتمتة والتحكم الذكي في منزلك لمزيد من الراحة."
        },
        {
          title: "الإضاءة الذكية",
          text: "حلول إضاءة متصلة لتوفير الطاقة وإضفاء أجواء مخصصة."
        },
        {
          title: "الشبكات",
          text: "تركيب وتكوين شبكات آمنة وفعالة."
        },
        {
          title: "التحكم في الوصول",
          text: "أنظمة متقدمة لإدارة الوصول إلى مبناك المهني."
        }
      ]
    },
    products: {
      title: "منتجاتنا",
      intro: "اكتشف مجموعتنا الكاملة من المنتجات الذكية لمنزلك وعملك، المصممة لتوفير الأمان والراحة وكفاءة الطاقة.",
      products: [
        {
          title: "منزل ذكي",
          text: "منزل مجهز بتقنيات متطورة تتيح الأتمتة والإدارة المركزية والتواصل بين مختلف المعدات المنزلية."
        },
        {
          title: "إضاءة ذكية",
          text: "يحول إدارة الإضاءة إلى تجربة مخصصة واقتصادية ومتصلة. بفضل أجهزة الاستشعار وأنظمة التحكم عن بعد."
        },
        {
          title: "تركيب الشبكة",
          text: "تنفيذ بنية تحتية تسمح بالاتصال ومشاركة الموارد بين عدة أجهزة كمبيوتر."
        },
        {
          title: "مراقبة بالفيديو الذكية",
          text: "تحمي الأشخاص والممتلكات والمباني بشكل فعال بفضل الكاميرات المتصلة والذكية والقابلة للتحكم عن بعد."
        },
        {
          title: "إنذار احترافي",
          text: "خطوة أساسية لضمان أمان منزلك أو مبناك التجاري أو الصناعي."
        },
        {
          title: "نظام التسلل",
          text: "بفضل مجموعة من أجهزة الاستشعار الذكية ومراكز المعالجة والتحكم عن بعد، يحمي المباني السكنية والتجارية والصناعية بشكل فعال."
        }
      ]
    },
    careers: {
      title: "انضم إلى فريقنا",
      intro: "تقدم بطلب عبر الإنترنت للتدريب أو الوظيفة أو أرسل طلبًا تلقائيًا",
      form: {
        applicationType: "نوع الطلب",
        selectOption: "-- اختر --",
        options: [
          "طلب تدريب",
          "طلب توظيف",
          "طلب تلقائي"
        ],
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        cv: "السيرة الذاتية (PDF، 2MB كحد أقصى)",
        motivation: "خطاب التحفيز",
        submit: "إرسال الطلب",
        sending: "جاري الإرسال...",
        sent: "تم الإرسال!"
      },
      openings: "الوظائف الشاغرة الحالية",
      jobs: [
        {
          title: "فني أمن",
          type: "دوام كامل دائم",
          button: "تقدم"
        },
        {
          title: "مندوب مبيعات B2B",
          type: "عقد سنة واحدة",
          button: "تقدم"
        },
        {
          title: "متدرب تطوير",
          type: "تدريب 6 أشهر",
          button: "تقدم"
        }
      ]
    }
  }
};

  let currentLang = 'fr';

    function changeLanguage(lang) {
      currentLang = lang;
      localStorage.setItem('duraprotect-lang', lang);
      
      // Update all translatable elements
      updateTextContent(lang);
      
      // Update direction for Arabic
      if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.body.classList.add('rtl');
      } else {
        document.documentElement.dir = 'ltr';
        document.body.classList.remove('rtl');
      }
      
      // Re-animate text after language change
      setTimeout(() => {
        animateText();
      }, 300);
    }

    function updateTextContent(lang) {
      const translation = translations[lang];
      
      // Update loading screen
      document.querySelector('.loading-text').textContent = translation.loadingText;
      document.querySelector('.loading-subtext').textContent = translation.loadingSubtext;
      
      // Update navigation
      document.querySelectorAll('.nav-link[data-section="home"]').forEach(el => el.textContent = translation.nav.home);
      document.querySelectorAll('.nav-link[data-section="about"]').forEach(el => el.textContent = translation.nav.about);
      document.querySelectorAll('.nav-link[data-section="services"]').forEach(el => el.textContent = translation.nav.services);
      document.querySelectorAll('.nav-link[data-section="products"]').forEach(el => el.textContent = translation.nav.products);
      document.querySelectorAll('.nav-link[data-section="careers"]').forEach(el => el.textContent = translation.nav.careers);
      
      // Update stats labels
      document.querySelectorAll('.stat-label').forEach((el, i) => {
        const labels = [
          translation.stats.years,
          translation.stats.team,
          translation.stats.satisfaction,
          translation.stats.projects
        ];
        el.textContent = labels[i];
      });
      
      // Update contact button
      document.getElementById('contactUsBtn').innerHTML = `<i class="fas fa-phone-alt"></i> ${translation.contactBtn}`;
      
      // Update main title and subtitle
      document.getElementById('title').textContent = translation.title;
      document.getElementById('subtitle').textContent = translation.subtitle;
      
      // Update why button
      document.getElementById('whyBtn').innerHTML = translation.whyBtn;
      
      // Update engagements section
      document.querySelector('.section-title').textContent = translation.engagements;
      document.querySelectorAll('.engagement-title').forEach((el, i) => el.textContent = translation.engagementCards[i].title);
      document.querySelectorAll('.engagement-text').forEach((el, i) => el.textContent = translation.engagementCards[i].text);
      
      // Update contact section
document.querySelectorAll('.contact-details').forEach((detailsEl, i) => {
  const values = translation.contactMethods[i].values;
  const pEls = detailsEl.querySelectorAll('p');
  pEls.forEach((pEl, j) => {
    pEl.innerHTML = values[j] || '';
  });
});
      // Update form placeholders
      document.getElementById('contactName').placeholder = translation.form.name;
      document.getElementById('contactEmail').placeholder = translation.form.email;
      document.getElementById('contactMessage').placeholder = translation.form.message;
      document.querySelector('.submit-btn').textContent = translation.form.submit;
      
      // Update why section
      document.querySelector('.reasons-panel h2').textContent = translation.whyTitle;
      document.querySelectorAll('.reason-content h3').forEach((el, i) => el.textContent = translation.reasons[i].title);
      document.querySelectorAll('.reason-content p').forEach((el, i) => el.textContent = translation.reasons[i].text);
      
      // Update location title
      document.querySelectorAll('.section-title')[2].textContent = translation.locationTitle;
      
      // Update about section
      document.querySelector('.about-title').textContent = translation.about.title;
      document.querySelector('.about-text').textContent = translation.about.text;
      document.querySelectorAll('.value-title').forEach((el, i) => el.textContent = translation.about.values[i].title);
      document.querySelectorAll('.value-text').forEach((el, i) => el.textContent = translation.about.values[i].text);
      
      // Update services section
      document.querySelector('.services-title').textContent = translation.services.title;
      document.querySelector('.services-intro').innerHTML = translation.services.intro;
      document.querySelectorAll('.service-title').forEach((el, i) => el.textContent = translation.services.services[i].title);
      document.querySelectorAll('.service-text').forEach((el, i) => el.textContent = translation.services.services[i].text);
      
      // Update products section
      document.querySelector('.products-title').textContent = translation.products.title;
      document.querySelector('.products-intro').textContent = translation.products.intro;
      document.querySelectorAll('.product-title').forEach((el, i) => el.textContent = translation.products.products[i].title);
      document.querySelectorAll('.product-text').forEach((el, i) => el.textContent = translation.products.products[i].text);
      
      // Update careers section
      document.querySelector('.careers-title').textContent = translation.careers.title;
      document.querySelector('.careers-intro').textContent = translation.careers.intro;
      
      // Update careers form
      document.querySelector('.form-group label').textContent = translation.careers.form.applicationType;
      document.querySelector('#applicationType option').textContent = translation.careers.form.selectOption;
      document.querySelectorAll('#applicationType option')[1].textContent = translation.careers.form.options[0];
      document.querySelectorAll('#applicationType option')[2].textContent = translation.careers.form.options[1];
      document.querySelectorAll('#applicationType option')[3].textContent = translation.careers.form.options[2];
      
      document.querySelector('label[for="fullName"]').textContent = translation.careers.form.fullName;
      document.querySelector('label[for="email"]').textContent = translation.careers.form.email;
      document.querySelector('label[for="phone"]').textContent = translation.careers.form.phone;
      document.querySelector('label[for="cv"]').textContent = translation.careers.form.cv;
      document.querySelector('label[for="motivation"]').textContent = translation.careers.form.motivation;
      document.querySelector('.submit-btn').textContent = translation.careers.form.submit;
      
 
    }

    // Initialize the page
    document.addEventListener('DOMContentLoaded', () => {
      // Set initial language
      const savedLang = localStorage.getItem('duraprotect-lang') || 'fr';
      changeLanguage(savedLang);
      
      // Highlight the active language button
      document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === savedLang) {
          btn.classList.add('active');
        }
      });
      
      // Load job openings
      loadJobOpenings();
      
      // Initialize dark mode based on preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        body.classList.add('dark');
        body.classList.remove('light');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i><span>Dark</span>';
        if (mobileToggleBtn) {
          mobileToggleBtn.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
        }
      }
    });



// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
