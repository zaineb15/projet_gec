import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";

function AgentDashboard(props) {
  const [count1, setCount1] = useState(0); 
  const [count2, setCount2] = useState(0); 
  const [count3, setCount3] = useState(0); 
  const [count4, setCount4] = useState(0); 
  const [count5, setCount5] = useState(0); 
  const [count6, setCount6] = useState(0); 
  const [count7, setCount7] = useState(0); 
  const [count8, setCount8] = useState(0); 
  const [count9, setCount9] = useState(0); 
  const [count10, setCount10] = useState(0); 
  const [count11, setCount11] = useState(0); 
  const [count12, setCount12] = useState(0); 

  useEffect(() => {
  const fetchFacture1 = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/countCurrentFactures`
      );
      setCount1(response.data.count); // Nombre de factures validées par le fiscaliste
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
        error
      );
    }
  };
  const fetchFacture2 = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/countCurrentVentilations`
      );
      setCount2(response.data.count); // Nombre de factures validées par le fiscaliste
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
        error
      );
    }
  };
  const fetchFacture3 = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/countCurrentStegs`
      );
      setCount3(response.data.count); // Nombre de factures validées par le fiscaliste
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
        error
      );
    }
  };
  const fetchFacture4 = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/countCurrentOperateurs`
      );
      setCount4(response.data.count); // Nombre de factures validées par le fiscaliste
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
        error
      );
    }
  };
  const fetchFacture5 = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/countCurrentLettreCredits`
      );
      setCount5(response.data.count); // Nombre de factures validées par le fiscaliste
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
        error
      );
    }
  };
  const fetchFacture6 = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/countCurrentFondRoulements`
      );
      setCount6(response.data.count); // Nombre de factures validées par le fiscaliste
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
        error
      );
    }
  };
  const fetchFacture7 = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/countCurrentFiscalites`
      );
      setCount7(response.data.count); // Nombre de factures validées par le fiscaliste
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
        error
      );
    }
  };
  const fetchFacture8 = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/countCurrentFinancements`
      );
      setCount8(response.data.count); // Nombre de factures validées par le fiscaliste
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
        error
      );
    }
  };
  const fetchFacture9 = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/countCurrentDevisees`
      );
      setCount9(response.data.count); // Nombre de factures validées par le fiscaliste
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
        error
      );
    }
  };
  const fetchFacture10 = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/countCurrentCommissionDistributions`
      );
      setCount10(response.data.count); // Nombre de factures validées par le fiscaliste
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
        error
      );
    }
  };
  const fetchFacture11 = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/countCurrentChargesSocialess`
      );
      setCount11(response.data.count); // Nombre de factures validées par le fiscaliste
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
        error
      );
    }
  };
  const fetchFacture12 = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/countCurrentChargesLocatives`
      );
      setCount12(response.data.count); // Nombre de factures validées par le fiscaliste
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
        error
      );
    }
  };
  fetchFacture1(); 
  fetchFacture2(); 
  fetchFacture3(); 
  fetchFacture4(); 
  fetchFacture5(); 
  fetchFacture6(); 
  fetchFacture7(); 
  fetchFacture8(); 
  fetchFacture9(); 
  fetchFacture10(); 
  fetchFacture11(); 
  fetchFacture12(); 

}, []); 

  return (
    <div className="content">
      {/* Row pour organiser les cartes en ligne */}
      <Row>
        <Col lg="3" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: '#e69edb' }}>
            <CardHeader>
              <h4 className="text-muted">
                <i className="tim-icons icon-paper text-primary" /> Factures fournisseur
              </h4>
              <h4>{count1}</h4>
            </CardHeader>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: '#e69edb' }}>
            <CardHeader>
              <h4 className="text-muted">
                <i className="tim-icons icon-paper text-primary" /> Charges locatives
              </h4>
              <h4>{count12}</h4>
            </CardHeader>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: '#e69edb' }}>
            <CardHeader>
              <h4 className="text-muted">
                <i className="tim-icons icon-paper text-primary" /> Charges sociales
              </h4>
              <h4>{count11}</h4>
            </CardHeader>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: '#e69edb' }}>
            <CardHeader>
              <h4 className="text-muted">
                <i className="tim-icons icon-paper text-primary" /> Commissions distribution
              </h4>
              <h4>{count10}</h4>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Row>
       
        <Col lg="3" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: '#e69edb' }}>
            <CardHeader>
              <h4 className="text-muted">
                <i className="tim-icons icon-paper text-primary" /> Fonds de roulement
              </h4>
              <h4>{count6}</h4>
            </CardHeader>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: '#e69edb' }}>
            <CardHeader>
              <h4 className="text-muted">
                <i className="tim-icons icon-paper text-primary" /> Jetons de presence
              </h4>
              <h4>{count7}</h4>
            </CardHeader>
          </Card>
        </Col>

          <Col lg="3" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: '#e69edb' }}>
            <CardHeader>
              <h4 className="text-muted">
                <i className="tim-icons icon-paper text-primary" /> Lettres de credit
              </h4>
              <h4>{count5}</h4>
            </CardHeader>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: '#e69edb' }}>
            <CardHeader>
              <h4 className="text-muted">
                <i className="tim-icons icon-paper text-primary" /> Ventilations direct
              </h4>
              <h4>{count2}</h4>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="3" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: '#e69edb' }}>
            <CardHeader>
              <h4 className="text-muted">
                <i className="tim-icons icon-paper text-primary" /> Operateurs
              </h4>
              <h4>{count4}</h4>
            </CardHeader>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: '#e69edb' }}>
            <CardHeader>
              <h4 className="text-muted">
                <i className="tim-icons icon-paper text-primary" /> Stegs
              </h4>
              <h4>{count3}</h4>
            </CardHeader>
          </Card>
        </Col>
         <Col lg="3" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: '#e69edb' }}>
            <CardHeader>
              <h4 className="text-muted">
                <i className="tim-icons icon-paper text-primary" /> Devises
              </h4>
              <h4>{count9}</h4>
            </CardHeader>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: '#e69edb' }}>
            <CardHeader>
              <h4 className="text-muted">
                <i className="tim-icons icon-paper text-primary" /> Financements
              </h4>
              <h4>{count8}</h4>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AgentDashboard;
