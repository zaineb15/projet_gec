import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  FormGroup,
  Input,
  CustomInput,
  Row,
  Col,
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import Select from "react-select";

const CommissionDistribution = () => {
  const [commission, setCommission] = useState("");
  const [fournisseur, setFournisseur] = useState("");
  const [id_fiscale, setIdFiscale] = useState("");
  const [date_facture, setDateFacture] = useState("");
  const [date_rec, setDateRec] = useState("");
  const [objet, setObjet] = useState([]);
  const [pieces_jointes, setPieceJointe] = useState([]);
  const [montant, setMontant] = useState("");
  const [devise, setDevise] = useState("");
  const [num_facture, setNumFacture] = useState("");
  const [delai_paiement, setDelaiPaiement] = useState("");
  const [upload_document, setUploadDocument] = useState(null); // Nouvel état pour gérer le fichier téléchargé
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
  
  const optionsAttachments = [
    { label: "PV DE RÉCEPTION", value: "PV DE RÉCEPTION" },
    { label: "BON DE COMMANDE", value: "BON DE COMMANDE" },
    { label: "BON DE LIVRAISON", value: "BON DE LIVRAISON" },
    { label: "COPIE DE CONTRACT", value: "COPIE DE CONTRACT" },
    { label: "APPEL À LA FACTURATION", value: "APPEL À LA FACTURATION" },
    { label: "RELEVÉ CONSOMMATION", value: "RELEVÉ CONSOMMATION" },
    { label: "CIN", value: "CIN" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !commission.trim()
    ) {
      showNotification(
        "danger",
        "Veuillez remplir tous les champs du formulaire."
      );
      return;
    }
    const formData = new FormData();
    formData.append("commission", commission);
    formData.append("fournisseur", fournisseur);
    formData.append("id_fiscale", id_fiscale);
    formData.append("date_facture", date_facture);
    formData.append("date_rec", date_rec);
    formData.append("montant", montant);
    formData.append("devise", devise);
    formData.append("num_facture", num_facture);
    formData.append("delai_paiement", delai_paiement);
    formData.append("upload_document", upload_document);
   
    const selectedObjetValues = objet.map((option) => option.value);
    formData.append("objet", selectedObjetValues.join(","));
  
    const selectedPiecesJointesValues = pieces_jointes.map(
      (option) => option.value
    );
    formData.append("pieces_jointes", selectedPiecesJointesValues.join(","));
  
    try {
      const user_id = localStorage.getItem('user_id'); 
      const response = await axios.post(
        `http://127.0.0.1:8000/api/commission-distribution?user_id=${user_id}`,
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

  const handleFileChange = (event) => {
    setUploadDocument(event.target.files[0]);
  };

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <h4 className="title">Saisir une facture Commission & Distribution</h4>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="commission">COMMISSION & DISTRIBUTION</label>
                  <Input
                    type="text"
                    name="commission"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                    placeholder="Commission & Distribution"
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
                  <label htmlFor="idFiscale">ID Fiscale</label>
                  <Input
                    type="text"
                    name="id_fiscale"
                    value={id_fiscale}
                    onChange={(e) => setIdFiscale(e.target.value)}
                    placeholder="ID Fiscale"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="dateFacture">Date de la facture</label>
                  <Input
                    type="date"
                    name="date_facture"
                    value={date_facture}
                    onChange={(e) => setDateFacture(e.target.value)}
                    placeholder="Date de la facture"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="dateRec">Date de réception</label>
                  <Input
                    type="date"
                    name="date_rec"
                    value={date_rec}
                    onChange={(e) => setDateRec(e.target.value)}
                    placeholder="Date de réception"
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
                  <label htmlFor="upload_document">Choisir un fichier</label>
                  <CustomInput
                    icon="tim-icons icon-cloud-upload-94"
                    type="file"
                    id="fileInput"
                    name="upload_document"
                    accept=".pdf, .png, .jpg"
                    onChange={handleFileChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="uploadDocument">piece jointe</label>
                  <Select
                          options={optionsAttachments}
                          value={pieces_jointes}
                          onChange={setPieceJointe}
                          isMulti
                          placeholder="Sélectionnez des pièces jointes"
                        />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
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
              <Col md="6">
                <FormGroup>
                  <label htmlFor="numFacture">Numéro de facture</label>
                  <Input
                    type="text"
                    name="num_facture"
                    value={num_facture}
                    onChange={(e) => setNumFacture(e.target.value)}
                    placeholder="Numéro de facture"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="delaiPaiement">Délai de paiement</label>
                  <Input
                    type="text"
                    name="delai_paiement"
                    value={delai_paiement}
                    onChange={(e) => setDelaiPaiement(e.target.value)}
                    placeholder="Délai de paiement"
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

export default CommissionDistribution;
