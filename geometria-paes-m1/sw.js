/* Geometría PAES M1 · service worker
   Sube CACHE a v2-1, v2-2, etc. cada vez que edites index.html o preguntas.json,
   si no el navegador seguirá sirviendo la versión guardada. */
const CACHE = 'geo-m1-v2-0';
const FILES = [
  './',
  './index.html',
  './preguntas.json',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Red primero para tener siempre el banco actualizado; si no hay conexión, se usa la copia guardada. */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
