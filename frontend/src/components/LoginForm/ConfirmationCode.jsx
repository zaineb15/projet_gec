import React, { useState } from "react";
import "../LoginForm/LoginForm.css";
import { useNavigate } from 'react-router-dom';
import ttLogo from '../../assets/images/tt.png';
import axios from 'axios';

const ConfirmationCode = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Faire une requête au serveur pour vérifier le code de confirmation
            const user_id = localStorage.getItem('user_id'); // Récupérer l'`user_id` stocké localement
            const response = await axios.post(`http://localhost:8000/api/confirm-code/${user_id}`, {
                confirmationCode: confirmationCode,
            });
            
            // Si le code est correct, rediriger vers /confirmpassword
            navigate("/confirmpassword");
        } catch (error) {
            // Si le code est incorrect, afficher un message d'erreur
            setError("Le code de confirmation est incorrect");
        }
    };

    const handleChange = (event) => {
        setConfirmationCode(event.target.value);
    };

    return (
        <div className="login-container">
            <form className="form-login" onSubmit={handleSubmit}>
                <img src={ttLogo} alt="Logo" className="login__logo"/>   
                <p className="large"><b>Tunisie Télécom</b></p><br/>
                <center><p><b>Entrer le code confidentiel de six chiffres</b></p></center>
                <label htmlFor="confirmation-code" className="login__label">
                    Code de confirmation 
                </label>
                <input 
                    value={confirmationCode} 
                    onChange={handleChange} 
                    name="confirmation-code" 
                    id="confirmation-code" 
                    className="login__input" 
                    type="number" 
                    required 
                />
                <button type="submit" className="login__submit">Confirmer</button>   
                {error && <p className="error-message">{error}</p>}         
            </form>
        </div>
    );
}

export default ConfirmationCode;
