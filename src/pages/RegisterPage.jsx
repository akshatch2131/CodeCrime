import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex font-body-md overflow-hidden antialiased selection:bg-primary-container selection:text-background">
      <div className="flex w-full h-screen">
        {/* Left Side: Investigation Themed Area */}
        <div className="hidden lg:flex flex-col w-1/2 relative bg-void border-r border-white/10 p-xl overflow-hidden bg-grid">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-container/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary/5 rounded-full blur-[100px]"></div>
          </div>

          {/* Header / Brand */}
          <div className="relative z-10 flex items-center gap-sm mb-auto">
            <span className="material-symbols-outlined text-primary font-headline-lg fill" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
            <span className="font-headline-md text-headline-md text-primary tracking-tight">CodeCrime</span>
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 my-auto flex flex-col gap-lg max-w-lg">
            <div className="glass-panel p-md rounded-xl inline-block w-max mb-md">
              <span className="font-label-caps text-label-caps text-tertiary flex items-center gap-base">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                SYSTEM ACTIVE // REGISTRATION
              </span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-white leading-tight">
              Become the Detective <br />
              <span className="text-primary-container">Every Bug Fears.</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              Join the premier forensic environment for developers. Track anomalies, solve critical issues, and rank up in your investigative career.
            </p>

            {/* Mock Terminal Window */}
            <div className="mt-xl glass-panel rounded-lg overflow-hidden border border-white/10 shadow-2xl">
              <div className="bg-surface-container-high px-md py-sm border-b border-white/5 flex items-center gap-xs">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-error/70"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-container/70"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-tertiary/70"></div>
                </div>
                <span className="ml-sm font-code-sm text-code-sm text-on-surface-variant/50">auth_init.sh</span>
              </div>
              <div className="p-md font-code-sm text-code-sm text-on-surface-variant space-y-sm bg-surface-container-lowest">
                <div className="flex"><span className="text-primary-container mr-sm">$</span><span>Establishing secure connection...</span></div>
                <div className="flex"><span className="text-primary-container mr-sm">$</span><span className="text-tertiary">Connected.</span></div>
                <div className="flex">
                  <span className="text-primary-container mr-sm">$</span>
                  <span>Awaiting detective credentials...</span>
                  <span className="w-1.5 h-3 bg-white/50 ml-1 animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Area */}
          <div className="relative z-10 mt-auto flex items-center justify-between text-on-surface-variant/50 font-code-sm text-code-sm">
            <span>V 2.4.1 (Stable)</span>
            <span>Encrypted Channel</span>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full lg:w-1/2 flex flex-col bg-surface overflow-y-auto">
          <div className="flex-1 flex flex-col justify-center px-lg py-xl sm:px-xl lg:px-24 max-w-2xl mx-auto w-full">
            {/* Mobile Logo */}
            <div className="flex lg:hidden items-center gap-sm mb-xl">
              <span className="material-symbols-outlined text-primary font-headline-md fill" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
              <span className="font-headline-md text-headline-md text-primary tracking-tight">CodeCrime</span>
            </div>

            <div className="mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-white mb-xs">Start your case</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Open a new file and begin tracking your first bug.</p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-sm mb-lg">
              <button className="w-full flex justify-center items-center gap-md px-md py-sm rounded-lg border border-white/10 bg-surface-container-low hover:bg-surface-variant transition-colors duration-200 text-on-surface font-body-md text-body-md font-semibold glow-hover" type="button">
                <svg className="w-5 h-5 opacity-80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-md mb-lg">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-md text-on-surface-variant font-code-sm text-code-sm uppercase tracking-widest">
                Or manually enter credentials
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Registration Form */}
            <form className="space-y-md" onSubmit={handleSubmit}>
              <div className="space-y-base">
                <label className="block font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider" htmlFor="fullName">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-sm pointer-events-none">
                    <span className="material-symbols-outlined text-on-surface-variant/50 text-xl">badge</span>
                  </span>
                  <input className="form-input block w-full pl-xl pr-sm py-sm bg-void border border-white/10 rounded-lg text-on-surface placeholder-on-surface-variant/30 focus:border-primary-container focus:ring-0 transition-all duration-200 font-body-md text-body-md" id="fullName" placeholder="Detective Name" type="text" />
                </div>
              </div>

              <div className="space-y-base">
                <label className="block font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider" htmlFor="regEmail">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-sm pointer-events-none">
                    <span className="material-symbols-outlined text-on-surface-variant/50 text-xl">mail</span>
                  </span>
                  <input className="form-input block w-full pl-xl pr-sm py-sm bg-void border border-white/10 rounded-lg text-on-surface placeholder-on-surface-variant/30 focus:border-primary-container focus:ring-0 transition-all duration-200 font-body-md text-body-md" id="regEmail" placeholder="name@agency.com" type="email" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                <div className="space-y-base">
                  <label className="block font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider" htmlFor="regPassword">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-sm pointer-events-none">
                      <span className="material-symbols-outlined text-on-surface-variant/50 text-xl">key</span>
                    </span>
                    <input className="form-input block w-full pl-xl pr-sm py-sm bg-void border border-white/10 rounded-lg text-on-surface placeholder-on-surface-variant/30 focus:border-primary-container focus:ring-0 transition-all duration-200 font-body-md text-body-md" id="regPassword" placeholder="••••••••" type="password" />
                  </div>
                </div>
                <div className="space-y-base">
                  <label className="block font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider" htmlFor="confirmPassword">Confirm</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-sm pointer-events-none">
                      <span className="material-symbols-outlined text-on-surface-variant/50 text-xl">lock_reset</span>
                    </span>
                    <input className="form-input block w-full pl-xl pr-sm py-sm bg-void border border-white/10 rounded-lg text-on-surface placeholder-on-surface-variant/30 focus:border-primary-container focus:ring-0 transition-all duration-200 font-body-md text-body-md" id="confirmPassword" placeholder="••••••••" type="password" />
                  </div>
                </div>
              </div>

              <div className="pt-sm">
                <button className="w-full flex justify-center items-center py-sm px-md border border-transparent rounded-lg shadow-sm font-headline-md text-body-lg uppercase tracking-wide bg-primary-container text-background hover:bg-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container focus:ring-offset-background" type="submit">
                  Create Account
                  <span className="material-symbols-outlined ml-xs">arrow_forward</span>
                </button>
              </div>
            </form>

            <p className="mt-xl text-center font-body-md text-body-md text-on-surface-variant">
              Already have a badge?{' '}
              <Link className="font-semibold text-primary-container hover:text-primary transition-colors" to="/login">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
