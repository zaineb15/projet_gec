import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

function Dashboard(props) {
  const [chartData, setChartData] = useState(null);
  const [count5, setCount5] = useState(0); // État pour stocker le nombre de factures
  const [count4, setCount4] = useState(0); // État pour stocker le nombre de factures
  const [count3, setCount3] = useState(0); // État pour stocker le nombre de factures
  const [count2, setCount2] = useState(0); // État pour stocker le nombre de factures
  const [count1, setCount1] = useState(0); // État pour stocker le nombre de factures

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/countFacturesByDay?user_id=${user_id}`
        );
        const data = response.data;
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFactureCount = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/countValidatedFactures?user_id=${user_id}`
        );
        setCount2(response.data.count);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre de factures :",
          error
        );
      }
    };

    const fetchFactureCountFisc = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/countvalidefisc?user_id=${user_id}`
        );
        setCount1(response.data.count); // Nombre de factures validées par le fiscaliste
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
          error
        );
      }
    };

    const fetchFactureCountcompt = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/countvalidecompt?user_id=${user_id}`
        );
        setCount3(response.data.count); // Nombre de factures validées par le fiscaliste
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
          error
        );
      }
    };

    const fetchFactureCountbof = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/countvalidebof?user_id=${user_id}`
        );
        setCount4(response.data.count); // Nombre de factures validées par le fiscaliste
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
          error
        );
      }
    };

    const fetchFactureCountreject = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/countFacturesRejetees?user_id=${user_id}`
        );
        setCount5(response.data.count); // Nombre de factures validées par le fiscaliste
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
          error
        );
      }
    };
    fetchFactureCountreject(); // Appeler fetchFactureCount lorsque le composant est monté
    fetchFactureCountbof(); // Appeler fetchFactureCount lorsque le composant est monté
    fetchFactureCountcompt(); // Appeler fetchFactureCount lorsque le composant est monté
    fetchFactureCount(); // Appeler fetchFactureCount lorsque le composant est monté
    fetchFactureCountFisc(); // Appeler fetchFactureCountFisc lorsque le composant est monté
  }, []); // Utiliser une dépendance vide pour que useEffect soit exécuté une seule fois lors du montage

  return (
    <div className="content">
      <Row>
        <Col lg="6" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: "#ffde5c" }}>
            <CardHeader>
              <Link
                to="/Fournisseur/facturereceptionné"
                style={{
                  color: "black",
                  fontSize: "16px",
                  textDecoration: "none",
                  transition: "color 0.3s", // Ajout d'une transition pour une animation fluide du changement de couleur
                }}
                onMouseEnter={(e) => (e.target.style.color = "#5e72e4")} // Change la couleur en bleu lorsque le curseur entre
                onMouseLeave={(e) => (e.target.style.color = "black")} // Change la couleur en noir lorsque le curseur quitte
              >
                Factures réceptionnées
              </Link>
              <h4>{count4}</h4>
            </CardHeader>
          </Card>
        </Col>
        <Col lg="6" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: "#ff9f72" }}>
            <CardHeader>
              <Link
                to="/Fournisseur/facturereceptionné"
                style={{
                  color: "black",
                  fontSize: "16px",
                  textDecoration: "none",
                  transition: "color 0.3s", // Ajout d'une transition pour une animation fluide du changement de couleur
                }}
                onMouseEnter={(e) => (e.target.style.color = "#5e72e4")} // Change la couleur en bleu lorsque le curseur entre
                onMouseLeave={(e) => (e.target.style.color = "black")} // Change la couleur en noir lorsque le curseur quitte
              >
                {" "}
                Factures validées par le comptable
              </Link>
              <h4>{count3}</h4>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="6" md="6" sm="12">
          <Card className="card-stats " style={{ backgroundColor: "#7f92fd" }}>
            <CardHeader>
              <Link
                to="/Fournisseur/facturefiscaliste"
                style={{
                  color: "black",
                  fontSize: "16px",
                  textDecoration: "none",
                  transition: "color 0.3s", // Ajout d'une transition pour une animation fluide du changement de couleur
                }}
                onMouseEnter={(e) => (e.target.style.color = "#5e72e4")} // Change la couleur en bleu lorsque le curseur entre
                onMouseLeave={(e) => (e.target.style.color = "black")} // Change la couleur en noir lorsque le curseur quitte
              >
                {" "}
                Factures validées par le fiscaliste
              </Link>
              <h4>{count1}</h4>
            </CardHeader>
          </Card>
        </Col>
        <Col lg="6" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: "#38cf4f" }}>
            <CardHeader>
              <Link
                to="/Fournisseur/facturefinale"
                style={{
                  color: "black",
                  fontSize: "16px",
                  textDecoration: "none",
                  transition: "color 0.3s", // Ajout d'une transition pour une animation fluide du changement de couleur
                }}
                onMouseEnter={(e) => (e.target.style.color = "#5e72e4")} // Change la couleur en bleu lorsque le curseur entre
                onMouseLeave={(e) => (e.target.style.color = "black")} // Change la couleur en noir lorsque le curseur quitte
              >
                {" "}
                Factures à payer
              </Link>
              <h4>{count2}</h4>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="6" sm="12">
          <Card className="card-stats" style={{ backgroundColor: "#ff5a5a" }}>
            <CardHeader>
              <Link
                to="/Fournisseur/facturerejeté"
                style={{
                  color: "black",
                  fontSize: "16px",
                  textDecoration: "none",
                  transition: "color 0.3s", // Ajout d'une transition pour une animation fluide du changement de couleur
                }}
                onMouseEnter={(e) => (e.target.style.color = "#5e72e4")} // Change la couleur en bleu lorsque le curseur entre
                onMouseLeave={(e) => (e.target.style.color = "black")} // Change la couleur en noir lorsque le curseur quitte
              >
                {" "}
                Factures rejétées
              </Link>
              <h4>{count5}</h4>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <Col className="text-left" sm="6">
                <h5 className="card-category">Nombre des factures déposées</h5>
              </Col>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                {chartData && (
                  <Line
                    data={{
                      labels: chartData.labels, // Utilisez les étiquettes récupérées depuis l'API

                      datasets: [
                        {
                          label: "Nombre des factures/jour",
                          fill: true,
                          backgroundColor: "rgba(29,140,248,0.2)",
                          borderColor: "#1f8ef1",
                          borderWidth: 2,
                          borderDash: [],
                          borderDashOffset: 0.0,
                          pointBackgroundColor: "#1f8ef1",
                          pointBorderColor: "rgba(255,255,255,0)",
                          pointHoverBackgroundColor: "#1f8ef1",
                          pointBorderWidth: 20,
                          pointHoverRadius: 4,
                          pointHoverBorderWidth: 15,
                          pointRadius: 4,
                          data: chartData.datasets[0].data,
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      legend: {
                        display: false,
                      },
                      tooltips: {
                        backgroundColor: "#f5f5f5",
                        titleFontColor: "#333",
                        bodyFontColor: "#666",
                        bodySpacing: 4,
                        xPadding: 12,
                        mode: "nearest",
                        intersect: 0,
                        position: "nearest",
                      },
                      responsive: true,
                      scales: {
                        yAxes: [
                          {
                            barPercentage: 1.6,
                            gridLines: {
                              drawBorder: false,
                              color: "rgba(29,140,248,0.0)",
                              zeroLineColor: "transparent",
                            },
                            ticks: {
                              suggestedMin: 60,
                              suggestedMax: 125,
                              padding: 20,
                              fontColor: "#9a9a9a",
                            },
                          },
                        ],
                        xAxes: [
                          {
                            barPercentage: 1.6,
                            gridLines: {
                              drawBorder: false,
                              color: "rgba(29,140,248,0.1)",
                              zeroLineColor: "transparent",
                            },
                            ticks: {
                              padding: 20,
                              fontColor: "#9a9a9a",
                            },
                          },
                        ],
                      },
                    }}
                  />
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
