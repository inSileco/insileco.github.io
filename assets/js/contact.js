// Contact form (PAGE-04): conditional groups from the former Tally form,
// "other" free-text options, required checkbox groups and submission.
// Without an endpoint (data/{lang}/contact/form.yaml) nothing is sent: the
// confirmation is shown locally (service still to be chosen, see docs/suivi.md).
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const need = form.querySelector('[data-contact-need]');
  const groups = form.querySelectorAll('.contact-group');
  const error = form.querySelector('.contact-error');
  const thanks = document.querySelector('[data-contact-thanks]');

  // Hidden groups are also disabled: not validated, not submitted
  const setEnabled = (container, enabled) => {
    container.querySelectorAll('input, textarea, select').forEach(el => {
      // "Other" text inputs follow their own toggle
      if (el.classList.contains('contact-other')) {
        if (!enabled) { el.disabled = true; el.hidden = true; el.required = false; }
        return;
      }
      el.disabled = !enabled;
    });
  };

  const showGroup = () => {
    const option = need.selectedOptions[0];
    const key = option ? option.dataset.group : null;
    groups.forEach(group => {
      const active = group.dataset.group === key;
      group.hidden = !active;
      setEnabled(group, active);
    });
  };

  // "Other" choice: reveal and require its free-text input
  const syncOther = (fieldset) => {
    const toggle = fieldset.querySelector('[data-other-toggle]');
    const text = fieldset.querySelector('.contact-other');
    if (!toggle || !text) return;
    const on = toggle.checked && !toggle.disabled;
    text.hidden = !on;
    text.disabled = !on;
    text.required = on;
  };

  form.querySelectorAll('.contact-choices').forEach(fieldset => {
    fieldset.addEventListener('change', () => syncOther(fieldset));
  });

  // Checkbox groups marked required need at least one checked box
  const checkRequiredChoices = () => {
    form.querySelectorAll('[data-required-choice]').forEach(fieldset => {
      const boxes = fieldset.querySelectorAll('input[type="checkbox"]');
      const first = boxes[0];
      if (!first) return;
      const enabled = !first.disabled;
      const ok = !enabled || Array.from(boxes).some(b => b.checked);
      first.setCustomValidity(ok ? '' : form.dataset.requiredChoiceMessage);
    });
  };

  need.addEventListener('change', showGroup);
  form.addEventListener('change', checkRequiredChoices);
  form.querySelector('[type="submit"]').addEventListener('click', checkRequiredChoices);
  showGroup();

  const showThanks = () => {
    const name = form.querySelector('[data-contact-name]').value.trim();
    const title = thanks.querySelector('[data-template]');
    title.textContent = title.dataset.template.replace('{name}', name);
    form.hidden = true;
    thanks.hidden = false;
    thanks.focus();
  };

  // Only fires once the browser's native validation has passed
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    error.hidden = true;
    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      showThanks();
      return;
    }
    fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(res => { if (!res.ok) throw new Error(res.status); showThanks(); })
      .catch(() => { error.hidden = false; });
  });
});
