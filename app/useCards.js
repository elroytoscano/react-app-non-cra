import cardArray from './cardArray';
import { useState, useEffect, useCallback } from 'react';

const useCards = () => {
  const [firstCard, setFirstCard] = useState({});
  const [secondCard, setSecondCard] = useState({});
  const [cards, setCards] = useState([]);

  const randomize = useCallback(() =>
    cardArray.sort(() => Math.random() - 0.7)
  );

  useEffect(() => {
    randomize();
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
          setFirstCard(firstCard);
          // const firstTemp = { ...firstCard, flipped: false };
          // setFirstCard(firstTemp);
          secondCard.flipped = false;
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
      // setFirstCard({ ...firstCard, flipped: false });
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
    setFirstCard({});
    setSecondCard({});
    cards.forEach((card) => {
      if (card.flipped) card.flipped = false;
    });
    randomize();
  };

  return { resetGrid, cardClick, cards };
};

export default useCards;
