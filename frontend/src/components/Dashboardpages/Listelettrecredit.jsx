import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  Table,
  Col,
  InputGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Loading from 'assets/images/25.png';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

function FacturesList() {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFactureId, setSelectedFactureId] = useState(null);
  const [motifs, setMotif] = useState(null);
  const [validation, setValidation] = useState('');
  const [selectedFilternumeroFacture, setSelectedFilternumeroFacture] = useState("");
  const [searchQuerynumeroFacture, setSearchQuerynumeroFacture] = useState("");
  const [selectedFilterNumeroOP, setSelectedFilterNumeroOP] = useState("");
  const [searchQueryNumeroOP, setSearchQueryNumeroOP] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lettre-credit/${selectedFactureId}/motif`, {
        motifs: motifs,
      });
      if (response.data.success) {
        alert("Motif envoyé avec succès!");
        setModalOpen(false);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du motif:", error.message);
      alert("Erreur lors de l'envoi du motif.");
    }
  };

  useEffect(() => {
    const fetchFactures = async () => {
      try {
        const user_id = localStorage.getItem('user_id'); 
        const user_profil = localStorage.getItem('user_profil');
        const response = await axios.get(`http://127.0.0.1:8000/api/current-date-factureslc?user_id=${user_id}&user_profil=${user_profil}`);
        setFactures(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des factures:', error);
      }
    };

    fetchFactures();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/lettre-credit/${id}`);
      setFactures(factures.filter(facture => facture.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la facture:', error);
    }
  };

  const handleValidation = async (id) => {
    try {
      const user_profil = localStorage.getItem('user_profil');
  
      // Définir la validation en fonction du profil de l'utilisateur
      let validationType = '';
      switch (user_profil) {
        case 'fiscaliste':
          validationType = 'valide_fisc';
          break;
        case 'agent tresorerie':
          validationType = 'valide_tres';
          break;
        case 'agent AP':
          validationType = 'valide_compt';
          break;
          case 'agent BOF':
            validationType = 'validation';
          break;
      }
      // Vérifier si un type de validation a été défini
      if (!validationType ) {
        throw new Error('Impossible de déterminer le type de validation pour ce profil');
      }
      const response = await axios.post(`http://127.0.0.1:8000/api/lettre-credit/${id}/validation`, {
        [validationType]: 'oui', // Envoyer 'oui' en tant que validation pour le type spécifique
      });
      if (response.data.success) {
        alert("Facture validée avec succès!");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la validation de la facture:", error.message);
      alert("Erreur lors de la validation de la facture.");
    }
  };

  const handleRejeter = async (id) => {
    try {
             // Récupérer le profil de l'utilisateur depuis le stockage local
             const user_profil = localStorage.getItem('user_profil');
  
             // Définir la validation en fonction du profil de l'utilisateur
             let validationType = '';
             switch (user_profil) {
               case 'fiscaliste':
                 validationType = 'valide_fisc';
                 break;
               case 'agent tresorerie':
                 validationType = 'valide_tres';
                 break;
               case 'agent AP':
                 validationType = 'valide_compt';
                 break;
                 case 'agent BOF':
                  validationType = 'validation';
                 break;
             }
             // Vérifier si un type de validation a été défini
             if (!validationType) {
               throw new Error('Impossible de déterminer le type de validation pour ce profil');
             }
      const response = await axios.post(`http://127.0.0.1:8000/api/lettre-credit/${id}/validation`, {
        [validationType]: 'non',
      });
      if (response.data.success) {
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la validation de la facture:", error.message);
      alert("Erreur lors de la validation de la facture.");
    }
  };

  const handleSubmitr = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lettre-credit/${selectedFactureId}/motif`, {
        motifs: "aucune",
      });
      if (response.data.success) {
        setModalOpen(false);
        setMotif('aucune');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du motif:", error.message);
      alert("Erreur lors de l'envoi du motif.");
    }
  };

  // Gérer les changements dans la recherche et le filtrage des montants
  const handleSearchnumeroFactureInputChange = (e) => {
    setSearchQuerynumeroFacture(e.target.value.toLowerCase());
  };

  const handleFilternumeroFactureSelectChange = (e) => {
    setSelectedFilternumeroFacture(e.target.value);
  };

  // Gérer les changements dans la recherche et le filtrage des numéros de OP
  const handleSearchNumeroOPInputChange = (e) => {
    setSearchQueryNumeroOP(e.target.value.toLowerCase());
  };

  const handleFilterNumeroOPSelectChange = (e) => {
    setSelectedFilterNumeroOP(e.target.value);
  };

  // Filtrer les factures en fonction des numeroFactures
  const filteredFactures = factures.filter((facture) => {
    const numeroFactureMatched = selectedFilternumeroFacture === "" ||
      facture[selectedFilternumeroFacture].toString().toLowerCase().includes(searchQuerynumeroFacture);
    const numeroOPMatched = selectedFilterNumeroOP === "" ||
      facture[selectedFilterNumeroOP].toString().toLowerCase().includes(searchQueryNumeroOP);
    
    return numeroFactureMatched && numeroOPMatched;
  });
  const exportToExcel = () => {
    const jsonData = factures.map(facture => ({
        id: facture.id,
        "Numéro OP": facture.numeroOP,
        "ID fiscale": facture.idFiscale,
        "Date facture": facture.dateFacture,
        montant: facture.montant,
        objet: facture.objet,
        "Nature 3wm": facture.nature3WM,
        "Numéro facture": facture.numeroFacture,
        Devise: facture.devise,
        "Date reception": facture.dateReception,
    }));

    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Factures");
    const wbBlob = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const url = URL.createObjectURL(new Blob([wbBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Lettre_de_credit.xlsx';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
};
  return (
    <div className="content">
      <Col md="16">
        <Card>
          <CardBody>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Recherchern numéro Facture..."
                value={searchQuerynumeroFacture}
                onChange={handleSearchnumeroFactureInputChange}
              />
              <select
                className="form-select"
                value={selectedFilternumeroFacture}
                onChange={handleFilternumeroFactureSelectChange}
              >
                <option value="" >Selectionner </option>
                <option value="numeroFacture" >Numéro facture</option>
              </select>
              <Input
                type="text"
                placeholder="chercher numéro OP..."
                value={searchQueryNumeroOP}
                onChange={handleSearchNumeroOPInputChange}
              />
              <select
                className="form-select"
                value={selectedFilterNumeroOP}
                onChange={handleFilterNumeroOPSelectChange}
              >
                 <option value="" >Selectionner </option>
                <option value="numeroOP" >Numéro OP</option>
              </select>
            </InputGroup>
            <Button onClick={exportToExcel} className="custom-export-button btn btn-primary btn-sm ml-2">Exporter vers Excel</Button>
            {loading ? (
              <div className="text-center">
                <img
                  src={Loading}
                  alt="Logo"
                  style={{ width: '50px', height: '50px' }}
                />
                <p>Chargement des factures en cours</p>
              </div>
            ) : (
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Numéro Facture</th>
                    <th>Numéro OP</th>
                    <th>Montant</th>
                    <th>Motif de rejet</th>
                    <th>Validation</th>
                    <th className='text-center'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFactures.map((facture) => (
                    <tr key={facture.id}>
                      <td>{facture.numeroFacture}</td>
                      <td>{facture.numeroOP}</td>
                      <td>{facture.montant}</td>
                      <td>{facture.motifs}</td>
                      <td>{facture.validation}</td>
                      <td className="project-actions text-center">
                        <div className="btn-group">
                          <Button className="btn btn-success btn-sm btn-circle"
                            onClick={() => {
                              handleValidation(facture.id);
                              handleSubmitr(facture.id)
                              setSelectedFactureId(facture.id);
                              setModalOpen(false)
                            }}
                          >
                            <FaCheck />
                          </Button>
                          <Button className="btn btn-primary btn-sm btn-circle" onClick={() => {
                            handleRejeter(facture.id);
                            setSelectedFactureId(facture.id);
                            setModalOpen(true);
                          }}>
                            <FaTimes />
                          </Button>
                          <Link className="btn btn-black btn-sm btn-icon-split" to={`/Agent/consulterlettrecredit/${facture.id}`}>
    <span className="icon">
        <i className="fas fa-eye"></i> {/* Utilisez ici l'icône appropriée pour un œil */}
    </span>
</Link>
                          <Link className="btn btn-info btn-sm btn-icon-split" to={`/Agent/lettre-credit/${facture.id}`}>
                            <span className="icon">
                              <i className="fas fa-pencil-alt"></i>
                            </span>
                          </Link>
                          <button className="btn btn-danger btn-sm btn-circle" type="button" onClick={() => handleDelete(facture.id)}>
                            <span className="icon">
                              <i className="fas fa-trash"></i>
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </Col>
      <Modal isOpen={modalOpen}>
        <ModalHeader>Sélectionner un motif de rejet</ModalHeader>
        <ModalBody>
          <InputGroup>
            <Input type="select" onChange={(e) => setMotif(e.target.value)} value={motifs} name="motifs">
              <option value="">Sélectionnez un motif</option>
              <option value="Manque PV">Manque PV</option>
              <option value="Manque BL">Manque BL</option>
              <option value="Manque fiche de présences">Manque fiche de présences</option>
              <option value="Manque copie du PO">Manque copie du PO</option>
              <option value="Vice de forme de la facture : Sans cachet">Vice de forme de la facture : Sans cachet</option>
              <option value="Vice de forme de la facture : Raison sociale">Vice de forme de la facture : Raison sociale</option>
              <option value="Vice de forme de la facture : sans numéro facture">Vice de forme de la facture : sans numéro facture</option>
              <option value="Nom  du FR erroné">Nom  du FR erroné</option>
              <option value="PO erroné">PO erroné</option>
              <option value="Facture sans TVA">Facture sans TVA</option>
              <option value="Montant facture non comforme au PO">Montant facture non comforme au PO</option>
            </Input>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-primary" onClick={handleSubmit}>Envoyer</Button>
          <Button color="secondary" onClick={() => setModalOpen(false)}>Annuler</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FacturesList;
