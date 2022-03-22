import React, { useState, useEffect } from 'react';

import Card from './Card';
import cardArray from './cardArray';

const GameContainer = () => {
  const [firstCard, setFirstCard] = useState({});
  const [secondCard, setSecondCard] = useState({});
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
        setFirstCard({});
        setSecondCard({});
      } else {
        setTimeout(() => {
          firstCard.flipped = false;
          secondCard.flipped = false;
          setFirstCard(firstCard);
          setSecondCard(secondCard);
          setFirstCard({});
          setSecondCard({});
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  const cardClick = (card) => {
    if (Object.values(firstCard).length === 0) {
      card.flipped = true;
      setFirstCard(card);
    } else if (firstCard?.id === card.id) {
      firstCard.flipped = false;
      setFirstCard(firstCard);
      setFirstCard({});
    } else if (
      Object.values(firstCard).length > 0 &&
      Object.values(secondCard).length === 0
    ) {
      card.flipped = true;
      setSecondCard(card);
    } else if (
      Object.values(firstCard).length > 0 &&
      Object.values(secondCard).length > 0
    ) {
      return;
    }
  };

  const resetGrid = () => {
    cards.forEach((card) => {
      if (card.flipped) card.flipped = false;
    });
    setCards([]);
    randomize();
    setFirstCard({});
    setSecondCard({});
    setCards(cards);
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
            resetGrid();
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default GameContainer;
