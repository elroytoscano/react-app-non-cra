import lodash from 'lodash';
import { useState, useEffect, useCallback } from 'react';

import cardArray from './cardArray';

const useCards = () => {
  const randomize = useCallback(() =>
    cardArray.sort(() => Math.random() - 0.7)
  );

  const [firstCard, setFirstCard] = useState({});
  const [secondCard, setSecondCard] = useState({});
  const [cards, setCards] = useState((prev) => {
    if (!prev) {
      randomize();
      return cardArray;
    }
  });

  useEffect(() => {
    setCards((prev) =>
      prev.map((item) => {
        if (item.id === firstCard?.id) return firstCard;
        if (item.id === secondCard?.id) return secondCard;
        return item;
      })
    );
    if (
      Object.values(firstCard).length > 0 &&
      Object.values(secondCard).length > 0
    ) {
      if (firstCard.name === secondCard.name) {
        setFirstCard({});
        setSecondCard({});
      } else {
        setTimeout(() => {
          setFirstCard({});
          setSecondCard({});
          setCards((prev) =>
            prev.map((item) => {
              if (item.id === firstCard.id) return { ...item, flipped: false };
              if (item.id === secondCard.id) return { ...item, flipped: false };
              return item;
            })
          );
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  const cardClick = (card) => {
    if (Object.values(firstCard).length === 0) {
      setFirstCard({ ...lodash.cloneDeep(card), flipped: true });
    } else if (firstCard?.id === card.id) {
      setFirstCard({ ...firstCard, flipped: !firstCard.flipped });
      setFirstCard({});
    } else if (Object.values(secondCard).length === 0) {
      setSecondCard({
        ...lodash.cloneDeep(card),
        flipped: true,
      });
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
    setTimeout(() => {
      setCards(cardArray);
    }, 1000);
  };

  return { resetGrid, cardClick, cards };
};

export default useCards;
