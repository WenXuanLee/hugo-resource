const CACHE_VERSION = 1;

const BASE_CACHE_FILES = [
  '/css/main.min.css',
  '/js/vendor_main.min.js',
  '/index.html',
  '/profile.jpg',
];

const cacheName = `BenPeronsalWeb${CACHE_VERSION}`;

self.addEventListener('install', event => {
  console.log('install event', event)
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(BASE_CACHE_FILES))
  );
});

self.addEventListener('fetch', function (event) {
  console.log('fetch event', event)
  console.log('fetch event', caches);
  event.respondWith(
    caches.open(cacheName)
    .then((cache) => {
      return cache.match(event.request.url) 
        .then(function (response) {
          if (response) {
            console.log('match response', response)
            return response;
          }
          const requestToCache = event.request.clone();           
          return fetch(requestToCache).then(
            function (response) {
              console.log('fetch reqeust to cache', response)
              if (!response || response.status !== 200) {
                return response;
              }
              const responseToCache = response.clone();
              caches.open(cacheName)
                .then(function (cache) {
                  cache.put(requestToCache, responseToCache);
                });
              return response;
            }
          );
        })
        .catch((e) => {
          console.log('error on fetch', e)
        })
    })
)});