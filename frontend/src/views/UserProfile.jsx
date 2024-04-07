import React, { useState } from "react";
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
  const navigate = useNavigate(); // Utilisation de useNavigate pour gérer la navigation
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, confirm_password } = formData;

    // Vérifier si les mots de passe correspondent
    if (password !== confirm_password) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    // Vérifier si le mot de passe contient au moins 8 caractères alphanumériques
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Le mot de passe doit contenir au moins 8 caractères alphanumériques"
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Rediriger vers la page de connexion après une inscription réussie
      navigate("/");
    } catch (error) {
      console.error("Erreur:", error.message);
    }
  };

  return (
    <>
      {/* Contenu de la page de profil utilisateur */}
      <div className="content">
        {/* Section de mise à jour du profil */}
        <Col md="8">
          <Card>
            <CardHeader>
              <h5 className="title">Edit Profile</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Nom</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nom"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Prénom</label>
                      <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Prénom"
                        required
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
                        placeholder="Email"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Mot De Passe</label>
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Mot De Passe"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Confirmer Le Mot De Passe</label>
                      <Input
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        placeholder="Confirmer Le Mot De Passe"
                        required
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
                        placeholder="Numéro De Téléphone"
                        required
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
