document.addEventListener('DOMContentLoaded', () => {
  console.log('%c✅ RoofLeadHQ Site Loaded', 'background:#f59e0b;color:#0f172a;padding:8px 12px;border-radius:4px;font-weight:bold');

  setupMobileMenu();
  setupContactForm();
  setupPopupBehavior();
  setupAutoplayVideo();
  initNotifications();
});

function setupAutoplayVideo() {
  const desktopVideo = document.getElementById('hero-video');

  if (!desktopVideo) return;

  desktopVideo.play().catch(() => {
    // Some browsers restrict autoplay. The poster image remains visible if autoplay is blocked.
  });
}

function setupMobileMenu() {
  const button = document.getElementById('mobile-menu-button');
  const closeLinks = document.querySelectorAll('[data-close-mobile-menu]');

  if (button) {
    button.addEventListener('click', toggleMobileMenu);
  }

  closeLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const button = document.getElementById('mobile-menu-button');

  if (!menu || !button) return;

  const isHidden = menu.classList.toggle('hidden');
  button.setAttribute('aria-expanded', String(!isHidden));
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const button = document.getElementById('mobile-menu-button');

  if (!menu || !button) return;

  menu.classList.add('hidden');
  button.setAttribute('aria-expanded', 'false');
}

function openSignUpPopup() {
  const popup = document.getElementById('signup-popup');

  if (!popup) return;

  popup.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  const closeButton = popup.querySelector('button');
  if (closeButton) closeButton.focus();
}

function closeSignUpPopup() {
  const popup = document.getElementById('signup-popup');

  if (!popup) return;

  popup.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function setupPopupBehavior() {
  const popup = document.getElementById('signup-popup');

  if (popup) {
    popup.addEventListener('click', function (event) {
      if (event.target === this) closeSignUpPopup();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const popupIsOpen = popup && !popup.classList.contains('hidden');
      if (popupIsOpen) closeSignUpPopup();
    }
  });
}

function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  const submitButton = document.getElementById('submit-btn');

  if (!contactForm || !submitButton) return;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    submitButton.textContent = 'Message Ready';
    submitButton.disabled = true;

    alert("✅ Thanks! Connect this form to your preferred form handler before launch. The signup pilot form already opens through the main CTA.");

    contactForm.reset();

    setTimeout(() => {
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false;
    }, 1800);
  });
}

function initNotifications() {
  const container = document.getElementById('notification-container');

  if (!container) return;

  const messages = [
    {
      icon: '✅',
      title: 'New Inspection Booked',
      body: 'Denver homeowner confirmed for tomorrow morning.',
      time: 'just now'
    },
    {
      icon: '📞',
      title: 'Missed Call Recovered',
      body: 'Dallas storm lead booked without waiting for a callback.',
      time: '2m ago'
    },
    {
      icon: '📅',
      title: 'Appointment Confirmed',
      body: 'Tampa homeowner received booking details automatically.',
      time: 'just now'
    },
    {
      icon: '🌧️',
      title: 'Storm Lead Flagged',
      body: 'Atlanta leak request routed as urgent.',
      time: '4m ago'
    },
    {
      icon: '📨',
      title: 'Reminder Sent',
      body: 'Phoenix homeowner got tomorrow’s appointment reminder.',
      time: 'just now'
    }
  ];

  const storageKey = 'roofleadhqLastNotificationTime';
  const lastShown = Number(localStorage.getItem(storageKey) || 0);
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (lastShown && Date.now() - lastShown < twentyFourHours) return;

  setTimeout(() => {
    const message = messages[Math.floor(Math.random() * messages.length)];
    showNotification(container, message);
    localStorage.setItem(storageKey, Date.now().toString());
  }, 12000);
}

function showNotification(container, message) {
  const notification = document.createElement('div');

  notification.className = 'notification bg-white text-[#0f172a] shadow-2xl rounded-3xl px-5 py-4 flex items-start gap-x-4 max-w-xs border border-slate-200';
  notification.innerHTML = `
    <div class="text-3xl" aria-hidden="true">${message.icon}</div>
    <div class="flex-1">
      <p class="font-black">${message.title}</p>
      <p class="text-sm text-slate-600 mt-1">${message.body}</p>
      <p class="text-xs text-slate-400 mt-2">${message.time}</p>
    </div>
  `;

  container.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('exiting');
    setTimeout(() => notification.remove(), 400);
  }, 6500);
}

// These functions are intentionally exposed globally because the HTML uses inline onclick handlers.
window.openSignUpPopup = openSignUpPopup;
window.closeSignUpPopup = closeSignUpPopup;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
