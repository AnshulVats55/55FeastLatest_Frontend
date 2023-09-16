importScripts("/__/firebase/9.2.0/firebase-app-compat.js");
importScripts("/__/firebase/9.2.0/firebase-messaging-compat.js");
importScripts("/__/firebase/init.js");

const firebaseConfig = {
  apiKey: "AIzaSyB-hngpRxBk1MdmDKMHGNR8dIchoLBgUiY",
  authDomain: "feastapp-60d7c.firebaseapp.com",
  projectId: "feastapp-60d7c",
  storageBucket: "feastapp-60d7c.appspot.com",
  messagingSenderId: "777877649657",
  appId: "1:777877649657:web:c7fb4ca7869c4235ce0a28",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
