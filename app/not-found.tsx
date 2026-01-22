/**
 * Custom 404 page
 * Fun pixel-art styled error page
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Pixel art 404 */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-pixel text-black mb-2">404</div>
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-black"
                style={{
                  opacity: i < 4 || i > 5 ? 1 : 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-pixel mb-4">
          Page Not Found
        </h1>
        <p className="font-pixel text-gray-600 mb-8 leading-relaxed">
          Looks like you wandered off the map.
          <br />
          This page doesn&apos;t exist (yet).
        </p>

        {/* Terminal-style hint */}
        <div className="bg-gray-50 border border-gray-200 p-4 mb-8 text-left font-pixel text-sm">
          <div className="text-gray-500 mb-2">$ where_am_i</div>
          <div className="text-red-600 mb-2">Error: Location unknown</div>
          <div className="text-gray-500">$ suggested_routes</div>
          <div className="text-gray-700">
            <span className="text-blue-600">/</span> home
            <br />
            <span className="text-blue-600">/about</span> learn more
            <br />
            <span className="text-blue-600">/case-studies</span> see my work
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-pixel hover:bg-gray-800 transition-colors"
          >
            ← Back to Home
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-6 py-3 border border-black text-black font-pixel hover:bg-gray-100 transition-colors"
          >
            View About
          </Link>
        </div>
      </div>
    </main>
  );
}
