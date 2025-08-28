import UrlShortener from '../components/UrlShortener';
import UrlStats from '../components/UrlStats';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl mb-8 shadow-2xl animate-bounce-slow">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 animate-slide-up">
            🔗 URL Shortener
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-slide-up-delay">
            Transform long URLs into beautiful, shareable links instantly. 
            Track clicks and manage your shortened URLs with our powerful analytics dashboard.
          </p>

          {/* Feature highlights */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-slide-up-delay-2">
            {[
              { icon: "⚡", text: "Lightning Fast" },
              { icon: "🔒", text: "Secure & Reliable" },
              { icon: "📊", text: "Analytics Dashboard" },
              { icon: "🎨", text: "Beautiful Design" }
            ].map((feature, index) => (
              <div
                key={feature.text}
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/50 shadow-lg animate-fade-in"
                style={{ animationDelay: `${1000 + index * 100}ms` }}
              >
                <span className="text-lg">{feature.icon}</span>
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Main content */}
        <main className="space-y-16">
          <UrlShortener />
          <UrlStats />
        </main>

        {/* Footer */}
        <footer className="mt-24 text-center animate-fade-in-delay">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-white/50 shadow-lg">
            <span className="text-gray-600">Built with</span>
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-semibold">Next.js</span>
              <span className="text-gray-400">•</span>
              <span className="text-blue-600 font-semibold">TypeScript</span>
              <span className="text-gray-400">•</span>
              <span className="text-blue-600 font-semibold">Tailwind CSS</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
