import React, { useContext, useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form } from 'react-bootstrap';
import { UpdateEmail } from "../../actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../Hook/AppContext";

function UpdateMail() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const token = useContext(UidContext)
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer)

    function isValidEmail(email) {
        return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
    }
    
    const handleUpdate = (e) => {
        e.preventDefault();
        if (isValidEmail(email)) {
            setError(null);
            if (userData.email !== email) {
                dispatch(UpdateEmail(token, email))
                localStorage.removeItem('token');
                window.location = '/';
            }
        } else {
            setError('Email is invalid');
        }
    }

    return (
        <div>
            <Form method='post' className="formmailupdate">
                <h4 className="text-center">Modifier Votre E-mail</h4>
                <br />
                <FloatingLabel
                    controlId="floatingInput"
                    label="adresse Email"
                    className="mb-3"
                >
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FloatingLabel>
                {error && <h2 style={{ color: 'red' }}>{error}</h2>}

                <button
                    onClick={handleUpdate}
                    id="submitBtn"
                    className="btn btn-primary btn-block mt-4"
                >
                    Valider la modification
                </button>
            </Form>
        </div>
    )
}

export default UpdateMail;