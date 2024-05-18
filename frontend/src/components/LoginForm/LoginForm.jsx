import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ttLogo from '../../assets/images/tt.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phone: '',
    adresse: '',
    nationnalite: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [authCount, setAuthCount] = useState(0); // État pour compter les authentifications

  useEffect(() => {
    const storedCount = localStorage.getItem('auth_count');
    if (storedCount) {
      setAuthCount(parseInt(storedCount));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitm = async (event) => {
    event.preventDefault();
  
    // Vérification si tous les champs sont remplis
    const areFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    if (!areFieldsFilled) {
      window.alert("Vous devez remplir tous les champs.");
      return;
    }
  
    try {
      const user_id = localStorage.getItem('user_id'); // Récupérer l'`user_id` stocké localement
      const user_profil = localStorage.getItem('user_profil');
      const response = await axios.post(`http://localhost:8000/api/register/${user_id}`, formData);
  
      if (response.data.success) {
        navigate(response.data.redirect);
        console.log(navigate);
      }
    } catch (error) {
      console.error('direction introuvable');
      // Afficher une alerte ou un message d'erreur à l'utilisateur
    }
  };
  

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: email,
        password: password,
      });
  
      if (!response.data.success) {
        throw new Error('Invalid credentials');
      } else {
        // Stocker l'`user_id` localement après une connexion réussie
        const user_id = response.data.user_id;
        localStorage.setItem('user_id', user_id);
        const user_profil = response.data.user_profil;
        localStorage.setItem('user_profil', user_profil);
        console.log(user_profil);
        console.log(user_id);
        // Récupérer ou initialiser authCount pour cet utilisateur
        let authCountUser = parseInt(localStorage.getItem(`auth_count_${user_id}`) || 0);
  
        // Vérifier si c'est la première authentification
        if (authCountUser === 0) {
          console.log("authCount:", authCountUser);
          
          // Ouvrir le modal seulement pour la première authentification
          setModalOpen(true);
        } else {
          navigate(response.data.redirect);
        }
  
        // Mettre à jour le nombre d'authentifications pour cet utilisateur
        authCountUser++;
        localStorage.setItem(`auth_count_${user_id}`, authCountUser);
      }
    } catch (error) {
      // Afficher une alerte avec le message d'erreur
      window.alert('Adresse ou mot de passe incorrecte');
    }
  };
  const handleForgotPassword = async (event) => {
    event.preventDefault(); // Empêche la redirection par défaut du lien
    if (!email.trim()) {
      window.alert("Veuillez saisir votre adresse e-mail.");
      return;
    }
  
    try {
     
      const response = await axios.post('http://localhost:8000/api/forgotpassword', { email });
      const user_id = response.data.user_id; // Supposons que votre backend renvoie l'`user_id`
      localStorage.setItem('user_id', user_id);
      // Peut-être que vous voulez également naviguer vers une page de réinitialisation de mot de passe ici
      navigate('/forgotpassword'); 
      console.log(user_id);
    } catch (error) {
      window.alert("Adresse n'existe pas !!");
    }
  };
  
  

  return (
    <div className="login-container">
      <form className="form-login" onSubmit={handleLogin}>
        <img src={ttLogo} alt="Logo" className="login__logo" />
        <p className="large"><b>Tunisie Télécom</b></p><br />
        <ul className="login-nav">
          <center>
            <li className="login-nav__item active">
              <Link to="/login">Se connecter</Link>
            </li>
          </center>
        </ul>
        <label htmlFor="login-input-user" className="login__label">
          Adresse mail
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
          Mot de passe
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
      <Link className="login__forgot" onClick={handleForgotPassword}>Réinitialiser votre mot de passe</Link>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} keyboard={false} backdrop="static">
        <ModalHeader>Pour vous connecter, vous devez remplir ce formulaire</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmitm}>
            <div className="flex-container">
            </div>
            <div className="flex-container">
              <div className="flex-item">
                <label htmlFor="name" className="login__label">
                  Nom
                </label>
                <Input
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
                <label htmlFor="lastname" className="login__label">
                  Prénom
                </label>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="login__input"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex-container">
              <div className="flex-item">
                <label htmlFor="nationnalite" className="login__label">
                  Nationalité
                </label>
                <Input
                  type="text"
                  id="nationnalite"
                  name="nationnalite"
                  className="login__input"
                  value={formData.nationnalite}
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
                <Input
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
                <label htmlFor="adresse" className="login__label">
                  Adresse
                </label>
                <Input
                  type="text"
                  id="adresse"
                  name="adresse"
                  className="login__input"
                  value={formData.adresse}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter className="flex-container login__label">
          <Button type="submit" color="primary" onClick={handleSubmitm}>Envoyer</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LoginForm;
