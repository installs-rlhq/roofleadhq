function openSignUpPopup() {
  const popup = document.getElementById('signup-popup');
  if (!popup) return;
  popup.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeSignUpPopup() {
  const popup = document.getElementById('signup-popup');
  if (!popup) return;
  popup.classList.add('hidden');
  document.body.style.overflow = '';
}

window.openSignUpPopup = openSignUpPopup;
window.closeSignUpPopup = closeSignUpPopup;

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeSignUpPopup();
  }
});

document.addEventListener('click', function (event) {
  const popup = document.getElementById('signup-popup');
  if (popup && event.target === popup) {
    closeSignUpPopup();
  }
});

Unsupported Media Type

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
