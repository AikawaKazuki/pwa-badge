// https://webkit.org/blog/14112/badging-for-home-screen-web-apps/
// Function to determine the badge count based on the event data
function determineBadgeCount(data) {
    // Process the data to compute the badge count
    return Math.floor(Math.random() * 9) + 1;
}

self.addEventListener('push', (event) => {
    let promises = [];

    if ('setAppBadge' in self.navigator) {
        const badgeCount = determineBadgeCount(event.data);
        // Promise to set the badge
        const promise = self.navigator.setAppBadge(badgeCount);
        promises.push(promise);
    }

    // Promise to show a notification
    promises.push(self.registration.showNotification("You've got mail!"));

    // Finally...
    event.waitUntil(Promise.all(promises));
});
