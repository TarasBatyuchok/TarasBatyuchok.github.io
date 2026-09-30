// Contact form data stays in the browser until a server endpoint is connected.
// The three exported functions keep collection, validation, and submission separate.
export function collectContactData(form) {
  const fields = new FormData(form);
  return {
    fullName: String(fields.get('fullName') || '').trim().replace(/\s+/g, ' '),
    email: String(fields.get('email') || '').trim(),
    phone: String(fields.get('phone') || '').trim(),
    services: fields.getAll('services').map(String),
    message: String(fields.get('message') || '').trim(),
    consent: fields.get('consent') === 'on',
  };
}

const messages = {
  en: ['Enter at least 4 characters.', 'Enter a valid email address.', 'Enter a phone number with 7–15 digits.', 'Choose at least one service.', 'Check the highlighted fields and try again.', 'Your request is ready. Sending will be available when the contact endpoint is connected.'],
  uk: ['Введіть щонайменше 4 символи.', 'Введіть коректну електронну адресу.', 'Введіть номер телефону із 7–15 цифр.', 'Оберіть принаймні одну послугу.', 'Перевірте позначені поля й спробуйте ще раз.', 'Запит підготовлено. Надсилання стане доступним після підключення обробника форми.'],
  pl: ['Wpisz co najmniej 4 znaki.', 'Wpisz poprawny adres e-mail.', 'Wpisz numer telefonu zawierający 7–15 cyfr.', 'Wybierz co najmniej jedną usługę.', 'Sprawdź zaznaczone pola i spróbuj ponownie.', 'Zapytanie jest gotowe. Wysyłanie będzie dostępne po podłączeniu formularza.']
};

export function validateContactData(data, language = globalThis.siteLanguage || 'en') {
  const errors = {};
  const m = messages[language] || messages.en;
  if (data.fullName.length < 4) errors.fullName = m[0];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = m[1];
  const digits = data.phone.replace(/\D/g, '');
  if (!/^[+\d\s().-]+$/.test(data.phone) || digits.length < 7 || digits.length > 15) {
    errors.phone = m[2];
  }
  if (!data.services.length) errors.services = m[3];
  if (!data.consent) errors.consent = {
    en: 'Please confirm your agreement before continuing.',
    uk: 'Підтвердьте згоду, щоб продовжити.',
    pl: 'Potwierdź zgodę, aby kontynuować.'
  }[language] || 'Please confirm your agreement before continuing.';
  return errors;
}

function showErrors(form, errors) {
  for (const name of ['fullName', 'email', 'phone', 'services', 'consent']) {
    const input = name === 'services'
      ? form.querySelector('.contact__services')
      : form.elements.namedItem(name);
    const error = form.querySelector(`#contact-${name === 'fullName' ? 'name' : name}-error`);
    input.setAttribute('aria-invalid', String(Boolean(errors[name])));
    error.textContent = errors[name] || '';
  }
}

export async function handleContactSubmit(event, onValid) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.contact__status');
  const data = collectContactData(form);
  const errors = validateContactData(data);
  showErrors(form, errors);

  if (Object.keys(errors).length) {
    status.textContent = messages[globalThis.siteLanguage || 'en'][4];
    const first = Object.keys(errors)[0];
    (first === 'services' ? form.querySelector('[name="services"]') : form.elements.namedItem(first)).focus();
    return null;
  }

  const button = form.querySelector('[type="submit"]');
  if (form.dataset.sending === 'true') return null;
  form.dataset.sending = 'true';
  button.disabled = true;
  const language = globalThis.siteLanguage || 'en';
  const feedback = {
    en: ['Sending…', 'Your request has been sent.', 'Could not send. Please try again.'],
    uk: ['Надсилаємо…', 'Ваш запит надіслано.', 'Не вдалося надіслати. Спробуйте ще раз.'],
    pl: ['Wysyłanie…', 'Zapytanie zostało wysłane.', 'Nie udało się wysłać. Spróbuj ponownie.']
  }[language] || ['Sending…', 'Sent.', 'Could not send.'];
  status.textContent = feedback[0];
  try {
    await (onValid ? onValid(data) : submitContactData(data, form.getAttribute('action')));
    status.textContent = feedback[1];
    form.reset();
  } catch (error) {
    status.textContent = feedback[2];
  } finally {
    button.disabled = false;
    delete form.dataset.sending;
  }
  return data;
}

export function setupContactForm({ onValid } = {}) {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', event => handleContactSubmit(event, onValid));
  form.addEventListener('input', () => {
    showErrors(form, {});
    form.querySelector('.contact__status').textContent = '';
  });
  document.addEventListener('languagechange', () => {
    showErrors(form, {});
    form.querySelector('.contact__status').textContent = '';
  });
}

// Future PHP endpoint must read JSON from php://input and return {success:true}.
// No PHP handler is supplied. Missing endpoint is reported as an error.
export async function submitContactData(data, endpoint = './send.php') {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(data),
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    if (result.success !== true) throw new Error('Submission rejected');
    return result;
  } finally { clearTimeout(timeout); }
}
