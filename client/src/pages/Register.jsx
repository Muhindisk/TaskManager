import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

export default function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await register(formData.name, formData.email, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Intro Section */}
        <div className="hidden md:block space-y-6 text-center md:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg mb-4">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Join Us Today
            </h1>
            <p className="text-xl text-gray-600 max-w-md">
              Start your journey to better productivity. Create your free account and experience seamless task management.
            </p>
          </div>
          
          <div className="space-y-4 pt-8">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Get Started Instantly</h3>
                <p className="text-sm text-gray-600">No credit card required, free forever</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure & Private</h3>
                <p className="text-sm text-gray-600">Your data is encrypted and protected</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Easy to Use</h3>
                <p className="text-sm text-gray-600">Intuitive interface, no learning curve</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Card */}
        <Card className="w-full shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <div className="md:hidden text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg mb-3">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Task Manager
              </h1>
            </div>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-base">
              Sign up to get started with Task Manager and boost your productivity
            </CardDescription>
          </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              <p className="text-xs text-gray-500">Must be at least 6 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full h-11 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
            
            <div className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-purple-600 hover:text-purple-800 font-semibold hover:underline"
              >
                Sign in instead
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
      </div>
    </div>
  );
}
