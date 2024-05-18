import React, { useState, useRef } from "react";
import { Card, CardHeader, FormGroup, Input, CustomInput, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import Select from "react-select";

const Steg = () => {
  const [montant, setMontant] = useState("");
  const [devise, setDevise] = useState("");
  const [dateFacture, setDateFacture] = useState("");
  const [objet, setObjet] = useState([]);
  const [numeroPO, setNumeroPO] = useState("");
  const [idFiscale, setIdFiscale] = useState("");
  const [direction, setDirection] = useState("");
  const [fournisseur, setFournisseur] = useState("");
  const [delaiPaiement, setDelaiPaiement] = useState("");
  const [structureOrdinatrice, setStructureOrdinatrice] = useState("");
  const [numeroFacture, setNumeroFacture] = useState("");
  const [dateReception, setDateReception] = useState("");
  const [uploadDocument, setUploadDocument] = useState(null);
  const [nature3wm, setNature3wm] = useState("");
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
      !montant.trim() ||
      !devise.trim() ||
      !dateFacture.trim() ||
      !numeroPO.trim() ||
      !idFiscale.trim() ||
      !direction.trim() ||
      !fournisseur.trim() ||
      !delaiPaiement.trim() ||
      !structureOrdinatrice.trim() ||
      !numeroFacture.trim() ||
      !dateReception.trim() ||
      !uploadDocument ||
      !nature3wm.trim()
    ) {
      showNotification(
        "danger",
        "Veuillez remplir tous les champs du formulaire."
      );
      return;
    }
    const formData = new FormData();
    formData.append("montant", montant);
    formData.append("devise", devise);
    formData.append("date_facture", dateFacture);
    formData.append("numero_po", numeroPO);
    formData.append("id_fiscale", idFiscale);
    formData.append("direction", direction);
    formData.append("fournisseur", fournisseur);
    formData.append("delai_paiement", delaiPaiement);
    formData.append("structure_ordinatrice", structureOrdinatrice);
    formData.append("numero_facture", numeroFacture);
    formData.append("date_reception", dateReception);
    formData.append("upload_document", uploadDocument);
    formData.append("nature_3wm", nature3wm);

    const selectedObjetValues = objet.map((option) => option.value);
    formData.append("objet", selectedObjetValues.join(","));
    try {
      const user_id = localStorage.getItem('user_id'); 
      const response = await axios.post(
        `http://127.0.0.1:8000/api/steg?user_id=${user_id}`,
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
          <h4 className="title">Saisir une facture 3WM STEG</h4>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
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
                  <label htmlFor="devise">Devise</label>
                  <Input
                    type="select"
                    name="devise"
                    value={devise}
                    onChange={(e) => setDevise(e.target.value)}
                  >
                    <option value="TND">TND</option>
                    <option value="EUR">EUR</option>
                    <option value="EGP">EGP</option>
                    <option value="USD">USD</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="dateFacture">Date de la facture</label>
                  <Input
                    type="date"
                    name="date_facture"
                    value={dateFacture}
                    onChange={(e) => setDateFacture(e.target.value)}
                    placeholder="Date de la facture"
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
            <Col md="6">
                <FormGroup>
                  <label htmlFor="nature3wm">Nature 3WM</label>
                  <Input
                    type="text"
                    name="nature_3wm"
                    value={nature3wm}
                    onChange={(e) => setNature3wm(e.target.value)}
                    placeholder="Nature 3WM"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="numeroPO">Numéro PO</label>
                  <Input
                    type="text"
                    name="numero_po"
                    value={numeroPO}
                    onChange={(e) => setNumeroPO(e.target.value)}
                    placeholder="Numéro PO"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="idFiscale">ID Fiscale</label>
                  <Input
                    type="text"
                    name="id_fiscale"
                    value={idFiscale}
                    onChange={(e) => setIdFiscale(e.target.value)}
                    placeholder="ID Fiscale"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="direction">Direction</label>
                  <Input
                    type="text"
                    name="direction"
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    placeholder="Direction"
                  />
                </FormGroup>
              </Col>
            </Row>
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
                  <label htmlFor="delaiPaiement">Délai de paiement</label>
                  <Input
                    type="text"
                    name="delai_paiement"
                    value={delaiPaiement}
                    onChange={(e) => setDelaiPaiement(e.target.value)}
                    placeholder="Délai de paiement"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="structureOrdinatrice">Structure Ordinatrice</label>
                  <Input
                    type="select"
                    name="structure_ordinatrice"
                    value={structureOrdinatrice}
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
                  <label htmlFor="numeroFacture">Numéro de facture</label>
                  <Input
                    type="text"
                    name="numero_facture"
                    value={numeroFacture}
                    onChange={(e) => setNumeroFacture(e.target.value)}
                    placeholder="Numéro de facture"
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
                    id="upload_document"
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

export default Steg;
