import React, { useState, useRef } from "react";
import { Card, CardHeader, FormGroup, Input, CustomInput, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";

const Charges_sociales = () => {
  const [fournisseur, setFournisseur] = useState("");
  const [date_reception, setDateReception] = useState("");
  const [montant, setMontant] = useState("");
  const [objet, setObjet] = useState("");
  const [dossier_fiscalite, setDossierFiscalite] = useState("");
  const [numero_op, setNumeroOP] = useState("");
  const [devise, setDevise] = useState("");
  const [date_ordre_paiement, setDateOrdrePaiement] = useState("");
  const [upload_document, setUploadDocument] = useState(null);
  const notificationAlertRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(); // Déplacer ici
    formData.append("fournisseur", fournisseur);
    formData.append("date_reception", date_reception);
    formData.append("montant", montant);
    formData.append("objet", objet);
    formData.append("dossier_fiscalite", dossier_fiscalite);
    formData.append("numero_op", numero_op);
    formData.append("devise", devise);
    formData.append("date_ordre_paiement", date_ordre_paiement);
    formData.append("upload_document", upload_document);

    try {
      const user_id = localStorage.getItem('user_id'); 
      const response = await axios.post(
        `http://127.0.0.1:8000/api/charges-sociales?user_id=${user_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      showNotification("success", "Facture créée avec succès!");
      window.location.href = "/Agent/listebordereau";
    } catch (error) {
      console.error(
        "Erreur lors de la création de la facture:",
        error.message
      );
      showNotification("danger", "Erreur lors de la création de la facture.");
    }
  };

  const showNotification = (type, message) => {
    const options = {
      place: "tr",
      message: <div>{message}</div>,
      type: type,
      autoDismiss: 5,
    };
    notificationAlertRef.current.notificationAlert(options);
  };


  const handleDocumentChange = (event) => {
    setUploadDocument(event.target.files[0]);
  };

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <h4 className="title">Saisir une facture</h4>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="fournisseur">Fournisseur</label>
                  <Input
                    type="text"
                    name="fournisseur"
                    value={fournisseur}
                    onChange={(e) => setFournisseur(e.target.value)}
                    placeholder="Fournisseur"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="dateReception">Date de réception</label>
                  <Input
                    type="date"
                    name="date_reception"
                    value={date_reception}
                    onChange={(e) => setDateReception(e.target.value)}
                    placeholder="Date de réception"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="montant">Montant</label>
                  <Input
                    type="text"
                    name="montant"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    placeholder="Montant"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="objet">Objet</label>
                  <Input
                    type="text"
                    name="objet"
                    value={objet}
                    onChange={(e) => setObjet(e.target.value)}
                    placeholder="Objet"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label htmlFor="dossierFiscalite">Dossier fiscalité</label>
                  <Input
                    type="text"
                    name="dossier_fiscalite"
                    value={dossier_fiscalite}
                    onChange={(e) => setDossierFiscalite(e.target.value)}
                    placeholder="Dossier fiscalité"
                    />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="numeroOP">Numéro OP</label>
                  <Input
                    type="text"
                    name="numero_op"
                    value={numero_op}
                    onChange={(e) => setNumeroOP(e.target.value)}
                    placeholder="Numéro OP"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="devise">Devise</label>
                  <Input
                    type="select"
                    name="devise"
                    value={devise}
                    onChange={(e) => setDevise(e.target.value)}
                  >
                    <option value="EUR">EUR</option>
                    <option value="TND">TND</option>
                    <option value="EGP">EGP</option>
                    <option value="USD">USD</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="dateOrdrePaiement">Date ordre de paiement</label>
                  <Input
                    type="date"
                    name="date_ordre_paiement"
                    value={date_ordre_paiement}
                    onChange={(e) => setDateOrdrePaiement(e.target.value)}
                    placeholder="Date ordre de paiement"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="uploadDocument">Upload document</label>
                  <CustomInput
                    type="file"
                    id="upload_document"
                    name="upload_document"
                    accept=".pdf, .png, .jpg"
                    onChange={handleDocumentChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Envoyer
            </button>
          </div>
        </form>
      </Card>
      <NotificationAlert ref={notificationAlertRef} />
    </div>
  );
};

export default Charges_sociales;
