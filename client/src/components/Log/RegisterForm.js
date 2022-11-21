import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios'
import LoginForm from './LoginForm';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const RegisterForm = () => {
    const [fromSubmit, setFormSubmit] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comfirmedPassword, setComfirmedPassword] = useState("");
    const [error, setError] = useState(null);

    function isValidEmail(email) {
        return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById('terms');
        const emailError = document.querySelector('.pseudo.error');
        const passwordError = document.querySelector('.password.error');
        const comfirmedPasswordError = document.querySelector('.comfirmed-password.error')
        const termsError = document.querySelector('.terms.error')

        comfirmedPasswordError.innerHTML = "";
        termsError.innerHTML = "";
        
        if (password !== comfirmedPassword || !terms.checked || !isValidEmail(email)) {
            if (!isValidEmail(email)) {
                setError('L\'email n\'est pas valide');
            } else {
                setError(null)
            }
            if (password !== comfirmedPassword) {
                comfirmedPasswordError.innerHTML = 'Les mots de passe ne correspondent pas';
            }

            if (!terms.checked) {
                termsError.innerHTML = 'Veuillez valider les conditions générales';
            }
        } else {
            await axios({
                method: "POST",
                url: "http://127.0.0.1:8000/user",
                headers: { 'Content-Type': 'application/json' },
                data: {
                    email: email,
                    password,
                },
            })
                .then((res) => {

                    if (res.data.errors) {
                        emailError.innerHTML = res.data.errors.email
                        passwordError.innerHTML = res.data.errors.password
                    }
                    else {
                        setFormSubmit(true)
                    }

                })
                .catch((err) => {
                    console.log(err)
                    console.log(err.data)
                    console.log(err.response)
                    console.log(err.response.status)
                    if (err.response.status === 500) {
                        setError("Email déjà utilisé") 
                    }else{
                        setError(null)
                    }
                        
                    
                });
        }

    }

    return (
        <>
            {fromSubmit ? (
                <>
                    <LoginForm />
                    <p className='success text-success fs-4'>Enregistrement réussi, veuillez-vous connecter</p>
                </>
            ) : (
                <Form onSubmit={handleRegister} method="post" className="formulaire">
                    {error && <h3 style={{ color: 'red' }}>{error}</h3>}

                    <h4 className="text-center text-light">S'inscrire</h4>

                    <br />

                    <FloatingLabel
                        controlId="floatingInput"
                        label="adresse Email"
                        className="mb-3 "
                    >
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className=" h-100"
                            required
                        />
                    </FloatingLabel>
                    <div className='email error'></div>

                    <br />

                    <FloatingLabel
                        controlId="floatingPassword"
                        label="mot de passe"
                        className="mb-3"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className=" h-100"
                            required
                        />
                    </FloatingLabel>
                    <div className='password error'></div>

                    <br />

                    <FloatingLabel
                        controlId="floatingComfirmedPassword"
                        label="comfirmé votre mot de passe"
                        className="mb-3"
                    >
                        <Form.Control
                            type="password"
                            placeholder="password"
                            onChange={(e) => setComfirmedPassword(e.target.value)}
                            value={comfirmedPassword}
                            className=" h-100"
                            required
                        />
                    </FloatingLabel>

                    <div className='comfirmed-password error'></div>
                    <br />
                    <div className='box-terms'>
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms" className='text-light'>j'accepte les <a href="/"  target={'_blank'} rel="noopener noreferrer">conditions générales</a></label>
                    </div>
                    <div className="terms error"></div>
                    <br />

                    <button className="btn btn-primary btn-block mt-4" id="submitBtn" onClick={(e) => handleRegister(e)}>Valider</button>
                </Form>
            )}
        </>
    );
};

export default RegisterForm;