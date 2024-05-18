import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";

function UserProfile() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    nationnalite: "",
    adresse: "",
    password: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user_id = localStorage.getItem('user_id');
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${user_id}`);
        const userData = response.data;
        setFormData(userData);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil utilisateur:", error);
      }
    };
    fetchUser();
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password } = formData;

    // Vérifier si le mot de passe contient au moins 8 caractères alphanumériques
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Le mot de passe doit contenir au moins 8 caractères alphanumériques"
      );
      return;
    }
    try {
      const user_id = localStorage.getItem('user_id');
      const response = await axios.post(`http://127.0.0.1:8000/api/user/${user_id}`, formData
    );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur:", error.message);
    }
  };

  return (
    <>
      {/* Contenu de la page de profil utilisateur */}
      <div className="content">
        {/* Section de mise à jour du profil */}
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Edit Profile</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit} >
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Nom</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
          
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Prénom</label>
                      <Input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                      
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Adresse Mail</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                 
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Mot De Passe</label>
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                  
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Numéro De Téléphone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Adresse physique</label>
                      <Input
                        type="text"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
          
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Nationalité</label>
                      <Input
                        type="text"
                        name="nationnalite"
                        value={formData.nationnalite}
                        onChange={handleChange}
                      
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              {/* Bouton de sauvegarde */}
              <Button
                className="btn-fill"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </CardFooter>
          </Card>
        </Col>
        {/* Section de détails du profil utilisateur */}
      </div>
    </>
  );
}

export default UserProfile;

