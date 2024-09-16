// /games/typeracer/page.tsx or page.server.tsx
import { generateText } from "./utils";
import TypingGame from "./TypingGame";

export default function TypeRacerPage() {
  const initialText = generateText();
  return <TypingGame initialText={initialText} />;
}
