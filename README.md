# Generate VAPID Keys
Run the following command to generate VAPID keys:
npx web-push generate-vapid-keys

# Update index.html and server.js
1. In index.html, replace applicationServerKey with your generated public key.
2. In server.js, replace the vapidKeys object with the generated keys.

# Start the server
1. Run the following command to install dependencies:
npm install
2. Then, start the server:
npm start

# Send a push notification
Access http://localhost:3000/ and install the PWA.
Open the PWA and Subscribe Push Notification.

Run the following command to trigger a push notification:
curl -X POST http://localhost:3000/send-notification
