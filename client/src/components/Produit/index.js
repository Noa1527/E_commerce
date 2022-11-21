import React from 'react';
import axios from 'axios'
import './produit.scss';
import { Col } from 'react-bootstrap';
import Reatings from '../StarsReating';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { GetAnArticle } from '../../actions/oneArticle.action';
import { useDispatch } from 'react-redux';
import { useCart } from 'react-use-cart';


const Produit = () => {
    const [article, setArticle] = React.useState({});
    const [photos, setPhotos] = React.useState([]);
    const params = useParams();
    const dispatch = useDispatch();
    
    const Url = "http://localhost:8000";
    const { addItem } = useCart();

    React.useEffect(() => {
        // get one product
        axios({
            method: 'get',
            url: `http://localhost:8000/api/product/${params.id}`,
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                setArticle(res.data);
                setPhotos(Url + res.data.photos[0].url);
                dispatch(GetAnArticle(res.data));

                console.log();
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <Col md={6} >
                <div className='image-product'>
                    {/* img */}
                    <img src={photos} alt={article.name} />
                </div>
            </Col>
            <Col md={5} >
                <div className='content-produit'>
                    <div className='description-product'>
                        {/* description */}
                        <div className='title'>
                            <h2><span className=''>{article.name}</span></h2>
                        </div>
                        <div className='price'>
                            <span className=''>{`${article.price} €`}</span><small className=''> EUR</small>
                        </div>
                        <div className='description'>

                            <p> <span className=''>{article.description}</span> </p>
                        </div>
                        <button className='btn-panier btn-primary btn-block mt-4 ' onClick={() => addItem(article)}>Ajouter à votre panier</button>
                    </div>
                    <div className="stars">
                        <div className='d-flex align-items-center'>
                            <Reatings
                                stars={article.stars}
                            />
                            <p> évaluation</p>
                        </div>
                        <div>
                            <button
                                className='btn-comments btn-primary btn-block mt-4 '>
                                <NavLink to={`/comments/${params.id}`}>
                                    mettre un commentaire
                                </NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            </Col>
        </>
    );
};

export default Produit;