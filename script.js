const body = document.body;

/* ---------- font pairings (unified: each pair defines DH + PV) ---------- */
/* current/original brand fonts — pinned first, default selection */
const ORIGINAL = {orig:true, note:'Current brand fonts (DH: Playfair + Roboto Slab · PV: Prajavani Text)',
  dh:{h:'"Playfair Display",Georgia,serif', b:'"Roboto Slab",Georgia,serif'},
  pv:{h:'"Prajavani Text",Georgia,serif',   b:'"Prajavani Text",Georgia,serif'}};

const FREE = [
  {n:1, note:'Safest. One system, built to match across scripts',
   dh:{h:'"Noto Serif",Georgia,serif', b:'"Noto Sans",system-ui,sans-serif'},
   pv:{h:'"Noto Serif Kannada",serif',  b:'"Noto Sans Kannada",sans-serif'}},
  {n:2, note:'Editorial serif headlines, modern body',
   dh:{h:'"Newsreader",Georgia,serif',  b:'"Inter",system-ui,sans-serif'},
   pv:{h:'"Noto Serif Kannada",serif',  b:'"Noto Sans Kannada",sans-serif'}},
  {n:3, note:'Compact. Most text per screen',
   dh:{h:'"Source Serif 4",Georgia,serif', b:'"Source Sans 3",system-ui,sans-serif'},
   pv:{h:'"Noto Serif Kannada",serif',     b:'"Hind Mysuru",sans-serif'}},
  {n:4, note:'Shared headline family across both brands',
   dh:{h:'"Anek Latin",system-ui,sans-serif', b:'"Inter",system-ui,sans-serif'},
   pv:{h:'"Anek Kannada",sans-serif',         b:'"Noto Sans Kannada",sans-serif'}},
  {n:5, note:'One family for everything',
   dh:{h:'"Anek Latin",system-ui,sans-serif', b:'"Anek Latin",system-ui,sans-serif'},
   pv:{h:'"Anek Kannada",sans-serif',         b:'"Anek Kannada",sans-serif'}},
  {n:6, note:'All-sans, app-like, minimal',
   dh:{h:'"Inter",system-ui,sans-serif',   b:'"Inter",system-ui,sans-serif'},
   pv:{h:'"Noto Sans Kannada",sans-serif', b:'"Noto Sans Kannada",sans-serif'}},
  {n:7, note:'One serif family for everything. Classic newspaper feel',
   dh:{h:'"Kolar",Georgia,serif',                 b:'"Kolar",Georgia,serif'},
   pv:{h:'"Kolar","Noto Serif Kannada",serif',    b:'"Kolar","Noto Serif Kannada",serif'}},
  {n:8, note:'Traditional serif headlines, modern body',
   dh:{h:'"Kolar",Georgia,serif',                 b:'"Inter",system-ui,sans-serif'},
   pv:{h:'"Kolar","Noto Serif Kannada",serif',    b:'"Noto Sans Kannada",sans-serif'}},
  {n:9, note:'Literary, book-like reading',
   dh:{h:'"Noto Serif",Georgia,serif',            b:'"EB Garamond",Georgia,serif'},
   pv:{h:'"Noto Serif Kannada",serif',            b:'"Benne","Noto Serif Kannada",serif'}}
];

/* foundry specimen / type-tester pages (site-aware: DH=Latin, PV=Kannada) */
const STORE = {
  lava:         {name:'Lava',          dh:'https://www.typotheque.com/fonts/lava',                 pv:'https://www.typotheque.com/fonts/lava/kannada'},
  november:     {name:'November',      dh:'https://www.typotheque.com/fonts/november',             pv:'https://www.typotheque.com/fonts/november/kannada'},
  novemberCond: {name:'November Cond.', dh:'https://www.typotheque.com/fonts/november-condensed',  pv:'https://www.typotheque.com/fonts/november-condensed/kannada'},
  kohinoor:     {name:'Kohinoor',      dh:'https://www.indiantypefoundry.com/fonts/kohinoor',      pv:'https://www.indiantypefoundry.com/fonts/kohinoor'},
  akhand:       {name:'Akhand',        dh:'https://www.indiantypefoundry.com/fonts/akhand',        pv:'https://www.indiantypefoundry.com/fonts/akhand'},
  ek:           {name:'Ek',            dh:'https://ektype.in/ek-kannada.html',                     pv:'https://ektype.in/ek-kannada.html'}
};

