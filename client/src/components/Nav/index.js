import React, { useContext, useState } from 'react';
import { UidContext } from '../../components/Hook/AppContext';
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './nav.scss'

import {
    Container,
    Nav,
    Navbar,
} from "react-bootstrap";

import { useCart } from 'react-use-cart';

import Popup from '../Popup';
import SearchBar from "./SearchBar";
import InThePopup from './InThePopup'

import cart from '../../assets/images/navbarre/cart.png';
import loupe from '../../assets/images/navbarre/loupe.png';
import logo from '../../assets/images/profile/logoE-commerce.png';
import plusb from '../../assets/images/navbarre/flecheh.png';
import moins from '../../assets/images/navbarre/flecheb.png';

import { useSelector } from 'react-redux';

const MyNav = () => {
    const [searchBar, setSearchBar] = useState(false);
    const [popup, setPopup] = useState(false);
    const uid = useContext(UidContext);

    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();

    const userData = useSelector((state) => state.userReducer)

    function showAdminSpace() {
        if (userData.roles) {
            return userData.roles.includes('ROLE_ADMIN') &&
                <NavLink
                    className="ps-4 pe-4 nav-link"
                    to="/admin"
                >
                    Espace administrateur
                </NavLink>
        }
    }
    return (
        <Navbar bg="light" expand="lg" fixed="top" className='nav'>
            <Container fluid>
                <Navbar.Brand href="#" className='nav-logo'><NavLink to="/"> <img src={logo} alt='logo' /></NavLink></Navbar.Brand>
                <Navbar.Text className='nav-text fs-3 '>Deux Ex Machina</Navbar.Text>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse className='navbarScroll'>
                    <Nav
                        className="ms-auto my-2 my-lg-0 w-75 "
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        id="navlink"
                    >
                        <NavLink className="ps-4 pe-4 nav-link" to="/">Accueil</NavLink>
                        <NavLink className="ps-4 pe-4 nav-link" to="/catalog">liste des produit</NavLink>

                        <Nav.Link
                            className='ps-4 pe-4'
                            href="#action1" >Configurateur de PC
                        </Nav.Link>

                        {uid
                            ?
                            <NavLink
                                className="ps-4 pe-4 nav-link"
                                to="/userAccount"
                            >
                                Mon compte
                            </NavLink>
                            :
                            <NavLink
                                className="ps-4 pe-4 nav-link"
                                to="/userAccount"
                            >
                                Connexion
                            </NavLink>
                        }
                        {
                            showAdminSpace()
                        }
                    </Nav>
                    <Navbar.Brand href="#home">
                        <img
                            src={loupe}
                            width="30"
                            height="30"
                            onClick={() => setSearchBar(true)}
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <SearchBar
                        trigger={searchBar}
                        setTrigger={setSearchBar}
                    />
                    <Navbar.Brand className="me-auto" href="#home">
                        <img
                            src={cart}
                            width="30"
                            height="30"
                            onClick={() => setPopup(true)}
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Popup
                        height={35}
                        width={20}
                        color={'17014C'}
                        trigger={popup}
                        setTrigger={setPopup}
                    >
                        <div className='popup__content'>
                            {
                                isEmpty ? <p>Panier vide</p>
                                    :
                                    <div className='cartItem'>
                                        <div>
                                            <ul>
                                                {items.map((item) => (
                                                    <li key={item.id}>

                                                        <div className='cart-items'>
                                                            <h6>{item.name}</h6>
                                                        </div>

                                                        <div className='cart-button'>
                                                            <span>Quantité: {item.quantity}

                                                                <button
                                                                    className='bg-none h-50'
                                                                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                                >
                                                                    <img src={plusb} />

                                                                </button>
                                                                <button
                                                                    className='bg-none h-50'
                                                                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                                >
                                                                    <img src={moins} />
                                                                </button>
                                                            </span>
                                                        </div>

                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                            }
                            <InThePopup><NavLink to="/panier">Panier</NavLink></InThePopup>
                            <InThePopup><NavLink to="/commande">Commande</NavLink></InThePopup>
                        </div>
                    </Popup>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default MyNav;