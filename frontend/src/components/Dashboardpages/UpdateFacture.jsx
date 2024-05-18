import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, FormGroup, Input, CustomInput } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateFacture = () => {
    const { id } = useParams();
    const [numFacture, setNumFacture] = useState('');
    const [dateFacture, setDateFacture] = useState('');
    const [montant, setMontant] = useState('');
    const [file, setFile] = useState(null);
    const notificationAlertRef = useRef(null);
    const devise = "TND";

    useEffect(() => {
        const fetchFacture = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/facture/${id}`);
                const { num_fact, date_fact, montant,file } = response.data;
                setFile(file);
                setNumFacture(num_fact);
                setDateFacture(date_fact);
                setMontant(montant);
            } catch (error) {
                console.error('Erreur lors de la récupération de la facture:', error);
            }
        };
        fetchFacture();
    }, [id]);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!numFacture.trim() || !dateFacture.trim() || !montant.trim() ) {
            showNotification('danger', 'Veuillez remplir tous les champs du formulaire.');
            return;
        }
        const formData = new FormData();
        formData.append('num_fact', numFacture); // Utiliser 'num_fact' au lieu de 'num_facture'
        formData.append('date_fact', dateFacture); // Utiliser 'date_fact' au lieu de 'date_facture'
        formData.append('montant', montant);
        formData.append('devise', devise);
        formData.append('file', file); // Append file data        

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/facture/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            showNotification('success', 'Facture modifiée avec succès!');
            window.location.href = "/fournisseur/listefacture";
        } catch (error) {
            console.error("Erreur lors de la modification de la facture:", error.message);
            showNotification('danger', 'Erreur lors de la modification de la facture.');
        }
    };
    


    const showNotification = (type, message) => {
        const options = {
            place: 'tr',
            message: <div>{message}</div>,
            type: type,
            autoDismiss: 5,
        };
        notificationAlertRef.current.notificationAlert(options);
    };

 
    return (
        <div className="content">
            <Card>
                <CardHeader>
                    <h4 className="title">Modifier une facture</h4>
                </CardHeader>
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card card-primary">
                                        <form onSubmit={handleSubmit} enctype="multipart/form-data">
                                            <div className="card-body">
                                                <FormGroup>
                                                    <label htmlFor="num_facture">Numéro Facture</label>
                                                    <Input
                                                        type="text"
                                                        name="num_fact"
                                                        value={numFacture}
                                                        onChange={(e) => setNumFacture(e.target.value)}
                                                        placeholder="Entrer Numéro Facture"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <label htmlFor="date_facture">Date Facture</label>
                                                    <Input
                                                        type="date"
                                                        name="date_fact"
                                                        value={dateFacture}
                                                        onChange={(e) => setDateFacture(e.target.value)}
                                                        placeholder="Entrer Date Facture"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <label htmlFor="montant">Montant</label>
                                                    <Input
                                                        type="text"
                                                        name="montant"
                                                        value={montant}
                                                        onChange={(e) => setMontant(e.target.value)}
                                                        placeholder="Entrer Montant"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
    <label>Devise</label>
    <Input
        type="text"
        name="devise"
        value="TND" // Valeur toujours "TND"
        readOnly // Rend le champ non modifiable
    />
</FormGroup>
                                                <CustomInput
                                                    icon="tim-icons icon-cloud-upload-94"
                                                    type="file"
                                                    id="fileInput"
                                                    name="file"
                                                    label="Sélectionnez un fichier PDF ou une image"
                                                    accept=".pdf, .png, .jpg"
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary">
                                                    Modifier
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Card>
            <NotificationAlert ref={notificationAlertRef} />
        </div>
    );
};

export default UpdateFacture;