const PAID = [
  {n:1, foundry:'Typotheque only', links:['lava','november'],
   dh:{h:'"Lava",Georgia,serif',                    b:'"November",system-ui,sans-serif'},
   pv:{h:'"Lava Kannada","Noto Serif Kannada",serif', b:'"November Kannada","Noto Sans Kannada",sans-serif'}},
  {n:2, foundry:'Typotheque only', links:['novemberCond','november'],
   dh:{h:'"November Condensed",system-ui,sans-serif', b:'"November",system-ui,sans-serif'},
   pv:{h:'"November Kannada Condensed","Noto Sans Kannada",sans-serif', b:'"November Kannada","Noto Sans Kannada",sans-serif'}},
  {n:3, foundry:'Typotheque + ITF', links:['lava','kohinoor'],
   dh:{h:'"Lava",Georgia,serif',                    b:'"Kohinoor Latin",system-ui,sans-serif'},
   pv:{h:'"Lava Kannada","Noto Serif Kannada",serif', b:'"Kohinoor Kannada","Noto Sans Kannada",sans-serif'}},
  {n:4, foundry:'ITF only', links:['akhand','kohinoor'],
   dh:{h:'"Akhand Latin",system-ui,sans-serif',     b:'"Kohinoor Latin",system-ui,sans-serif'},
   pv:{h:'"Akhand Kannada","Noto Sans Kannada",sans-serif', b:'"Kohinoor Kannada","Noto Sans Kannada",sans-serif'}},
  {n:5, foundry:'Ek Type only', links:['ek'],
   dh:{h:'"Ek Latin",system-ui,sans-serif',         b:'"Ek Latin",system-ui,sans-serif'},
   pv:{h:'"Ek Kannada","Noto Sans Kannada",sans-serif', b:'"Ek Kannada","Noto Sans Kannada",sans-serif'}},
  {n:6, foundry:'Typotheque + free (hybrid)', links:['lava'],
   dh:{h:'"Lava",Georgia,serif',                    b:'"Noto Sans",system-ui,sans-serif'},
   pv:{h:'"Lava Kannada","Noto Serif Kannada",serif', b:'"Noto Sans Kannada",sans-serif'}}
];

const fontOptions = document.getElementById('fontOptions');
let selectedKey = 'orig-0';   // tier-index key of the active pair (default: current brand)

