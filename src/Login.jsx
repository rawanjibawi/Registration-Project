import React from 'react';
import './registration.css';
import { emailVerification, validateForm } from './EventHandler';
import { useState } from 'react';
function Registration(){
    //in react if we had value='' without storing it's value in useState it will be read-only field
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const handleEmail = (event) => {setEmail(event.target.value);};

  const handlePassword = (event) => {setPassword(event.target.value);};
    return(
        <>
      <form id='form' onSubmit={(event) => { if (validateForm(event)) event.currentTarget.submit(); }} method='post'> 
      <h1>Registration</h1> 
      <h2 id='validate'> </h2>
      <h3 id="formatDatabase"> </h3>
      <div className="input-wrapper">
        <p id="format"></p>
        <label htmlFor="email">Email <span style={{color: "red"}}>*</span></label>
        <input type="email" className="input" name="email" id="email" placeholder="example@gmail.com" value={email}  onChange={handleEmail} onBlur={emailVerification}/>
        
      </div>
      <div className="input-wrapper divPassword">
        <p id="pass"></p>
        <label htmlFor="password">Password <span style={{color: "red"}}>*</span></label>
        <input type="password" className="input" name="password" id="password" placeholder="password" value={password} onChange={handlePassword}/>
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
          <span>No account?</span>
          <a href=" #" className="no_account">
            Sign up
          </a>
        </div>
      </div>
        </form>
        </>
    );
}
export default Registration;