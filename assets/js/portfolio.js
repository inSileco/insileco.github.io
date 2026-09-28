// Portfolio filter (PAGE-07): category buttons above the grid, category and
// tag buttons on the cards. The active filter lives in the URL (?tag=<slug>)
// so a filtered list can be shared. Without JS every project stays visible.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-portfolio]');
  if (!root) return;

  const cards = root.querySelectorAll('.portfolio-card');
  const barButtons = root.querySelectorAll('.portfolio-filters [data-filter]');
  const tagChip = root.querySelector('[data-filter-clear]');
  const tagLabel = root.querySelector('[data-filter-tag-label]');
  const count = root.querySelector('[data-portfolio-count]');

  // Visible label of a slug, taken from the first button that carries it
  const labelOf = (slug) => {
    const button = root.querySelector(`[data-filter="${CSS.escape(slug)}"]`);
    return button ? button.textContent.trim() : slug;
  };

  const apply = (slug) => {
    let visible = 0;
    cards.forEach(card => {
      const match = !slug || card.dataset.tags.split(' ').includes(slug);
      card.hidden = !match;
      if (match) visible += 1;
    });
    count.textContent = visible;

    // A tag that is not in the bar shows as a removable chip
    let inBar = false;
    barButtons.forEach(button => {
      const active = button.dataset.filter === slug;
      button.setAttribute('aria-pressed', active);
      if (active) inBar = true;
    });
    tagChip.hidden = inBar;
    if (!inBar) tagLabel.textContent = labelOf(slug);

    const url = new URL(window.location);
    if (slug) url.searchParams.set('tag', slug); else url.searchParams.delete('tag');
    window.history.replaceState(null, '', url);
  };

  root.addEventListener('click', (e) => {
    if (e.target.closest('[data-filter-clear]')) {
      apply('');
      return;
    }
    const button = e.target.closest('[data-filter]');
    if (!button) return;
    apply(button.dataset.filter);
    // From a card, bring the filtered grid back into view
    if (button.closest('.portfolio-card')) {
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  apply(new URLSearchParams(window.location.search).get('tag') || '');
});
