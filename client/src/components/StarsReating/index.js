import ReactStars from "react-rating-stars-component";
import React from "react";
// import { render } from "react-dom";

const StarsReating = (props) => {
    return (
        <ReactStars
        count={5}
        value={props.stars}
        size={24}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        color="#290656"
        activeColor="#B794F6"
        edit={false}/>
    );
};

export default StarsReating; 

 
