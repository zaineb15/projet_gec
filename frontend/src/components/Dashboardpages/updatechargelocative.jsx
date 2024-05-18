import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, FormGroup, Input, CustomInput, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import Select from "react-select";
import { useParams } from 'react-router-dom';

const UpdateChargesLocatives = () => {
  const { id } = useParams();
  const [fournisseur, setFournisseur] = useState("");
  const [id_fiscale, setIdFiscale] = useState("");
  const [numero_po, setNumeroPO] = useState("");
  const [direction, setDirection] = useState("");
  const [date_facture, setDateFacture] = useState("");
  const [montant, setMontant] = useState("");
  const [delai_paiement, setDelaiPaiement] = useState("");
  const [objet, setObjet] = useState([]);
  const [nature_swm, setNatureSWM] = useState("");
  const [structure_ordinatrice, setStructureOrdinatrice] = useState("");
  const [numero_facture, setNumeroFacture] = useState("");
  const [devise, setDevise] = useState("");
  const [date_reception, setDateReception] = useState("");
  const [upload_document, setUploadDocument] = useState(null);
  const notificationAlertRef = useRef(null);
  // Définir les options pour les pièces jointes
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
  useEffect(() => {
    const fetchChargesLocatives = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/current-date-facturescl/${id}`);
        const { fournisseur,id_fiscale, numero_po,direction,date_facture,montant,delai_paiement,nature_swm,structure_ordinatrice,numero_facture,devise,date_reception} = response.data;
        setFournisseur(fournisseur);
        setIdFiscale(id_fiscale);
        setNumeroPO(numero_po);
        setDirection(direction);
        setDateFacture(date_facture);
        setMontant(montant);
        setDelaiPaiement(delai_paiement);
        setNatureSWM(nature_swm);
        setStructureOrdinatrice(structure_ordinatrice);
        setNumeroFacture(numero_facture);
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
    if ( !fournisseur.trim() ||
    !id_fiscale.trim() ||
    !numero_po.trim() ||
    !direction.trim() ||
    !date_facture.trim() ||
    !montant.trim() ||
    !delai_paiement.trim() ||
    !nature_swm.trim() ||
    !structure_ordinatrice.trim() ||
    !numero_facture.trim() ||
    !devise.trim() ||
    !date_reception.trim() ||
    !upload_document) {
      showNotification('danger', 'Veuillez remplir tous les champs du formulaire.');
      return;
  }
    const formData = new FormData();
    formData.append("fournisseur", fournisseur);
    formData.append("id_fiscale", id_fiscale);
    formData.append("numero_po", numero_po);
    formData.append("direction", direction);
    formData.append("date_facture", date_facture);
    formData.append("montant", montant);
    formData.append("delai_paiement", delai_paiement);
    formData.append("nature_swm", nature_swm);
    formData.append("structure_ordinatrice", structure_ordinatrice);
    formData.append("numero_facture", numero_facture);
    formData.append("devise", devise);
    formData.append("date_reception", date_reception);
    formData.append("upload_document", upload_document);

    const selectedObjetValues = objet.map((option) => option.value);
    formData.append("objet", selectedObjetValues.join(","));

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/charges-locatives/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      showNotification("success", "Charges locatives modifiées avec succès!");
      window.location.href = "/Agent/listebordereau";
    } catch (error) {
      console.error("Erreur lors de la modification des charges locatives:", error.message);
      showNotification("danger", "Erreur lors de la modification des charges locatives.");
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
          <h4 className="title">Modifier les charges locatives</h4>
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
                  <label htmlFor="id_fiscale">ID Fiscale</label>
                  <Input
                    type="text"
                    name="id_fiscale"
                    value={id_fiscale}
                    onChange={(e) => setIdFiscale(e.target.value)}
                    placeholder="ID Fiscale"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="numero_po">Numéro PO</label>
                  <Input
                    type="text"
                    name="numero_po"
                    value={numero_po}
                    onChange={(e) => setNumeroPO(e.target.value)}
                    placeholder="Numéro PO"
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
                  <label htmlFor="date_facture">Date de la facture</label>
                  <Input
                    type="date"
                    name="date_facture"
                    value={date_facture}
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
              <Col md="6">
                <FormGroup>
                  <label htmlFor="delai_paiement">Délai de paiement</label>
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
            <Row>
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
              <Col md="6">
                <FormGroup>
                  <label htmlFor="nature_swm">Nature 3WM</label>
                  <Input
                    type="text"
                    name="nature_swm"
                    value={nature_swm}
                    onChange={(e) => setNatureSWM(e.target.value)}
                    placeholder="Nature 3WM"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="structure_ordinatrice">
                    Structure Ordinatrice
                  </label>
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
                  <label htmlFor="numeroFacture">Numéro de facture</label>
                  <Input
                    type="text"
                    name="numero_facture"
                    value={numero_facture}
                    onChange={(e) => setNumeroFacture(e.target.value)}
                    placeholder="Numéro de facture"
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
                    <option value="TND">TND</option>
                    <option value="EUR">EUR</option>
                    <option value="EGP">EGP</option>
                    <option value="USD">USD</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="date_reception">Date de réception</label>
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
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
            Modifier
            </button>
          </div>
        </form>
      </Card>
      <NotificationAlert ref={notificationAlertRef} />
    </div>
  );
};

export default UpdateChargesLocatives;
