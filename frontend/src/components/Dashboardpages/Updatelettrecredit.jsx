import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, FormGroup, Input, CustomInput, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import { useParams } from 'react-router-dom';

const Lettrecredit = () => {
  const { id } = useParams();
  const [numeroOP, setNumeroOP] = useState("");
  const [idFiscale, setIdFiscale] = useState("");
  const [dateFacture, setDateFacture] = useState("");
  const [montant, setMontant] = useState("");
  const [objet, setObjet] = useState("");
  const [nature3WM, setNature3WM] = useState("");
  const [numeroFacture, setNumeroFacture] = useState("");
  const [devise, setDevise] = useState("");
  const [dateReception, setDateReception] = useState("");
  const [uploadDocument, setUploadDocument] = useState(null);
  const notificationAlertRef = useRef(null);
  useEffect(() => {
    const fetchChargesLocatives = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/current-date-factureslc/${id}`);
        const { numeroOP,idFiscale,objet,dateFacture,montant,nature3WM,numeroFacture,devise,dateReception} = response.data;
        setNumeroOP(numeroOP);
        setIdFiscale(idFiscale);
        setDateFacture(dateFacture);
        setObjet(objet);
        setMontant(montant);
        setNature3WM(nature3WM);
        setNumeroFacture(numeroFacture);
        setDevise(devise);
        setDateReception(dateReception);
      } catch (error) {
        console.error("Erreur lors de la récupération des charges locatives:", error);
      }
    };
    fetchChargesLocatives();
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !numeroOP.trim() ||
      !idFiscale.trim() ||
      !dateFacture.trim() ||
      !montant.trim() ||
      !objet.trim() ||
      !nature3WM.trim() ||
      !numeroFacture.trim() ||
      !devise.trim() ||
      !dateReception.trim() ||
      !uploadDocument
    ) {
      showNotification(
        "danger",
        "Veuillez remplir tous les champs du formulaire."
      );
      return;
    }
    const formData = new FormData();
    formData.append("numeroOP", numeroOP);
    formData.append("idFiscale", idFiscale);
    formData.append("dateFacture", dateFacture);
    formData.append("montant", montant);
    formData.append("objet", objet);
    formData.append("nature3WM", nature3WM);
    formData.append("numeroFacture", numeroFacture);
    formData.append("devise", devise);
    formData.append("dateReception", dateReception);
    formData.append("uploadDocument", uploadDocument);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lettre-credit/${id}`,
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
                  <label htmlFor="numeroOP">Numéro OP</label>
                  <Input
                    type="text"
                    name="numeroOP"
                    value={numeroOP}
                    onChange={(e) => setNumeroOP(e.target.value)}
                    placeholder="Numéro OP"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="idFiscale">ID Fiscale</label>
                  <Input
                    type="text"
                    name="idFiscale"
                    value={idFiscale}
                    onChange={(e) => setIdFiscale(e.target.value)}
                    placeholder="ID Fiscale"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="dateFacture">Date de la facture</label>
                  <Input
                    type="date"
                    name="dateFacture"
                    value={dateFacture}
                    onChange={(e) => setDateFacture(e.target.value)}
                    placeholder="Date de la facture"
                  />
                </FormGroup>
              </Col>
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
            </Row>
            <Row>
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
              <Col md="6">
                <FormGroup>
                  <label htmlFor="nature3WM">Nature 3WM</label>
                  <Input
                    type="text"
                    name="nature3WM"
                    value={nature3WM}
                    onChange={(e) => setNature3WM(e.target.value)}
                    placeholder="Nature 3WM"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="numeroFacture">Numéro de facture</label>
                  <Input
                    type="text"
                    name="numeroFacture"
                    value={numeroFacture}
                    onChange={(e) => setNumeroFacture(e.target.value)}
                    placeholder="Numéro de facture"
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
                  <label htmlFor="dateReception">Date de réception</label>
                  <Input
                    type="date"
                    name="dateReception"
                    value={dateReception}
                    onChange={(e) => setDateReception(e.target.value)}
                    placeholder="Date de réception"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="uploadDocument">Upload document</label>
                  <CustomInput
                    type="file"
                    id="uploadDocumentInput"
                    name="uploadDocument"
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

export default Lettrecredit;
