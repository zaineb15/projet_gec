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
            const user_id = localStorage.getItem('user_id'); 
            if (user_id) {
                console.log(user_id);
                const response = await axios.get(`http://127.0.0.1:8000/api/facture?user_id=${user_id}`);
                if (response.data && response.data.factures) {
                    setFactures(response.data.factures);
                    setLoading(false);
                } else {
                    console.error('Données de facture non trouvées dans la réponse');
                }
            } else {
                console.error('user_id non trouvé dans le local storage');
            }
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
        const jsonData = factures.map(facture => ({
            id: facture.id,
            "Numéro de facture": facture.num_fact,
            "Date de facture": facture.date_fact,
            Montant: facture.montant,
            Devise: facture.devise,
            motifs: facture.motifs,
            validation: facture.validation,
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
                            </select>
                        </InputGroup>
                        <Button onClick={exportToExcel} className="custom-export-button btn btn-primary btn-sm ml-2">Exporter vers Excel</Button>
                        <p> </p>
                        <p>Vous puvez localiser vos factures et suivre les differentes etapes de validation</p>
                        {loading ? ( // Afficher "Chargement" lorsque loading est vrai
                            <div className="text-center">
                                <img src={Loading} alt="Logo" style={{ width: '50px', height: '50px' }} />
                                <p>Chargement des factures en cours</p>
                            </div>
                        ) : (
                            <Table className="tablesorter" >
                                <thead className="text-primary">
                                    <tr>
                                        <th>numéro facture</th>
                                        <th>Motif de rejet</th>
                                        <th>validation BOF</th>
                                        <th>validation comptable</th>
                                        <th>validation fiscaliste</th>
                                        <th>validation trésorerie</th>
                                        <th className="text-center">action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentFactures.map((facture) => (
                                        <tr key={facture.id}>
                                            <td>{facture.num_fact}</td>
                                            <td style={{ backgroundColor: facture.motifs === 'aucune' ? '' : '#ff5a5a' }}>{facture.motifs}</td>
                                            <td style={{ backgroundColor: facture.validation === 'oui' ? '#ffde5c' : 'inherit' }}>{facture.validation === 'oui' ? 'Chez la comptabilité' : facture.validation}</td>
                                            <td style={{ backgroundColor: facture.valide_compt === 'oui' ? '#fe996a' : 'inherit' }}>{facture.valide_compt ==='oui' ? 'Chez la fiscalité' : facture.valide_compt}</td>
                                            <td style={{ backgroundColor: facture.valide_fisc === 'oui' ? '#7f92fd' : 'inherit' }}>{facture.valide_fisc ==='oui' ? 'Chez la trésorerie' : facture.valide_fisc}</td>
                                            <td style={{ backgroundColor: facture.valide_tres === 'oui' ? '#38cf4f' : 'inherit' }}>{facture.valide_tres ==='oui' ? 'facture validée' : facture.valide_tres}</td>
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
