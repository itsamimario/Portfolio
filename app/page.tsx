import Link from "next/link";
import TerminalText from "@/components/TerminalText";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-end justify-center px-4 pb-16">
      <div className="max-w-3xl w-full">
        {/* Terminal-style intro text */}
        <div className="mb-12">
          <TerminalText />
        </div>

        {/* Chat input area */}
        <div className="space-y-6">
          <input
            type="text"
            placeholder="write anything here"
            className="w-full px-0 py-2 bg-transparent text-gray-400 font-pixel text-2xl md:text-3xl placeholder-gray-400 focus:outline-none"
            disabled
          />

          <div className="flex justify-center">
            <Link href="/about">
              <button className="px-8 py-4 bg-black text-white font-pixel text-lg hover:bg-gray-800 transition-colors">
                Learn More About Me
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
