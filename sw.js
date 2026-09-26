// 캐싱 방지용 초경량 서비스 워커
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // 캐시를 일절 생성하지 않고 네트워크 요청만 수행합니다.
    event.respondWith(fetch(event.request));
});
