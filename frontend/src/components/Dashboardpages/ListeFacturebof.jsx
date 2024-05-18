import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Table,
  Col,
  InputGroup,
  Input,
  CardHeader,
} from "reactstrap";
import Loading from "assets/images/25.png";
import { Link } from "react-router-dom";

function BordereauList() {
  const [bordereaux, setBordereaux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilterreference, setSelectedFilterreference] = useState("");
  const [searchQueryreference, setSearchQueryreference] = useState("");

  useEffect(() => {
    fetchBordereaux();
  }, []);

  const fetchBordereaux = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/bordereaux");
      setBordereaux(response.data.bordereaux);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bordereaux:", error);
    }
  };
  // Gérer les changements dans la recherche et le filtrage des montants
  const handleSearchreferenceInputChange = (e) => {
    setSearchQueryreference(e.target.value.toLowerCase());
  };

  const handleFilterreferenceSelectChange = (e) => {
    setSelectedFilterreference(e.target.value);
  };



  // Filtrer les factures en fonction des references
  const filteredBordereaux = bordereaux.filter((bordereau) => {
    const referenceMatched = selectedFilterreference === "" ||
    bordereau[selectedFilterreference].toString().toLowerCase().includes(searchQueryreference);
    return referenceMatched;
  });
  const user_profil = localStorage.getItem('user_profil');
      console.log(user_profil)
  return (
    <div className="content">
    {user_profil === "agent BOF" && ( // Condition pour afficher le bouton
      <div className="d-flex align-items-center justify-content-between">
        <h4 className="title">Ajouter une facture / courrier</h4>
        <Link
          to="/Agent/typefacturebof"
          className="btn btn-success btn-sm ml-2"
        >
          Ajouter
        </Link>
      </div>
    )}
      <Col md="16">
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <h4 className="title">Consulter bordereau</h4>
          </CardHeader>
          <CardBody>
            <InputGroup className="mb-3">
            <Input
                type="text"
                placeholder="Rechercher par reference"
                value={searchQueryreference}
                onChange={handleSearchreferenceInputChange}
              />
              <select
                className="form-select"
                value={selectedFilterreference}
                onChange={handleFilterreferenceSelectChange}
              >
                 <option value="" >Selectionner </option>
                <option value="reference" >Réference</option>
              </select>
            </InputGroup>
            {loading ? (
              <div className="text-center">
                <img
                  src={Loading}
                  alt="Logo"
                  style={{ width: "50px", height: "50px" }}
                />
                <p>Chargement des bordereaux en cours</p>
              </div>
            ) : (
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Référence</th>
                    <th>Nature</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                {filteredBordereaux.map((bordereau) => (
                    <tr key={bordereau.id}>
                      <td>{bordereau.reference}</td>
                      <td>{bordereau.nature}</td>
                      <td>{bordereau.status}</td>
                      <td>{bordereau.created_at}</td>
                      <td className="text-center">
                        <Link
                          to={`/Agent/consulter_bordereau/${bordereau.type_facture_id}`}
                          className="btn btn-info btn-sm mr-2"
                        >
                          Consulter
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}

export default BordereauList;
