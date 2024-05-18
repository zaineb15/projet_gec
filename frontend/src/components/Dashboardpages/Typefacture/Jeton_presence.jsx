import React, { useState, useRef } from "react";
import { Card, CardHeader, FormGroup, Input, CustomInput, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import Select from "react-select";

const Fiscalité= () => {
  const [beneficiaire, setBeneficiaire] = useState("");
  const [date_reception, setDateReception] = useState("");
  const [montant, setMontant] = useState("");
  const [objet, setObjet] = useState([]);
  const [dossier_fiscalite, setDossierFiscalite] = useState(null);
  const [num_po, setNumeroOP] = useState("");
  const [devise, setDevise] = useState("");
  const [date_ordre_paiement, setDateOrdrePaiement] = useState("");
  const [upload_document, setUploadDocument] = useState(null);
  const notificationAlertRef = useRef(null);
  const optionsObjet = [
    { label: "NOUVELLE FACTURE", value: "NOUVELLE FACTURE" },
    { label: "ANNULE ET REMPLACE", value: "ANNULE ET REMPLACE" },
    { label: "PÉNALITÉ", value: "PÉNALITÉ" },
    { label: "PÉNALITÉ DE RETARD", value: "PÉNALITÉ DE RETARD" },
    { label: "NOTE DE REMBOURSEMENT", value: "NOTE DE REMBOURSEMENT" },
    { label: "AVOIR", value: "AVOIR" },
    { label: "NOTE DE DEBIT", value: "NOTE DE DEBIT" },
    { label: "MEMOIRE DE REGLEMENT - MR", value: "MEMOIRE DE REGLEMENT - MR" },
    {
      label: "OUVERTURE DE LETTRE DE CREDIT (LC)",
      value: "OUVERTURE DE LETTRE DE CREDIT (LC)",
    },
    { label: "FICHE D'INTERVENTION", value: "FICHE D'INTERVENTION" },
  ];
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !beneficiaire.trim() ||
      !date_reception.trim() ||
      !montant.trim() ||
      !dossier_fiscalite ||
      !num_po.trim() ||
      !devise.trim() ||
      !date_ordre_paiement.trim() ||
      !upload_document
    ) {
      showNotification(
        "danger",
        "Veuillez remplir tous les champs du formulaire."
      );
      return;
    }
    const formData = new FormData();
    formData.append("beneficiaire", beneficiaire);
    formData.append("date_reception", date_reception);
    formData.append("montant", montant);
    formData.append("dossier_fiscalite", dossier_fiscalite);
    formData.append("num_po", num_po);
    formData.append("devise", devise);
    formData.append("date_ordre_paiement", date_ordre_paiement);
    formData.append("upload_document", upload_document);
    const selectedObjetValues = objet.map((option) => option.value);
    formData.append("objet", selectedObjetValues.join(","));
  
    try {
      const user_id = localStorage.getItem('user_id'); 
      const response = await axios.post(
        `http://127.0.0.1:8000/api/fiscalite?user_id=${user_id}`,
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
                  <label htmlFor="beneficiaire">Bénéficiaire</label>
                  <Input
                    type="text"
                    name="beneficiaire"
                    value={beneficiaire}
                    onChange={(e) => setBeneficiaire(e.target.value)}
                    placeholder="Bénéficiaire"
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
                  <Select
                          options={optionsObjet}
                          value={objet}
                          onChange={setObjet}
                          isMulti
                          placeholder="Sélectionnez des objets"
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
    name="num_po"
    value={num_po}
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
                    id="uploadDocumentInput"
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

export default Fiscalité;
