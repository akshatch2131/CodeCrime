import { Link } from 'react-router-dom';

export default function InvestigationPage() {
  return (
    <div className="bg-background text-on-surface h-screen overflow-hidden flex flex-col font-body-md text-body-md">
      {/* TopNavBar */}
      <nav className="flex justify-between items-center w-full px-xl h-16 sticky top-0 z-50 bg-background border-b border-white/10 shrink-0">
        <div className="flex items-center gap-md">
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">CodeCrime</span>
        </div>
        <div className="flex items-center gap-md">
          <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95 flex items-center justify-center p-xs rounded-full">
            <span className="material-symbols-outlined">dark_mode</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95 flex items-center justify-center p-xs rounded-full">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95 flex items-center justify-center p-xs rounded-full">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* SideNavBar */}
        <aside className="flex flex-col h-full p-md gap-sm bg-surface-container-low border-r border-white/10 w-64 shrink-0 hidden md:flex">
          <div className="flex items-center gap-sm mb-md p-xs">
            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden shrink-0 border border-white/10">
              <span className="material-symbols-outlined text-on-surface-variant">person</span>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-headline-sm text-headline-sm truncate">Detective Vane</span>
              <span className="font-code-sm text-code-sm text-on-surface-variant truncate">Senior P.I. • 2,450 XP</span>
            </div>
          </div>

          <button className="w-full bg-primary-container text-on-primary-container font-headline-md text-headline-md font-bold py-xs rounded mb-md hover:bg-primary-fixed transition-colors">
            New Investigation
          </button>

          <nav className="flex-1 flex flex-col gap-xs">
            <Link to="/dashboard" className="flex items-center gap-sm px-sm py-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200 group">
              <span className="material-symbols-outlined group-hover:text-primary">dashboard</span>
              <span className="font-body-md text-body-md">Dashboard</span>
            </Link>
            <a className="flex items-center gap-sm px-sm py-xs rounded-lg text-primary font-bold bg-secondary-container/20" href="#">
              <span className="material-symbols-outlined fill" style={{ fontVariationSettings: "'FILL' 1" }}>folder_open</span>
              <span className="font-body-md text-body-md">Active Cases</span>
            </a>
            <Link to="/cases" className="flex items-center gap-sm px-sm py-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200 group">
              <span className="material-symbols-outlined group-hover:text-primary">inventory_2</span>
              <span className="font-body-md text-body-md">Evidence Locker</span>
            </Link>
            <a className="flex items-center gap-sm px-sm py-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200 group" href="#">
              <span className="material-symbols-outlined group-hover:text-primary">archive</span>
              <span className="font-body-md text-body-md">Cold Cases</span>
            </a>
            <a className="flex items-center gap-sm px-sm py-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200 group" href="#">
              <span className="material-symbols-outlined group-hover:text-primary">groups</span>
              <span className="font-body-md text-body-md">Personnel</span>
            </a>
          </nav>

          <div className="mt-auto flex flex-col gap-xs pt-md border-t border-white/10">
            <a className="flex items-center gap-sm px-sm py-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-body-md text-body-md">Settings</span>
            </a>
            <Link to="/login" className="flex items-center gap-sm px-sm py-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-body-md text-body-md">Logout</span>
            </Link>
          </div>
        </aside>

        {/* Main Workspace Canvas */}
        <main className="flex-1 flex flex-col h-full bg-surface overflow-hidden relative">
          {/* Workspace Top Bar */}
          <header className="h-14 flex items-center justify-between px-lg bg-surface-container-high border-b border-white/10 shrink-0">
            <div className="flex items-center gap-md">
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-primary text-lg">local_police</span>
                <h1 className="font-headline-sm text-headline-sm font-bold">Case #142: The Phantom Transaction</h1>
              </div>
              <span className="px-sm py-1 bg-surface-variant text-primary font-label-caps text-label-caps rounded-full border border-primary/20">
                Class B Anomaly
              </span>
            </div>
            <div className="flex items-center gap-lg">
              <div className="flex items-center gap-xs text-error font-code-md text-code-md bg-error/10 px-sm py-1 rounded border border-error/20">
                <span className="material-symbols-outlined text-sm">timer</span>
                <span>02:14:45</span>
              </div>
              <div className="flex items-center gap-sm">
                <button className="px-md py-xs border border-primary text-primary font-label-caps text-label-caps rounded hover:bg-primary/10 transition-colors flex items-center gap-xs">
                  <span className="material-symbols-outlined text-sm">lightbulb</span>
                  Hint (2)
                </button>
                <Link
                  to="/resolution/142"
                  className="px-md py-xs bg-primary-container text-on-primary-container font-label-caps text-label-caps font-bold rounded hover:bg-primary-fixed transition-colors flex items-center gap-xs cta-glow"
                >
                  <span className="material-symbols-outlined text-sm">gavel</span>
                  Submit Fix
                </Link>
              </div>
            </div>
          </header>

          {/* 3-Column IDE Layout */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left: File Explorer */}
            <div className="w-64 bg-surface-container flex flex-col border-r border-white/10 shrink-0">
              <div className="p-xs bg-surface-container-highest border-b border-white/10 flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Evidence Files</span>
                <span className="material-symbols-outlined text-on-surface-variant text-sm cursor-pointer hover:text-primary">more_horiz</span>
              </div>
              <div className="flex-1 overflow-y-auto p-xs font-code-sm text-code-sm">
                {/* Folder */}
                <div className="flex items-center gap-xs py-1 text-on-surface-variant cursor-pointer hover:text-on-surface">
                  <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                  <span className="material-symbols-outlined text-sm text-primary">folder</span>
                  <span>src</span>
                </div>
                {/* Files */}
                <div className="pl-lg flex flex-col gap-xs">
                  <div className="flex items-center gap-xs py-1 text-on-surface cursor-pointer bg-surface-variant/50 rounded-sm">
                    <span className="material-symbols-outlined text-sm text-amber-accent">javascript</span>
                    <span>orderService.js</span>
                  </div>
                  <div className="flex items-center gap-xs py-1 text-on-surface-variant cursor-pointer hover:text-on-surface">
                    <span className="material-symbols-outlined text-sm text-amber-accent">javascript</span>
                    <span>paymentController.js</span>
                  </div>
                  <div className="flex items-center gap-xs py-1 text-on-surface-variant cursor-pointer hover:text-on-surface">
                    <span className="material-symbols-outlined text-sm text-secondary">description</span>
                    <span>schema.sql</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Code Editor */}
            <div className="flex-1 flex flex-col bg-surface-container-lowest relative">
              {/* Editor Tabs */}
              <div className="flex bg-surface-container-high border-b border-white/10 overflow-x-auto">
                <div className="flex items-center gap-sm px-md py-xs bg-surface-container-lowest border-t-2 border-primary text-primary cursor-pointer min-w-max">
                  <span className="material-symbols-outlined text-sm">javascript</span>
                  <span className="font-code-sm text-code-sm">orderService.js</span>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse ml-sm"></div>
                </div>
                <div className="flex items-center gap-sm px-md py-xs text-on-surface-variant hover:bg-surface-variant/30 cursor-pointer border-t-2 border-transparent border-r border-white/10 min-w-max">
                  <span className="material-symbols-outlined text-sm">javascript</span>
                  <span className="font-code-sm text-code-sm">paymentController.js</span>
                </div>
              </div>

              {/* Editor Content */}
              <div className="flex-1 overflow-auto p-md font-code-md text-code-md leading-relaxed">
                <div className="flex">
                  {/* Line Numbers */}
                  <div className="flex flex-col text-on-surface-variant/50 pr-md select-none text-right w-10 border-r border-white/5 mr-md">
                    {Array.from({ length: 15 }, (_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>
                  {/* Code Content */}
                  <div className="flex-1 text-on-surface whitespace-pre">
                    <span className="text-secondary">import</span>{' { db } '}<span className="text-secondary">from</span>{' '}<span className="text-tertiary">'../config/database'</span>;{'\n'}
                    <span className="text-secondary">import</span>{' { logger } '}<span className="text-secondary">from</span>{' '}<span className="text-tertiary">'../utils/logger'</span>;{'\n'}
                    {'\n'}
                    <span className="text-secondary">export class</span>{' OrderService {\n'}
                    {'    '}<span className="text-primary-container">async processOrder</span>(orderData) {'{\n'}
                    {'        '}<span className="text-secondary">try</span>{' {\n'}
                    {'            '}<span className="text-on-surface-variant/50 italic">{'// BUG: Transaction ID is not being validated before processing.'}</span>{'\n'}
                    <span className="text-on-surface-variant/50 italic">{'// A malicious user can submit a duplicate transaction.'}</span>{'\n'}
                    <span className="text-secondary">const</span>{' result = '}<span className="text-secondary">await</span>{' db.query(\n'}
                    {'                '}<span className="text-tertiary">{"`INSERT INTO orders (user_id, amount, status) \n                 VALUES ($1, $2, 'PENDING') RETURNING id`"}</span>,{'\n'}
                    {'                [orderData.userId, orderData.amount]\n'}
                    {'            );\n'}
                    {'\n'}
                    {'            '}<span className="text-secondary">return</span>{' { success: '}<span className="text-secondary">true</span>{', orderId: result.rows[0].id };\n'}
                    {'            \n'}
                    {'        } '}<span className="text-secondary">catch</span>{' (error) {\n'}
                    {'            logger.error('}<span className="text-tertiary">'Failed to process order'</span>{', error);\n'}
                    {'            '}<span className="text-secondary">throw new</span>{' Error('}<span className="text-tertiary">'Order processing failed'</span>{');\n'}
                    {'        }\n'}
                    {'    }\n'}
                    {'}'}
                  </div>
                </div>
                {/* Hover Highlight */}
                <div className="absolute top-32 left-16 right-md h-6 border border-primary/30 bg-primary/5 pointer-events-none shadow-[0_0_10px_rgba(245,185,66,0.1)] rounded-sm"></div>
              </div>
            </div>

            {/* Right: Evidence Panels */}
            <div className="w-80 bg-surface-container flex flex-col border-l border-white/10 shrink-0">
              {/* Logs Panel */}
              <div className="flex-1 flex flex-col border-b border-white/10 overflow-hidden">
                <div className="p-xs bg-surface-container-highest border-b border-white/10 flex items-center justify-between">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase flex items-center gap-xs">
                    <span className="material-symbols-outlined text-sm">terminal</span> System Logs
                  </span>
                </div>
                <div className="p-xs flex gap-xs border-b border-white/5">
                  <button className="px-2 py-1 bg-error/10 text-error border border-error/20 rounded-sm font-code-sm text-code-sm">ERROR</button>
                  <button className="px-2 py-1 bg-surface-variant text-on-surface-variant rounded-sm font-code-sm text-code-sm">INFO</button>
                  <button className="px-2 py-1 bg-surface-variant text-on-surface-variant rounded-sm font-code-sm text-code-sm">WARN</button>
                </div>
                <div className="flex-1 p-sm overflow-y-auto font-code-sm text-code-sm bg-surface-container-lowest flex flex-col gap-1">
                  <div className="flex gap-sm">
                    <span className="text-on-surface-variant/50 w-16 shrink-0">14:22:01</span>
                    <span className="text-tertiary">[INFO] Server started on port 3000</span>
                  </div>
                  <div className="flex gap-sm">
                    <span className="text-on-surface-variant/50 w-16 shrink-0">14:23:45</span>
                    <span className="text-on-surface">[INFO] Incoming POST /api/orders</span>
                  </div>
                  <div className="flex gap-sm">
                    <span className="text-on-surface-variant/50 w-16 shrink-0">14:23:46</span>
                    <span className="text-error">[ERROR] Duplicate transaction detected: txn_8921x</span>
                  </div>
                  <div className="flex gap-sm">
                    <span className="text-on-surface-variant/50 w-16 shrink-0">14:23:46</span>
                    <span className="text-error">Stack trace: Error: Order processing failed at OrderService.processOrder (/src/orderService.js:19:19)</span>
                  </div>
                </div>
              </div>

              {/* Database Panel */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-xs bg-surface-container-highest border-b border-white/10 flex items-center justify-between">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase flex items-center gap-xs">
                    <span className="material-symbols-outlined text-sm">database</span> DB Inspector
                  </span>
                  <div className="flex bg-surface rounded-sm border border-white/10 overflow-hidden">
                    <button className="px-2 py-1 bg-primary text-background font-code-sm text-code-sm font-bold">Table</button>
                    <button className="px-2 py-1 text-on-surface-variant hover:text-on-surface font-code-sm text-code-sm">JSON</button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto bg-surface p-0">
                  <table className="w-full text-left border-collapse font-code-sm text-code-sm">
                    <thead className="bg-surface-container sticky top-0 border-b border-white/10">
                      <tr>
                        <th className="p-xs text-on-surface-variant font-normal border-r border-white/5">id</th>
                        <th className="p-xs text-on-surface-variant font-normal border-r border-white/5">user_id</th>
                        <th className="p-xs text-on-surface-variant font-normal border-r border-white/5">amount</th>
                        <th className="p-xs text-on-surface-variant font-normal">status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5 hover:bg-surface-variant/30">
                        <td className="p-xs border-r border-white/5 text-primary">1042</td>
                        <td className="p-xs border-r border-white/5">usr_77b</td>
                        <td className="p-xs border-r border-white/5">$120.00</td>
                        <td className="p-xs text-tertiary">COMPLETED</td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-surface-variant/30 bg-error/5">
                        <td className="p-xs border-r border-white/5 text-primary">1043</td>
                        <td className="p-xs border-r border-white/5">usr_99z</td>
                        <td className="p-xs border-r border-white/5">$500.00</td>
                        <td className="p-xs text-error">PENDING</td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-surface-variant/30">
                        <td className="p-xs border-r border-white/5 text-primary">1044</td>
                        <td className="p-xs border-r border-white/5">usr_12a</td>
                        <td className="p-xs border-r border-white/5">$45.50</td>
                        <td className="p-xs text-tertiary">COMPLETED</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Panel: API Traces */}
          <div className="h-48 bg-surface-container-highest border-t border-white/10 flex flex-col shrink-0">
            <div className="p-xs border-b border-white/10 flex items-center justify-between bg-surface-container flex-shrink-0">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-sm text-on-surface-variant">network_node</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">API Network Traces</span>
              </div>
              <button className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-0 font-code-sm text-code-sm">
              <div className="flex items-center gap-md px-md py-xs border-b border-white/5 hover:bg-surface-variant/50 cursor-pointer">
                <span className="w-16 font-bold text-tertiary">GET</span>
                <span className="flex-1 text-on-surface">/api/user/profile</span>
                <span className="text-tertiary">200 OK</span>
                <span className="text-on-surface-variant/50">45ms</span>
              </div>
              <div className="flex items-center gap-md px-md py-xs border-b border-white/5 hover:bg-surface-variant/50 cursor-pointer bg-error/5">
                <span className="w-16 font-bold text-amber-accent">POST</span>
                <span className="flex-1 text-on-surface">/api/orders</span>
                <span className="text-error">500 Server Error</span>
                <span className="text-on-surface-variant/50">120ms</span>
              </div>
              <div className="flex items-center gap-md px-md py-xs border-b border-white/5 hover:bg-surface-variant/50 cursor-pointer">
                <span className="w-16 font-bold text-tertiary">GET</span>
                <span className="flex-1 text-on-surface">/api/products/list</span>
                <span className="text-tertiary">200 OK</span>
                <span className="text-on-surface-variant/50">89ms</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
