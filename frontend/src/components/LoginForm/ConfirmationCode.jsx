import React, { useState } from "react";
import "../LoginForm/LoginForm.css";
import { Link } from "react-router-dom";
import ttLogo from '../../assets/images/tt.png';

const ConfirmationCode = () => {
    const [confirmationCode, setConfirmationCode] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Vous pouvez ajouter ici la logique pour soumettre le code de confirmation
        alert("Code de confirmation soumis : " + confirmationCode);
    };

    const handleChange = (event) => {
        setConfirmationCode(event.target.value);
    };

    return (
        <div className="login-container">
            <form action="" method="POST" className="form-login" onSubmit={handleSubmit}>
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
            </form>
        </div>
    );
}

export default ConfirmationCode;
