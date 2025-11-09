import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Task Manager
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
              className="text-gray-700 hover:text-gray-900"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            The Smart Way to Manage Tasks
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Organize Your Life,
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              One Task at a Time
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Stay focused, organized, and productive with our intuitive task management platform. 
            Transform the way you work and achieve your goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              className="w-full sm:w-auto h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all"
            >
              Start Free Today
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button
              onClick={() => navigate('/login')}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 px-8 text-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              Sign In
            </Button>
          </div>

          <p className="text-sm text-gray-500 pt-2">
            ✨ No credit card required • Free forever • Get started in seconds
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 hover:shadow-xl transition-all border-0 bg-white/80 backdrop-blur">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Organization</h3>
            <p className="text-gray-600 leading-relaxed">
              Create, organize, and categorize tasks with ease. Filter by status, search, and keep everything in perfect order.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-all border-0 bg-white/80 backdrop-blur">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Never Miss a Deadline</h3>
            <p className="text-gray-600 leading-relaxed">
              Set due dates, track progress, and stay on top of your commitments. Get your work done on time, every time.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-all border-0 bg-white/80 backdrop-blur">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Track Your Progress</h3>
            <p className="text-gray-600 leading-relaxed">
              Visualize your productivity with intuitive stats and insights. Watch your accomplishments grow day by day.
            </p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Fast
              </div>
              <div className="text-gray-600 font-medium">Lightning Speed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Secure
              </div>
              <div className="text-gray-600 font-medium">Your Data Protected</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Simple
              </div>
              <div className="text-gray-600 font-medium">Easy to Use</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Free
              </div>
              <div className="text-gray-600 font-medium">Forever Plan</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 md:p-16 text-center bg-gradient-to-br from-blue-600 to-indigo-600 border-0 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Get Organized?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of productive people who trust Task Manager to keep their work and life on track.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate('/register')}
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-xl"
              >
                Create Free Account
              </Button>
              <Button
                onClick={() => navigate('/login')}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-lg border-2 border-white text-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p className="mb-2">© 2025 Task Manager. All rights reserved.</p>
          <p className="text-sm">Built with ❤️ for productivity enthusiasts</p>
        </div>
      </footer>
    </div>
  );
}
