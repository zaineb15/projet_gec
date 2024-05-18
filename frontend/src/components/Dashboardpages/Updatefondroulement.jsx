import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, FormGroup, Input, CustomInput } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import Select from "react-select";
import { useParams } from 'react-router-dom';

const Fond_roulement = () => {
  const { id } = useParams();
  const [numFacture, setNumFacture] = useState("");
  const [numPO, setNumPO] = useState("");
  const [dateFacture, setDateFacture] = useState("");
  const [montant, setMontant] = useState("");
  const [file, setFile] = useState(null);
  const [objet, setObjet] = useState([]);
  const [pieces_jointes, setPiecesJointes] = useState([]);
  const notificationAlertRef = useRef(null);
  const devise = "TND";

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
  useEffect(() => {
    const fetchChargesLocatives = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/current-date-facturesfr/${id}`);
        const {montant,num_facture,num_po,date_facture,devise} = response.data;
        setNumFacture(num_facture);
        setNumPO(num_po);
        setDateFacture(date_facture);
        setMontant(montant);
        setMontant(devise);
      } catch (error) {
        console.error("Erreur lors de la récupération des charges locatives:", error);
      }
    };
    fetchChargesLocatives();
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!numFacture.trim() || !montant.trim() || !file) {
      showNotification(
        "danger",
        "Veuillez remplir tous les champs du formulaire."
      );
      return;
    }
    const formData = new FormData();
    formData.append("num_facture", numFacture);
    formData.append("date_facture", dateFacture);
    formData.append("montant", montant);
    formData.append("devise", devise);
    formData.append("file", file);
  
    const selectedObjetValues = objet.map((option) => option.value);
    formData.append("objet", selectedObjetValues.join(","));
  
    const selectedPiecesJointesValues = pieces_jointes.map(
      (option) => option.value
    );
    formData.append("pieces_jointes", selectedPiecesJointesValues.join(","));
  
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/fond-roulement/${id}`,
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
      showNotification("success", "Fond de roulement créé avec succès!");
      window.location.href = "/Agent/listebordereau";
    } catch (error) {
      console.error(
        "Erreur lors de la création du fond de roulement:",
        error.message
      );
      showNotification("danger", "Erreur lors de la création du fond de roulement.");
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
    setFile(event.target.files[0]);
  };

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <h4 className="title">Saisir une facture</h4>
        </CardHeader>

        <div className="row">
          <div className="col-md-12">
            <div className="card card-primary">
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <label htmlFor="objet" className="white-text">
                          Objet
                        </label>
                        <Select
                          options={optionsObjet}
                          value={objet}
                          onChange={setObjet}
                          isMulti
                          placeholder="Sélectionnez des objets"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <label htmlFor="pieces_jointes">Pièces jointes</label>
                        <Select
                          options={optionsAttachments}
                          value={pieces_jointes}
                          onChange={setPiecesJointes}
                          isMulti
                          placeholder="Sélectionnez des pièces jointes"
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <label htmlFor="num_facture">Numéro Facture</label>
                        <Input
                          type="text"
                          name="num_fact"
                          value={numFacture}
                          onChange={(e) => setNumFacture(e.target.value)}
                          placeholder="Entrer Numéro Facture"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <label htmlFor="date_facture">Date Facture</label>
                        <Input
                          type="date"
                          name="date_fact"
                          value={dateFacture}
                          onChange={(e) => setDateFacture(e.target.value)}
                          placeholder="Entrer Date Facture"
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <label htmlFor="montant">Montant</label>
                        <Input
                          type="text"
                          name="montant"
                          value={montant}
                          onChange={(e) => setMontant(e.target.value)}
                          placeholder="Entrer Montant"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <label>Devise</label>
                        <Input
                          type="text"
                          name="devise"
                          value="TND" // Valeur toujours "TND"
                          readOnly // Rend le champ non modifiable
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <label htmlFor="num_facture">Numéro PO</label>
                        <Input
                          type="text"
                          name="num_po"
                          value={numPO}
                          onChange={(e) => setNumPO(e.target.value)}
                          placeholder="Entrer Numéro PO"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="date_facture">Choisir un fichier</label>
                      <CustomInput
                        icon="tim-icons icon-cloud-upload-94"
                        type="file"
                        id="fileInput"
                        name="file"
                        accept=".pdf, .png, .jpg"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Card>
      <NotificationAlert ref={notificationAlertRef} />
    </div>
  );
};

export default Fond_roulement;
