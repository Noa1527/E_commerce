import React from 'react';
import { useCart } from 'react-use-cart';
import plusb from '../assets/images/navbarre/ff.png';
import moins from '../assets/images/navbarre/bbb.png';
import del from '../assets/images/navbarre/dele.svg';
import { HiArrowCircleDown, HiArrowCircleUp, } from 'react-icons/hi'
import { TiDelete } from 'react-icons/ti'
import { Row, Col, Container } from 'react-bootstrap';

const Carts = () => {

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
    return (
        <>


                    {
                        isEmpty 
                        ? 
                        <div className='container-empty'>
                        <section className='row-empty'>
                        <div className='empty'>
                        <p>Panier vide</p>
                        </div>
                        </section>
                        </div>

                            :
                            <Container className='container-cart'>

                            <div className='panier-container'>
                            <div>
                                {
                                    totalItems > 1
                                        ?
                                        <div className='header-cart'>Votre panier : {totalItems} produits</div>
                                        :
                                        <div className='header-cart'>Votre panier : {totalItems} produit</div>
                                }

                                {items.map((item) => (
                                    <div key={item.id}>
                                        <Row className='items'>
                                            <Col>
                                                <div className='img-article'>
                                                    <img src={item.photos[0].fullUrl} />
                                                </div>
                                            </Col>

                                            <Col>
                                                <div className="title-article">
                                                    <h6>{item.name}</h6>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="quantity-article">
                                                    <span>Quantité: {item.quantity}
                                                        <button
                                                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <HiArrowCircleUp size={'30px'} />

                                                        </button>
                                                        <button
                                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                        >
                                                            <HiArrowCircleDown size={'30px'} />
                                                        </button>
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="del-article">
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        <TiDelete size={'35px'} />
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                                <Row className='total'>
                                    <div>
                                        <h3>Montant total de votre panier : {cartTotal} €</h3>
                                        <button>Passer commande</button>
                                        </div>
                                </Row>
                            </div>
                            </div>
            </Container>
                    }


        </>
    );

};

export default Carts;