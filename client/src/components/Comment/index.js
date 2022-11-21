import React from 'react';
import "./Comment.scss";
import { Col } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';

const Comment = () => {
    const oneArticleData = useSelector((state) => state.oneArticleReducer)
    const [comments, setComments] = React.useState([]);
    console.log(oneArticleData);
    React.useEffect(() => {
        if (oneArticleData.comments) {
            setComments(oneArticleData.comments)
        }
    }, [])
    return (
        <>
            <Col md={12} >
                <div className='comments-overflow'>
                    {Array.isArray(comments) &&
                        comments.map((comment, index) => {
                            return (
                                <div className='comment-container' key={index}>
                                    <span>{comment.user_email}</span>
                                    <span>
                                        <ReactStars
                                            count={5}
                                            size={25}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            color="#290656"
                                            activeColor="#B794F6"
                                            edit={false}
                                            value={comment.rating}
                                        />
                                    </span>
                                    <span>{comment.comment}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </Col>
        </>
    );
};

export default Comment;