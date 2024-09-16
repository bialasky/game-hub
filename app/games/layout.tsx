import Link from "next/link";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between align-center">
          <Link
            className="text-xl text-blue-400 hover:text-blue-300 font-bold"
            href="/"
          >
            Games Hub
          </Link>
          <Link className="text-blue-400 hover:text-blue-300" href="/">
            Back to Home
          </Link>
        </div>
      </nav>

      <main className="flex-grow container mx-auto">{children}</main>
    </div>
  );
}
