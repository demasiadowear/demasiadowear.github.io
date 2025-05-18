
    const CACHE_NAME = 'demasiadowear-cache-v1';
    const urlsToCache = [
      '/',
      '/index.html',
      '/assets/index-Cm5uA9xI.css',
      '/assets/index-B_JaY9Qo.js',
      '/images/logo/logo-main.png',
      '/images/logo/logo-symbol.png',
      '/images/webp/logo/logo-main.webp',
      '/images/webp/logo/logo-symbol.webp',
      '/images/webp/textures/concrete-texture.webp'
    ];

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Cache opened');
            return cache.addAll(urlsToCache);
          })
      );
    });

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    });

    self.addEventListener('activate', function(event) {
      const cacheWhitelist = [CACHE_NAME];
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });
    