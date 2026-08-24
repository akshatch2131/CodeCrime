import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../config/supabase';

export default function InvestigationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activePanel, setActivePanel] = useState(null);
  const [activeFile, setActiveFile] = useState('workerA.go');

  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const togglePanel = (panel) => {
    setActivePanel((current) =>
      current === panel ? null : panel
    );
  };
  const handleSubmitFix = async () => {
  try {
    setSubmitting(true);
    setSubmitResult(null);

    // Get currently logged-in user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert('Please login first.');
      navigate('/login');
      return;
    }

    // Code submitted to backend
    const submittedCode = `
package main

import "sync"

func workerA(lockA *sync.Mutex, lockB *sync.Mutex) {
    lockA.Lock()
    defer lockA.Unlock()

    lockB.Lock()
    defer lockB.Unlock()

    println("Worker A finished")
}

func workerB(lockA *sync.Mutex, lockB *sync.Mutex) {
    lockB.Lock()
    defer lockB.Unlock()

    lockA.Lock()
    defer lockA.Unlock()

    println("Worker B finished")
}
`;

    const response = await fetch(
      'http://localhost:5000/api/submissions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id,
          case_id: id,
          submitted_code: submittedCode,
          explanation: 'Fixed the deadlock by correctly handling both locks.'
        })
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Submission failed');
    }

    setSubmitResult(result);

    // Move to resolution page after successful submission
    setTimeout(() => {
      navigate(`/resolution/${id}`, {
        state: {
          submissionResult: result
        }
      });
    }, 1000);

  } catch (error) {
    console.error('Submission error:', error);

    setSubmitResult({
      success: false,
      error: error.message
    });

  } finally {
    setSubmitting(false);
  }
};

  useEffect(() => {
    const fetchCase = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `http://localhost:5000/api/cases/${id}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch case');
        }

        const result = await response.json();

        if (!result.success || !result.case) {
          throw new Error('Case not found');
        }

        setCaseData(result.case);
      } catch (err) {
        console.error('Case fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  return (
    <div className="bg-background text-on-surface h-screen overflow-hidden flex flex-col font-body-md text-body-md">

      {/* ================= TOP NAVBAR ================= */}
      <nav className="flex justify-between items-center w-full px-xl h-16 sticky top-0 z-50 bg-background border-b border-white/10 shrink-0">

        <div className="flex items-center gap-md">
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
            CodeCrime
          </span>
        </div>

        <div className="flex items-center gap-md">

          <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95 flex items-center justify-center p-xs rounded-full">
            <span className="material-symbols-outlined">
              dark_mode
            </span>
          </button>

          <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95 flex items-center justify-center p-xs rounded-full">
            <span className="material-symbols-outlined">
              notifications
            </span>
          </button>

          <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95 flex items-center justify-center p-xs rounded-full">
            <span className="material-symbols-outlined">
              account_circle
            </span>
          </button>

        </div>
      </nav>


      <div className="flex flex-1 overflow-hidden">

        {/* ================= SIDE NAVBAR ================= */}
        <aside className="flex flex-col h-full p-md gap-sm bg-surface-container-low border-r border-white/10 w-64 shrink-0 hidden md:flex">

          <div className="flex items-center gap-sm mb-md p-xs">

            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden shrink-0 border border-white/10">
              <span className="material-symbols-outlined text-on-surface-variant">
                person
              </span>
            </div>

            <div className="flex flex-col overflow-hidden">
              <span className="font-headline-sm text-headline-sm truncate">
                Detective Vane
              </span>

              <span className="font-code-sm text-code-sm text-on-surface-variant truncate">
                Senior P.I. • 2,450 XP
              </span>
            </div>

          </div>


          <button className="w-full bg-primary-container text-on-primary-container font-headline-md text-headline-md font-bold py-xs rounded mb-md hover:bg-primary-fixed transition-colors">
            New Investigation
          </button>


          <nav className="flex-1 flex flex-col gap-xs">

            <Link
              to="/dashboard"
              className="flex items-center gap-sm px-sm py-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200 group"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                dashboard
              </span>

              <span className="font-body-md text-body-md">
                Dashboard
              </span>
            </Link>


            <a
              className="flex items-center gap-sm px-sm py-xs rounded-lg text-primary font-bold bg-secondary-container/20"
              href="#"
            >
              <span
                className="material-symbols-outlined fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                folder_open
              </span>

              <span className="font-body-md text-body-md">
                Active Cases
              </span>
            </a>


            <Link
              to="/cases"
              className="flex items-center gap-sm px-sm py-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200 group"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                inventory_2
              </span>

              <span className="font-body-md text-body-md">
                Evidence Locker
              </span>
            </Link>


            <a
              className="flex items-center gap-sm px-sm py-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200 group"
              href="#"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                archive
              </span>

              <span className="font-body-md text-body-md">
                Cold Cases
              </span>
            </a>


            <a
              className="flex items-center gap-sm px-sm py-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200 group"
              href="#"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                groups
              </span>

              <span className="font-body-md text-body-md">
                Personnel
              </span>
            </a>

          </nav>


          <div className="mt-auto flex flex-col gap-xs pt-md border-t border-white/10">

            <a
              className="flex items-center gap-sm px-sm py-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200"
              href="#"
            >
              <span className="material-symbols-outlined">
                settings
              </span>

              <span className="font-body-md text-body-md">
                Settings
              </span>
            </a>


            <Link
              to="/login"
              className="flex items-center gap-sm px-sm py-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200"
            >
              <span className="material-symbols-outlined">
                logout
              </span>

              <span className="font-body-md text-body-md">
                Logout
              </span>
            </Link>

          </div>

        </aside>


        {/* ================= MAIN WORKSPACE ================= */}
        <main className="flex-1 flex flex-col h-full bg-surface overflow-hidden relative">

          {/* ================= WORKSPACE HEADER ================= */}
          <header className="h-14 flex items-center justify-between px-lg bg-surface-container-high border-b border-white/10 shrink-0">

            <div className="flex items-center gap-md">

              <div className="flex items-center gap-xs">

                <span className="material-symbols-outlined text-primary text-lg">
                  local_police
                </span>

                <h1 className="font-headline-sm text-headline-sm font-bold">
                  {loading
                    ? 'Loading Case...'
                    : error
                      ? 'Case Not Found'
                      : `Case #${caseData?.case_number}: ${caseData?.title}`}
                </h1>

              </div>


              <span className="px-sm py-1 bg-surface-variant text-primary font-label-caps text-label-caps rounded-full border border-primary/20">
                {loading
                  ? 'Loading...'
                  : caseData?.difficulty || 'Unknown'}
              </span>

            </div>


            <div className="flex items-center gap-lg">

              <div className="flex items-center gap-xs text-error font-code-md text-code-md bg-error/10 px-sm py-1 rounded border border-error/20">

                <span className="material-symbols-outlined text-sm">
                  timer
                </span>

                <span>
                  02:14:45
                </span>

              </div>


              <div className="flex items-center gap-sm">

                <button className="px-md py-xs border border-primary text-primary font-label-caps text-label-caps rounded hover:bg-primary/10 transition-colors flex items-center gap-xs">

                  <span className="material-symbols-outlined text-sm">
                    lightbulb
                  </span>

                  Hint (2)

                </button>


                <button
                  onClick={handleSubmitFix}
                  disabled={submitting}
                  className={`px-md py-xs bg-primary-container text-on-primary-container font-label-caps text-label-caps font-bold rounded hover:bg-primary-fixed transition-colors flex items-center gap-xs cta-glow ${
                    submitting ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {submitting ? 'hourglass_top' : 'gavel'}
                  </span>

                  {submitting ? 'Checking...' : 'Submit Fix'}

                </button>

              </div>

            </div>

          </header>

          {/* ================= SUBMISSION RESULT ================= */}
          {submitResult && (
            <div
              className={`absolute top-16 right-4 z-50 px-md py-sm rounded-lg border ${
                submitResult.success
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-error/10 border-error/30 text-error'
              }`}
            >
              {submitResult.success
                ? `Tests Passed: ${submitResult.result?.passed ?? 0}/${submitResult.result?.total ?? 0} • ${submitResult.result?.score ?? 0} XP`
                : submitResult.error}
            </div>
          )}

          {/* ================= IDE AREA ================= */}
          <div className="flex-1 flex overflow-hidden">

            {/* ================= FILE EXPLORER ================= */}
            <div className="w-64 bg-surface-container flex flex-col border-r border-white/10 shrink-0">

              <div className="p-xs bg-surface-container-highest border-b border-white/10 flex items-center justify-between">

                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Evidence Files
                </span>

                <span className="material-symbols-outlined text-on-surface-variant text-sm cursor-pointer hover:text-primary">
                  more_horiz
                </span>

              </div>


              <div className="flex-1 overflow-y-auto p-xs font-code-sm text-code-sm">

                <div className="flex items-center gap-xs py-1 text-on-surface-variant cursor-pointer hover:text-on-surface">

                  <span className="material-symbols-outlined text-sm">
                    keyboard_arrow_down
                  </span>

                  <span className="material-symbols-outlined text-sm text-primary">
                    folder
                  </span>

                  <span>
                    src
                  </span>

                </div>


                <div className="pl-lg flex flex-col gap-xs">

          {/* workerA.go */}
<div
  onClick={() => setActiveFile('workerA.go')}
  className={`flex items-center gap-xs py-1 cursor-pointer rounded-sm ${
    activeFile === 'workerA.go'
      ? 'text-on-surface bg-surface-variant/50'
      : 'text-on-surface-variant hover:text-on-surface'
  }`}
>
  <span className="material-symbols-outlined text-sm text-primary">
    code
  </span>

  <span>
    workerA.go
  </span>
</div>


                  {/* workerB.go */}
<div
  onClick={() => setActiveFile('workerB.go')}
  className={`flex items-center gap-xs py-1 cursor-pointer rounded-sm ${
    activeFile === 'workerB.go'
      ? 'text-on-surface bg-surface-variant/50'
      : 'text-on-surface-variant hover:text-on-surface'
  }`}
>
  <span className="material-symbols-outlined text-sm text-primary">
    code
  </span>

  <span>
    workerB.go
  </span>
</div>


                  {/* main.go */}
<div
  onClick={() => setActiveFile('main.go')}
  className={`flex items-center gap-xs py-1 cursor-pointer rounded-sm ${
    activeFile === 'main.go'
      ? 'text-on-surface bg-surface-variant/50'
      : 'text-on-surface-variant hover:text-on-surface'
  }`}
>
  <span className="material-symbols-outlined text-sm text-secondary">
    description
  </span>

  <span>
    main.go
  </span>
</div>
                </div>

              </div>

            </div>


            {/* ================= CODE EDITOR ================= */}
            <div className="flex-1 flex flex-col bg-surface-container-lowest relative">

              {/* Editor Tabs */}
              <div className="flex bg-surface-container-high border-b border-white/10 overflow-x-auto">

                <div className="flex items-center gap-sm px-md py-xs bg-surface-container-lowest border-t-2 border-primary text-primary cursor-pointer min-w-max">

                  <span className="material-symbols-outlined text-sm">
                    code
                  </span>

                  <span className="font-code-sm text-code-sm">
                    workerA.go
                  </span>

                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse ml-sm"></div>

                </div>


                <div className="flex items-center gap-sm px-md py-xs text-on-surface-variant hover:bg-surface-variant/30 cursor-pointer border-t-2 border-transparent border-r border-white/10 min-w-max">

                  <span className="material-symbols-outlined text-sm">
                    code
                  </span>

                  <span className="font-code-sm text-code-sm">
                    workerB.go
                  </span>

                </div>

              </div>


              {/* Editor Content */}
              <div className="flex-1 overflow-auto p-md font-code-md text-code-md leading-relaxed">

                <div className="flex">

                  {/* Line Numbers */}
                  <div className="flex flex-col text-on-surface-variant/50 pr-md select-none text-right w-10 border-r border-white/5 mr-md">

                    {Array.from(
  {
    length:
      activeFile === 'workerA.go'
        ? 15
        : activeFile === 'workerB.go'
          ? 15
          : 17,
  },
  (_, i) => (
    <span key={i}>{i + 1}</span>
  )
)}

                  </div>


                  {/* Go Code */}
<div className="flex-1 text-on-surface whitespace-pre">

  {/* workerA.go */}
  {activeFile === 'workerA.go' && (
    <>
      <span className="text-secondary">package</span>{' main\n'}
      {'\n'}

      <span className="text-secondary">import</span>{' '}
      <span className="text-tertiary">"sync"</span>
      {'\n\n'}

      <span className="text-secondary">func</span>{' '}
      <span className="text-primary-container">workerA</span>
      {'(lockA *sync.Mutex, lockB *sync.Mutex) {\n'}

      {'    '}
      <span className="text-on-surface-variant/50 italic">
        {'// Worker A takes Lock A'}
      </span>
      {'\n'}

      {'    '}
      <span className="text-on-surface">
        lockA.Lock()
      </span>
      {'\n'}

      {'    '}
      <span className="text-on-surface">
        defer lockA.Unlock()
      </span>
      {'\n\n'}

      {'    '}
      <span className="text-on-surface-variant/50 italic">
        {'// Worker A now waits for Lock B'}
      </span>
      {'\n'}

      {'    '}
      <span className="text-error">
        lockB.Lock()
      </span>
      {'\n'}

      {'    '}
      <span className="text-on-surface">
        defer lockB.Unlock()
      </span>
      {'\n\n'}

      {'    '}
      <span className="text-secondary">println</span>
      {'('}
      <span className="text-tertiary">
        "Worker A finished"
      </span>
      {')\n'}

      {'}'}
    </>
  )}


  {/* workerB.go */}
  {activeFile === 'workerB.go' && (
    <>
      <span className="text-secondary">package</span>{' main\n'}
      {'\n'}

      <span className="text-secondary">import</span>{' '}
      <span className="text-tertiary">"sync"</span>
      {'\n\n'}

      <span className="text-secondary">func</span>{' '}
      <span className="text-primary-container">workerB</span>
      {'(lockA *sync.Mutex, lockB *sync.Mutex) {\n'}

      {'    '}
      <span className="text-on-surface-variant/50 italic">
        {'// Worker B takes Lock B'}
      </span>
      {'\n'}

      {'    '}
      <span className="text-error">
        lockB.Lock()
      </span>
      {'\n'}

      {'    '}
      <span className="text-on-surface">
        defer lockB.Unlock()
      </span>
      {'\n\n'}

      {'    '}
      <span className="text-on-surface-variant/50 italic">
        {'// Worker B now waits for Lock A'}
      </span>
      {'\n'}

      {'    '}
      <span className="text-error">
        lockA.Lock()
      </span>
      {'\n'}

      {'    '}
      <span className="text-on-surface">
        defer lockA.Unlock()
      </span>
      {'\n\n'}

      {'    '}
      <span className="text-secondary">println</span>
      {'('}
      <span className="text-tertiary">
        "Worker B finished"
      </span>
      {')\n'}

      {'}'}
    </>
  )}


  {/* main.go */}
  {activeFile === 'main.go' && (
    <>
      <span className="text-secondary">package</span>{' main\n'}
      {'\n'}

      <span className="text-secondary">import</span>{' '}
      <span className="text-tertiary">"sync"</span>
      {'\n\n'}

      <span className="text-secondary">func</span>{' '}
      <span className="text-primary-container">main</span>
      {'() {\n'}

      {'    '}
      <span className="text-on-surface-variant/50 italic">
        {'// Create two locks'}
      </span>
      {'\n'}

      {'    '}
      <span className="text-secondary">var</span>
      {' lockA sync.Mutex\n'}

      {'    '}
      <span className="text-secondary">var</span>
      {' lockB sync.Mutex\n\n'}

      {'    '}
      <span className="text-on-surface-variant/50 italic">
        {'// Start both workers'}
      </span>
      {'\n'}

      {'    '}
      <span className="text-secondary">go</span>
      {' workerA(&lockA, &lockB)\n'}

      {'    '}
      <span className="text-secondary">go</span>
      {' workerB(&lockA, &lockB)\n\n'}

      {'    '}
      <span className="text-on-surface-variant/50 italic">
        {'// Keep the program running'}
      </span>
      {'\n'}

      {'    '}
      <span className="text-secondary">select</span>
      {' {}\n'}

      {'}'}
    </>
  )}

</div>

                </div>


                
</div>

            </div>


            {/* ================= RIGHT EVIDENCE PANELS ================= */}
            <div className="relative shrink-0 h-full">

              {/* Small Panel Buttons */}
              <div className="absolute right-0 top-4 z-40 flex flex-col gap-2">

                {/* Logs Button */}
                <button
                  onClick={() => togglePanel('logs')}
                  className={`w-10 h-10 flex items-center justify-center rounded-l-lg border border-white/10 transition-all duration-300 ${
                    activePanel === 'logs'
                      ? 'bg-primary text-background'
                      : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
                  }`}
                  title="System Logs"
                >

                  <span className="material-symbols-outlined text-lg">
                    terminal
                  </span>

                </button>


                {/* Database Button */}
                <button
                  onClick={() => togglePanel('database')}
                  className={`w-10 h-10 flex items-center justify-center rounded-l-lg border border-white/10 transition-all duration-300 ${
                    activePanel === 'database'
                      ? 'bg-primary text-background'
                      : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
                  }`}
                  title="DB Inspector"
                >

                  <span className="material-symbols-outlined text-lg">
                    database
                  </span>

                </button>

              </div>


              {/* Sliding Panels */}
              <div
                className={`absolute top-0 right-0 h-full w-80 bg-surface-container border-l border-white/10 z-30 flex flex-col transition-transform duration-300 ease-in-out ${
                  activePanel
                    ? 'translate-x-0'
                    : 'translate-x-full'
                }`}
              >

                {/* ================= SYSTEM LOGS ================= */}
                {activePanel === 'logs' && (
                  <div className="flex-1 flex flex-col overflow-hidden">

                    <div className="p-xs bg-surface-container-highest border-b border-white/10 flex items-center justify-between">

                      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase flex items-center gap-xs">

                        <span className="material-symbols-outlined text-sm">
                          terminal
                        </span>

                        System Logs

                      </span>


                      <button
                        onClick={() => togglePanel('logs')}
                        className="text-on-surface-variant hover:text-primary"
                      >

                        <span className="material-symbols-outlined text-sm">
                          close
                        </span>

                      </button>

                    </div>


                    <div className="p-xs flex gap-xs border-b border-white/5">

                      <button className="px-2 py-1 bg-error/10 text-error border border-error/20 rounded-sm font-code-sm text-code-sm">
                        ERROR
                      </button>

                      <button className="px-2 py-1 bg-surface-variant text-on-surface-variant rounded-sm font-code-sm text-code-sm">
                        INFO
                      </button>

                      <button className="px-2 py-1 bg-surface-variant text-on-surface-variant rounded-sm font-code-sm text-code-sm">
                        WARN
                      </button>

                    </div>


                    <div className="flex-1 p-sm overflow-y-auto font-code-sm text-code-sm bg-surface-container-lowest flex flex-col gap-2">

                      <div className="flex gap-sm">

                        <span className="text-on-surface-variant/50 w-16 shrink-0">
                          14:22:01
                        </span>

                        <span className="text-tertiary">
                          [INFO] Workers started
                        </span>

                      </div>


                      <div className="flex gap-sm">

                        <span className="text-on-surface-variant/50 w-16 shrink-0">
                          14:22:03
                        </span>

                        <span className="text-on-surface">
                          [INFO] Worker A acquired Lock A
                        </span>

                      </div>


                      <div className="flex gap-sm">

                        <span className="text-on-surface-variant/50 w-16 shrink-0">
                          14:22:03
                        </span>

                        <span className="text-on-surface">
                          [INFO] Worker B acquired Lock B
                        </span>

                      </div>


                      <div className="flex gap-sm">

                        <span className="text-on-surface-variant/50 w-16 shrink-0">
                          14:22:04
                        </span>

                        <span className="text-error">
                          [ERROR] Workers are waiting for each other
                        </span>

                      </div>

                    </div>

                  </div>
                )}


                {/* ================= DATABASE ================= */}
                {activePanel === 'database' && (
                  <div className="flex-1 flex flex-col overflow-hidden">

                    <div className="p-xs bg-surface-container-highest border-b border-white/10 flex items-center justify-between">

                      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase flex items-center gap-xs">

                        <span className="material-symbols-outlined text-sm">
                          database
                        </span>

                        DB Inspector

                      </span>


                      <button
                        onClick={() => togglePanel('database')}
                        className="text-on-surface-variant hover:text-primary"
                      >

                        <span className="material-symbols-outlined text-sm">
                          close
                        </span>

                      </button>

                    </div>


                    <div className="p-xs bg-surface-container border-b border-white/5">

                      <div className="flex bg-surface rounded-sm border border-white/10 overflow-hidden w-fit">

                        <button className="px-2 py-1 bg-primary text-background font-code-sm text-code-sm font-bold">
                          Table
                        </button>

                        <button className="px-2 py-1 text-on-surface-variant hover:text-on-surface font-code-sm text-code-sm">
                          JSON
                        </button>

                      </div>

                    </div>


                    <div className="flex-1 overflow-auto bg-surface p-0">

                      <table className="w-full text-left border-collapse font-code-sm text-code-sm">

                        <thead className="bg-surface-container sticky top-0 border-b border-white/10">

                          <tr>

                            <th className="p-xs text-on-surface-variant font-normal border-r border-white/5">
                              resource
                            </th>

                            <th className="p-xs text-on-surface-variant font-normal">
                              state
                            </th>

                          </tr>

                        </thead>


                        <tbody>

                          <tr className="border-b border-white/5 hover:bg-surface-variant/30">

                            <td className="p-xs border-r border-white/5 text-primary">
                              Lock A
                            </td>

                            <td className="p-xs text-error">
                              HELD
                            </td>

                          </tr>


                          <tr className="border-b border-white/5 hover:bg-surface-variant/30 bg-error/5">

                            <td className="p-xs border-r border-white/5 text-primary">
                              Lock B
                            </td>

                            <td className="p-xs text-error">
                              HELD
                            </td>

                          </tr>


                          <tr className="border-b border-white/5 hover:bg-surface-variant/30">

                            <td className="p-xs border-r border-white/5 text-primary">
                              Worker A
                            </td>

                            <td className="p-xs text-error">
                              WAITING
                            </td>

                          </tr>


                          <tr className="border-b border-white/5 hover:bg-surface-variant/30">

                            <td className="p-xs border-r border-white/5 text-primary">
                              Worker B
                            </td>

                            <td className="p-xs text-error">
                              WAITING
                            </td>

                          </tr>

                        </tbody>

                      </table>

                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>


          {/* ================= API NETWORK TRACES ================= */}
          <div className="h-48 bg-surface-container-highest border-t border-white/10 flex flex-col shrink-0">

            <div className="p-xs border-b border-white/10 flex items-center justify-between bg-surface-container flex-shrink-0">

              <div className="flex items-center gap-sm">

                <span className="material-symbols-outlined text-sm text-on-surface-variant">
                  network_node
                </span>

                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  API Network Traces
                </span>

              </div>

              <button className="text-on-surface-variant hover:text-primary">

                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>

              </button>

            </div>


            <div className="flex-1 overflow-y-auto p-0 font-code-sm text-code-sm">

              <div className="flex items-center gap-md px-md py-xs border-b border-white/5 hover:bg-surface-variant/50 cursor-pointer">

                <span className="w-16 font-bold text-tertiary">
                  GET
                </span>

                <span className="flex-1 text-on-surface">
                  /api/cases/{id}
                </span>

                <span className="text-tertiary">
                  200 OK
                </span>

                <span className="text-on-surface-variant/50">
                  45ms
                </span>

              </div>


              <div className="flex items-center gap-md px-md py-xs border-b border-white/5 hover:bg-surface-variant/50 cursor-pointer bg-error/5">

                <span className="w-16 font-bold text-amber-accent">
                  GET
                </span>

                <span className="flex-1 text-on-surface">
                  /api/cases/{id}/investigation
                </span>

                <span className="text-error">
                  500 Server Error
                </span>

                <span className="text-on-surface-variant/50">
                  120ms
                </span>

              </div>


              <div className="flex items-center gap-md px-md py-xs border-b border-white/5 hover:bg-surface-variant/50 cursor-pointer">

                <span className="w-16 font-bold text-tertiary">
                  POST
                </span>

                <span className="flex-1 text-on-surface">
                  /api/cases/{id}/submissions
                </span>

                <span className="text-tertiary">
                  Ready
                </span>

                <span className="text-on-surface-variant/50">
                  --
                </span>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}