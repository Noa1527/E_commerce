import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import './log.scss';
function Log(props) {
    const [loginActive, setLoginActive] = useState('btn btn-block ')
    const [registerActive, setRegisterActive] = useState('btn btn-block ')
    const [registerModal, setRegisterModal] = useState(props.register);
    const [loginModal, setLoginModal] = useState(props.login);

    const handleModals = (e) => {
        if (e.target.id === 'register') {
            setLoginModal(false)
            setLoginActive('active')
            setRegisterModal(true)
            setRegisterActive('')
        } else if (e.target.id === 'login') {
            setRegisterModal(false)
            setRegisterActive('active')
            setLoginModal(true)
            setLoginActive('')
        }
    }

    return (
        <div className="content__log">
            <div className='contentModal'>
                <ul className="log">
                    <li className={loginActive} onClick={handleModals} id='register'>S'inscrire</li>
                    <li className={registerActive} onClick={handleModals} id='login'>Se connecter</li>
                </ul>
                <div className="container__form">
                    {registerModal && <RegisterForm />}
                    {loginModal && <LoginForm />}
                </div>

            </div>
        </div>
    )
}
export default Log;