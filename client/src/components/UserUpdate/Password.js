import React, { useContext, useState } from "react";
import { FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { UpdatePassword } from "../../actions/user.action";
import { UidContext } from "../Hook/AppContext";

function UpdateUserPassword() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const token = useContext(UidContext)
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer)

    const handleUpdatePassword = (e) => {
        e.preventDefault();

        if (userData.password !== password) {
            if (password === confirm) {
                dispatch(UpdatePassword(token, password, confirm));
                alert("Votre mot de passe a été modifié avec succès !")
                localStorage.removeItem('token');
                window.location = '/';
            } else {
                alert("Vos mots de passe ne correspondent pas !")
            }
        } else {
            alert("Votre mot de passe actuel est le même que le nouveau !")
        }
    }
    return (
        <div >
            <Form method="PATCH" className="formpassupdate">
                <div className="w-100 mt-3">
                    <h4 className="text-center mb-4">Modifier Votre Mot De Passe</h4>
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="mot de passe"
                        className="mb-3"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FloatingLabel>
                </div>

                <div className="mt-3 mb-3 w-100">
                    <h4 className="text-center mb-4">Comfirmation Du Mot De Passe</h4>
                    <FloatingLabel
                        controlId="floatingComfirmedPassword"
                        label="comfirmé votre mot de passe"
                        className="mb-3"
                    >
                        <Form.Control
                            type="password"
                            placeholder="password"
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                        />
                    </FloatingLabel>
                </div>

                <button
                    id="submitBtn"
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                    onClick={handleUpdatePassword}
                >
                    Valider
                </button>
            </Form>
        </div>
    )
}

export default UpdateUserPassword;