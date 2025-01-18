
 
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
  import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
  
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
  const db = getFirestore();
const auth = getAuth();

let loginLink = document.getElementById("loginLink");
let uploadLink = document.getElementById("contact");
let signupLink = document.getElementById("signupLink");
let logoutBtn = document.getElementById("logoutBtn");
let cartLink = document.getElementById("about");

function init() {
  let userObj = localStorage.getItem("user");
  userObj = JSON.parse(userObj);

  if (userObj) {
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    logoutBtn.className ="text-white mx-4 inline-block bg-sky-700 p-2 rounded";
  }
}
init();

window.logout = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("user");
      init();
      window.location.replace("pages/login/login.html")
    })
    .catch((err) => {
      alert(err.message);
    });
};

let renderblogs = () => {
    let blogParent = document.getElementById("blogParent");
    blogParent.innerHTML = "";
    blogs.forEach((blogs) => {
      blogParent.innerHTML += 

       `<div class="bg-white rounded-lg shadow-md overflow-hidden">
                <img class="w-full h-48 object-cover" src="${blogs.image}" alt="Blog Image">
                <div class="p-6">
                    <h2 class="text-2xl font-bold mb-2">${blogs.title}</h2>
                    <p class="text-gray-600 mb-4">by <span class="font-semibold">Username1</span> · 2 hours ago</p>
                    <p class="mt-2 text-gray-600">${blogs.content}</p>
                    <div class="flex items-center justify-between">
                        <button class="like-button flex items-center text-gray-500 hover:text-red-500 transition duration-300">
                            <i class="far fa-heart text-2xl"></i>
                            <span class="ml-2">Like</span>
                        </button>
                        <span class="like-count text-gray-500">0 Likes</span>
                    </div>
                </div>
            </div>`;
    });
  };
  
  let getblogs = async () => {
    const reference = collection(db, "blogs");
    const dt = await getDocs(reference);
    blogs = [];
    dt.forEach((dc) => {
      let obj = {
        id: dc.id,
        ...dc.data(),
      };
      blogs.push(obj);
    });
    renderblogs();
  };
  
  
  window.onload = () => {
    getblogs();
   
  };
  