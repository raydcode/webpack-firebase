import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAzhUV2KXUam6slA3kAyrJsYxEDBMAAzZk',
  authDomain: 'rosecolor-ed1b4.firebaseapp.com',
  projectId: 'rosecolor-ed1b4',
  storageBucket: 'rosecolor-ed1b4.appspot.com',
  messagingSenderId: '611371364272',
  appId: '1:611371364272:web:f3e8c1149ddd02b177b075',
  measurementId: 'G-S5DYJX5SQN',
};

initializeApp(firebaseConfig);

const db = getFirestore();

const collect = collection(db, 'posts');

const q = query(collect,orderBy('age','desc'))

onSnapshot(q, (snapshot) => {
  let posts = [];

  snapshot.docs.forEach((doc) => {
    posts.push({ ...doc.data(), id: doc.id });
  });

  console.log(posts);
});

// getDocs(collect)
//   .then((snapshot) => {
//     let posts = [];

//     snapshot.docs.forEach((doc) => {
//       posts.push({ ...doc.data(), id: doc.id });
//     });

//     console.log(posts);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const addDocument = document.querySelector('.add');

addDocument.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(collect, {
    title: addDocument.title.value,
    content: addDocument.content.value,
  }).then(() => {
    addDocument.reset();
  });
});

const deleteDocument = document.querySelector('.delete');

deleteDocument.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'posts', deleteDocument.id.value);

  deleteDoc(docRef).then(() => {
    deleteDocument.reset();
  });
});



