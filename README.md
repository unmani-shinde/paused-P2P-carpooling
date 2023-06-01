<h1 align="center">
  <a href="https://github.com/CommunityOfCoders/Inheritance-2022">
    <img src="https://res.cloudinary.com/dn6vz8exv/image/upload/v1665664791/inh_zzefoy.jpg" alt="CoC Inheritance 2022" width="500" height="166">
  </a>
  <br>
  P2P Carpooling Using BlockChain Technology
</h1>

<div align="center">
   <strong>P2P Carpooling Using Blockchain</strong>P2P Decentralised Carpooling Network -<br>
  CoC Inheritance 2022 || PAUS-ed <br> <br>
</div>
<hr>

<details>
<summary>Table of Contents</summary>

- [Description](#description)
- [Links](#links)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Progress](#progress)
- [Future Scope](#future-scope)
- [Applications](#applications)
- [Project Setup](#project-setup)
- [Usage](#usage)
- [Team Members](#team-members)
- [Mentors](#mentors)
- [Screenshots](#screenshots)

</details>

## 📝Description

Currently, most carpooling systems are in the control of the industry giants like Ola, Uber and several others. Thave all the data of drivers as well as of riders and this can lead to major privacy issues.
This project therefore aims to move ride-sharing and car hire are to blockchain in order to build a much more secure and reliable carpooling system that would connect the rider and driver directly using "smart contracts" without the intervention of any third party.

1. **Decentralized Network**: A peer-to-peer carpooling platform based on blockchain operates on a decentralized network, eliminating the need for intermediaries.
2. **Secure Transactions**: The platform uses blockchain technology to secure and track transactions between users, ensuring the safety and transparency of financial transactions.
3. **Smart Contracts**: The platform can be powered by smart contracts, automatically executing the terms of a carpooling agreement without intermediaries.
4. **Data Privacy**: User data is protected by the immutable and secure nature of blockchain technology, ensuring privacy and security.
## 🔗Links

- [GitHub Repository](https://github.com/unmani-shinde/paused-P2P-carpooling)
- [Demo Video](https://drive.google.com/drive/folders/1j7mK10Qer7rMUcTG3Q0DZU0UBT-TxGUL?usp=sharing)
- [Drive Link to Screenshots of your project](https://drive.google.com/drive/folders/1-4yxv0tFacmeiL3HV4LnqMMpuFB9aEDb?usp=sharing)
- [Hosted Website Link]()
- [Hosted Backend Link]()

Add any more links/resources you used for your project

## 🤖Tech-Stack

#### Front-end
- HTML
- CSS
- JavaScript
- ReactJS
- web3.js [Documentation](https://web3py.readthedocs.io/en/v5/)
- ethers.js [Documentation](shttps://docs.ethers.org/v5/)


#### Back-end
- Node.js [Documentation](https://nodejs.org/en/docs/)
- Express.js [Documentation](https://devdocs.io/express/)

#### Database
- MongoDB [Documentation](https://www.mongodb.com/docs/)

#### Extensions
- Metamask [Documentation](https://docs.metamask.io/guide/)
- CORS Blocker [Documentation](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino)

#### Additional Softwares
- Remix IDE [Documentation](https://remix-ide.readthedocs.io/en/latest/)
- Thunderclient [Documentation](https://thunder-api.readthedocs.io/en/latest/)

#### File Structure
```
📦master
 ┣ 📂backend
 ┃ ┗ 📂models                                 # Contains schema for MongoDB collection named User (User.js)
 ┃ ┗ 📂routes                                 # Contains Auth.js for POST requests from backend to database
 ┃ ┗ 📜.gitignore               
 ┃ ┗ 📜db.js                                  #Connects node.js to MongoDB
 ┃ ┗ 📜index.js                               #Parent File
 ┃ ┗ 📜package.json                           #Dependencies are listed                             
 ┃ ┗ 📜package-lock.json
 ┣ 📂public
 ┣ 📂src                          
 ┃ ┗ 📂assets                                 # Contains assets like fonts, images used in the UI
 ┃ ┃ ┗ 📂font
 ┃ ┃ ┗ 📂Images
 ┃ ┃ ┗ 📂img  
 ┃ ┗ 📂bookaridecomponents                    # React Components utilised in the Book & Publish a Ride pages 
 ┃ ┃ ┗ 📂About
 ┃ ┃ ┗ 📂Home
 ┃ ┃ ┗ 📂NavBar
 ┃ ┃ ┗ 📂Popular
 ┃ ┃ ┗ 📂Publish
 ┃ ┗ 📂components                             # React Components utilised in the Home page
 ┃ ┃ ┗ 📜Banner.js 
 ┃ ┃ ┗ 📜NavBar.js 
 ┃ ┃ ┗ 📜Contact.js  
 ┃ ┃ ┗ 📜Footer.js 
 ┃ ┃ ┗ 📜Projects.js   
 ┃ ┗ 📂contracts                            # Contains the Smart Contract for Carpooling
 ┃ ┃ ┗ 📜carpool-contract.sol 
 ┃ ┗ 📂Webpages                             # Contains the WebPages for Login & Sign Up Pages
 ┃ ┃ ┗ 📜BookARide.css
 ┃ ┃ ┗ 📜BookARide.js
 ┃ ┃ ┗ 📜forgotpassword.js
 ┃ ┃ ┗ 📜otp.js
 ┃ ┃ ┗ 📜resetpassword.js 
 ┃ ┃ ┗ 📜RideBooked.js 
 ┃ ┃ ┗ 📜signinpage.js
 ┃ ┃ ┗ 📜signuppage.js
 ┃ ┃ ┗ 📜style.css  
 ┃ ┗ 📜App.css             
 ┃ ┗ 📜App.js                               # Main file             
 ┃ ┗ 📜App.test.js            
 ┃ ┗ 📜index.css           
 ┃ ┗ 📜index.js                             # Renders App.js      
 ┃ ┗ 📜logo.svg                 
 ┣ 📜README.md                              
 ┗ 📜package.xml
 
 ```

## 📈Progress

List down all the fully implemented features in your project
 
- [x] User Authentication
- [x] Smart Contracts for Carpooling

List down all the partially implemented features in your project

- [ ] Partial Responsiveness 
- [ ] Booking & Publishing Rides via Metamask
- [ ] Explored Chainlink Oracle for External Distance Data Estimation

## 🔮Future Scope

List down all the future plans for the project here

- Real-time tracking of Rides
- Support & Notification System

## 💸Applications

Peer-to-peer carpooling platform based on blockchain has the potential to solve several real-life problems, including:

* **Traffic Congestion**: By incentivizing carpooling, the platform can help reduce the number of cars on the road, reducing traffic congestion and improving sustainability.

* **Inefficient and Costly Transportation**: Carpooling can provide an affordable and efficient alternative to individual transportation, reducing costs for both drivers and riders.

* **Lack of Trust**: Blockchain technology can provide a secure and transparent environment for carpooling, helping to build trust between users and reducing the risk of fraud or exploitation.

Applications of the platform can include:

* **Urban Commuting**: The platform can be used by city residents to carpool to work or other destinations, reducing traffic congestion and air pollution.

* **Long-distance Travel**: The platform can be used for long-distance travel, allowing drivers to offset the cost of gas and tolls by offering rides to passengers traveling in the same direction.

* **Event Transportation**: The platform can be used for event transportation, allowing attendees to share rides and reduce traffic congestion around event venues.

Monetization of the platform can be achieved through:

* **Commission on Transactions**: The platform can charge a small commission on each transaction, earning revenue from the financial transactions made on the platform.

* **Advertising**: The platform can sell advertising space to businesses, earning revenue from advertising campaigns.

* **Premium Services**: The platform can offer premium services for a fee, such as guaranteed ride matching or premium carpooling experiences.

* **Token System**: The platform can use a token system to incentivize users to participate in carpooling, and sell tokens to generate revenue.
## 🛠Project Setup

>Include your project setup basics here. Steps for how someone else can setup your project on their machine. Add any relevant details as well.

* STEP 1: [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm): Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser. It allows developers to build server-side applications in JavaScript and run them on the server. It includes a rich library of modules, known as npm (Node Package Manager), that enables developers to add functionality to their applications quickly and easily. It is widely used for web application development, building networked applications, and developing server-side scripts.
* STEP 2: [Install and configure MongoDB Compass](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) MongoDB is a popular, open-source NoSQL database management system. It is classified as a document-oriented database, which means that it stores data in the form of documents (in BSON format) instead of traditional table-based relational databases.
* STEP 3: [Install Metamask Extension](https://metamask.io/) MetaMask is a browser extension and mobile app that provides an interface for interacting with decentralized applications (dApps) built on the Ethereum blockchain. It allows users to securely store, manage, and send Ethereum and other Ethereum-based tokens, as well as interact with dApps in a user-friendly way.
* STEP 4: [Configure a Metamask Account](https://docs.metamask.io/guide/#why-metamask)

## 💻Usage

In the root directory, install all the dependencies of the frontend by running the command:
### `npm install`

Navigate to the \backend directory, and then install the dependencies of the backend by running the command:
### `npm install`

Navigate back to the root directory, and then execute the frontend by running the command:
### `npm start`

Execute the backend by running the command:
### `nodemon index.js`

## 👨‍💻Team Members

- [Unmani Shinde - ](https://github.com/unmani-shinde) [EMail](usShinde_b21@el.vjti.ac.in) :e-mail:
- [Soham Lad - ](https://github.com/Sohamlad2003) [EMail](ssLad_b21@el.vjti.ac.in) :e-mail:
- [Aishwarya Ravi - ](https://github.com/AishwaryaRavi07) [EMail](aravi_b21@el.vjti.ac.in) :e-mail:
- [Paras Pandita - ](https://github.com/ParasPandita1) [EMail](ppandita_b21@el.vjti.ac.in) :e-mail:


## 👨‍🏫Mentors

- [Sarvagnya Purohit - ](https://github.com/saRvaGnyA) [EMail](sarvagnyapurohit@gmail.com) :e-mail: 
- [Ketaki Deshmukh - ](https://github.com/KetakiMDeshmukh) [EMail](kmdeshmukh_b20@ce.vjti.ac.in) :e-mail: 

## 📱Screenshots
* [HomePage](https://drive.google.com/file/d/13_UGpVWltsI47RALYh1TeP4j9FLluAib/view?usp=sharing)
* [SignUp and Login](https://drive.google.com/file/d/1NrJKBQOLNzjvoR-u0Oq_1H445qAb1OjX/view?usp=sharing)
* [BookARide](https://drive.google.com/file/d/1Gvz6XaNCsDRl2nWDk7d73sWsiJft2lRk/view?usp=sharing)
* [PublishARide](https://drive.google.com/file/d/109EN2ZMG68e3U55w8kdMU4LtT418wbSF/view?usp=sharing)

[Main Link](https://drive.google.com/drive/folders/1-4yxv0tFacmeiL3HV4LnqMMpuFB9aEDb?usp=sharing)
