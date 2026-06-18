const CACHE_NAME = 'stock-app-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon.png'
];

// 설치 시 캐시 저장
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 네트워크 요청 처리 (오프라인 시 캐시 사용)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});