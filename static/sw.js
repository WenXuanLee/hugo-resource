const CACHE_VERSION = 1;

const BASE_CACHE_FILES = [
  '/css/main.min.css',
  '/js/vendor_main.min.js',
  '/index.html',
  '/profile.jpg',
];

const CACHE_VERSIONS = {
  assets: 'assets-v' + CACHE_VERSION,
  content: 'content-v' + CACHE_VERSION,
  offline: 'offline-v' + CACHE_VERSION,
  notFound: '404-v' + CACHE_VERSION,
};

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

/**
 * cleanupLegacyCache
 * @returns {Promise}
 */
function cleanupLegacyCache() {
  const currentCaches = `BenPeronsalWeb${CACHE_VERSION}`;
  return new Promise(
    (resolve, reject) => {
      caches.keys()
        .then(
          (keys) => {
            console.log('caches key', caches);
            console.log('caches key', keys);
            return legacyKeys = keys.filter(
              (key) => {
                return currentCaches === key;
              }
            );
          }
        )
        .then(
          (legacy) => {
            if (legacy.length) {
              Promise.all(
                legacy.map(
                  (legacyKey) => {
                    return caches.delete(legacyKey)
                  }
                )
              )
                .then(
                  () => {
                    resolve()
                  }
                )
                .catch(
                  (err) => {
                    reject(err);
                  }
                );
            } else {
              resolve();
            }
          }
        )
        .catch(
          () => {
            reject();
          }
        );

    }
  );
}