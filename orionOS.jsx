import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Settings, Maximize2, Minimize2, X, Folder, Activity, Disc, Database, Layers } from 'lucide-react';

export default function OrionOS() {
  const [time, setTime] = useState('');
  const [activeWindow, setActiveWindow] = useState('core');
  const [isMaximized, setIsMaximized] = useState(false);
  const [logs, setLogs] = useState(['[orionOS] Initializing system kernel...', '[orionOS] Allocation of secure memory blocks successful.']);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (msg) => {
    setLogs((prev) => [...prev.slice(-4), `[orionOS_user]: ${msg}`]);
  };

  const desktopIcons = [
    { id: 'core', label: 'System_Core', icon: Cpu, color: 'text-cyan-400' },
    { id: 'database', label: 'Data_Vault', icon: Database, color: 'text-indigo-400' },
    { id: 'nodes', label: 'Network_Nodes', icon: Layers, color: 'text-emerald-400' },
    { id: 'fs', label: 'File_System', icon: Folder, color: 'text-amber-400' },
  ];

  return (
    <div className="relative w-full h-screen bg-[#030712] text-slate-100 font-mono overflow-hidden select-none antialiased selection:bg-cyan-500/30">
      
      {/* BACKGROUND COSMIC AMBIENT BLUR */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[150px]" />
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* TOP SYSTEM BAR */}
      <header className="absolute top-0 left-0 right-0 h-9 z-50 flex items-center justify-between px-4 bg-slate-950/60 border-b border-slate-800/50 backdrop-blur-md text-[11px] tracking-wider text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold text-slate-200">
            <Disc className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '5s' }} />
            <span className="tracking-widest">orionOS</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>KERNEL: ACTIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono">
          <div className="hidden md:flex items-center gap-3 text-slate-500">
            <span>CPU: 12%</span>
            <span>MEM: 3.8GB / 16GB</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-bold tracking-widest">{time}</span>
        </div>
      </header>

      {/* WORKSPACE ENVIRONMENT */}
      <main className="relative z-10 w-full h-full pt-14 pb-6 px-6 flex">
        
        {/* DESKTOP INTERFACE NAVIGATION */}
        <div className="flex flex-col gap-6 z-20">
          {desktopIcons.map((icon) => {
            const IconComponent = icon.icon;
            const isRunning = activeWindow === icon.id;
            return (
              <button
                key={icon.id}
                onClick={() => {
                  setActiveWindow(icon.id);
                  addLog(`Mapping path to ${icon.label}.bin`);
                }}
                className="group flex flex-col items-center justify-center w-20 h-20 rounded-xl border border-transparent hover:border-slate-800/60 hover:bg-slate-900/30 transition-all duration-200"
              >
                <div className="relative p-3 rounded-lg bg-slate-900/50 border border-slate-800/40 group-hover:scale-105 transition-transform shadow-lg">
                  <IconComponent className={`w-6 h-6 ${icon.color}`} />
                  {isRunning && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                  )}
                </div>
                <span className="text-[10px] mt-2 text-slate-400 group-hover:text-slate-200 text-center font-medium truncate w-full px-1">
                  {icon.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ORIONOS WINDOW MANAGER COMPONENT */}
        {activeWindow && (
          <div 
            className={`absolute transition-all duration-300 ease-out z-30 bg-slate-950/60 border border-slate-800/80 backdrop-blur-xl rounded-xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden
              ${isMaximized 
                ? 'top-14 left-6 right-6 bottom-6' 
                : 'top-20 left-32 right-6 bottom-16 md:right-12 md:bottom-20'
              }`}
          >
            {/* Window Frame Bar */}
            <div className="h-10 bg-slate-900/70 border-b border-slate-800/60 flex items-center justify-between px-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase tracking-wider">orionOS://{activeWindow}_process</span>
              </div>
              
              {/* Sizing Controls */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMaximized(!isMaximized)} 
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button 
                  onClick={() => {
                    setActiveWindow(null);
                    addLog('Process context closed.');
                  }} 
                  className="p-1 rounded hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Window Context Engine */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              
              {activeWindow === 'core' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800/40 space-y-4">
                    <h4 className="text-xs text-cyan-400 font-bold tracking-widest uppercase">orionOS Diagnostics</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Systems are fully localized. The orionOS architecture provides high-throughput matrix computing channels seamlessly integrated over clean micro-panel layers.
                    </p>
                  </div>

                  {/* Core Telemetry Layout Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800/40">
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Pipeline Flow</div>
                      <div className="text-sm font-semibold text-slate-200 mt-1">Synchronous Threading</div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800/40">
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Interface Node</div>
                      <div className="text-sm font-semibold text-emerald-400 mt-1">Localhost // Secure</div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800/40">
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Hardware Deck</div>
                      <div className="text-sm font-semibold text-slate-200 mt-1">Virtualization Core</div>
                    </div>
                  </div>
                </div>
              )}

              {activeWindow !== 'core' && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-80">
                  <Activity className="w-8 h-8 text-cyan-500 animate-pulse mb-3" />
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">{activeWindow} instance online</h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">Listening for subsystem directives inside the parent orionOS kernel loop.</p>
                </div>
              )}

            </div>

            {/* Console Log Footer */}
            <div className="h-7 bg-slate-950 border-t border-slate-900 px-4 flex items-center justify-between text-[10px] text-slate-500">
              <span className="truncate max-w-md text-slate-400 font-mono">{logs[logs.length - 1]}</span>
              <span className="text-cyan-500/70">orionOS_SHELL_V1</span>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER QUICK PANEL DOCK */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40">
        <div className="h-10 px-4 rounded-full bg-slate-950/80 border border-slate-800/60 backdrop-blur-lg flex items-center gap-6 shadow-xl">
          <button onClick={() => addLog('System configuration parameters analyzed.')} className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> Telemetry
          </button>
          <span className="text-slate-800">|</span>
          <button onClick={() => addLog('Flushed session environments.')} className="text-[11px] text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5" /> Preferences
          </button>
        </div>
      </div>

    </div>
  );
}
