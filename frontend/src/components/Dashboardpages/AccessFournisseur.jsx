import React, { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Button, Form, FormGroup, Input } from "reactstrap";

const InviteSupplier = () => {
  const [email, setEmail] = useState("");
  const [profil, setProfil] = useState("");

  const handleInvite = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("profil", profil);

      const response = await axios.post("http://127.0.0.1:8000/api/user-access", formData);

      if (response.status === 200) {
        alert("Invitation envoyée avec succès !");
      } else {
        throw new Error("Une erreur s'est produite lors de l'envoi de l'invitation.");
      }
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <div className="content">
      <div className="row">
        <div className="col-md-12">
          <Card>
            <CardHeader>
              <h5 className="title">Inviter un fournisseur</h5>
            </CardHeader>
            <CardBody>
              <Form>
                <div className="col-md-12">
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">Adresse e-mail</label>
                    <Input 
                      placeholder="E-mail" 
                      type="email" 
                      name="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-12">
                  <FormGroup>
                    <label>Profil</label>
                    <Input
                    type="select"
                    name="profil"
                    value={profil}
                    onChange={(e) => setProfil(e.target.value)}
                    >
                    <option value="">Choisir un profil</option>
                    <option value="agent AP">Comptabilité fournisseur</option>
                    <option value="fiscaliste">Fiscaliste</option>
                    <option value="agent tresorerie">Agent tresorerie</option>
                    <option value="agent BOF">Agent bureau d'ordre financier</option>
                    <option value="fournisseur">Fournisseur</option>
                    <option value="admin">Admin</option>
                  </Input>
                  </FormGroup>
                </div>
                <div className="col-md-12">
                  <FormGroup>
                    <Button
                      className="btn-fill"
                      color="primary"
                      type="button"
                      onClick={handleInvite}
                    >
                      Inviter
                    </Button>
                  </FormGroup>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InviteSupplier;
