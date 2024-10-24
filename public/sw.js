self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'Default Title', body: 'Default message', count: 1 };

    const options = {
        body: data.body,
        icon: '/icon-192x192.png'
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );

    if (navigator.setAppBadge) {
        navigator.setAppBadge(data.count).catch((error) => {
            console.error('Failed to set app badge from service worker:', error);
        });
    } else {
        console.warn('setAppBadge is not supported in the service worker');
    }
});
