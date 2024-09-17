// /games/typeracer/page.tsx or page.server.tsx
import { generateText } from "@/app/utils";
import TypingGame from "../../../components/TypingGame";

export default function TypeRacerPage() {
  const initialText = generateText();
  return <TypingGame initialText={initialText} />;
}
