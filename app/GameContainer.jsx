import React, { useState, useEffect } from 'react';

import Card from './Card';
import cardArray from './cardArray';

const GameContainer = () => {
  const [firstCard, setFirstCard] = useState({});
  const [secondCard, setSecondCard] = useState({});
  let hasFlippedCards = false;
  const [cards, setCards] = useState([]);

  const randomize = () => cardArray.sort(() => Math.random() - 0.7);

  useEffect(() => {
    randomize();
    setCards(cardArray);
  }, []);

  useEffect(() => {
    setCards(cardArray);
  }, [randomize]);

  useEffect(() => {
    if (
      Object.values(firstCard).length > 0 &&
      Object.values(secondCard).length > 0
    ) {
      if (firstCard?.name === secondCard?.name) {
        console.log('match');
      } else {
        console.log('unmatchs');
      }
    } else {
    }
  }, [firstCard, secondCard]);

  const cardClick = (card) => {
    if (Object.values(firstCard).length === 0) {
      card.flipped = true;
      setFirstCard({ ...card });
      hasFlippedCards = true;
      return;
    } else {
      card.flipped = true;
      setSecondCard({ ...card });
    }
  };

  return (
    <>
      <div className='container'>
        {cards.length > 0 &&
          cards.map((card) => {
            return (
              <Card
                key={card.id}
                {...card}
                onCardClick={() => {
                  cardClick(card);
                }}
              />
            );
          })}
      </div>
      <div style={{ textAlign: 'center' }}>
        <button
          className='reset'
          onClick={() => {
            setCards([]);
            resetGrid();
            randomize();
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default GameContainer;
