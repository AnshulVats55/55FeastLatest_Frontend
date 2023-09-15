import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB-hngpRxBk1MdmDKMHGNR8dIchoLBgUiY",
  authDomain: "feastapp-60d7c.firebaseapp.com",
  projectId: "feastapp-60d7c",
  storageBucket: "feastapp-60d7c.appspot.com",
  messagingSenderId: "777877649657",
  appId: "1:777877649657:web:c7fb4ca7869c4235ce0a28",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
