import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader } from 'reactstrap';
import axios from 'axios';
import Loading from 'assets/images/25.png'; // Assurez-vous que le chemin vers votre image de chargement est correct

const ConsulterSteg = () => {
    const { id } = useParams();
    const [facture, setFacture] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFacture = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/current-date-factures/${id}`);
                setFacture(response.data);
                setLoading(false); // Marquer le chargement comme terminé une fois que les données sont récupérées
            } catch (error) {
                console.error('Erreur lors de la récupération de la facture:', error);
            }
        };
        fetchFacture();
    }, [id]);

    if (loading) { // Si loading est vrai, affichez le chargement
        return (
            <div className="content">
                <div className="text-center">
                    <img src={Loading} alt="Logo" style={{ width: '50px', height: '50px' }} />
                    <p>Chargement des détails de la facture en cours</p>
                </div>
            </div>
        );
    }

    // Une fois que le chargement est terminé, affichez les détails de la facture
    return (
        <div className="content">
            <Card>
                <CardHeader>
                    <h4 className="title">Détails de la STEG</h4>
                </CardHeader>
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card card-primary">
                                        <div className="card-header"></div>
                                        <div className="card-body">
                                            <p><strong>Date facture:</strong> {facture.date_facture}</p>
                                            <p><strong>Numéro PO :</strong> {facture.numero_po}</p>
                                            <p><strong>Montant :</strong> {facture.montant}</p>
                                            <p><strong>Devise :</strong> {facture.devise}</p>
                                            <p><strong>ID fiscale :</strong> {facture.id_fiscale}</p>
                                            <p><strong>Direction :</strong> {facture.direction}</p>
                                            <p><strong>Fournisseur :</strong> {facture.fournisseur}</p>
                                            <p><strong>Delai de paiement :</strong> {facture.delai_paiement}</p>
                                            <p><strong>Structure ordinatrice :</strong> {facture.structure_ordinatrice}</p>
                                            <p><strong>Numéro de facture  :</strong> {facture.numero_facture}</p>
                                            <p><strong>Date récéption :</strong> {facture.date_reception}</p>
                                            <p><strong>Fichier :</strong> {facture.upload_document}</p>
                                            <p><strong>Nature 3wm :</strong> {facture.nature_3wm}</p>
                                            <p><strong>Objet :</strong> {facture.objet}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Card>
        </div>
    );
};

export default ConsulterSteg;
