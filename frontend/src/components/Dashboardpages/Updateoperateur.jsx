import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, FormGroup, Input, CustomInput, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import Select from "react-select";
import { useParams } from 'react-router-dom';

const Operateur = () => {
  const { id } = useParams();
  const [date_ordre_paiement, setDateOrdrePaiement] = useState("");
  const [fournisseur, setFournisseur] = useState("");
  const [date_reception, setDateReception] = useState("");
  const [objet, setObjet] = useState("");
  const [pieces_jointes, setPiecesJointes] = useState(null);
  const [ordre_paiement, setOrdrePaiement] = useState("");
  const [structure_ordinatrice, setStructureOrdinatrice] = useState("");
  const [devise, setDevise] = useState("");
  const [montant, setMontant] = useState("");
  const [upload_document, setUploadDocument] = useState(null);
  const notificationAlertRef = useRef(null);
  const optionsAttachments = [
    { label: "PV DE RÉCEPTION", value: "PV DE RÉCEPTION" },
    { label: "BON DE COMMANDE", value: "BON DE COMMANDE" },
    { label: "BON DE LIVRAISON", value: "BON DE LIVRAISON" },
    { label: "COPIE DE CONTRACT", value: "COPIE DE CONTRACT" },
    { label: "APPEL À LA FACTURATION", value: "APPEL À LA FACTURATION" },
    { label: "RELEVÉ CONSOMMATION", value: "RELEVÉ CONSOMMATION" },
    { label: "CIN", value: "CIN" },
  ];
  useEffect(() => {
    const fetchChargesLocatives = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/current-date-factureso/${id}`);
        const { fournisseur,ordre_paiement,date_ordre_paiement,montant,structure_ordinatrice,objet,devise,date_reception} = response.data;
        setFournisseur(fournisseur);
        setDateOrdrePaiement(date_ordre_paiement);
        setOrdrePaiement(ordre_paiement);
        setMontant(montant);
        setObjet(objet);
        setStructureOrdinatrice(structure_ordinatrice);
        setDevise(devise);
        setDateReception(date_reception);
      } catch (error) {
        console.error("Erreur lors de la récupération des charges locatives:", error);
      }
    };
    fetchChargesLocatives();
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !date_ordre_paiement.trim() ||
      !fournisseur.trim() ||
      !date_reception.trim() ||
      !objet.trim() ||
      !pieces_jointes ||
      !ordre_paiement.trim() ||
      !structure_ordinatrice.trim() ||
      !devise.trim() ||
      !montant.trim() ||
      !upload_document
    ) {
      showNotification(
        "danger",
        "Veuillez remplir tous les champs du formulaire."
      );
      return;
    }
    const formData = new FormData();
    formData.append("date_ordre_paiement", date_ordre_paiement);
    formData.append("fournisseur", fournisseur);
    formData.append("date_reception", date_reception);
    formData.append("objet", objet);
    formData.append("pieces_jointes", pieces_jointes);
    formData.append("ordre_paiement", ordre_paiement);
    formData.append("structure_ordinatrice", structure_ordinatrice);
    formData.append("devise", devise);
    formData.append("montant", montant);
    formData.append("upload_document", upload_document);
    const selectedPiecesJointesValues = pieces_jointes.map(
      (option) => option.value
    );
    formData.append("pieces_jointes", selectedPiecesJointesValues.join(","));
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/operateur/${id}`,
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
            </Row>
            <Row>
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
              <Col md="6">
                <FormGroup>
                  <label htmlFor="piecesJointes">Pièces jointes</label>
                  <Select
                          options={optionsAttachments}
                          value={pieces_jointes}
                          onChange={setPiecesJointes}
                          isMulti
                          placeholder="Sélectionnez des pièces jointes"
                        />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="ordrePaiement">Ordre de paiement</label>
                  <Input
                    type="text"
                    name="ordre_paiement"
                    value={ordre_paiement}
                    onChange={(e) => setOrdrePaiement(e.target.value)}
                    placeholder="Ordre de paiement"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="structureOrdinatrice">Structure ordinatrice</label>
                  <Input
                    type="select"
                    name="structure_ordinatrice"
                    value={structure_ordinatrice}
                    onChange={(e) => setStructureOrdinatrice(e.target.value)}
                  >
                  <option value="Choix structure">Choix structure</option>
                    <option value="Directeurs zone et DRs rattachées">Directeurs zone et DRs rattachées</option>
                    <option value="Directeurs centreaux et DRs rattachées">Directeurs centreaux et DRs rattachées</option>
                    </Input>
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

export default Operateur;
