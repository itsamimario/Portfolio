import { CaseStudies } from "@/components/CaseStudies";
import { caseStudies } from "@/data/caseStudies";

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gray-900 font-pixel">
            Mario Bennekers
          </h1>
          <h2 className="text-4xl md:text-5xl text-gray-600 mb-6 font-pixel">
            Product Manager & Technical Builder
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl leading-relaxed">
            I combine strategic product thinking with hands-on technical execution
            to build products that scale and teams that thrive.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
              💬 Talk to my AI assistant
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors font-medium">
              📊 View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-pixel font-bold mb-8 text-gray-900">
            About
          </h2>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            I&apos;m a Product Manager based in Madrid with 6+ years leading cross-functional
            teams and shipping impactful digital products. I bridge strategy, design, and
            engineering to turn complex problems into elegant solutions.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Background</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3">🎓</span>
                  <span><strong>Background:</strong> Civil Engineering → Product Management</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">🌍</span>
                  <span><strong>Experience:</strong> 3 continents (Europe, Asia, South America)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">💼</span>
                  <span><strong>Current:</strong> Founder & CEO at CatchIT!, building location-based gaming experiences</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">🗣️</span>
                  <span><strong>Languages:</strong> Spanish, English, Dutch</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">What I do</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Define product vision and roadmaps aligned with business goals</li>
                <li>• Lead discovery and validation through user research and data analysis</li>
                <li>• Ship features iteratively with cross-functional teams</li>
                <li>• Build design systems and implement front-end solutions</li>
                <li>• Integrate AI and automation to enhance product capabilities</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Key strengths</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                Strategic product thinking with technical depth
              </div>
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                Data-informed decision making
              </div>
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                Building and scaling teams (2 → 30+ people)
              </div>
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                Combining PM leadership with hands-on technical skills
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
            Skills & Expertise
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Product Management</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Product Strategy & Roadmapping</li>
                <li>• Product Discovery & Validation</li>
                <li>• User Research & Analytics</li>
                <li>• Agile/Scrum Leadership</li>
                <li>• Cross-functional Team Management</li>
                <li>• OKRs & Metrics Definition</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Technical Skills</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-medium mb-1">Frontend</p>
                  <p className="text-sm">React, TypeScript, Next.js, Tailwind CSS</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Backend</p>
                  <p className="text-sm">Node.js, Python, PostgreSQL</p>
                </div>
                <div>
                  <p className="font-medium mb-1">AI/ML</p>
                  <p className="text-sm">Claude API, RAG systems, vector databases</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Design</p>
                  <p className="text-sm">Figma, Design Systems, Prototyping</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Tools</p>
                  <p className="text-sm">Jira, Notion, Linear, Google Analytics, Amplitude</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Languages</h3>
            <div className="flex gap-4 flex-wrap">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
                Spanish (Native)
              </span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
                English (Fluent)
              </span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
                Dutch (Fluent)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <CaseStudies caseStudies={caseStudies} />

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-gray-600">
            <p>© 2026 Mario Bennekers</p>
            <p className="text-sm mt-2">Built with Next.js, TypeScript, and PostgreSQL</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
