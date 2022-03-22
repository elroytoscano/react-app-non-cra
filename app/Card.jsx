import React from 'react';

const Card = ({ color, name, flipped, onCardClick }) => {
  if (flipped) {
    console.log(`card name:${name}, flip status:${flipped}`);
  }

  return (
    <div className={`card ${flipped ? 'flip' : ''}`} onClick={onCardClick}>
      <div
        className='front'
        name={name}
        style={{ backgroundColor: color }}
      ></div>
      <div className='back'></div>
    </div>
  );
};

export default Card;
