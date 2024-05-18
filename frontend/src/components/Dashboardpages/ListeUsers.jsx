import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  Table,
  Col,
} from 'reactstrap';
import Loading from 'assets/images/25.png';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la user:', error);
    }
  };

  return (
    <div className="content">
      <Col md="16">
        <Card>
          <CardBody>
            {loading ? (
              <div className="text-center">
                <img
                  src={Loading}
                  alt="Logo"
                  style={{ width: '50px', height: '50px' }}
                />
                <p>Chargement des utilisateurs en cours</p>
              </div>
            ) : (
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Adresse mail</th>
                    <th>Téléphone</th>
                    <th>Status</th>
                    <th className='text-center'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.isactive ==='1' ? 'connecté' : 'déconnecté'}</td>
                      <td className='text-center'>
                        <div className="btn-group">
                          <Link className="btn btn-info btn-sm btn-icon-split " to={`/Admin/edituser/${user.id}`}>
                            <span className="icon">
                              <i className="fas fa-pencil-alt"></i>
                            </span>
                          </Link>
                          <button className="btn btn-danger btn-sm btn-circle" type="button" onClick={() => handleDelete(user.id)}>
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
    </div>
  );
}

export default UserList;
