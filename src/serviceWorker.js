// ... existing service worker registration code ...

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