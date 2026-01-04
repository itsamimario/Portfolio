export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Mario Bennekers
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-600 mb-6">
            Product Manager & Technical Builder
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl">
            I combine strategic product thinking with hands-on technical execution
            to build products that scale and teams that thrive.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
              💬 Talk to my AI assistant
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              📊 View Case Studies
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
