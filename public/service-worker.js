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
