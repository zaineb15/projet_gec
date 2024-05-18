import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "reactstrap";
import Loading from "assets/images/25.png";
import { FaTimes, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';

function FacturesList() {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFactureId, setSelectedFactureId] = useState(null);
  const [motifs, setMotif] = useState(null);
  const [validation, setValidation] = useState("");
  const [selectedFilterecheance, setSelectedFilterecheance] = useState("");
  const [searchQueryecheance, setSearchQueryecheance] = useState("");
  const [selectedFilterdestinataire, setSelectedFilterdestinataire] = useState("");
  const [searchQuerydestinataire, setSearchQuerydestinataire] = useState("");
  const [selectedFilterobjet, setSelectedFilterobjet] = useState("");
  const [searchQueryobjet, setSearchQueryobjet] = useState("");  
  const [selectedFilternumop, setSelectedFilternumop] = useState("");
  const [searchQuerynumop, setSearchQuerynumop] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/financement/${selectedFactureId}/motif`,
        {
          motifs: motifs,
        }
      );
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
    // Appeler l'API pour récupérer toutes les factures
    const fetchFactures = async () => {
      try {
        const user_id = localStorage.getItem('user_id'); 
        const user_profil = localStorage.getItem('user_profil'); 
        const response = await axios.get(
          `http://127.0.0.1:8000/api/current-date-facturesf?user_id=${user_id}&user_profil=${user_profil}`
        );
        setFactures(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des factures:", error);
      }
    };

    fetchFactures();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/financement/${id}`);
      setFactures(factures.filter((facture) => facture.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la facture:", error);
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
      if (!validationType) {
        throw new Error('Impossible de déterminer le type de validation pour ce profil');
      }
      const response = await axios.post(
        `http://127.0.0.1:8000/api/financement/${id}/validation`,
        {
          [validationType]: 'oui', // Envoyer 'oui' en tant que validation pour le type spécifique
        }
      );
      if (response.data.success) {
        alert("Facture validée avec succès!");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la validation de la facture:",
        error.message
      );
      alert("Erreur lors de la validation de la facture.");
    }
  };

  const handleRejeter = async (id) => {
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
      const response = await axios.post(
        `http://127.0.0.1:8000/api/financement/${id}/validation`,
        {
          [validationType]: 'non',
        }
      );
      if (response.data.success) {
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la validation de la facture:",
        error.message
      );
      alert("Erreur lors de la validation de la facture.");
    }
  };
  const handleSubmitr = async (id) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/financement/${id}/motif`,
        {
          motifs: "aucune",
        }
      );
      if (response.data.success) {
        setModalOpen(false);
        setMotif("aucune"); // Mettez à jour l'état de validation
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du motif:", error.message);
      alert("Erreur lors de l'envoi du motif.");
    }
  };
    // Gérer les changements dans la recherche et le filtrage des montants
    const handleSearchnumopInputChange = (e) => {
      setSearchQuerynumop(e.target.value.toLowerCase());
    };
  
    const handleFilternumopSelectChange = (e) => {
      setSelectedFilternumop(e.target.value);
    };
  
    // Gérer les changements dans la recherche et le filtrage des numéros de OP
    const handleSearchobjetInputChange = (e) => {
      setSearchQueryobjet(e.target.value.toLowerCase());
    };
  
    const handleFilterobjetSelectChange = (e) => {
      setSelectedFilterobjet(e.target.value);
    };
    // Gérer les changements dans la recherche et le filtrage des numéros de OP
    const handleSearchecheanceInputChange = (e) => {
      setSearchQueryecheance(e.target.value.toLowerCase());
    };
  
    const handleFilterecheanceSelectChange = (e) => {
      setSelectedFilterecheance(e.target.value);
    };
        // Gérer les changements dans la recherche et le filtrage des numéros de OP
        const handleSearchdestinataireInputChange = (e) => {
          setSearchQuerydestinataire(e.target.value.toLowerCase());
        };
      
        const handleFilterdestinataireSelectChange = (e) => {
          setSelectedFilterdestinataire(e.target.value);
        };
    // Filtrer les factures en fonction des numeroFactures
    const filteredFactures = factures.filter((facture) => {
      const numopMatched =
        selectedFilternumop === "" ||
        facture[selectedFilternumop]
          .toString()
          .toLowerCase()
          .includes(searchQuerynumop);
      const destinataireMatched =
        selectedFilterdestinataire === "" ||
        facture[selectedFilterdestinataire]
          .toString()
          .toLowerCase()
          .includes(searchQuerydestinataire);
      const echeanceMatched =
        selectedFilterecheance === "" ||
        facture[selectedFilterecheance]
          .toString()
          .toLowerCase()
          .includes(searchQueryecheance);
       const objetMatched =
          selectedFilterobjet === "" ||
          facture[selectedFilterobjet]
            .toString()
            .toLowerCase()
            .includes(searchQueryobjet);
      return numopMatched && destinataireMatched && echeanceMatched && objetMatched;
    });
    const exportToExcel = () => {
      const jsonData = factures.map((facture) => ({
        id: facture.id,
        "Numéro OP": facture.numPO,
        Destinataire: facture.dest,
        "Date réception": facture.dateRec,
        montant: facture.montant,
        objet: facture.objet,
        Echeance: facture.ech,
        "Date PO": facture.datepo,
        Financement: facture.fncm,
        Devise: facture.devise,
      }));
  
      const ws = XLSX.utils.json_to_sheet(jsonData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Factures");
      const wbBlob = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const url = URL.createObjectURL(
        new Blob([wbBlob], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "Finencement.xlsx";
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
                placeholder="Recherchern numéro PO..."
                value={searchQuerynumop}
                onChange={handleSearchnumopInputChange}
              />
              <select
                className="form-select"
                value={selectedFilternumop}
                onChange={handleFilternumopSelectChange}
              >
                <option value="">Selectionner </option>
                <option value="numPO">Numéro PO</option>
              </select>
              <Input
                type="text"
                placeholder="Destinataire..."
                value={searchQuerydestinataire}
                onChange={handleSearchdestinataireInputChange}
              />
              <select
                className="form-select"
                value={selectedFilterdestinataire}
                onChange={handleFilterdestinataireSelectChange}
              >
                <option value="">Selectionner </option>
                <option value="dest">Destinataire</option>
              </select>
              <Input
                type="text"
                placeholder="chercher echeance..."
                value={searchQueryecheance}
                onChange={handleSearchecheanceInputChange}
              />
              <select
                className="form-select"
                value={selectedFilterecheance}
                onChange={handleFilterecheanceSelectChange}
              >
                <option value="">Selectionner </option>
                <option value="ech">Echeance</option>
              </select>
              <Input
                type="text"
                placeholder="chercher objet..."
                value={searchQueryobjet}
                onChange={handleSearchobjetInputChange}
              />
              <select
                className="form-select"
                value={selectedFilterobjet}
                onChange={handleFilterobjetSelectChange}
              >
                <option value="">Selectionner </option>
                <option value="objet">objet</option>
              </select>
            </InputGroup>
            <Button
              onClick={exportToExcel}
              className="custom-export-button btn btn-primary btn-sm ml-2"
            >
              Exporter vers Excel
            </Button>
            {loading ? (
              <div className="text-center">
                <img
                  src={Loading}
                  alt="Logo"
                  style={{ width: "50px", height: "50px" }}
                />
                <p>Chargement des factures en cours</p>
              </div>
            ) : (
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Numéro PO</th>
                    <th>Destinataire</th>
                    <th>Echeances</th>
                    <th>Finencement</th>
                    <th>Objet</th>
                    <th>Motif de rejet</th>
                    <th>Validation</th>
                    <th className='text-center'>Actions</th>
                    {/* Ajouter d'autres colonnes si nécessaire */}
                  </tr>
                </thead>
                <tbody>
                {filteredFactures.map((facture) => (
                    <tr key={facture.id}>
                      <td>{facture.numPO}</td>
                      <td>{facture.dest}</td>
                      <td>{facture.ech}</td>
                      <td>{facture.fncm}</td>
                      <td>{facture.objet}</td>
                      <td>{facture.motifs}</td>
                      <td>{facture.validation}</td>
                      <td className="project-actions text-center">
                        <div className="btn-group">
                          <Button
                            className="btn btn-success btn-sm btn-circle"
                            onClick={() => {
                              handleValidation(facture.id);
                              handleSubmitr(facture.id);
                              setSelectedFactureId(facture.id);
                              setModalOpen(false);
                            }}
                          >
                            <FaCheck />
                          </Button>
                          <Button
                            className="btn btn-primary btn-sm btn-circle"
                            onClick={() => {
                              handleRejeter(facture.id);
                              setSelectedFactureId(facture.id);
                              setModalOpen(true);
                            }}
                          >
                            <FaTimes />
                          </Button>
                          <Link className="btn btn-black btn-sm btn-icon-split" to={`/Agent/consulterfinancement/${facture.id}`}>
    <span className="icon">
        <i className="fas fa-eye"></i> {/* Utilisez ici l'icône appropriée pour un œil */}
    </span>
</Link>
                          <Link
                            className="btn btn-info btn-sm btn-icon-split"
                            to={`/Agent/financement/${facture.id}`}
                          >
                            <span className="icon">
                              <i className="fas fa-pencil-alt"></i>
                            </span>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm btn-circle"
                            type="button"
                            onClick={() => handleDelete(facture.id)}
                          >
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
            <Input
              type="select"
              onChange={(e) => setMotif(e.target.value)}
              value={motifs}
              name="motifs"
            >
              <option value="">Sélectionnez un motif</option>
              <option value="Manque PV">Manque PV</option>
              <option value="Manque BL">Manque BL</option>
              <option value="Manque fiche de présences">
                Manque fiche de présences
              </option>
              <option value="Manque copie du PO">Manque copie du PO</option>
              <option value="Vice de forme de la facture : Sans cachet">
                Vice de forme de la facture : Sans cachet
              </option>
              <option value="Vice de forme de la facture : Raison sociale">
                Vice de forme de la facture : Raison sociale
              </option>
              <option value="Vice de forme de la facture : sans numéro facture">
                Vice de forme de la facture : sans numéro facture
              </option>
              <option value="Nom  du FR erroné">Nom du FR erroné</option>
              <option value="PO erroné">PO erroné</option>
              <option value="Facture sans TVA">Facture sans TVA</option>
              <option value="Montant facture non comforme au PO">
                Montant facture non comforme au PO
              </option>
            </Input>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-primary" onClick={handleSubmit}>
            Envoyer
          </Button>
          <Button color="secondary" onClick={() => setModalOpen(false)}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FacturesList;
