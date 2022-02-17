import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0LDNcgj1JhbH59aZezkYQ5upQlzeGL9Q",
  authDomain: "ecommerce-3110.firebaseapp.com",
  projectId: "ecommerce-3110",
  storageBucket: "ecommerce-3110.appspot.com",
  messagingSenderId: "408958235373",
  appId: "1:408958235373:web:3e8ea2ff9e836dc02912e4"
};

const app = initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
