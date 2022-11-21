import React from 'react'
import './modal.scss'
import CloseButton from 'react-bootstrap/CloseButton';
const Modal = (props) => {
    
  return (props.trigger) ? (
    <div className='overlay'>
        <div className='modalContainer' style={{height:`${props.height}%`, width:`${props.width}%`}}>
            <div onClick={() => props.setTrigger(false)} className='closeBtn'><CloseButton/></div>
            {props.children}
        </div>
    </div>
  ) : "";
}

export default Modal;