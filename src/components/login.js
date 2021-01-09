import React, {useState} from "react";  
import { Link } from 'react-router-dom';
import axios from 'axios'


// Getting the prop getToken by using deconstruction

const Login = ({ getToken }) =>  {

    // Déclaration variables d'état 
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

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userNameInput === '' && passwordInput === ''){
            setError('Les deux champs ne doivent pas être vide')
        } else if (userNameInput === '' && passwordInput !== ''){
            setError('Le champ Username ne peut pas être vide')
        } else if (userNameInput !== '' && passwordInput === ''){
            setError('Le champ Password ne peut pas être vide')
        }


        // Axios method to connect one user by using get method, (get, put, delete, post)
        axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/login/${userNameInput}/${passwordInput}`)

            //promess to know if the call is ok and return a response
            .then((res) => {
                const { token, id } = res.data.result
                localStorage.setItem('token', token)
                localStorage.setItem('id', id)

                // use the function getToken to pass the variable (state => isToken) from app.js to true
                
                getToken(true)
                setError('')
            })

            //promess to know if the call is not ok and return an error
            .catch((err) => {
                setError('L\'utilisateur n\'existe pas !')
            });
    }
    return (
        <div className='auth-inner'>
            <form method="post" onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input onChange={handleUserNameOnChange} type="text" className="form-control" placeholder="First name" value={userNameInput} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={handlePasswordOnChange} type="password" className="form-control" placeholder="Enter password" value={passwordInput}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <Link to="/sign-up">password?</Link>
                </p>
                {/* bloc conditionnel */}
                {error !== '' && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Login