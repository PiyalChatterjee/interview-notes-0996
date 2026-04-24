// Day 1 Challenge: Service Worker — Cache-First for App Shell
// This demonstrates the PWA App Shell Architecture pattern

const CACHE_NAME = 'interview-prep-shell-v1';
const DATA_CACHE_NAME = 'interview-prep-data-v1';

// App shell assets — cached on install (served instantly on repeat visits)
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// INSTALL: Cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching app shell');
      return cache.addAll(SHELL_ASSETS);
    })
  );
  self.skipWaiting();
});

// ACTIVATE: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH: Strategy depends on request type
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // API requests: Network-First (fresh data preferred, cache as fallback)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(event.request));
    return;
  }

  // Shell assets: Cache-First (performance — serve instantly from SW)
  event.respondWith(cacheFirstStrategy(event.request));
});

// Cache-First: serve from cache, fallback to network
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    // Clone because response is a stream (can only be read once)
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch {
    // Offline fallback — could return a custom offline page
    return new Response('Offline — cached content not available', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Network-First: try network, fallback to cache
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DATA_CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
