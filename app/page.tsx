import Link from "next/link";

const games = [
  {
    name: "Memory Card Matching",
    href: "/games/memory-card-matching",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Typing Speed",
    href: "/games/typeracer",
    color: "from-green-500 to-teal-500",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-10 pixel-font">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Bialasky Hub
          </span>
        </h1>

        <p className="text-center text-xl sm:text-2xl lg:text-3xl mb-12 pixel-font">
          Choose your pixelated adventure!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {games.map((game) => (
            <Link
              key={game.name}
              href={game.href}
              className={`block p-6 bg-gradient-to-r ${game.color} rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div className="pixel-border p-4 bg-gray-800 bg-opacity-75">
                <h2 className="text-2xl font-bold mb-2 pixel-font">
                  {game.name}
                </h2>
                <p className="text-sm pixel-font">Click to play!</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
