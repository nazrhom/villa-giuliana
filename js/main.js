// Swiper carousel
const swiper = new Swiper('.gallery-carousel', {
  loop: true,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Navbar scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close mobile menu on link click
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// ===== Language Switcher =====
const translations = {
  en: {
    'nav.logo': 'Your home in Punta Ala',
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.property': 'The Villa',
    'nav.contact': 'Contact',
    'hero.title': 'Villa Giuliana in Punta Ala',
    'hero.subtitle': 'Your villa in Tuscany, steps away from the sea',
    'hero.cta': 'Book Now',
    'gallery.title': 'Gallery',
    'gallery.alt.1': 'Private stone pier with sea access',
    'gallery.alt.2': 'Sunset view from the villa terrace',
    'gallery.alt.3': 'Night view of the castle from the terrace',
    'gallery.alt.4': 'Terrace at sunset with panoramic view',
    'gallery.alt.5': 'Aerial view of Punta Ala and the promontory',
    'gallery.alt.6': 'View from the terrace at sunset',
    'gallery.alt.7': 'Exclusive private pier on the sea',
    'property.title': 'The Villa',
    'property.p1': 'Villa Giuliana in Punta Ala is a one-of-a-kind exclusive residence, nestled within a magnificent 3-hectare private park. With 360 square metres of interior space, it offers elegant and comfortable rooms, ideal for enjoying relaxation and privacy in a unique setting.',
    'property.p2': 'The many outdoor terraces, equipped with a barbecue and a built-in wood-fired oven, are perfect for al fresco lunches and dinners, accompanied by breathtaking views and an atmosphere of absolute tranquillity.',
    'property.p3': 'The villa stands on the promontory known as "La Punta", the most prestigious and panoramic location in Punta Ala, offering unrivalled views and seclusion. Just 200 metres from the harbour, it perfectly combines convenience and privacy.',
    'property.p4': 'From the park, a private path leads directly to the sea along the northern side of the promontory, where an exclusive stone pier allows guests to enjoy the sea in a secluded setting, accessible only to villa guests.',
    'contact.title': 'Contact',
    'contact.intro': "For information or bookings, don't hesitate to contact us.",
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'booking.heading': 'Book on',
    'footer.copy': '\u00a9 2026 Villa Giuliana Punta Ala. All rights reserved.',
    'meta.title': 'Villa Giuliana \u2014 Villa Rental in Punta Ala',
    'meta.description': 'Villa Giuliana in Punta Ala \u2014 exclusive 360sqm residence with a 3-hectare private park, direct sea access, and private pier. Book now.'
  }
};

// Capture original Italian text from the DOM
const italianSnapshot = {};
document.querySelectorAll('[data-i18n]').forEach(el => {
  italianSnapshot[el.getAttribute('data-i18n')] = el.textContent;
});
document.querySelectorAll('[data-i18n-alt]').forEach(el => {
  italianSnapshot[el.getAttribute('data-i18n-alt')] = el.getAttribute('alt');
});
italianSnapshot['meta.title'] = document.title;
italianSnapshot['meta.description'] = document.querySelector('meta[name="description"]').content;

function setLanguage(lang) {
  const dict = lang === 'en' ? translations.en : italianSnapshot;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt');
    if (dict[key] !== undefined) el.setAttribute('alt', dict[key]);
  });

  document.documentElement.lang = lang;
  if (dict['meta.title']) document.title = dict['meta.title'];
  const metaDesc = document.querySelector('meta[name="description"]');
  if (dict['meta.description'] && metaDesc) metaDesc.content = dict['meta.description'];

  const toggleBtn = document.getElementById('lang-toggle');
  toggleBtn.textContent = lang === 'en' ? 'IT' : 'EN';
  toggleBtn.setAttribute('aria-label',
    lang === 'en' ? "Passa all'italiano" : 'Switch to English'
  );

  localStorage.setItem('lang', lang);
}

// Apply stored preference
const storedLang = localStorage.getItem('lang') || 'it';
if (storedLang === 'en') setLanguage('en');

// Toggle on click
document.getElementById('lang-toggle').addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'it' ? 'en' : 'it');
});
