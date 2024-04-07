import  {React, useState }  from "react";
import "../LoginForm/LoginForm.css";
import { Link } from "react-router-dom"; // Importez Link depuis react-router-dom
import ttLogo from '../../assets/images/tt.png'; // Importez l'image

const ForgotPassword = () => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Valider si l'entrée est un e-mail
        if (validateEmail(inputValue)) {
            console.log("C'est un e-mail valide");
        } else if (!isNaN(inputValue)) { // Valider si l'entrée est un nombre
            console.log("C'est un nombre");
        } else {
            console.log("Entrée invalide");
        }
    };

    // Fonction pour valider un e-mail
    const validateEmail = (email) => {
        // Vous pouvez utiliser une expression régulière pour la validation de l'e-mail
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    return (
        <div className="login-container"> {/* Utilisez className au lieu de class */}
            <form action="" method="POST" className="form-login" onSubmit={handleSubmit}>
                <img src={ttLogo} alt="Logo" class="login__logo"/>   
                <p class="large"><b>Tunisie Télécom</b></p><br/>
                <center><p><b> Entrer votre mail ou votre numéro de téléphone pour récupérer le code</b></p></center>
                <label for="login-input-user" class="login__label">
                    mail / number
                </label>
                <input value={inputValue} onChange={handleChange} name="adrnum" id="login-input-user" class="login__input" type="text" required />
                <button type="submit" class="login__submit">Send the code</button>            
            </form>
        </div>
    );
}

export default ForgotPassword;