const fam = v => v.split(',')[0].replace(/"/g, '');   // first family, unquoted

function pairByKey(key){
  const [tier, i] = key.split('-');
  if(tier === 'orig') return ORIGINAL;
  return (tier === 'paid' ? PAID : FREE)[+i];
}

function labelFor(pair, site){
  const f = pair[site];
  const head = fam(f.h), bodyName = fam(f.b);
  const names = head === bodyName ? head : head + ' + ' + bodyName;
  return (pair.orig ? '★ ' : pair.n + '. ') + names;
}

function applyPair(key, site){
  const f = pairByKey(key)[site];
  body.style.setProperty('--heading-font', f.h);
  body.style.setProperty('--body-font', f.b);
}

function makeButton(pair, key, site){
  const paid = key.startsWith('paid');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'font-btn' + (paid ? ' paid' : '') + (key === selectedKey ? ' active' : '');
  btn.title = paid ? ('Licensed — ' + pair.foundry) : pair.note;
  btn.innerHTML = labelFor(pair, site) + (paid ? '<span class="foundry">' + pair.foundry + '</span>' : '');
  btn.addEventListener('click', () => {
    selectedKey = key;
    applyPair(key, body.dataset.site);
    [...fontOptions.querySelectorAll('.font-btn')].forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateToggleLabel();
  });
  if(!paid) return btn;

  // paid entry: wrap the button with foundry preview links (<a> can't nest in <button>)
  const card = document.createElement('div');
  card.className = 'font-card paid';
  card.appendChild(btn);
  const linkRow = document.createElement('div');
  linkRow.className = 'font-links';
  linkRow.appendChild(Object.assign(document.createElement('span'), {className:'fl-label', textContent:'Preview:'}));
  pair.links.forEach(id => {
    const f = STORE[id];
    const a = document.createElement('a');
    a.href = f[site];
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = f.name + ' ↗';
    a.title = 'Preview ' + f.name + ' on the foundry site';
    linkRow.appendChild(a);
  });
  card.appendChild(linkRow);
  return card;
}

function groupLabel(text, paid){
  const d = document.createElement('div');
  d.className = 'font-group' + (paid ? ' paid' : '');
  d.textContent = text;
  return d;
}

function renderPairs(site){
  fontOptions.innerHTML = '';
  fontOptions.appendChild(groupLabel('Current · Brand', false));
  fontOptions.appendChild(makeButton(ORIGINAL, 'orig-0', site));
  fontOptions.appendChild(groupLabel('Free · Google Fonts', false));
  FREE.forEach((p, i) => fontOptions.appendChild(makeButton(p, 'free-' + i, site)));
  fontOptions.appendChild(groupLabel('Paid · Licensed', true));
  PAID.forEach((p, i) => fontOptions.appendChild(makeButton(p, 'paid-' + i, site)));
  const note = document.createElement('div');
  note.className = 'legend';
  note.textContent = '🔒 Paid pairs show a fallback here — tap “Preview ↗” to see the real font on the foundry’s site. Add licensed .woff2 to paid-fonts/ to render them in-page.';
  fontOptions.appendChild(note);
  applyPair(selectedKey, site);
  updateToggleLabel();
}

/* ---------- site toggle ---------- */
const siteButtons = [...document.querySelectorAll('.site-button')];
function setSite(site){
  body.dataset.site = site;
  document.documentElement.lang = site === 'pv' ? 'kn' : 'en';
  siteButtons.forEach(b => {
    const active = b.dataset.site === site;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });
  renderPairs(site);
}
siteButtons.forEach(b => b.addEventListener('click', () => setSite(b.dataset.site)));

/* ---------- menu ---------- */
const menuPanel = document.getElementById('menuPanel');
const menuButton = document.getElementById('menuButton');
const searchButton = document.getElementById('searchButton');
const closeMenu = document.getElementById('closeMenu');

function openMenu(){
  menuPanel.hidden = false;
  menuButton.setAttribute('aria-expanded','true');
  closeMenu?.focus();
}
function hideMenu(){
  menuPanel.hidden = true;
  menuButton.setAttribute('aria-expanded','false');
  menuButton?.focus();
}
menuButton?.addEventListener('click', () => menuPanel.hidden ? openMenu() : hideMenu());
searchButton?.addEventListener('click', () => { openMenu(); menuPanel.querySelector('input')?.focus(); });
closeMenu?.addEventListener('click', hideMenu);
document.addEventListener('keydown', e => { if(e.key === 'Escape' && !menuPanel.hidden) hideMenu(); });

/* ---------- font-panel collapse toggle (mobile) ---------- */
const controls = document.querySelector('.controls');
const panelToggle = document.getElementById('panelToggle');
function updateToggleLabel(){
  const hidden = controls.classList.contains('fonts-hidden');
  const paid = selectedKey.startsWith('paid');
  panelToggle.querySelector('.pt-label').textContent =
    hidden ? (paid ? '🔒 ' : '') + labelFor(pairByKey(selectedKey), body.dataset.site)
           : 'Hide fonts';
}
function setPanel(hidden){
  controls.classList.toggle('fonts-hidden', hidden);
  panelToggle.setAttribute('aria-expanded', String(!hidden));
  updateToggleLabel();
}
panelToggle?.addEventListener('click', () => setPanel(!controls.classList.contains('fonts-hidden')));
// start collapsed on small screens so the panel doesn't cover the article (?open=1 forces open)
const forceOpen = new URLSearchParams(location.search).get('open') === '1';
setPanel(window.matchMedia('(max-width:700px)').matches && !forceOpen);

/* ---------- init ---------- */
const initSite = new URLSearchParams(location.search).get('site') === 'pv' ? 'pv' : 'dh';
setSite(initSite);
