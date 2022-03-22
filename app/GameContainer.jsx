import React from 'react';

import Card from './Card';
import useCards from './useCards';

const GameContainer = () => {
  const { cardClick, cards, resetGrid } = useCards();
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
