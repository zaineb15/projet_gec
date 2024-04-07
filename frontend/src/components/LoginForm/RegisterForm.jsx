import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ttLogo from '../../assets/images/tt.png';
import axios from 'axios';

const RegisterForm = () => {
  const navigate = useNavigate(); // Utilisation de useNavigate pour gérer la navigation
  const [formData, setFormData] = useState({
    name: '', // Modifié le champ 'name' au lieu de 'first_name'
    username: '', // Modifié le champ 'username' au lieu de 'last_name'
    email: '',
    password: '',
    confirm_password: '',
    phone: '', // Modifié le champ 'phone' au lieu de 'phone_number'
    profil: 'fournisseur',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const { password, confirm_password } = formData;
  
      // Vérifier si les mots de passe correspondent
      if (password !== confirm_password) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }
    
      // Vérifier si le mot de passe contient au moins 8 caractères alphanumériques
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        alert('Le mot de passe doit contenir au moins 8 caractères alphanumériques');
        return;
      }
    
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        
        // Rediriger vers la page de connexion après une inscription réussie
        navigate("/");
      } catch (error) {
        console.error('Erreur:', error.message);
      }
    };
  

  return (
    <div className="login-container">
      <form className="form-login" onSubmit={handleSubmit}>
        <img src={ttLogo} alt="Logo" className="login__logo" />
        <p className="large"><b>Tunisie Télécom</b></p>
        <ul className="login-nav">
          <center>
            <li className="login-nav__item">
              <Link to="/login">Se connecter</Link>
            </li>
            <li className="login-nav__item active">
              <Link to="/register">S'inscrire</Link>
            </li>
          </center>
        </ul>
        <div className="flex-container">
          <div className="flex-item">
            <label htmlFor="name" className="login__label">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="login__input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-item">
            <label htmlFor="username" className="login__label">
              Prénom
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="login__input"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <label htmlFor="email" className="login__label">
              Adresse mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="login__input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <label htmlFor="phone" className="login__label">
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="login__input"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <label htmlFor="profile" className="login__label">
              Profil
            </label>
            <select
              id="profil"
              name="profil"
              className="login__input"
              value={formData.profil}
              onChange={handleChange}
              required
            >
              <option value="fournisseur">Fournisseur</option>
              <option value="comptable">Comptable</option>
              <option value="agent_bof">Agent BOF</option>
            </select>
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <label htmlFor="password" className="login__label">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="login__input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-item">
            <label htmlFor="confirm_password" className="login__label">
              Confirmer mot de passe
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              className="login__input"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="login__submit">
          S'inscrire
        </button>
      </form>
      <Link to="/" className="login__forgot">Déjà un compte?</Link>
    </div>
  );
};

export default RegisterForm;
