// 오프라인 캐시 기능을 제거하고, PWA 앱 설치 조건(fetch 이벤트 존재)만 충족시키는 코드

self.addEventListener('install', event => {
    // 설치 즉시 활성화
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    // 기존에 남아있던 불필요한 캐시가 있다면 모두 삭제
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    // 캐시를 확인하지 않고 무조건 실시간 네트워크 요청만 수행
    event.respondWith(fetch(event.request));
});
