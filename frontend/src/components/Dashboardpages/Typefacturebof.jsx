import React from "react";
import { Card, CardHeader, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";

const Typefacturebof = () => {
  // Liste des types de factures avec les URL correspondantes
  const types = [
    { name: "3WM Charges locatives", url: "/Agent/charges_locatives" },
    { name: "3WM DEVISE", url: "/Agent/devise" },
    { name: "3WM STEG", url: "/Agent/steg" },
    { name: "FACTURE COMMISSION & DISTRIBUTION", url: "/Agent/commission_distribution" },
    { name: "FACTURE FINANCEMENT", url: "/Agent/financement" },
    { name: "FACTURE FOND DE ROULEMENT", url: "/Agent/fond_roulement" },
    { name: "FACTURE OPERATEUR", url: "/Agent/operateur" },
    { name: "FACTURE VENTILATION DIRECT", url: "/Agent/ventilation_direct" },
    { name: "FISCALITÉ-CHARGES SOCIALES", url: "/Agent/charges_sociales" },
    { name: "FISCALITÉ-JETON DE PRÉSENCE", url: "/Agent/jeton_presence" },
    { name: "LETTRE DE CREDIT", url: "/Agent/lettre_credit" }
  ];

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <h4 className="title">Choisir un type : </h4>
        </CardHeader>
        <div className="card card-primary">
          <div className="card-body">
            {types.map((type, index) => (
              // Afficher deux boutons par ligne
              index % 2 === 0 && (
                <div key={index} className="row mb-2">
                  <div className="col-md-6">
                    <FormGroup>
                      <Link
                        to={type.url}
                        className="btn btn-primary col-md-12"
                      >
                        {type.name}
                      </Link>
                    </FormGroup>
                  </div>
                  {/* Vérifiez si l'élément suivant existe pour afficher le deuxième bouton */}
                  {types[index + 1] && (
                    <div className="col-md-6">
                      <FormGroup>
                        <Link
                          to={types[index + 1].url}
                          className="btn btn-primary col-md-12"
                        >
                          {types[index + 1].name}
                        </Link>
                      </FormGroup>
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Typefacturebof;
