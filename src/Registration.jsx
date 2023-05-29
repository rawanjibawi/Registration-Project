import React from 'react';
import './registration.css';
import axios from "axios";
import { useState } from 'react';
export default function Registration(){
    //in react if we had value='' without storing it's value in useState it will be read-only field
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(''); 

    const handleFirstName = (event) => {setFirstName(event.target.value);};

  const handleLastName = (event) => {setLastName(event.target.value);};

  const handleEmail = (event) => {setEmail(event.target.value);};

  const handlePassword = (event) => {setPassword(event.target.value);};
 function validateForm(event) {
  event.preventDefault();
  if (firstName === "" || lastName === "" || email === " " || password === "") {
    if (firstName === "") {
      document.getElementById("firstName").style.display = "block";
      document.getElementById("firstName").innerHTML =
        "First Name can't be left empty";
      document.getElementById("firstName").style.color = "red";
      document.getElementById("first_name").style.borderColor = "#ccc";
    } else {
      document.getElementById("firstName").style.display = "none";
      document.getElementById("first_name").style.borderColor = "#ccc";
    }

    if (lastName === "") {
      document.getElementById("lastName").style.display = "block";
      document.getElementById("lastName").innerHTML =
        "Last Name can't be left empty";
      document.getElementById("lastName").style.color = "red";
      document.getElementById("last_name").style.borderColor = "#ccc";
    } else {
      document.getElementById("lastName").style.display = "none";
      document.getElementById("last_name").style.borderColor = "#ccc";
    }

    if (email === " ") {
      document.getElementById("format").style.display = "block";
      document.getElementById("format").innerHTML = "Email can't be left empty";
      document.getElementById("format").style.color = "red";
      document.getElementById("email").style.borderColor = "#ccc";
    } else {
      document.getElementById("format").style.display = "none";
      document.getElementById("email").style.borderColor = "#ccc";
    }

    if (password === "") {
      document.getElementById("pass").style.display = "block";
      document.getElementById("pass").innerHTML =
        "Password can't be left empty";
      document.getElementById("pass").style.color = "red";
      document.getElementById("password").style.borderColor = "#ccc";
    } else {
      document.getElementById("pass").style.display = "none";
      document.getElementById("password").style.borderColor = "#ccc";
    }

    return false;
  }
  
 
  //  event.preventDefault(); // Prevent the default form submission
  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  registerUser(userData); // Call the function to register the user
  return true;
}
// async allow to run php file while still in register page
const registerUser = async (userData) => {
  try {
    const response = await axios.post("http://localhost:80/PHP/login-registration/register.php", userData);
    console.log(response.data);

    if (response.data.success) {
      // Registration success, redirect or perform necessary actions
      window.location.href = "home.html";
    } else {
      // Registration failed, display error message
      document.getElementById("formatDatabase").innerHTML = "The email already exists. Please login instead.";
      document.getElementById("formatDatabase").style.fontSize = "14px";
      document.getElementById("formatDatabase").style.color = "red";
    }
  } catch (error) {
    console.error(error);
  }
};
 const emailVerification = () => {
  let input = email.trim();
  let regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!regexp.test(input)) {
    document.getElementById("format").innerHTML =
      "Invalid email format. Please use the following format: example@gmail.com";
    document.getElementById("format").style.display = "block";
    document.getElementById("format").style.color = "red";
    document.getElementById("format").style.fontSize = "small";
    document.getElementById("email").style.borderColor = "red";
  } else {
    document.getElementById("format").style.display = "none";
    document.getElementById("email").style.borderColor = "#ccc";
  }
};
  function checkPassword() {
   if (password.length < 8) {
     document.getElementById("pass").innerHTML ="Password should at least contain 8 characters";
     document.getElementById("pass").style.display = "block";
     document.getElementById("pass").style.color = "red";
     document.getElementById("pass").style.fontSize = "small";
     document.getElementById("password").style.borderColor = "red";
   } else {
     document.getElementById("pass").style.display = "none";
          document.getElementById("password").style.borderColor = "#ccc";
   }
}


    return(
        <>
      <form id='form' onSubmit={validateForm} method='post' action='http://localhost:80/PHP/login-registration/register.php' target='_blank'>
      <h1>Registration</h1> 
      <h2 id='validate'> </h2>
      <h3 id="formatDatabase"> </h3>
      <div className="input-wrapper">
        <p id="firstName"></p>
        <label htmlFor="first_name">First Name <span style={{color: "red"}}>*</span></label>
        <input type="text" className="input" name="first_name" id="first_name" placeholder='Rawan' value={firstName} onChange={handleFirstName} />
        <p id="lastName"></p>
        <label htmlFor="last_name">Last Name <span style={{color: "red"}}>*</span></label>
        <input type="text" className="input" name="last_name" id="last_name" placeholder='Jibawi' value={lastName} onChange={handleLastName} />
        <p id="format"></p>
        <label htmlFor="email">Email <span style={{color: "red"}}>*</span></label>
        <input type="email" className="input" name="email" id="email" placeholder="example@gmail.com" value={email}  onChange={handleEmail} onBlur={emailVerification}/>
        
      </div>
      <div className="input-wrapper divPassword">
        <p id="pass"></p>
        <label htmlFor="password">Password <span style={{color: "red"}}>*</span></label>
        <input type="password" className="input" name="password" id="password" placeholder="password" value={password} onChange={handlePassword} onBlur={checkPassword}/>
        <div className="signin">
          <input type="submit" className="signin-input" value="submit" name="submit"/>
        </div>
        <div>
          <span className="Google">Or</span>
        </div>
        <div className="btn_google">
          <button type="button" className="google-button">
            <span className="icon">
              <i className="fab fa-google"></i>
            </span>
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="no-account">
          <span>Have an Account?</span>
          <a href=" #" className="no_account">
            Login
          </a>
        </div>
      </div>
        </form>
        </>
    );
}