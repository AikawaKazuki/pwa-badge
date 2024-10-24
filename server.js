const express = require('express');
const path = require('path');
const webPush = require('web-push');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// VAPID key pair
const vapidKeys = {
    publicKey: 'XXX',  // public key
    privateKey: 'XXX' // private key
};

webPush.setVapidDetails(
    'mailto:your-email@example.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

let subscriptions = [];

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
});

app.post('/send-notification', (req, res) => {
    const payload = JSON.stringify({
        title: 'Test Notification',
        body: 'This is a test message from the server'
    });

    subscriptions.forEach(subscription => {
        webPush.sendNotification(subscription, payload).catch(error => {
            console.error('Error sending notification', error);
        });
    });

    res.status(200).json({});
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
