const CACHE_NAME = 'dem-v1';
const API_CACHE = 'dem-api-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  if (ASSETS.some(url => e.request.url.includes(url))) {
    e.respondWith(
      caches.match(e.request).then(res => res || fetch(e.request))
    );
  } else if (e.request.url.includes('script.google.com')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(API_CACHE).then(cache => cache.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  }
});
