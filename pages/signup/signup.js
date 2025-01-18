
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
  import {
    getAuth,
    createUserWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
  import {
    getFirestore,
    doc,
    setDoc,
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
  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");

window.signupUser = () => {
  let obj = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  console.log(obj);

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then((res) => {
      obj.id = res.user.uid;
      obj.userType = "user";
      delete obj.password;

      const refernce = doc(db, "users", obj.id);
      setDoc(refernce, obj)
        .then(() => {
          const userObj = JSON.stringify(obj);
          localStorage.setItem("user", userObj);
          window.location.replace("../../index.html");
        })
        .catch((err) => {
          alert(err.message);
        });
    })
    .catch((err) => {
      alert(err.message);
    });
};
