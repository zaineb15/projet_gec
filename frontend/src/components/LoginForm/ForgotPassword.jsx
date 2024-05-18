// ForgotPassword.js
import React, { useState } from "react";
import "../LoginForm/LoginForm.css";
import { Link } from "react-router-dom";
import ttLogo from '../../assets/images/tt.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [mail_recuperation, setmail_recuperation] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setmail_recuperation(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const user_id = localStorage.getItem('user_id'); // Récupérer l'`user_id` stocké localement
            console.log(user_id);
            const response = await axios.post(`http://localhost:8000/api/reset-password/${user_id}`, {
                mail_recuperation: mail_recuperation,
            });
            navigate('/confirmcode'); 
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <form className="form-login" onSubmit={handleSubmit}>
                <img src={ttLogo} alt="Logo" className="login__logo"/>   
                <p className="large"><b>Tunisie Télécom</b></p><br/>
                <center><p><b> Entrer votre adresse mail pour récupérer votre code confidentiel</b></p></center>
                <label htmlFor="login-input-user" className="login__label">
                    mail
                </label>
                <input 
                    value={mail_recuperation} 
                    onChange={handleChange} 
                    name="mail_recuperation" 
                    id="login-input-user" 
                    className="login__input" 
                    type="text" 
                    required 
                />
                <button type="submit" className="login__submit">Envoyer le code</button>
                {message && <p>{message}</p>}            
            </form>
        </div>
    );
}

export default ForgotPassword;
