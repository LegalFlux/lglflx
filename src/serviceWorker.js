self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-shell').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './app.css',
        './app.js'
      ]);
    })
  );
});

// Add cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          // Return a fallback response for 404 errors
          return new Response('Resource not found', {
            status: 404,
            statusText: 'Not Found'
          });
        });
      })
  );
});

// Modified message sending logic
async function sendMessageToSW(message) {
  try {
    const registration = await navigator.serviceWorker.ready;
    if (registration.active) {
      registration.active.postMessage(message);
    } else {
      console.error('Service worker is registered but not active');
    }
  } catch (error) {
    console.error('Failed to send message to service worker:', error);
  }
}

// Example usage
sendMessageToSW({ type: 'example', data: 'test message' });