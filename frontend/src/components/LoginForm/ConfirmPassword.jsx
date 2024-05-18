import React, { useState } from "react";
import "../LoginForm/LoginForm.css";
import ttLogo from '../../assets/images/tt.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConfirmPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const validateForm = async (event) => {
        event.preventDefault();
        
        // Validation de la saisie du nouveau mot de passe
        if (!newPassword || !confirmPassword) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const user_id = localStorage.getItem('user_id'); // Récupérer l'`user_id` stocké localement
            const response = await axios.post(`http://localhost:8000/api/newpassword/${user_id}`, {
                password: newPassword,
            });

            // Redirection vers une page de confirmation ou une autre page appropriée
            navigate("/");
        } catch (error) {
            // Gestion des erreurs
            alert("Une erreur s'est produite lors de la mise à jour du mot de passe.");
            console.error(error);
        }
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    return (
        <div className="login-container">
            <form className="form-login" onSubmit={validateForm}>
                <img src={ttLogo} alt="Logo" className="login__logo"/>   
                <p className="large"><b>Tunisie Télécom</b></p><br/>
                <center><p><b>Entrer votre nouveau mot de passe</b></p></center>
                <label htmlFor="new-password" className="login__label">
                    Nouveau mot de passe
                </label>
                <input 
                    name="new-password" 
                    id="new-password" 
                    className="login__input" 
                    type="password" 
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    required 
                />
                <label htmlFor="confirm-password" className="login__label">
                    Confirmer le mot de passe
                </label>
                <input 
                    name="confirm-password" 
                    id="confirm-password" 
                    className="login__input" 
                    type="password" 
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required 
                />
                <button type="submit" className="login__submit">Valider</button>            
            </form>
        </div>
    );
}

export default ConfirmPassword;
