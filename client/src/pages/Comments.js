import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from '../components/Hook/AppContext';
import ReactStars from 'react-rating-stars-component';
import { BsFillPersonFill } from 'react-icons/bs';
import axios from 'axios';

const Comments = () => {
    const [rating, setRating] = React.useState('');
    const [comment, setComment] = React.useState('');

    const addressData = useSelector((state) => state.addressReducer)
    const token = useContext(UidContext)
    const oneArticleData = useSelector((state) => state.oneArticleReducer)
    const Url = "http://localhost:8000";
    const handleSubmit = async(e, ratingInt ) => {
        e.preventDefault();
       
        await axios({
            method: 'post',
            url: `http://localhost:8000/api/product/${oneArticleData.id}/comment`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        },
            data: {
                comment : comment,
                rating : parseInt(rating)
            },
        })
            .then(res => {
                console.log(res)
                if(res.status === 204){
                    alert('Votre commentaire a été envoyé avec succès')
                    window.location.href = `/article/${oneArticleData.id}`;
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='pageContainer container-fluid ps-0 pe-0'>
            <section className='section-name-user'>
                <div className='container-name-user'>
                    <div className='row-name-user'>
                        <div className='d-flex align-items-center'>
                            <BsFillPersonFill
                                size={30}
                            />
                            {token && addressData
                                ? <span className='ms-3'>{`${addressData.lastname} ${addressData.firstname}`}</span>
                                : <span className='ms-3'>Anonyme</span>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <section className='section-form-comments'>
                <div className='container-form-comments'>
                    <div className='row-form-comments'>
                        <form className='form-comments' action="" method="post">
                            <div className="form-title">
                                <h2>Laissez un commentaire</h2>
                                <div>
                                    <div>
                                        <img src={Url + oneArticleData.photos[0].url} alt="product img" />
                                    </div>
                                    <div>
                                        <span>{oneArticleData.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-stars">
                                <div className='reating'>
                                    <div>
                                        <h3>Note général</h3>
                                    </div>
                                    <div>
                                        <ReactStars
                                            count={5}
                                            size={30}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            color="#290656"
                                            activeColor="#B794F6"
                                            
                                            onChange={NewValue => 
                                                {
                                                    setRating(`${NewValue}`)
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-comment">
                                <div className='comment'>
                                    <div>
                                        <h3>Ajouter un commentaire</h3>
                                    </div>
                                    <div>
                                        <textarea className='form-control' placeholder='Votre commentaire' onChange={(e) => setComment(e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="form-submit">
                                <button className=' btn-primary btn-block' onClick={(e) => handleSubmit(e, rating)}>Envoyer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Comments;