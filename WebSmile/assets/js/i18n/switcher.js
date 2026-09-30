import { copy } from './translations.js?v=organized-1';
const partial = '.infinite-line__panel, label[for="contact-name"], label[for="contact-email"], label[for="contact-phone"], label[for="contact-message"], .contact__services > .contact__label';
const english = {};
for (const selector of Object.keys(copy.uk)) {
  const [query, attribute] = selector.split('@');
  english[selector] = [...document.querySelectorAll(query)].map(element =>
    attribute ? element.getAttribute(attribute) : element.matches(partial) ? element.firstChild.textContent : element.textContent);
}

export function setupLanguage() {
  const stored = localStorage.getItem('webharbor-language');
  let language = ['en', 'uk', 'pl'].includes(stored) ? stored : 'en';

  function render() {
    document.documentElement.lang = language;
    for (const [selector, values] of Object.entries(language === 'en' ? english : copy[language])) {
      const [query, attribute] = selector.split('@');
      document.querySelectorAll(query).forEach((element, index) => {
        if (values[index] === undefined) return;
        if (attribute) element.setAttribute(attribute, values[index]);
        else if (element.matches(partial)) element.firstChild.textContent = values[index];
        else element.textContent = values[index];
      });
    }
    document.querySelector('#infinite-line-title').textContent = document.querySelector('.infinite-line__panel').firstChild.textContent;
    document.querySelectorAll('.header__language').forEach(button =>
      button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    document.querySelector('.header__languages').setAttribute('aria-label', { en: 'Language', uk: 'Мова', pl: 'Język' }[language]);
    document.querySelector('.header__menu-toggle').setAttribute('aria-label', { en: 'Open menu', uk: 'Відкрити меню', pl: 'Otwórz menu' }[language]);
    document.querySelector('.header__brand').setAttribute('aria-label', { en: 'WebSmile — home', uk: 'WebSmile — на початок', pl: 'WebSmile — strona główna' }[language]);
    document.title = { en: 'WebSmile — Website Design & Development', uk: 'WebSmile — Дизайн і розробка сайтів', pl: 'WebSmile — Projektowanie i tworzenie stron' }[language];
    document.querySelector('meta[name="description"]').content = {
      en: 'Landing pages, business websites, online stores, and custom CRM systems for growing businesses.',
      uk: 'Лендінги, корпоративні сайти, інтернет-магазини та CRM під запит бізнесу.',
      pl: 'Landing page, strony firmowe, sklepy internetowe i systemy CRM na zamówienie.'
    }[language];
    const projectHeading = document.querySelector('#contact-bridge-title');
    if (projectHeading) {
      const text = projectHeading.textContent;
      const parts = text.split('WebSmile');
      projectHeading.replaceChildren();
      parts.forEach((part, index) => {
        if (index) {
          projectHeading.append('Web');
          const smile = document.createElement('span');
          smile.className = 'brand-smile';
          smile.textContent = 'Smile';
          projectHeading.append(smile);
        }
        projectHeading.append(part);
      });
    }
    window.siteLanguage = language;
    document.dispatchEvent(new Event('languagechange'));
  }

  document.querySelectorAll('.header__language').forEach(button => button.addEventListener('click', () => {
    language = button.dataset.lang;
    localStorage.setItem('webharbor-language', language);
    render();
  }));
  render();
}
