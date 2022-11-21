import React from 'react';
import '../Styles/pages/article.scss';
import { Container, Col, Row } from 'react-bootstrap';
import Comments from '../components/Comment';
import Produit from '../components/Produit';

function Article() {
    return (
        <div className='pageContainer container-fluid ps-0 pe-0'>
            <section className='section-article'>
                <Container className='mt-5'>
                    <Row className='d-flex justify-content-between '>
                        <Produit />
                    </Row>
                </Container>
            </section>
            <section className='section-article'>
                <Container className='mt-5'>
                    <Row className=''>
                        <Comments />
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Article