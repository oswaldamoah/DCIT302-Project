// Simple service worker for Google Earth (Prototype) PWA
const CACHE_NAME = 'earth-proto-v2';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/ref_images/download.png',
  '/ref_images/download (5).png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const isHTML = request.destination === 'document' || (request.mode === 'navigate');
  const isManifest = request.url.endsWith('manifest.webmanifest');

  if (isHTML || isManifest) {
    // Network-first for HTML & manifest to pull fresh changes
    event.respondWith(
      fetch(request)
        .then(resp => {
          const copy = resp.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return resp;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Cache-first for other GET requests (icons, images, scripts)
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return resp;
      }).catch(() => cached);
    })
  );
});
