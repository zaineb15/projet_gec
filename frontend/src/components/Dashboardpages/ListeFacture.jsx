import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Table, Col, Button, InputGroup, Input } from "reactstrap";
import axios from 'axios';
import Loading from 'assets/images/25.png';
import * as XLSX from 'xlsx';

const ListeFacture = ({ history }) => {
    const [factures, setFactures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("num_fact");
    const facturesPerPage = 6; // Nombre de factures par page

    useEffect(() => {
        const fetchFactures = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/factures');
                setFactures(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des factures:', error);
            }
        };
        fetchFactures();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/facture/${id}`);
            setFactures(factures.filter(facture => facture.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la facture:', error);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleFilterSelectChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    const indexOfLastFacture = currentPage * facturesPerPage;
    const indexOfFirstFacture = indexOfLastFacture - facturesPerPage;
    const currentFactures = searchQuery
        ? factures.filter(facture => 
            facture[selectedFilter].toString().toLowerCase().includes(searchQuery)
        )
        : factures.slice(indexOfFirstFacture, indexOfLastFacture);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < Math.ceil(factures.length / facturesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const exportToExcel = () => {
        const jsonData = currentFactures.map(facture => ({
            id: facture.id,
            num_fact: facture.num_fact,
            date_fact: facture.date_fact,
            montant: facture.montant,
            devise: facture.devise,
            status: facture.status
        }));

        const ws = XLSX.utils.json_to_sheet(jsonData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Factures");
        const wbBlob = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const url = URL.createObjectURL(new Blob([wbBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'liste_factures.xlsx';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="content">
            <Col md="16">
                <Card>
                    <CardHeader className="d-flex justify-content-between align-items-center">
                        <h4 className="title">Ajouter une facture</h4>
                        <Link to="/fournisseur/facture" className="btn btn-success btn-sm ml-2">Ajouter</Link>
                    </CardHeader>
                    <CardBody>
                        <InputGroup className="mb-3">
                            <Input type="text" placeholder="Rechercher..." value={searchQuery} onChange={handleSearchInputChange} />
                            <select className="form-select" value={selectedFilter} onChange={handleFilterSelectChange}>
                                <option value="num_fact">Numéro de facture</option>
                                <option value="date_fact">Date de facture</option>
                                <option value="montant">Montant</option>
                                <option value="devise">Devise</option>
                                <option value="status">Statut</option>
                            </select>
                        </InputGroup>
                        <Button onClick={exportToExcel} className="custom-export-button btn btn-primary btn-sm ml-2">Exporter vers Excel</Button>
                        {loading ? ( // Afficher "Chargement" lorsque loading est vrai
                            <div className="text-center">
                                <img src={Loading} alt="Logo" style={{ width: '50px', height: '50px' }} />
                                <p>Chargement des factures en cours</p>
                            </div>
                        ) : (
                            <Table className="tablesorter" >
                                <thead className="text-primary">
                                    <tr>
                                        <th>id</th>
                                        <th>numéro facture</th>
                                        <th>date facture</th>
                                        <th>montant</th>
                                        <th>devise</th>
                                        <th>status</th>
                                        <th className="text-center">action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentFactures.map((facture) => (
                                        <tr key={facture.id}>
                                            <td>{facture.id}</td>
                                            <td>{facture.num_fact}</td>
                                            <td>{facture.date_fact}</td>
                                            <td>{facture.montant}</td>
                                            <td>{facture.devise}</td>
                                            <td>{facture.status}</td>
                                            <td className="project-actions text-center">
                                                <Link className="btn btn-primary btn-sm btn-icon-split" to={`/fournisseur/Consulterfacture/${facture.id}`}>
                                                    <span className="icon">
                                                        <i className="fas fa-eye"></i>
                                                    </span>
                                                </Link>
                                                <Link className="btn btn-info btn-sm btn-icon-split" to={`/fournisseur/updatefacture/${facture.id}`}>
                                                    <span className="icon">
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </span>
                                                </Link>
                                                <button className="btn btn-danger btn-sm btn-circle" type="button" onClick={() => handleDelete(facture.id)}>
                                                    <span className="icon">
                                                        <i className="fas fa-trash"></i>
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                        {factures.length > facturesPerPage && (
                            <ul className="pagination justify-content-end">
                                <li className="page-item">
                                    <Button onClick={goToPreviousPage} className="page-link">
                                        <i className="fas fa-chevron-left"></i>
                                    </Button>
                                </li>
                                <li className="page-item">
                                    <Button className="page-link">
                                        {currentPage}/{Math.ceil(factures.length / facturesPerPage)}
                                    </Button>
                                </li>
                                <li className="page-item">
                                    <Button onClick={goToNextPage} className="page-link">
                                        <i className="fas fa-chevron-right"></i>
                                    </Button>
                                </li>
                            </ul>
                        )}
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
};

export default ListeFacture;
