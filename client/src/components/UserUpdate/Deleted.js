import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { UidContext } from '../../components/Hook/AppContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Deleted = () => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userData = useSelector((state) => state.userReducer);
    const token = useContext(UidContext);
    let navigate = useNavigate();

    const handleDelete = (e) => {
        e.preventDefault()
        // axios delete request
        axios({
            method: "delete",
            url: "http://127.0.0.1:8000/api/user",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            data: {
                id: userData.id
            }
        })
            .then((res) => {

                console.log(res)
                console.log(res.status)

                if (res.status === 204) {
                    alert("votre compte a bien été suprimé, nous somme désolé si n'avons pas pu vous satisfaire")

                    localStorage.removeItem('token');
                    window.location.href = '/';

                }
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className='container-delete'>
            <h1 className='text-dark text-center'>SUPPRIMER VOTRE COMPTE</h1>
            <div className='content-text-delete'>
                <p className='text-dark me-auto ms-auto'>
                    Votre compte deuse ex machina sera définitivement supprimé.
                    Votre profil, vos informations de compte, ainsi que tous les paramètres et données enregistrés dans le cloud seront supprimés ;
                    ils ne sont pas récupérables.
                </p>
            </div>

            <div className='d-flex justify-content-center py-2 pe-2 ps-2'>
                <button
                    className="btn btn-secondary me-4"
                    onClick={() => { navigate("/user-update") }}
                >
                    Retour
                </button>
                <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={handleShow}
                >
                    Supprimer mon compte
                </button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>SUPRESSION DEFINITIFE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>êtes vous sure de vouloir suprimer votre compte</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Supprimer définitivement votre compte
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Deleted;