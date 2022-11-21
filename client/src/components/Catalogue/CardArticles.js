import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GetArticles } from "../../actions/articles.action";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import StarsReating from "../StarsReating";
import axios from 'axios';

const CardArticles = () => {

    const articles = useSelector((state) => state.articlesReducer)
    const [products, setProducts] = useState(JSON.parse(JSON.stringify(articles)));
    const [priceFilter, setPriceFilter] = useState("");
    const [brandFilter, setBrandFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const dispatch = useDispatch();
    const Url = "http://localhost:8000";

    useEffect(() => {
        axios.get("http://localhost:8000/api/product/list")
            .then(res => {
                dispatch(GetArticles(res.data));
            })
            .catch(err => console.log(err));
    }, []);


    const filterProducts = () => {
        let filteredItems = JSON.parse(JSON.stringify(articles))

        if (priceFilter === "+") {
            filteredItems.sort((a, b) => { return parseFloat(b.price) - parseFloat(a.price) });
        } else if (priceFilter === "-") {
            filteredItems.sort((a, b) => { return parseFloat(a.price) - parseFloat(b.price) });
        }

        if (brandFilter !== "") {
            filteredItems = filteredItems.filter(value => value.name.includes(brandFilter));
        }

        // if (categoryFilter !== "") {
        //     filteredItems = filteredItems.filter(value => value.category.includes(categoryFilter));
        // }

        setProducts(filteredItems)
    }

    return (
        <>
            <div className="filtercontainer">
                <select name='price' id='price' className='categorie' onChange={(e) => setPriceFilter(e.target.value)} >
                    <option value="">Prix</option>
                    <option value='+'> Du + cher au - cher</option>
                    <option value='-'> Du - cher au + cher</option>
                </select>
                <select name="marque" id="marque" className="categorie" onChange={(e) => setBrandFilter(e.target.value)}>
                    <option value="">Marque</option>
                    <option value="Corsair"  >Corsair</option>
                    <option value="Geforce">Geforce</option>
                    <option value="Asus">Asus</option>
                    <option value="Gigabyte">Gigabyte</option>
                    <option value="Intel">Intel</option>
                    <option value="AMD">AMD</option>
                </select>
                {/* <select name="marque" id="marque" className="categorie" onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="">Catégorie</option>
                    <option value="Carte-graphique">Carte-graphique</option>
                    <option value="processeur">Processeur</option>
                    <option value="Carte-mère">Carte-mère</option>
                    <option value="RAM">RAM</option>
                </select> */}
                <button onClick={filterProducts}>Filtrer</button>
            </div>
            <Container>
                <Row className='row-wrap-catalog'>
                    <Col className="product-card-container" md={6} lg={5} xl={3} >
                        {Array.isArray(articles)

                            ? products.map((product) => {
                                return (
                                    <Card className='product-card rounded-0' key={product.id}>
                                        <Card.Img className='img-product' variant="top" src={`${Url}${product.photos[0].url}`} />
                                        <Card.Body className="text-start">
                                            <Card.Title className='title-article'>
                                                <p>
                                                    Titre:
                                                    <span> {product.name} </span>
                                                </p>
                                                <p>
                                                    Prix:
                                                    <span> {product.price} </span>
                                                </p>
                                                <p>
                                                    Note:
                                                    <span> <StarsReating /> </span>
                                                </p>
                                            </Card.Title>
                                            <button className=" btn-articles btn-block mt-5"  > <NavLink to={`/article/${product.id}`}> Acheter</NavLink></button>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                            : null
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CardArticles;