self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-shell').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './app.css',
        './app.js',
        './Locale-pt-PT.json' // Add your JSON file here
      ]);
    })
  );
});

// Add cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle CORS requests for JSON files
  if (url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(event.request, {
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (!response.ok) {
          return caches.match(event.request);
        }
        return response;
      }).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }

  // Existing cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
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