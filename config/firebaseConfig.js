// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcFUZnpAU5qcL4BVPHgHuFEHb1Qw-HOTI",
  authDomain: "node-app-litlane.firebaseapp.com",
  projectId: "node-app-litlane",
  storageBucket: "node-app-litlane.appspot.com",
  messagingSenderId: "605950190792",
  appId: "1:605950190792:web:fdb655b8addee1658bb1fd",
  measurementId: "G-TC19BXGVJV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

module.exports = {
  auth
}