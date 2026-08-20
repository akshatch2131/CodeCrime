import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden font-body-md text-body-md">
      {/* Left Side: Dark Panel */}
      <div className="hidden md:flex md:w-1/2 bg-surface-container-low border-r border-white/10 flex-col justify-center items-start p-xl relative overflow-hidden">
        {/* Background Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-50 z-0"></div>
        {/* Glow Effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>

        <div className="z-10 w-full max-w-md mx-auto">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-lg tracking-tight">
            Crack every case. Debug every mystery.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl leading-relaxed">
            Access your specialized investigation terminal. Review critical bugs, analyze code blocks, and close out open leads. The truth is in the code.
          </p>

          {/* Code snippet decoration */}
          <div className="bg-surface border border-white/10 rounded-lg p-md font-code-sm text-code-sm text-on-surface-variant w-full relative overflow-hidden">
            <div className="flex items-center gap-2 mb-sm border-b border-white/10 pb-sm">
              <span className="w-3 h-3 rounded-full bg-error/50"></span>
              <span className="w-3 h-3 rounded-full bg-surface-tint/50"></span>
              <span className="w-3 h-3 rounded-full bg-tertiary/50"></span>
              <span className="ml-2 text-on-secondary-container opacity-70">terminal.js</span>
            </div>
            <pre className="overflow-x-auto"><code>
              <span className="text-primary-container">function</span>{' '}
              <span className="text-tertiary-container">analyzeLead</span>(evidence) {'{\n'}
              {'  '}<span className="text-primary-container">if</span> (!evidence){' '}
              <span className="text-primary-container">throw new</span>{' '}
              <span className="text-error">Error</span>(<span className="text-surface-tint">'No clue found'</span>);{'\n'}
              {'  '}<span className="text-on-surface-variant opacity-50">{'// Initiating deep scan...'}</span>{'\n'}
              {'  '}<span className="text-primary-container">return</span> evidence.
              <span className="text-tertiary-container">resolve</span>();{'\n'}
              {'}'}
            </code></pre>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 bg-surface-container flex items-center justify-center p-lg relative">
        <div className="w-full max-w-sm">
          <div className="mb-xl text-center md:text-left">
            <span className="material-symbols-outlined text-primary text-4xl mb-sm inline-block">terminal</span>
            <h2 className="font-headline-md text-headline-md text-on-background mb-xs">Welcome back, Detective</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Enter your credentials to access the system.</p>
          </div>

          <form className="space-y-md" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50">mail</span>
                <input
                  className="w-full bg-background border border-white/10 rounded py-sm pl-10 pr-md font-body-md text-on-background focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none transition-colors"
                  id="email"
                  placeholder="detective@codecrime.com"
                  type="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs flex justify-between" htmlFor="password">
                <span>Password</span>
                <a className="text-primary-container hover:underline cursor-pointer">Forgot?</a>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50">lock</span>
                <input
                  className="w-full bg-background border border-white/10 rounded py-sm pl-10 pr-10 font-body-md text-on-background focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none transition-colors"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-background transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              className="w-full bg-primary-container text-void font-headline-sm text-headline-sm uppercase py-sm rounded glow-hover transition-all mt-lg font-bold"
              type="submit"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="mt-xl">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface-container font-label-caps text-label-caps text-on-surface-variant">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-md grid gap-sm">
              <button className="flex items-center justify-center gap-2 bg-background border border-white/10 rounded py-sm font-code-md text-code-md text-on-surface hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                Google
              </button>
            </div>
          </div>

          <p className="mt-xl text-center font-body-md text-body-md text-on-surface-variant">
            New to the force?{' '}
            <Link className="text-primary-container hover:underline font-bold" to="/register">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
