# Stock Analysis App
<div style="display:flex; justify-content:center;">
    <img src="/assets/firebase-logo.png" alt="Logo 1" width="100" height="100">
    <img src="/assets/react-native-logo.png" alt="Logo 2" width="100" height="100">
    <img src="/assets/nativebase-logo.svg" alt="Logo 2" width="100" height="100">
    <!-- Add more logo images as needed -->
</div>



<!-- 
![Firebase Logo](/assets/firebase-logo.png | width=100) ![React Native Logo](/assets/react-native-logo.png) 
![Native Base Logo](/assets/nativebase-logo.svg) -->

## Description

This is an app made with react-native and UI libraries such as Native base and react native paper. Firebase is used for user authentication and user data managment. Here one can search for the stock based on stock symbol. Market details and Charts are drawn for each stock. One can see top gainers and top lossers as well.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation

To get started with the app, follow these steps:

1. Clone this repository:

   ```sh
   git clone https://github.com/your-username/firebase-react-native-app.git
   ```
2. Navigate to project:
   ```sh
   cd StockApp
   ```
3. Install all dependencies:
   ```sh
   npm install
   ```
4. Configure firebase after making and project in firebase:
   ```sh
    //Cretate firebaseconfig.ts in main directory and add below code
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import {getAuth} from "firebase/auth";
    import {getFirestore} from "firebase/firestore";

    const firebaseConfig = {
    //copy from your project
    };

    // Initialize Firebase
    export const APP = initializeApp(firebaseConfig);
    export const FIREBASE_AUTH=getAuth(APP);
    export const FIRESTORE_DB=getFirestore(APP);
   ```

5. Run the project:
   ```sh
   npx expo start
   ```

## Usage
<div style="display:flex; flex-wrap:wrap;">
    <img src="/assets/1.jpg" alt="image 1" width="200" height="400">
    <img src="/assets/2.jpg" alt="image 2" width="200" height="400">
    <img src="/assets/3.jpg" alt="image 3" width="200" height="400">
    <img src="/assets/4.jpg" alt="image 4" width="200" height="400">
    <img src="/assets/5.jpg" alt="image 5" width="200" height="400">
    <img src="/assets/6.jpg" alt="image 6" width="200" height="400">
    <img src="/assets/7.jpg" alt="image 7" width="200" height="400">
    <img src="/assets/8.jpg" alt="image 8" width="200" height="400">
    <img src="/assets/9.jpg" alt="image 9" width="200" height="400">
    <img src="/assets/10.jpg" alt="image 10" width="200" height="400">
    <img src="/assets/11.jpg" alt="image 11" width="200" height="400">
    <img src="/assets/12.jpg" alt="image 12" width="200" height="400">
</div>



## Contribution
1. Smit Prajapati
2. Prince Patel
3. Raghav Patel
