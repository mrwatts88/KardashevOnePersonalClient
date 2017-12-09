## Ionic Client Application for Android/iOS/Web for personal (non-business users)

Get started

1. Clone repository
2. cd into working directory.
3. "npm install"
4. "ionic serve"

The app will open in your browser on localhost:8100.  When the app loads, it will initialize firebase,
get a unique token, and send that token to the test server, which will send back a push message with a 
payload.  If this app is in focus, the notification will log in the browser console. If the browser is
not in focus, the notification will show as a popup in the bottom right corner of the screen.

// TODO next:

Design the recieve page, which will display all shipments that have been sent to this client
from other clients, but have not yet been recieved.

Design history page, which will display all previously recieved shipments.

Set up user auth with firebase, including user records containing info about shipments (both pending and historical)

Query firebase for user record when app is loaded to populate receive page and history page. Probably should
query when a push notification is received also.

etc...
