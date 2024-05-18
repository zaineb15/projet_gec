import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Table, Col, Button } from "reactstrap";
import axios from 'axios';
import Loading from 'assets/images/25.png';

const ListeReclamation = () => {
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(true); // State pour le chargement
  const [currentPage, setCurrentPage] = useState(1);
  const reclamationsPerPage = 6 ; // Nombre de réclamations par page

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const user_id = localStorage.getItem('user_id'); 
        const response = await axios.get(`http://127.0.0.1:8000/api/reclamations?user_id=${user_id}`);
        setReclamations(response.data);
        setLoading(false); // Mettre à jour le state de chargement une fois les données récupérées
      } catch (error) {
        console.error('Erreur lors de la récupération des réclamations:', error);
      }
    };

    fetchReclamations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/reclamation/${id}`);
      const updatedReclamations = reclamations.filter(reclamation => reclamation.id !== id);
      setReclamations(updatedReclamations);
    } catch (error) {
      console.error('Erreur lors de la suppression de la réclamation:', error);
    }
  };

  const indexOfLastReclamation = currentPage * reclamationsPerPage;
  const indexOfFirstReclamation = indexOfLastReclamation - reclamationsPerPage;
  const currentReclamations = reclamations.slice(indexOfFirstReclamation, indexOfLastReclamation);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(reclamations.length / reclamationsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="content">
      <Col md="16">
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <h4 className="title">Ajouter une réclamation</h4>
            <Link to="/fournisseur/reclamation" className="btn btn-success btn-sm ml-2">Ajouter</Link>
          </CardHeader>
          <CardBody>
            {loading ? ( // Afficher "Chargement" lorsque loading est vrai
              <div className="text-center"> {/* Centrer le contenu */}
                <img src={Loading} alt="Logo" style={{ width: '50px', height: '50px' }} /> {/* Ajuster la taille de l'image */}
                <p>Chargement des réclamations en cours</p>
              </div>
            ) : (
              <>
                <Table className="tablesorter">
                  <thead className="text-primary">
                    <tr>
                      <th>id</th>
                      <th>objet</th>
                      <th>message</th>
                      <th>status</th> {/* Ajoutez cette ligne pour la nouvelle colonne */}
                      <th className="text-center">action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {currentReclamations.map((reclamation) => (
                      <tr key={reclamation.id}>
                        <td>{reclamation.id}</td>
                        <td>{reclamation.objet}</td>
                        <td>{reclamation.message}</td>
                        <td>{reclamation.status}</td> {/* Affichez le statut */}
                        <td className="project-actions text-center">
                          <Link className="btn btn-primary btn-sm btn-icon-split" to={`/fournisseur/consulterreclamation/${reclamation.id}`}>
                            <span className="icon">
                              <i className="fas fa-eye"></i>
                            </span>
                          </Link>
                          <Link className="btn btn-info btn-sm btn-icon-split" to={`/fournisseur/updatereclamation/${reclamation.id}`}>
                            <span className="icon">
                              <i className="fas fa-pencil-alt"></i>
                            </span>
                          </Link>
                          <button className="btn btn-danger btn-sm btn-circle" type="button" onClick={() => handleDelete(reclamation.id)}>
                            <span className="icon">
                              <i className="fas fa-trash"></i>
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {reclamations.length > reclamationsPerPage && (
                  <ul className="pagination justify-content-end">
                    <li className="page-item">
                      <Button onClick={goToPreviousPage} className="page-link">
                        <i className="fas fa-chevron-left"></i>
                      </Button>
                    </li>
                    <li className="page-item">
                      <Button className="page-link">
                        {currentPage}/{Math.ceil(reclamations.length / reclamationsPerPage)}
                      </Button>
                    </li>
                    <li className="page-item">
                      <Button onClick={goToNextPage} className="page-link">
                        <i className="fas fa-chevron-right"></i>
                      </Button>
                    </li>
                  </ul>
                )}
              </>
            )}
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default ListeReclamation;
