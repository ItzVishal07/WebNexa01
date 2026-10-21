const menu=document.getElementById('menu'),nav=document.getElementById('navlinks');if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();const els=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ob.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>ob.observe(e))}else els.forEach(e=>e.classList.add('visible'));const cs=document.querySelectorAll('[data-count]');if('IntersectionObserver'in window){const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){let n=0,t=Number(e.target.dataset.count),el=e.target;const id=setInterval(()=>{el.textContent=++n;if(n>=t)clearInterval(id)},65);co.unobserve(el)}}));cs.forEach(e=>co.observe(e))}else cs.forEach(e=>e.textContent=e.dataset.count);

// Booking: set a real public booking URL before launch. Empty placeholder keeps the CTA honest.
const WEBNEXA_BOOKING_URL = "BOOKING_URL_HERE";
document.querySelectorAll('[data-booking-link]').forEach(link => {
  if (WEBNEXA_BOOKING_URL && WEBNEXA_BOOKING_URL !== "BOOKING_URL_HERE") {
    link.href = WEBNEXA_BOOKING_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.removeAttribute("aria-disabled");
  } else {
    link.href = "contact.html#booking";
    link.setAttribute("aria-disabled", "true");
    link.title = "Booking link will be added before launch";
  }
});

// Portfolio category filters
const projectFilters = document.querySelectorAll("[data-project-filter]");
const projectCards = document.querySelectorAll("[data-project-category]");
projectFilters.forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.projectFilter;
  projectFilters.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  projectCards.forEach(card => {
    card.hidden = filter !== "all" && card.dataset.projectCategory !== filter;
  });
}));

// Searchable WebNexa concept library. Entries are illustrative concepts, not completed-client claims.
(() => {
  const search = document.getElementById('concept-search');
  const cards = [...document.querySelectorAll('.concept-card')];
  const buttons = [...document.querySelectorAll('[data-project-filter]')];
  const result = document.getElementById('concept-results');
  if (!cards.length) return;
  let activeCategory = 'all';
  const applyFilters = () => {
    const query = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const categoryMatch = activeCategory === 'all' || card.dataset.projectCategory === activeCategory;
      const searchMatch = !query || `${card.dataset.projectTitle} ${card.dataset.projectDesc} ${card.textContent}`.toLowerCase().includes(query);
      const show = categoryMatch && searchMatch;
      card.hidden = !show;
      if (show) visible++;
    });
    if (result) result.textContent = `Showing ${visible} of ${cards.length} concepts`;
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    activeCategory = button.dataset.projectFilter || 'all';
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    applyFilters();
  }));
  if (search) search.addEventListener('input', applyFilters);
  applyFilters();
})();

// WebNexa project estimator: indicative ranges only, not a binding quote.
(() => {
  const form = document.getElementById('estimator-form');
  if (!form) return;
  const typeEl = document.getElementById('estimate-type');
  const pagesEl = document.getElementById('estimate-pages');
  const priceEl = document.getElementById('estimate-price');
  const summaryEl = document.getElementById('estimate-summary');
  const enquiryEl = document.getElementById('estimate-enquiry');
  const base = { landing:[5000,10000], business:[8000,18000], portfolio:[7000,16000], ecommerce:[18000,45000], webapp:[25000,70000], brand:[4000,14000] };
  const labels = { landing:'landing page', business:'business website', portfolio:'portfolio website', ecommerce:'e-commerce storefront', webapp:'interactive web application', brand:'brand identity package' };
  const calculate = () => {
    const type = typeEl.value;
    const pages = Number(pagesEl.value);
    let [low, high] = base[type] || base.business;
    if (type !== 'landing' && type !== 'brand') {
      if (pages >= 10) { low *= 1.65; high *= 1.8; }
      else if (pages >= 5) { low *= 1.2; high *= 1.25; }
    }
    const addons = [...form.querySelectorAll('[data-addon]:checked')].map(el => el.dataset.addon);
    const addonCost = { seo:[1500,4000], copy:[2000,7000], motion:[2000,8000], forms:[1000,5000] };
    addons.forEach(a => { low += addonCost[a][0]; high += addonCost[a][1]; });
    const fmt = n => '₹' + Math.round(n/500)*500 .toLocaleString('en-IN');
    // Format safely with Intl to keep Indian digit grouping.
    const money = n => '₹' + Math.round(n/500)*500;
    const lowText = new Intl.NumberFormat('en-IN').format(Math.round(low/500)*500);
    const highText = new Intl.NumberFormat('en-IN').format(Math.round(high/500)*500);
    priceEl.textContent = `₹${lowText}–₹${highText}`;
    summaryEl.textContent = `Indicative range for a ${labels[type]}${addons.length ? ' with selected add-ons' : ''}. Scope and final price need confirmation.`;
    const details = `I used the WebNexa estimator. Project type: ${labels[type]}; page range: ${pagesEl.options[pagesEl.selectedIndex].text}; add-ons: ${addons.length ? addons.join(', ') : 'none'}; indicative range: ₹${lowText}–₹${highText}. Please review and confirm scope.`;
    enquiryEl.href = 'contact.html?brief=' + encodeURIComponent(details);
  };
  form.addEventListener('submit', e => { e.preventDefault(); calculate(); });
  form.addEventListener('change', calculate);
  calculate();
})();

