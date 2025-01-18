import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
  import {
    getAuth,
    createUserWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import {
    getFirestore,
    collection, addDoc,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

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
const storage = getStorage();

let productName = document.getElementById('title');
let productDescription = document.getElementById('content');
let productImage = document.getElementById('image');

window.uploadBtn = async () => {
    const file = image.files[0];
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    // Create a storage reference
    const storageRef = ref(storage, 'blogs/' + file.name);

    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            
            console.error('File upload error:', error);
        },
        async () => {
            
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);

            
            const Obj = {
                productName: title.value,
                productDescription: content.value,
                productImage: downloadURL
            };

            // Save product details in Firestore
            try {
                const reference = collection(db, "blogs");
                await addDoc(reference, Obj);
                alert('Product uploaded successfully!');
            } catch (e) {
                console.error('Error adding document: ', e);
            }
        }
    );
};




const user ={
    name1 : "abc",
    age :25
}

console.log(user['name1']);
