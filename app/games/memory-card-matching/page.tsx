import MemoryGame from "../../../components/MemoryGame";

export const metadata = {
  title: "Memory Card Matching",
};

export default function MemoryCardMatchingGame() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <MemoryGame />
    </div>
  );
}