// FAQ search: filter visible questions without a backend.
(() => {
  const input = document.getElementById('faq-search');
  const list = document.getElementById('faq-list');
  const empty = document.getElementById('faq-empty');
  if (!input || !list) return;
  const items = [...list.querySelectorAll('.faq-item')];
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    items.forEach(item => {
      const match = item.textContent.toLowerCase().includes(q);
      item.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  });
})();

// Copy the estimator brief into the contact message if one was passed in the URL.
(() => {
  const message = document.getElementById('contact-message');
  if (!message) return;
  const params = new URLSearchParams(window.location.search);
  const brief = params.get('brief');
  if (brief && !message.value) message.value = brief;
})();

// WhatsApp setup: replace with the international digits-only number before launch.
// Example format: 919876543210 (country code + number, no +, spaces or punctuation).
(() => {
  const number = 'WHATSAPP_NUMBER_HERE';
  document.querySelectorAll('[data-whatsapp-link]').forEach(link => {
    if (/^\d{10,15}$/.test(number)) {
      link.href = `https://wa.me/${number}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.removeAttribute('aria-disabled');
    } else {
      link.href = 'contact.html';
      link.setAttribute('aria-disabled', 'true');
      link.title = 'Add WebNexa WhatsApp number in site.js before launch';
      link.addEventListener('click', event => {
        event.preventDefault();
        window.location.href = 'contact.html';
      });
    }
  });
})();


// Premium interaction layer: scroll progress, reveal animations, spotlight and back-to-top.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.createElement('div');
  progress.className = 'wn-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.appendChild(progress);

  const topbar = document.querySelector('.topbar');
  const backTop = document.createElement('button');
  backTop.className = 'wn-backtop';
  backTop.type = 'button';
  backTop.setAttribute('aria-label','Back to top');
  backTop.title = 'Back to top';
  backTop.textContent = '↑';
  document.body.appendChild(backTop);
  backTop.addEventListener('click', () => window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'}));

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${pct}%`;
    backTop.classList.toggle('visible', window.scrollY > 500);
    if (topbar) topbar.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', updateScroll, {passive:true});
  window.addEventListener('resize', updateScroll);
  updateScroll();

  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -30px 0px'});
    revealItems.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index % 5, 4) * 55}ms`;
      observer.observe(el);
    });
  }

  document.querySelectorAll('.service-card,.team-card,.case-card,.ongoing-card,.concept-card,.project').forEach(el => el.classList.add('wn-spotlight'));
  document.querySelectorAll('.wn-spotlight').forEach(el => {
    el.addEventListener('pointermove', event => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    }, {passive:true});
  });
})();

// Persistent light/dark theme switch (local browser preference only; no account or database).
(() => {
  const button = document.getElementById('theme-toggle');
  if (!button) return;
  const apply = mode => {
    document.body.classList.toggle('wn-light', mode === 'light');
    button.textContent = mode === 'light' ? '☀' : '◐';
    button.setAttribute('aria-label', mode === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    button.title = mode === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
  };
  let saved = 'dark';
  try { saved = localStorage.getItem('webnexa-theme') || 'dark'; } catch (e) {}
  apply(saved);
  button.addEventListener('click', () => {
    const next = document.body.classList.contains('wn-light') ? 'dark' : 'light';
    apply(next);
    try { localStorage.setItem('webnexa-theme', next); } catch (e) {}
  });
})();
