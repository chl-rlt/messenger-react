import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'; 


function SignUp() {

    // Declaration of state variables with the useState hook 
    
    const [ success, setSuccess ] = useState('')
    const [ error, setError ] = useState('')
    const [ userNameInput, setUserNameInput ] = useState('')
    const [ passwordInput, setPasswordInput ] = useState('')

     // e => javascript object return by the eventListener (onChange)

    const handleUserNameOnChange = (e) => {
        const { value } = e.target
        setUserNameInput(value)
    }

    // e => javascript object return by the eventListener (onChange)
    const handlePasswordOnChange = (e) => {
        const { value } = e.target
        setPasswordInput(value)
    }

    // e => javascript object return by the eventListener (onSubmit)

    const handleSignUpSubmit = (e) => {
        e.preventDefault()
        if (userNameInput === '' && passwordInput === ''){
            setError('Les deux champs ne doivent pas être vide')
        } else if (userNameInput === '' && passwordInput !== ''){
            setError('Le champ Username ne peut pas être vide')
        } else if (userNameInput !== '' && passwordInput === ''){
            setError('Le champ Password ne peut pas être vide')
        }
        // Axios method to connect one user by using get method, (get, put, delete, post)

        axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/signup/${userNameInput}/${passwordInput}`)

             //promess to know if the call is ok and return a response
            .then((res) => {
                console.log(res.data);
                setError('')
                setSuccess(`${userNameInput} est bien inscrit ! :D Joie !`)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    console.log(error);
    return (

        // Form sign up JSX => render()

        <div className='auth-inner'>
            <form method='post' onSubmit={handleSignUpSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input onChange={handleUserNameOnChange} type="text" className="form-control" placeholder="First name" value={userNameInput} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input onChange={handlePasswordOnChange} type="password" className="form-control" placeholder="Enter password" value={passwordInput}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to="/sign-in">sign in?</Link>
                </p>
                {error !== '' && <p>{error}</p>}
                {success && <p>{success}</p>}
                
            </form>
        </div>
    );  
}

export default SignUp