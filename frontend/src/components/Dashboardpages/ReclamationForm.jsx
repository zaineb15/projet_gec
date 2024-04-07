import React, { useState, useRef } from 'react';
import { Card, CardHeader } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';
import axios from 'axios';

const ReclamationForm = () => {
  const [objet, setObjet] = useState('');
  const [message, setMessage] = useState('');
  const notificationAlertRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    if (!objet.trim() || !message.trim()) {
      showNotification('danger', 'Veuillez remplir tous les champs du formulaire.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/reclamation', { objet, message });
      console.log(response.data); // Vérifiez la réponse de l'API dans la console
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      showNotification('success', 'Réclamation envoyée avec succès!');
      window.location.href = "/fournisseur/listereclamation";
    } catch (error) {
      console.error("Erreur lors de l'envoi de la réclamation:", error.message);
      showNotification('danger', 'Erreur lors de l\'envoi de la réclamation.');
    }
  };

  const showNotification = (type, message) => {
    const options = {
      place: 'tr',
      message: <div>{message}</div>,
      type: type,
      autoDismiss: 5,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <div className="content">
      <Card>
        <br />
        <CardHeader>
          <h4 className="title">Saisir votre réclamation</h4>
          <p className="category">
            Nous allons consulter votre réclamation au bout de 24h.
          </p>
          <p className="category">Merci pour votre confiance.</p>
        </CardHeader>
        <div className="content-wrapper">
          <div className="card card-info">
            <div className="card-header"></div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="objet">Objet</label>
                  <input
                    type="text"
                    id="objet"
                    className="form-control"
                    name="objet"
                    value={objet}
                    onChange={(e) => setObjet(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    className="form-control"
                    rows="4"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </Card>
      {/* Affichage de la notification */}
      <NotificationAlert ref={notificationAlertRef} />
    </div>
  );
};

export default ReclamationForm;
