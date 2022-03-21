import { useState } from 'react';

const useCards = () => {
  const [flip, setFlip] = useState(false);
  const flippedCards = [];
  let firstCard, secondCard;
  let hasFlippedCards = false;

  const cardClick = (id, name) => {
    if (!firstCard) {
      firstCard = { id, name };
      hasFlippedCards = true;
      return;
    }
    secondCard = { id, name };
    if (hasFlippedCards) {
      if (firstCard.name === secondCard.name) {
        console.log('match');
      } else {
        console.log('unmatch');
      }
    }
  };

  const flipCard = () => setFlip(!flip);

  return { cardClick, flipCard };
};

export default useCards;
