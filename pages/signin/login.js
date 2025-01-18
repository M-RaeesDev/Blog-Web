
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
  import {
    getAuth,
    signInWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/10.13.3/firebase-auth.js";
  import {
    getFirestore,
    doc,
    getDoc,
  } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDiBl4dmgKOWKFRLGE3KB878Zqz8V31xB0",
    authDomain: "visittoexplore-8aee3.firebaseapp.com",
    projectId: "visittoexplore-8aee3",
    storageBucket: "visittoexplore-8aee3.appspot.com",
    messagingSenderId: "37789591379",
    appId: "1:37789591379:web:830d5244fd5cdce99e63a6",
    measurementId: "G-D87T2J2WNQ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
const db = getFirestore();

let email = document.getElementById("email");
let password = document.getElementById("password");

window.loginUser = () => {
  let obj = {
    email: email.value,
    password: password.value,
  };
  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(async (res) => {
      const id = res.user.uid;
      const refernce = doc(db, "users", id);
      const snap = await getDoc(refernce);
      if (snap.exists()) {
        localStorage.setItem("user", JSON.stringify(snap.data()));
        window.location.replace("../../index.html");
      } else {
        alert("Data Not Found");
      }
    })
    .catch((err) => {
      alert(err.message);
    });
};

