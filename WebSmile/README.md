# WebSmile

Static website. Serve this directory using a web server; ES modules do not work reliably via file://.

## Structure
- index.html: semantic page, sections and BEM classes.
- privacy-policy.html: privacy page; review its text before production.
- assets/css/: individual section files; linked in cascade order. Responsive and reduced-motion rules remain separate.
- assets/js/app.js: entry point. Other modules own navigation, FAQ, canvas animations, music, form and reveal behavior.
- assets/js/i18n/: Ukrainian, Polish and English translations and switcher.
- assets/img/: optimized images, SVG icons and smile favicon.

## Contact form
contact-form.js exports collectContactData, validateContactData and submitContactData.
JSON POST goes to ./send.php; change the form action to configure the URL.
Payload: fullName, email, phone, services (array), message, consent (boolean).
Expected JSON response: {"success":true}. Non-2xx, timeout, invalid JSON and rejection show an error; fields are preserved. Success resets fields. Duplicate requests are blocked.
PHP is intentionally absent. Validate input and consent on the server before processing.

## Production and WordPress
Set canonical, og:url and absolute og:image after the final domain is selected; do not use a placeholder domain. Keep localized metadata aligned with the selected language.
For WordPress enqueue CSS in the same order and preserve module loading; this is not a WordPress theme.
Social profile links still require real URLs.
