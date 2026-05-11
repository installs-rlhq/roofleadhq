// RoofLeadHQ site interactions

function openSignUpPopup() {
  const popup = document.getElementById('signup-popup');
  if (!popup) {
    window.open('https://forms.fillout.com/t/siFYyegdNous', '_blank', 'noopener');
    return;
  }

  popup.classList.remove('hidden');
  popup.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeButton = popup.querySelector('button[aria-label="Close signup form"]');
  if (closeButton) {
    closeButton.focus();
  }
}

function closeSignUpPopup() {
  const popup = document.getElementById('signup-popup');
  if (!popup) return;

  popup.classList.add('hidden');
  popup.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuButton = document.getElementById('mobile-menu-button');

  if (mobileMenu) {
    mobileMenu.classList.add('hidden');
  }

  if (mobileMenuButton) {
    mobileMenuButton.setAttribute('aria-expanded', 'false');
  }
}

window.openSignUpPopup = openSignUpPopup;
window.closeSignUpPopup = closeSignUpPopup;
window.closeMobileMenu = closeMobileMenu;

document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function () {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileMenuButton.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  document.querySelectorAll('[data-close-mobile-menu]').forEach(function (item) {
    item.addEventListener('click', closeMobileMenu);
  });

  document.querySelectorAll('[data-open-signup-popup]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      openSignUpPopup();
    });
  });

  const popup = document.getElementById('signup-popup');
  if (popup) {
    popup.setAttribute('aria-hidden', popup.classList.contains('hidden') ? 'true' : 'false');

    popup.addEventListener('click', function (event) {
      if (event.target === popup) {
        closeSignUpPopup();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeSignUpPopup();
    }
  });

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const company = formData.get('company') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const message = formData.get('message') || '';

      const subject = encodeURIComponent('RoofLeadHQ Contact Form Submission');
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Company: ${company}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n\n` +
        `Message:\n${message}`
      );

      window.location.href = `mailto:support@roofleadhq.com?subject=${subject}&body=${body}`;
    });
  }
});
