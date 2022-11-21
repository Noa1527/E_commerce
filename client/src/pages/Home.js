import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { Carou } from '../Helpers/CarouselData.js';
import { Composent } from '../Helpers/homePageData.js';

const Home = () => {
    return (
        <>
            <div className="content">
                <Carousel variant="dark">
                    {
                        Carou.map((carou, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={carou.img}
                                        alt={carou.alt}
                                    />
                                </Carousel.Item>
                            );
                        })
                    }
                </Carousel>

                <Container className='HomeContainer'>
                    <Row className='row-wrap'>
                        {
                            Composent.map((item, index) => {
                                return (
                                    <Col xs={6} md={4} key={index}>
                                        <Card className='HomeProductCard rounded-0'>
                                            <Card.Img className='img-transition' variant="top" src={item.img} />
                                            <Card.Body>
                                                <Card.Title>{item.title}</Card.Title>
                                                <button className="btn HomeProductBtn btn-block mt-4">Acheter</button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Home;