import Link from "next/link";
import TerminalText from "@/components/TerminalText";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        {/* Terminal-style intro text */}
        <div className="mb-12">
          <TerminalText />
        </div>

        {/* Chat input area */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="write anything here"
            className="w-full px-6 py-4 border-2 border-black text-black font-pixel text-lg focus:outline-none focus:ring-2 focus:ring-black"
            disabled
          />

          <Link href="/about">
            <button className="w-full px-6 py-4 bg-black text-white font-pixel text-lg hover:bg-gray-800 transition-colors">
              Learn More About Me
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
