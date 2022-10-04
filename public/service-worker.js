console.log('Service Worker Started');

self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('Service Worker Installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
});

self.addEventListener('push', (event) => {
  console.log('Service Worker Push message received');
});

// Very important thing, otherwise PWA app is not going to be installable
self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
     try{
       let res = await fetch(event.request);
       let cache = await caches.open('cache');
       cache.put(event.request.url, res.clone());
       return res;
     }
     catch(error){
       return caches.match(event.request);
      }
    }());
});
