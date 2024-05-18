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
  const [filter, setFilter] = useState({
    nature: "",
    status: "",
    creationDate: "",
    reference: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    fetchBordereaux();
  }, []);

  const fetchBordereaux = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/older-bordereaux");
      setBordereaux(response.data.bordereaux);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bordereaux:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleFilterSelectChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const filteredBordereaux = bordereaux.filter((bordereau) => {
    return (
      (filter.nature === "" ||
        bordereau.nature.toLowerCase().includes(filter.nature.toLowerCase())) &&
      (filter.status === "" ||
        bordereau.status.toLowerCase().includes(filter.status.toLowerCase())) &&
      //   (filter.creationDate === '' || bordereau.created_at.includes(filter.creationDate)) &&
      (filter.reference === "" ||
        bordereau.reference
          .toLowerCase()
          .includes(filter.reference.toLowerCase()))
    );
  });

  const filteredAndSearchedBordereaux = filteredBordereaux.filter(
    (bordereau) => {
      return (
        selectedFilter === "" ||
        bordereau[selectedFilter].toString().toLowerCase().includes(searchQuery)
      );
    }
  );
  return (
    <div className="content">

      <Col md="16">
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <h4 className="title">Consulter bordereau</h4>
          </CardHeader>
          <CardBody>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <select
                className="form-select"
                value={selectedFilter}
                onChange={handleFilterSelectChange}
              >
                <option value="">Tous</option>
                <option value="nature">Nature</option>
                <option value="status">Statut</option>
                {/* <option value="creationDate">Date de création</option> */}
                <option value="reference">Référence</option>
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
                    <th>Created By</th>
                    <th>Created At</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSearchedBordereaux.map((bordereau) => (
                    <tr key={bordereau.id}>
                      <td>{bordereau.reference}</td>
                      <td>{bordereau.nature}</td>
                      <td>{bordereau.status}</td>
                      <td>{bordereau.created_by}</td>
                      <td>{bordereau.created_at}</td>
                      <td className="text-center">
                        <Link
                          to={`/Agent/consulter_archieve_bordereau/${bordereau.type_facture_id}`}
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
