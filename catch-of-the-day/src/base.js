import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBhxeG-IOhcrmyzwJdhiImRMgXJKyaew1Q",
  authDomain: "catch-of-the-day-tracy-dean.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-tracy-dean.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());


// this is a named export
export { firebaseApp };

// this is a default export
export default base;