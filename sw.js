/* Hors ligne pour la carte et les présentations (salons, mauvais réseau).
   Pages : réseau d'abord (3 s max), copie locale sinon. Fichiers statiques : copie locale, rafraîchie en fond.
   Ne touche ni à l'accueil chiffré, ni au formulaire, ni à rien hors du site. */
var V = 'fx-hors-ligne-20261117c';
var PAGES = ['/carte/', '/presentation/pme/', '/presentation/eti/', '/presentation/ia/',
  '/en/presentation/pme/', '/en/presentation/eti/', '/en/presentation/ia/'];
var FICHIERS = ['/presentation/cartes.css', '/presentation/cartes.js', '/assets/integre.js', '/assets/langue.js',
  '/assets/fonts/Outfit-Regular.ttf', '/assets/fonts/Outfit-Bold.ttf', '/assets/img/fx-portrait.jpg',
  '/assets/logo/fx-logo.svg', '/assets/fx-le-gal.vcf', '/favicon.ico', '/icone-app-180.png',
  '/presentation/logos/manitou-group_blanc.png', '/presentation/logos/mr-suricate_blanc.png',
  '/presentation/logos/smile_sans-slogan.svg', '/presentation/logos/sqli_original.svg',
  '/assets/pictos/calendar.svg', '/assets/pictos/case-round.svg', '/assets/pictos/cpu-bolt.svg',
  '/assets/pictos/document-text.svg', '/assets/pictos/global.svg', '/assets/pictos/graph-up.svg',
  '/assets/pictos/letter.svg', '/assets/pictos/link-round-angle.svg', '/assets/pictos/restart.svg',
  '/assets/pictos/rocket-2.svg', '/assets/pictos/shield-check.svg', '/assets/pictos/code-square.svg', '/assets/pictos/stop-circle.svg',
  '/assets/pictos/users-group-two-rounded.svg', '/assets/pictos/wallet-money.svg'];
var GARDE = PAGES.concat(FICHIERS);

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(V).then(function (c) {
    return Promise.all(GARDE.map(function (u) { return c.add(u).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
function gere(p) { return GARDE.indexOf(p) >= 0 || GARDE.indexOf(p.replace(/index\.html$/, '')) >= 0; }
self.addEventListener('fetch', function (e) {
  var r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin || !gere(u.pathname)) return;
  var cle = u.pathname.replace(/index\.html$/, '');
  if (r.mode === 'navigate' || PAGES.indexOf(cle) >= 0) {
    e.respondWith(new Promise(function (ok) {
      var fini = false;
      var local = function () { caches.match(cle, { ignoreSearch: true }).then(function (m) { if (!fini && m) { fini = true; ok(m); } }); };
      var t = setTimeout(local, 3000);
      fetch(r).then(function (res) {
        if (res.ok) { var copie = res.clone(); caches.open(V).then(function (c) { c.put(cle, copie); }); }
        clearTimeout(t); if (!fini) { fini = true; ok(res); }
      }).catch(function () {
        clearTimeout(t);
        caches.match(cle, { ignoreSearch: true }).then(function (m) { if (!fini) { fini = true; ok(m || Response.error()); } });
      });
    }));
    return;
  }
  e.respondWith(caches.match(cle, { ignoreSearch: true }).then(function (m) {
    var net = fetch(r).then(function (res) {
      if (res.ok) { var copie = res.clone(); caches.open(V).then(function (c) { c.put(cle, copie); }); }
      return res;
    }).catch(function () { return m || Response.error(); });
    return m || net;
  }));
});
