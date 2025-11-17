import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">MatchPredictor</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/signin"
                className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <span className="text-sm font-medium text-blue-400">College Football Predictions</span>
          </div>

          <h2 className="mb-6 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Predict the Outcome of{" "}
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Every Game
            </span>
          </h2>

          <p className="mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl">
            Predict college football game scores with confidence. Use data-driven insights and analytics
            to make accurate predictions and track your success throughout the season.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
            >
              Get Started Free
            </Link>
            <Link
              href="/signin"
              className="rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid gap-8 py-20 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">Advanced Analytics</h3>
            <p className="text-slate-400">
              Get detailed statistics and insights powered by machine learning algorithms to make informed predictions.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">Score Predictions</h3>
            <p className="text-slate-400">
              Predict exact scores for every game. Get points based on prediction accuracy and see how close you are to the actual outcomes.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">Track Your Accuracy</h3>
            <p className="text-slate-400">
              Monitor your prediction history and accuracy rate over time with comprehensive performance metrics.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-400">
            &copy; 2025 MatchPredictor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
