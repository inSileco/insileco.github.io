// Category / tag filter for card lists (Portfolio PAGE-07, Blog PAGE-09).
// Markup: layouts/partials/filter-bar.html inside a [data-filter-list] root;
// each card is a [data-filter-item] with data-tags="<slug> <slug>…"; any
// [data-filter="<slug>"] button (bar or card) applies that filter.
// The active filter lives in the URL (?tag=<slug>) so a filtered list can be
// shared. Without JS every item stays visible.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-filter-list]');
  if (!root) return;

  const items = root.querySelectorAll('[data-filter-item]');
  const barButtons = root.querySelectorAll('[data-filter-bar] [data-filter]');
  const tagChip = root.querySelector('[data-filter-clear]');
  const tagLabel = root.querySelector('[data-filter-tag-label]');
  const count = root.querySelector('[data-filter-count]');

  // Visible label of a slug, taken from the first button that carries it
  const labelOf = (slug) => {
    const button = root.querySelector(`[data-filter="${CSS.escape(slug)}"]`);
    return button ? button.textContent.trim() : slug;
  };

  const apply = (slug) => {
    let visible = 0;
    items.forEach(item => {
      const match = !slug || item.dataset.tags.split(' ').includes(slug);
      item.hidden = !match;
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
    // From a card, bring the filtered list back into view
    if (button.closest('[data-filter-item]')) {
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  apply(new URLSearchParams(window.location.search).get('tag') || '');
});
