import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';
import axios from 'axios';
import Loading from 'assets/images/25.png'; // Assurez-vous que le chemin vers votre image de chargement est correct

const ConsulterReclamation = () => {
    const { id } = useParams();
    const [reclamation, setReclamation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReclamation = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/reclamation/${id}`);
                setReclamation(response.data);
                setLoading(false); // Marquer le chargement comme terminé une fois que les données sont récupérées
            } catch (error) {
                console.error('Erreur lors de la récupération de la réclamation:', error);
            }
        };
        fetchReclamation();
    }, [id]);

    if (loading) { // Si loading est vrai, affichez le chargement
        return (
            <div className="content">
                <div className="text-center">
                    <img src={Loading} alt="Logo" style={{ width: '50px', height: '50px' }} />
                    <p>Chargement des détails de la réclamation en cours</p>
                </div>
            </div>
        );
    }

    // Une fois que le chargement est terminé, affichez les détails de la réclamation
    return (
        <div className="content">
            <Card>
                <CardHeader>
                    <h4 className="title">Détails de la réclamation</h4>
                </CardHeader>
                <CardBody>
                    <CardText><strong>Objet :</strong> {reclamation.objet}</CardText>
                    <CardText><strong>Message :</strong> {reclamation.message}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default ConsulterReclamation;
