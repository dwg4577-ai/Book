const CACHE = "book-stack-v2-7";
const ASSETS = ["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if(event.request.method !== "GET" || url.origin !== self.location.origin) return;

  if(event.request.mode === "navigate"){
    event.respondWith(
      fetch(event.request, {cache:"no-store"}).catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    fetch(event.request).then(response=>{
      const clone=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,clone)).catch(()=>{});
      return response;
    }).catch(()=>caches.match(event.request))
  );
});