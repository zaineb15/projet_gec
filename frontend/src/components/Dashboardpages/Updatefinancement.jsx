import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, FormGroup, Input, CustomInput} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import { useParams } from 'react-router-dom';

const Financement = () => {
  const { id } = useParams();
  const [devise, setDevise] = useState("");
  const [numPO, setNumPO] = useState("");
  const [dest, setDest] = useState("");
  const [ech, setEch] = useState("");
  const [fncm, setFncm] = useState("");
  const [montant, setMontant] = useState("");
  const [file, setFile] = useState(null);
  const [objet, setObjet] = useState("");
  const [dateRec, setDateRec] = useState("");
  const [datepo, setDatePo] = useState("");
  const notificationAlertRef = useRef(null);
  useEffect(() => {
    const fetchChargesLocatives = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/current-date-facturesf/${id}`);
        const {numPO, dest,ech,fncm,montant,objet,dateRec,datepo,devise} = response.data;
        setNumPO(numPO);
        setDest(dest);
        setMontant(montant);
        setEch(ech);
        setFncm(fncm);
        setObjet(objet);
        setDatePo(datepo);
        setDevise(devise);
        setDateRec(dateRec);
      } catch (error) {
        console.error("Erreur lors de la récupération des charges locatives:", error);
      }
    };
    fetchChargesLocatives();
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!numPO.trim() || !montant.trim() || !file || !dest.trim() || !ech.trim() || !objet.trim() || !dateRec.trim() || !datepo.trim() || !fncm.trim()) {
      showNotification(
        "danger",
        "Veuillez remplir tous les champs du formulaire."
      );
      return;
    }
    const formData = new FormData();
    formData.append("montant", montant);
    formData.append("devise", devise);
    formData.append("file", file);
    formData.append("dest", dest);
    formData.append("ech", ech);
    formData.append("objet", objet);
    formData.append("dateRec", dateRec);
    formData.append("datepo", datepo);
    formData.append("fncm", fncm);
    formData.append("numPO", numPO);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/financement/${id}`,
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
      console.error("Erreur lors de la création de la facture:", error.message);
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
                        <label htmlFor="objet">Objet</label>
                        <Input
                          type="select"
                          name="objet"
                          value={objet}
                          onChange={(e) => setObjet(e.target.value)}
                        >
                          <option value="UIB">UIB</option>
                          <option value="UBCI">UBCI</option>
                          <option value="ATTIJARI BANK">ATTIJARI BANK</option>
                          <option value="BT">BT</option>
                          <option value="BIAT">BIAT</option>
                          <option value="AB">AB</option>
                          <option value="ATB">ATB</option>
                          <option value="BT">BT</option>
                          <option value="TRESORERIE GENERALE DE TUNISIE">TRESORERIE GENERALE DE TUNISIE</option>
                          <option value="AMEN BANK">AMEN BANK</option>
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <label htmlFor="destinataire">Destinataire</label>
                        <Input
                          type="text"
                          name="dest"
                          value={dest}
                          onChange={(e) => setDest(e.target.value)}
                          placeholder="Destinataire"
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <label htmlFor="echeances">Échéances</label>
                        <Input
                          type="text"
                          name="ech"
                          value={ech}
                          onChange={(e) => setEch(e.target.value)}
                          placeholder="Échéances"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <label htmlFor="date_rec">Date de réception</label>
                        <Input
                          type="date"
                          name="dateRec"
                          value={dateRec}
                          onChange={(e) => setDateRec(e.target.value)}
                          placeholder="Entrer la date de réception"
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
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <label htmlFor="date_po">Date PO</label>
                        <Input
                          type="date"
                          name="datepo"
                          value={datepo}
                          onChange={(e) => setDatePo(e.target.value)}
                          placeholder="Entrer Date PO"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <label>Financement</label>
                        <Input
                          type="select"
                          name="fncm"
                          value={fncm}
                          onChange={(e) => setFncm(e.target.value)}
                        >
                          <option value="EUR">EUR</option>
                          <option value="TND">TND</option>
                          <option value="EGP">EGP</option>
                          <option value="USD">USD</option>
                        </Input>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <label htmlFor="numpo">Numéro PO</label>
                        <Input
                          type="text"
                          name="numPO"
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

export default Financement;
