document.addEventListener('DOMContentLoaded', () => {
    console.log('%c✅ RoofLeadHQ Hybrid Site Loaded Successfully', 'background:#f59e0b;color:#0f172a;padding:8px 12px;border-radius:4px;font-weight:bold');
    
    // Desktop hero video autoplay
    const desktopVideo = document.querySelector('video[autoplay]');
    if (desktopVideo) desktopVideo.play().catch(() => {});

    initNotifications();
    setupMobileMenu();
});

function setupMobileMenu() {
    const button = document.getElementById('mobile-menu-button');
    if (button) {
        button.addEventListener('click', function () {
            const menu = document.getElementById('mobile-menu');
            const expanded = this.getAttribute('aria-expanded') === 'true';
            menu.classList.toggle('hidden');
            this.setAttribute('aria-expanded', !expanded);
        });
    }
}

function initNotifications() {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const messages = [
        { icon: '✅', text: 'New Inspection Booked — Denver, CO', time: 'just now' },
        { icon: '📞', text: 'Missed call recovered — Dallas, TX', time: '2m ago' },
        { icon: '📅', text: 'Appointment confirmed — Tampa, FL', time: 'just now' },
        { icon: '🌧️', text: 'Storm lead booked — Atlanta, GA', time: '4m ago' },
        { icon: '📨', text: 'Homeowner reminder sent — Phoenix, AZ', time: 'just now' }
    ];

    const lastShown = localStorage.getItem('lastNotificationTime');
    if (lastShown && (Date.now() - parseInt(lastShown)) < 86400000) return; // 24 hours

    let index = 0;

    function showNext() {
        if (index >= messages.length) {
            localStorage.setItem('lastNotificationTime', Date.now().toString());
            return;
        }

        const notif = document.createElement('div');
        notif.className = `notification bg-white text-[#0f172a] shadow-2xl rounded-3xl px-6 py-4 flex items-start gap-x-4 max-w-xs`;
        notif.innerHTML = `
            <div class="text-3xl">${messages[index].icon}</div>
            <div class="flex-1">
                <p class="font-medium">${messages[index].text}</p>
                <p class="text-xs text-slate-400">${messages[index].time}</p>
            </div>
        `;
        container.appendChild(notif);

        setTimeout(() => notif.remove(), 6000);

        index++;
        if (index < messages.length) setTimeout(showNext, Math.random() * 4000 + 3000);
    }

    setTimeout(showNext, 10000);
}

function openSignUpPopup() {
    const popup = document.getElementById('signup-popup');
    if (popup) {
        popup.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeSignUpPopup() {
    const popup = document.getElementById('signup-popup');
    if (popup) {
        popup.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const button = document.getElementById('mobile-menu-button');
    if (menu && button) {
        const isHidden = menu.classList.toggle('hidden');
        button.setAttribute('aria-expanded', String(!isHidden));
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const button = document.getElementById('mobile-menu-button');
    if (menu && button) {
        menu.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
    }
}

function handleContactForm(e) {
    e.preventDefault();
    alert("✅ Thank you! We'll reply within 24 hours to help you start your free 7-day pilot.");
    e.target.reset();
}

// ESC key for popup
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const popup = document.getElementById('signup-popup');
        if (popup && !popup.classList.contains('hidden')) closeSignUpPopup();
    }
});