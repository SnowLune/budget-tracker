const APP_PREFIX = "Budget Tracker";
const VERSION = "v0.1.0";
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
   "./index.html",
   "./css/styles.css",
   "./js/idb.js",
   "./js/index.js",
   "./service-worker.js"
];

self.addEventListener("install", function(e) {
   e.waitUntil(
      caches.open(CACHE_NAME)
         .then(function(cache) {
            console.log("Installing cache: " + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE);
         })
   )
})

// Listen for service worker activation
self.addEventListener("activate", function(e) {
   e.waitUntil(
      caches.keys()
         .then(function(keyList) {
            let cacheKeepList = keyList.filter(function(key) {
               return key.indexOf(APP_PREFIX);
            })

            cacheKeepList.push(CACHE_NAME);

            return Promise.all(keyList.map(function(key, i) {
               if (cacheKeepList.indexOf(key) === -1) {
                  console.log("Deleting cache: " + keyList[i]);
                  return caches.delete(keyList[i]);
               }
            }))
         })
   )
})

self.addEventListener("fetch", function(e) {
   console.log("Fetch request: " + e.request.url)
   e.respondWith(
      caches.match(e.request)
         .then(function(request) {
            // Check with we already have the cached files
            return request || fetch(e.request)
         })
   )
})
