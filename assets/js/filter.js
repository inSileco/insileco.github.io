// Category / tag filter for card lists (Portfolio PAGE-07, Blog PAGE-09).
// Markup: layouts/partials/filter-bar.html inside a [data-filter-list] root;
// each card is a [data-filter-item] with data-tags="<slug> <slug>…"; any
// [data-filter="<slug>"] button (bar or card) applies that filter.
// The active filter lives in the URL (?tag=<slug>) so a filtered list can be
// shared. Without JS every item stays visible.
// ANI-09 — on a filter change the cards move instead of jumping (FLIP, Web
// Animations API): leaving cards fade out, staying cards glide to their new
// place, entering cards fade in. A new click cancels the running animations
// (only ours: the hover lift and the scroll reveal are left alone) and starts
// from the real state. Reduced motion or no Web Animations: instant, as before.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-filter-list]');
  if (!root) return;

  const items = root.querySelectorAll('[data-filter-item]');
  const barButtons = root.querySelectorAll('[data-filter-bar] [data-filter]');
  const tagChip = root.querySelector('[data-filter-clear]');
  const tagLabel = root.querySelector('[data-filter-tag-label]');
  const count = root.querySelector('[data-filter-count]');

  const motion = 'animate' in Element.prototype
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Durations (ms) and easing, as the CSS motion tokens (_variables.scss)
  const FADE_OUT = 150;
  const MOVE = 300;
  const FADE_IN = 250;
  const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
  const running = new Set();
  let pending = null;

  const matches = (item, slug) => !slug || item.dataset.tags.split(' ').includes(slug);

  // Kept until the next settle, finished or not: a fade-out holds its end state
  // (fill: forwards) until it is cancelled
  const track = (animation) => {
    running.add(animation);
    return animation;
  };

  // Stop what a previous click started: pending layout and our animations
  const settle = () => {
    clearTimeout(pending);
    pending = null;
    running.forEach(animation => animation.cancel());
    running.clear();
  };

  // Not yet shown by the scroll reveal (ANI-02): it will fade in on its own
  const waitsForReveal = (item) => item.classList.contains('reveal')
    && document.documentElement.classList.contains('has-reveal')
    && !item.classList.contains('is-revealed');

  // Hide / show the items, the staying ones glide from where they were
  const layout = (slug) => {
    const before = new Map();
    items.forEach(item => { if (!item.hidden) before.set(item, item.getBoundingClientRect()); });

    settle();
    items.forEach(item => { item.hidden = !matches(item, slug); });

    items.forEach(item => {
      if (item.hidden) return;
      const was = before.get(item);
      if (!was) {
        if (waitsForReveal(item)) return;
        track(item.animate(
          [{ opacity: 0, transform: 'scale(0.96)' }, { opacity: 1, transform: 'none' }],
          { duration: FADE_IN, delay: MOVE / 2, easing: EASE, fill: 'backwards' }
        ));
        return;
      }
      const now = item.getBoundingClientRect();
      const dx = was.left - now.left;
      const dy = was.top - now.top;
      if (!dx && !dy) return;
      track(item.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
        { duration: MOVE, easing: EASE }
      ));
    });
  };

  // Visible label of a slug, taken from the first button that carries it
  const labelOf = (slug) => {
    const button = root.querySelector(`[data-filter="${CSS.escape(slug)}"]`);
    return button ? button.textContent.trim() : slug;
  };

  const apply = (slug, animate = false) => {
    let visible = 0;
    items.forEach(item => { if (matches(item, slug)) visible += 1; });
    count.textContent = visible;

    if (animate && motion) {
      settle();
      // Leaving cards fade out first, then the list rearranges
      const leaving = [...items].filter(item => !item.hidden && !matches(item, slug));
      leaving.forEach(item => track(item.animate(
        [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(0.96)' }],
        { duration: FADE_OUT, easing: EASE, fill: 'forwards' }
      )));
      pending = setTimeout(() => layout(slug), leaving.length ? FADE_OUT : 0);
    } else {
      settle();
      items.forEach(item => { item.hidden = !matches(item, slug); });
    }

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
      apply('', true);
      return;
    }
    const button = e.target.closest('[data-filter]');
    if (!button) return;
    apply(button.dataset.filter, true);
    // From a card, bring the filtered list back into view
    if (button.closest('[data-filter-item]')) {
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  apply(new URLSearchParams(window.location.search).get('tag') || '');
});
