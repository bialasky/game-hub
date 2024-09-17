import React from "react";
import { Card } from "@/app/types";

interface MemoryCardProps {
  card: Card;
  isFlipped: boolean;
  onClick: () => void;
}

function MemoryCard({ card, isFlipped, onClick }: MemoryCardProps) {
  return (
    <div
      className={`bg-gray-800 p-4 rounded-lg flex items-center justify-center text-8xl cursor-pointer transition-all duration-300 ${
        isFlipped ? "bg-blue-500" : ""
      }`}
      onClick={onClick}
    >
      {isFlipped ? (
        <div className="flip-card-back">
          <span>{card.content}</span>
        </div>
      ) : (
        <div className="flip-card-front">?</div>
      )}
    </div>
  );
}

export default MemoryCard;
