import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Utilisez useNavigate au lieu de useHistory
import ttLogo from '../../assets/images/tt.png';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Utilisez useNavigate pour gérer la navigation

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: email,
        password: password
      });
  
      if (!response.data.success) {
        throw new Error('Identifiants invalides');
      }

      // Rediriger vers la page appropriée après la connexion réussie
      navigate(response.data.redirect); // Utilisez navigate avec l'URL de redirection provenant de la réponse
      
    } catch (error) {
      // Afficher une alerte avec le message d'erreur
      window.alert('non invalides');
    }
  };

  return (
    <div className="login-container">
      <form className="form-login" onSubmit={handleLogin}>
        <img src={ttLogo} alt="Logo" className="login__logo"/>
        <p className="large"><b>Tunisie Télécom</b></p><br/>
        <ul className="login-nav">
          <center>
            <li className="login-nav__item active">
              <Link to="/login">se connecter</Link>
            </li>
            <li className="login-nav__item">
              <Link to="/register">s'inscrire</Link>
            </li>
          </center>
        </ul>
        <label htmlFor="login-input-user" className="login__label">
          adresse mail
        </label>
        <input
          type="email"
          id="login-input-user"
          className="login__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="login-input-password" className="login__label">
          mot de passe
        </label>
        <input
          type="password"
          id="login-input-password"
          className="login__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login__submit">Se connecter</button>
      </form>
      <Link to="/forgotpassword" className="login__forgot">Forgot your password ?</Link>
    </div>
  );
};

export default LoginForm;
