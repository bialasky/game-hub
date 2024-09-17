"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/app/types";
import { shuffleCards, createInitialCards } from "@/app/utils";
import MemoryCard from "@/components/MemoryCard";

function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);

  const startNewGame = () => {
    const newCards = createInitialCards();
    setCards(shuffleCards(newCards));
    setFlippedIndexes([]);
  };

  const handleCardClick = (clickedIndex: number) => {
    if (flippedIndexes.length === 2) {
      // If two cards are already flipped, do nothing
      return;
    }

    if (flippedIndexes.includes(clickedIndex)) {
      // If the clicked card is already flipped, do nothing
      return;
    }

    const newFlippedIndexes = [...flippedIndexes, clickedIndex];
    setFlippedIndexes(newFlippedIndexes);

    if (newFlippedIndexes.length === 2) {
      // Check for a match
      const [firstIndex, secondIndex] = newFlippedIndexes;
      if (cards[firstIndex].content === cards[secondIndex].content) {
        // It's a match! Keep the cards flipped
        setCards(
          cards.map((card, index) =>
            index === firstIndex || index === secondIndex
              ? { ...card, isFlipped: true }
              : card
          )
        );
        setFlippedIndexes([]);
      } else {
        // Not a match, flip them back after a delay
        setTimeout(() => {
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold text-center mb-8">
        Memory Card Matching
      </h1>
      <button
        onClick={startNewGame}
        className="block mx-auto mb-8 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        New Game
      </button>
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {cards.map((card, index) => (
          <MemoryCard
            key={card.id}
            card={card}
            isFlipped={card.isFlipped || flippedIndexes.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
