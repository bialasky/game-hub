"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Button } from "@/components/ui/button";

const words: string[] = [
  "white",
  "snow",
  "ivory",
  "pearl",
  "alabaster",
  "chalk",
  "milk",
  "cream",
  "eggshell",
  "vanilla",
  "frost",
  "cloud",
  "cotton",
  "linen",
  "porcelain",
  "bleached",
  "pale",
  "fair",
  "blank",
  "pure",
  "clean",
  "bright",
  "light",
  "whitewash",
  "flour",
  "silver",
  "moonlight",
];

interface Stats {
  grossWPM: number;
  netWPM: number;
  accuracy: number;
}

const useTypingGame = (initialText: string) => {
  const [text, setText] = useState(initialText);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [stats, setStats] = useState<Stats>({
    grossWPM: 0,
    netWPM: 0,
    accuracy: 0,
  });

  const calculateWPM = useCallback(
    (
      text: string,
      input: string,
      startTime: number,
      endTime: number
    ): Stats => {
      const timeInMinutes = (endTime - startTime) / 60000;
      let correctChars = 0;
      const totalChars = input.length;

      for (let i = 0; i < Math.min(text.length, input.length); i++) {
        if (text[i] === input[i]) {
          correctChars++;
        }
      }

      const grossWPM = Math.round(totalChars / 5 / timeInMinutes);
      const netWPM = Math.round(correctChars / 5 / timeInMinutes);
      const accuracy =
        totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

      return { grossWPM, netWPM, accuracy };
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[0-9]/g, "");

      if (!isGameStarted) {
        setIsGameStarted(true);
        setStartTime(Date.now());
      }

      setInput(value);
      setCurrentIndex(value.length);

      if (value.length === text.length) {
        const end = Date.now();
        setEndTime(end);

        const calculatedStats = calculateWPM(text, value, startTime!, end);
        setStats(calculatedStats);
      }
    },
    [isGameStarted, text, startTime, calculateWPM]
  );

  const resetGame = useCallback(() => {
    setText(generateText());
    setInput("");
    setStartTime(null);
    setEndTime(null);
    setCurrentIndex(0);
    setIsGameStarted(false);
    setStats({ grossWPM: 0, netWPM: 0, accuracy: 0 });
  }, []);

  return {
    text,
    input,
    startTime,
    endTime,
    currentIndex,
    isGameStarted,
    stats,
    handleInputChange,
    resetGame,
  };
};

const generateText = () => {
  return words
    .sort(() => 0.5 - Math.random())
    .slice(0, 50)
    .join(" ");
};

export default function TypingGame() {
  const initialText = useMemo(() => generateText(), []);
  const {
    text,
    input,
    startTime,
    endTime,
    currentIndex,
    isGameStarted,
    stats,
    handleInputChange,
    resetGame,
  } = useTypingGame(initialText);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isGameStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGameStarted]);

  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("click", handleClick);
    }

    return () => {
      if (container) {
        container.removeEventListener("click", handleClick);
      }
    };
  }, []);

  const renderText = useCallback(() => {
    return text.split("").map((char, index) => {
      let className = "text-2xl font-mono ";
      if (index < currentIndex) {
        className += input[index] === char ? "text-white" : "text-red-500";
      } else if (index === currentIndex) {
        className += "bg-white text-gray-500 animate-background-blink-sharp";
      } else {
        className += "text-gray-500";
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  }, [text, currentIndex, input]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 font-mono">
          Bialasky typer
        </h1>
        {endTime && startTime ? (
          <div className="text-center">
            <p>Congratulations! You&apos;ve finished typing all the text.</p>
            <p className="text-2xl font-bold">
              Your net typing speed: {stats.netWPM} WPM
            </p>
            <p className="">Your gross typing speed: {stats.grossWPM} WPM</p>
            <p>Your accuracy: {stats.accuracy}%</p>
            <p>
              Your time was: {((endTime - startTime) / 1000).toFixed(2)} seconds
            </p>
            <Button onClick={resetGame} className="mt-4">
              Play Again
            </Button>
          </div>
        ) : (
          <>
            <div
              ref={containerRef}
              className="mb-4 h-40 overflow-y-auto bg-gray-700 p-4 rounded cursor-text"
              role="textbox"
              aria-label="Text to type"
            >
              {renderText()}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="w-0 h-0 opacity-0 absolute"
              aria-label="Type the text above"
            />
            <div className="text-sm text-gray-400 mt-4 text-center">
              {isGameStarted ? (
                <button
                  onClick={resetGame}
                  className="text-white font-bold uppercase"
                >
                  Reset
                </button>
              ) : (
                "Start typing to begin the game. The timer will start when you type your first character."
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
