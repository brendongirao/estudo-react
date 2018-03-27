import React from 'react';
import './CardItem.css';

const carditem = (props) => {
    return (
        <div className = "CardItem">
            <span>{props.title}</span>
        </div>
    )
}

export default carditem;