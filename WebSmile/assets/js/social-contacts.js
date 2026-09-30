// Add verified contact URLs here. WhatsApp uses https://wa.me/<international number>.
const contacts = { Telegram: '', WhatsApp: '', Facebook: '', LinkedIn: '' };
const root = document.querySelector('.social-float');
const toggle = root.querySelector('.social-float__toggle');
const panel = root.querySelector('.social-float__panel');
for (const button of panel.querySelectorAll('button')) {
 const url = contacts[button.textContent];
 if (url) { const link = document.createElement('a'); link.textContent = button.textContent; link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; button.replaceWith(link); }
}
function setOpen(open) { panel.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); updateLabel(); }
function updateLabel() {
 const labels = { en: ['Open social contacts', 'Close social contacts'], uk: ['Відкрити контакти', 'Закрити контакти'], pl: ['Otwórz kontakty', 'Zamknij kontakty'] };
 toggle.setAttribute('aria-label', (labels[document.documentElement.lang] || labels.en)[panel.hidden ? 0 : 1]);
}
toggle.addEventListener('click', () => setOpen(panel.hidden));
document.addEventListener('click', event => { if (!root.contains(event.target)) setOpen(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) { setOpen(false); toggle.focus(); } });
document.addEventListener('languagechange', updateLabel);
updateLabel();
