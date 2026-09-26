// Footer newsletter (COMP-02): native form from the mockup, wired to Tally.
// On submit, the Tally popup opens with the email pre-filled (hidden field
// "email" in the Tally form). If the Tally script cannot load, the form page
// opens in a new tab with the same parameter.
document.addEventListener('DOMContentLoaded', () => {
  const TALLY_SCRIPT = 'https://tally.so/widgets/embed.js';

  const loadTally = () => new Promise((resolve, reject) => {
    if (typeof Tally !== 'undefined') return resolve();
    const script = document.createElement('script');
    script.src = TALLY_SCRIPT;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });

  document.querySelectorAll('form[data-tally-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formId = form.dataset.tallyForm;
      const email = form.elements.email.value;

      loadTally()
        .then(() => Tally.openPopup(formId, { hiddenFields: { email } }))
        .catch(() => {
          const url = `https://tally.so/r/${formId}?email=${encodeURIComponent(email)}`;
          window.open(url, '_blank', 'noopener');
        });
    });
  });
});
