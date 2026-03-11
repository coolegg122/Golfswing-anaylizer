import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  History, 
  GraduationCap, 
  User, 
  Settings, 
  Bell, 
  Play, 
  SkipBack, 
  SkipForward, 
  Lock, 
  RefreshCw, 
  ChevronRight, 
  Calendar, 
  Filter, 
  Grid, 
  PlusCircle,
  Brain,
  CheckCircle2,
  AlertCircle,
  Film,
  Share2,
  Video,
  TrendingUp,
  Activity,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type View = 'dashboard' | 'analysis' | 'insights';

// --- Mock Data ---
const RECENT_SWINGS = [
  {
    id: 1,
    title: 'Driver Analysis',
    date: 'Oct 24, 2023 • 2:14 PM',
    speed: '92 MPH',
    tempo: '0.82s',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjlZS8uicURVEvARg-dD4oYvLoG9QRjpDJaKglzeQp8T3fpNfEoE6_sH6iKcSZEfsEUSUAMw_xk_1FrfannMa7tc6D4zzdVBWSEUj_6l8F-rYhy_0HEwIHIw8JKObMkOFoaG1YKFcSb9TUq5Wb_nU5WTmr9SEDrQYaylPbIfLyrtdzIIafy9EJR_2dkbaJH5ic5TQAdiE3HSG5O3yD1NeHk4av3edMcOO_GUyvZJaq5bBJxcB4FTd6g79nMOasfXJRNBDO5sXxFLQ'
  },
  {
    id: 2,
    title: '7-Iron Practice',
    date: 'Oct 24, 2023 • 1:55 PM',
    speed: '81 MPH',
    tempo: '1.04s',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACAQp2up_2jrmlVQ6AE4_gTa502ZvKTdeUrngi01bZaDDaKGD_D6GZA7thypvafeIuj89htuDmvWPCf8hJiuE2UOZ6eUtj_Cde4PFMCDLxGU7Rbxg17i6QN-kyLGliGhrE4rsY4k3vPBS7OHr_AZbzbB0gAvEZ6mVDQ9TxHcECj05aQaf83Mj-btNINhGebTYJd3G2X3Sy33TC5aGlPNealw0GggX6VCqCOc7K5i9o1hyXgld4BGnYJEnSWZYEHoey3K0exXlLbac'
  },
  {
    id: 3,
    title: 'Driving Range',
    date: 'Oct 23, 2023 • 4:30 PM',
    speed: '95 MPH',
    tempo: '0.79s',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA91hOfiHabgRw3SQT-Bl4Y8PEHeDq3A5b0YSZBNKWC3ZqnxkD43wpwceriQqGc59WblZa-UPZ_NOSodwdiwT_YPIOOBYHSxsPHQKmW6iM2rWHZB38PzVp545Ty3G8k3aVUCbCoqnzk-_Kmlbi8NR13Nyjc6aUH4K77_Va4t2Qfw3POZAUFQD9fXZvDItfAxA7aob-6PUlT0WyEp75XCp-sQp4GD2tehyyFVimGmiDxwvnuimZcK029bgxJdGnwQWXUlqFNGtyT21Y'
  }
];

const PROS = [
  {
    name: 'David Han',
    role: 'PGA Master Professional',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA42bGXF4rnald4awcRPN2sjOqsEHwxySjGKsL1tW8JNoqvBKVjJz9keVOYOgHvQ4QtxaeqzsFd0ETQoa0tywbYgZ78HamB2ichbEVtqB1ovHNN1HpwVu9or_rL5vM5mmjOPtjYzx9bgQOSNrtXnRD6rSOyNxselPcORpEAo2D4bLrmqvhKvF0rynBbnkkrh0Cw2xP3voMsLUDHJpPIqhuXK97EPDArcUNsDj98KdK0dsgJE1Bpj8_r_oDlH8B1UmcKti5d5x1PMgI'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Lead Biomechanics Analyst',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArg2VR0GiOhuvTO7Hw-skXXF_yNXHojeAe5n2LYy43mV3t8b0yTZrjbtrtFEN537d448oEi4-4I2_6an6ezgKY_7ky7vKXPe05Ib3rFP1gCKt1ApXH3ePD8Kl97QANb1Rw3rzm-hir72C2Rr7fZnSm5cgluCZxLD07TwuFjVNh0SW4e_FA0c-wzQW2wD0_-7gy-1XVv7qPioeBYZEpFa_LHJwaRWxp5qoRYxOeHrxA0YMhjukw1GgfUWcveO2Ka4HulAnEEi-kclM'
  },
  {
    name: 'Marcus Wu',
    role: 'Technical Swing Coach',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC265Xoq0Qk6Wbt6WMJ_uS-ZyWZZemwiyGcywosbJ7uNx1q0GSCwENKzQbT7wbsHMPPV3eF2x2zFJn8y6JXzfOXbgGctkpnofybswfvOYELhakd2w_Yp4UepJgsaQubgg2kaP-O9GX19MA6xrFAVCCUi0c0MJybed2Fi_cPGKJpCoxgk5uHeGX5IEhFoniV-TSl0I8FoqruYmkiAP4-8Deff9nmXThtQ4NvQjZYugSDuU5VSWU-r0nYGI1qTtPiMei4ErVo5HeeOk0'
  }
];

const CHART_DATA = [
  { name: 'S1', value: 60 },
  { name: 'S2', value: 75 },
  { name: 'Current', value: 85 },
  { name: 'Pro Avg', value: 95 },
];

// --- Components ---

const Sidebar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => (
  <aside className="w-full lg:w-64 flex flex-col gap-6 shrink-0">
    <div className="flex flex-col gap-2">
      <button 
        onClick={() => setView('dashboard')}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
          currentView === 'dashboard' 
            ? "bg-[#0fbd2c] text-[#102213] font-bold shadow-lg shadow-[#0fbd2c]/20" 
            : "hover:bg-[#0fbd2c]/10 text-slate-400 font-medium"
        )}
      >
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </button>
      <button 
        onClick={() => setView('analysis')}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
          currentView === 'analysis' 
            ? "bg-[#0fbd2c] text-[#102213] font-bold shadow-lg shadow-[#0fbd2c]/20" 
            : "hover:bg-[#0fbd2c]/10 text-slate-400 font-medium"
        )}
      >
        <Activity size={20} />
        <span>Swing Analysis</span>
      </button>
      <button 
        onClick={() => setView('insights')}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
          currentView === 'insights' 
            ? "bg-[#0fbd2c] text-[#102213] font-bold shadow-lg shadow-[#0fbd2c]/20" 
            : "hover:bg-[#0fbd2c]/10 text-slate-400 font-medium"
        )}
      >
        <GraduationCap size={20} />
        <span>Pro Tutorials</span>
      </button>
      <button 
        onClick={() => alert('Profile settings coming soon!')}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0fbd2c]/10 text-slate-400 font-medium transition-colors"
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </div>
    
    <div className="mt-auto p-4 rounded-xl bg-[#0fbd2c]/5 border border-[#0fbd2c]/20">
      <p className="text-[10px] font-bold text-[#0fbd2c] uppercase tracking-widest mb-2">Current Plan</p>
      <p className="text-sm font-semibold mb-3 text-white">Swing Pro Premium</p>
      <button 
        onClick={() => alert('Subscription management opened.')}
        className="w-full py-2 bg-[#0fbd2c]/20 text-[#0fbd2c] text-xs font-bold rounded hover:bg-[#0fbd2c]/30 transition-colors"
      >
        Manage Plan
      </button>
    </div>
  </aside>
);

const DashboardView = ({ onAnalyze }: { onAnalyze: () => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex flex-col gap-8"
  >
    <section>
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-3xl font-black tracking-tight text-white">Sync & Import</h1>
        <p className="text-slate-400">Connect your mobile device to start capturing new swing data.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Sync Card */}
        <div className="bg-[#102213]/50 border border-[#0fbd2c]/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl backdrop-blur-sm">
          <div className="bg-white p-4 rounded-xl mb-6 border-4 border-[#0fbd2c]/30">
            <div className="w-40 h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden">
              <div className="grid grid-cols-4 gap-1 p-2">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={cn("w-6 h-6", (i % 3 === 0 || i % 7 === 0) ? "bg-slate-900" : "bg-slate-200")} />
                ))}
              </div>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">Scan to Sync</h3>
          <p className="text-sm text-slate-400 mb-8 px-4">Use the Swing App on your phone to scan this code and pair your device.</p>
          <button 
            onClick={() => alert('Generating new sync code...')}
            className="flex items-center gap-2 bg-[#0fbd2c] text-[#102213] px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            <RefreshCw size={18} />
            Refresh Code
          </button>
        </div>

        {/* Select a Pro Card */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-white">Select a Pro</h2>
            <button 
              onClick={() => alert('Opening Pro Directory...')}
              className="text-[#0fbd2c] text-sm font-semibold hover:underline"
            >
              View All
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {PROS.map((pro, i) => (
              <div 
                key={i}
                onClick={() => alert(`Selected ${pro.name} for comparison.`)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#102213]/50 border border-[#0fbd2c]/10 hover:border-[#0fbd2c]/40 transition-all cursor-pointer group"
              >
                <img 
                  src={pro.image} 
                  alt={pro.name}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 rounded-full border-2 border-transparent group-hover:border-[#0fbd2c] transition-all object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold text-lg text-white">{pro.name}</p>
                  <p className="text-sm text-slate-400 italic">{pro.role}</p>
                </div>
                <ChevronRight className="text-[#0fbd2c] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold text-white">Recent Swings</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => alert('Filter options opened.')}
            className="p-2 rounded-lg bg-[#0fbd2c]/10 text-[#0fbd2c] hover:bg-[#0fbd2c]/20 transition-colors"
          >
            <Filter size={20} />
          </button>
          <button 
            onClick={() => alert('View mode toggled.')}
            className="p-2 rounded-lg bg-[#0fbd2c]/10 text-[#0fbd2c] hover:bg-[#0fbd2c]/20 transition-colors"
          >
            <Grid size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {RECENT_SWINGS.map((swing) => (
          <div 
            key={swing.id}
            onClick={onAnalyze}
            className="bg-[#102213]/50 border border-[#0fbd2c]/10 rounded-2xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="h-40 bg-slate-800 relative overflow-hidden">
              <img 
                src={swing.image} 
                alt={swing.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-tighter">
                {swing.tempo} Tempo
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-white">{swing.title}</h4>
                <span className="text-[10px] px-2 py-0.5 bg-[#0fbd2c]/20 text-[#0fbd2c] rounded-full font-bold">{swing.speed}</span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar size={12} />
                {swing.date}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => alert('Opening file browser...')}
        className="w-full py-6 border-2 border-dashed border-[#0fbd2c]/30 rounded-2xl text-slate-400 hover:text-[#0fbd2c] hover:border-[#0fbd2c] transition-all flex items-center justify-center gap-2 font-semibold bg-[#102213]/20"
      >
        <PlusCircle size={20} />
        Manually Upload Video File
      </button>
    </section>
  </motion.div>
);

const AnalysisView = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'side' | 'overlay'>('side');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col min-w-0"
    >
      <div className="p-6 border-b border-[#0fbd2c]/10 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Swing Comparison</h1>
          <p className="text-slate-400 text-sm">Session: Range Practice - Oct 24, 2023</p>
        </div>
        <div className="flex bg-[#0fbd2c]/5 rounded-lg p-1">
          <button 
            onClick={() => setMode('side')}
            className={cn(
              "px-4 py-2 text-sm font-bold rounded transition-all",
              mode === 'side' ? "bg-[#0fbd2c] text-[#102213] shadow-sm" : "text-slate-400 hover:text-[#0fbd2c]"
            )}
          >
            Side-by-Side
          </button>
          <button 
            onClick={() => setMode('overlay')}
            className={cn(
              "px-4 py-2 text-sm font-bold rounded transition-all",
              mode === 'overlay' ? "bg-[#0fbd2c] text-[#102213] shadow-sm" : "text-slate-400 hover:text-[#0fbd2c]"
            )}
          >
            Overlay Mode
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
          {/* Your Swing */}
          <div className="relative flex flex-col rounded-xl overflow-hidden bg-black ring-1 ring-[#0fbd2c]/20 group">
            <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Your Swing</span>
            </div>
            <div className="relative flex-1 bg-slate-900 overflow-hidden">
              <img 
                className="w-full h-full object-cover opacity-80" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdHtwcXozDQZ-_PTE5Cm_5hI3LMH6zvr2OZHK-KFeY2Oyga5_IjZuc9S1V1_rm0B5q2ZkXL-FNuGHlx-_kq-j__69UjNaYCgGNx0p63t2x-PBDAxxw005Mtdaw1Kfhn3IxpkX89YinD8DvJIdBuMVPtZfzoFNlqcpo25qCiaab7lXw0YVxfbk851JzT66ysbyYCiBmWxI0xphGtsfMls4ICiMCp6n_l-HoFmhswYpNxGd7e19hgWWLTd6Qqsn7DeUEIPMObczNyQU"
                referrerPolicy="no-referrer"
              />
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="20%" y1="80%" x2="80%" y2="20%" stroke="#0fbd2c" strokeWidth="2" strokeDasharray="4" />
                <circle cx="55%" cy="25%" r="30" stroke="#fbbf24" strokeWidth="2" fill="none" />
                <path d="M 150 350 Q 200 320 250 350" fill="none" stroke="#ef4444" strokeWidth="3" />
                <text x="260" y="360" fill="#ef4444" fontSize="12" fontWeight="bold">HIP: 42°</text>
              </svg>
            </div>
            <div className="p-4 bg-[#102213]/80 backdrop-blur-sm border-t border-[#0fbd2c]/10">
              <div className="flex items-center gap-4">
                <SkipBack 
                  className="text-[#0fbd2c] cursor-pointer hover:scale-110 transition-transform" 
                  size={20} 
                  onClick={() => alert('Rewinding to start...')}
                />
                <div 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-[#0fbd2c] text-[#102213] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                >
                  {isPlaying ? <RefreshCw size={20} className="animate-spin-slow" /> : <Play size={20} fill="currentColor" />}
                </div>
                <SkipForward 
                  className="text-[#0fbd2c] cursor-pointer hover:scale-110 transition-transform" 
                  size={20} 
                  onClick={() => alert('Skipping to next keyframe...')}
                />
                <div className="flex-1 h-2 bg-[#0fbd2c]/20 rounded-full relative cursor-pointer group/bar">
                  <div className="absolute top-0 left-0 h-full w-[45%] bg-[#0fbd2c] rounded-full" />
                  <div className="absolute top-1/2 left-[45%] -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#0fbd2c] rounded-full shadow-md group-hover/bar:scale-125 transition-transform" />
                </div>
                <span className="text-xs font-mono text-[#0fbd2c]">FR: 124</span>
              </div>
            </div>
          </div>

          {/* Pro Swing */}
          <div className="relative flex flex-col rounded-xl overflow-hidden bg-black ring-1 ring-[#0fbd2c]/20 group">
            <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Pro: Rory McIlroy</span>
            </div>
            <div className="relative flex-1 bg-slate-900 overflow-hidden">
              <img 
                className="w-full h-full object-cover opacity-80" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBczXLtOAXHyhQSjqraSghF7awwy_ngQahXHHYRL-H81zlnupKh6NcDvhIAzIGDLb9HjS8suyu8V3br6s3n1jcXIkuhht6KEXFAHD8V8snje0ppkv3QgX6EPW9Emsmerew-iEAaksHwBsnjegHr_CUBL1PV0tcfOFFd1uMaQFcdNlnkaNbtCpj5GSrng21JDJTEOCmyiHPGU1RVXJ5VFiKD7LnRSbWJimRR46TLopLSvBBz-VLzQNdvcTw_Vls-FroCy2TT3nslXDk"
                referrerPolicy="no-referrer"
              />
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="15%" y1="85%" x2="85%" y2="15%" stroke="#0fbd2c" strokeWidth="2" strokeDasharray="4" />
                <circle cx="50%" cy="22%" r="28" stroke="#fbbf24" strokeWidth="2" fill="none" />
                <path d="M 140 330 Q 190 300 240 330" fill="none" stroke="#0fbd2c" strokeWidth="3" />
                <text x="250" y="340" fill="#0fbd2c" fontSize="12" fontWeight="bold">HIP: 45°</text>
              </svg>
            </div>
            <div className="p-4 bg-[#102213]/80 backdrop-blur-sm border-t border-[#0fbd2c]/10">
              <div className="flex items-center gap-4">
                <SkipBack className="text-[#0fbd2c] cursor-pointer" size={20} />
                <div className="w-10 h-10 rounded-full bg-[#0fbd2c] text-[#102213] flex items-center justify-center cursor-pointer">
                  <Play size={20} fill="currentColor" />
                </div>
                <SkipForward className="text-[#0fbd2c] cursor-pointer" size={20} />
                <div className="flex-1 h-2 bg-[#0fbd2c]/20 rounded-full relative">
                  <div className="absolute top-0 left-0 h-full w-[45%] bg-[#0fbd2c] rounded-full" />
                  <div className="absolute top-1/2 left-[45%] -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#0fbd2c] rounded-full shadow-md" />
                </div>
                <span className="text-xs font-mono text-[#0fbd2c]">FR: 124</span>
              </div>
            </div>
          </div>
        </div>

        {/* Synchronized Phase Scrubber */}
        <div className="bg-[#0fbd2c]/5 p-4 rounded-xl border border-[#0fbd2c]/10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold uppercase tracking-widest text-[#0fbd2c]">Impact Phase Sync</span>
            <div className="flex gap-2">
              <button 
                onClick={() => alert('Sync locked.')}
                className="p-1 rounded hover:bg-[#0fbd2c]/20 transition-colors"
              >
                <Lock size={14} />
              </button>
              <button 
                onClick={() => alert('Resyncing frames...')}
                className="p-1 rounded hover:bg-[#0fbd2c]/20 transition-colors"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
          <div className="relative w-full h-12 bg-[#0fbd2c]/10 rounded-lg flex items-center px-4 overflow-hidden">
            <div className="absolute inset-0 flex">
              <div className="h-full w-1/4 border-r border-[#0fbd2c]/20 flex items-center justify-center"><span className="text-[10px] text-slate-500 uppercase">Setup</span></div>
              <div className="h-full w-1/4 border-r border-[#0fbd2c]/20 flex items-center justify-center"><span className="text-[10px] text-slate-500 uppercase">Backswing</span></div>
              <div className="h-full w-1/4 border-r border-[#0fbd2c]/20 flex items-center justify-center bg-[#0fbd2c]/10"><span className="text-[10px] text-[#0fbd2c] font-bold uppercase">Impact</span></div>
              <div className="h-full w-1/4 flex items-center justify-center"><span className="text-[10px] text-slate-500 uppercase">Finish</span></div>
            </div>
            <div className="absolute top-0 bottom-0 left-[62%] w-0.5 bg-[#0fbd2c] z-10 shadow-[0_0_8px_rgba(15,189,44,0.6)]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InsightsView = () => {
  const [activePhase, setActivePhase] = useState('Backswing');

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex-1 overflow-y-auto"
    >
      <header className="sticky top-0 z-10 bg-[#102213]/80 backdrop-blur-md border-b border-[#0fbd2c]/10 px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Swing Insights</h2>
          <p className="text-sm text-slate-400">Analysis of your latest session: Aug 24, 2023</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert('Generating shareable link...')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#0fbd2c]/20 hover:bg-[#0fbd2c]/5 transition-colors font-medium text-sm text-white"
          >
            <Share2 size={16} />
            Share Report
          </button>
          <button 
            onClick={() => alert('Launching camera for recording...')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0fbd2c] text-[#102213] hover:bg-[#0fbd2c]/90 transition-colors font-bold text-sm"
          >
            <Video size={16} />
            Record New
          </button>
        </div>
      </header>

      <div className="px-8 mt-6">
        <div className="flex border-b border-[#0fbd2c]/10 overflow-x-auto no-scrollbar">
          {['Setup', 'Backswing', 'Transition', 'Downswing', 'Impact'].map((phase) => (
            <button 
              key={phase}
              onClick={() => setActivePhase(phase)}
              className={cn(
                "px-6 py-3 border-b-2 transition-all font-medium whitespace-nowrap",
                activePhase === phase ? "border-[#0fbd2c] text-[#0fbd2c] font-bold" : "border-transparent text-slate-500 hover:text-[#0fbd2c]"
              )}
            >
              {phase}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 space-y-8">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-[#0fbd2c]/10 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                  <Activity size={20} className="text-[#0fbd2c]" />
                  {activePhase} Metrics
                </h3>
                <span className="bg-[#0fbd2c]/10 text-[#0fbd2c] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Analysis Active</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Club Path</p>
                  <p className="text-2xl font-bold text-white">+2.4°</p>
                  <p className="text-xs text-[#0fbd2c] flex items-center gap-1"><TrendingUp size={12} />Optimal</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Peak Height</p>
                  <p className="text-2xl font-bold text-white">104.2ft</p>
                  <p className="text-xs text-amber-500 flex items-center gap-1"><AlertCircle size={12} />High</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Tempo Ratio</p>
                  <p className="text-2xl font-bold text-white">3.1:1</p>
                  <p className="text-xs text-[#0fbd2c] flex items-center gap-1"><CheckCircle2 size={12} />Ideal</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Wrist Angle</p>
                  <p className="text-2xl font-bold text-white">92°</p>
                  <p className="text-xs text-slate-500">Stable</p>
                </div>
              </div>

              <div className="mt-10 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#102213', border: '1px solid #0fbd2c20', borderRadius: '8px' }}
                      itemStyle={{ color: '#0fbd2c' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index >= 2 ? '#0fbd2c' : '#ffffff20'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-[#0fbd2c]/10 shadow-sm flex flex-col justify-between min-h-[180px]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase">Club Head Speed</p>
                  <h4 className="text-3xl font-bold mt-1 text-white">112.4 <span className="text-sm font-medium text-slate-500">mph</span></h4>
                </div>
                <div className="bg-[#0fbd2c]/20 text-[#0fbd2c] text-xs px-2 py-1 rounded font-bold">+4.2%</div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 size={16} className="text-[#0fbd2c]" />
                <p>Exceeds your weekly average</p>
              </div>
            </div>
            
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-[#0fbd2c]/10 shadow-sm flex flex-col justify-between min-h-[180px]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase">Smash Factor</p>
                  <h4 className="text-3xl font-bold mt-1 text-white">1.48</h4>
                </div>
                <div className="bg-red-500/20 text-red-500 text-xs px-2 py-1 rounded font-bold">-0.02</div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <AlertCircle size={16} className="text-amber-500" />
                <p>Slight off-center impact detected</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0fbd2c]/5 rounded-2xl p-8 border border-[#0fbd2c]/20 flex flex-col md:flex-row gap-8 items-start">
          <div className="size-16 rounded-full bg-[#0fbd2c]/20 flex items-center justify-center shrink-0">
            <Brain size={32} className="text-[#0fbd2c]" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Pro Insights & AI Recommendation</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Your backswing speed is currently 15% flatter than the professional average for your handicap. While your tempo is excellent (3.1:1), focusing on a more upright shaft angle at the "P2" position (club parallel to ground) will likely increase your Smash Factor back above 1.50. Try the <strong className="text-[#0fbd2c] cursor-pointer hover:underline">"Wall Drill"</strong> for 10 minutes before your next session to correct this path.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => alert('Drill added to your training plan.')}
                className="px-6 py-2 rounded-lg bg-[#0fbd2c] text-[#102213] font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Add to Plan
              </button>
              <button 
                onClick={() => alert('AI Coach is listening...')}
                className="px-6 py-2 rounded-lg border border-[#0fbd2c]/20 text-slate-300 font-bold text-sm hover:bg-[#0fbd2c]/10 transition-colors"
              >
                Ask AI Coach
              </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

const Header = () => (
  <header className="flex items-center justify-between border-b border-[#0fbd2c]/20 px-6 py-4 lg:px-20 bg-[#102213] sticky top-0 z-50">
    <div className="flex items-center gap-3">
      <div className="text-[#0fbd2c]">
        <Activity size={28} />
      </div>
      <h2 className="text-white text-xl font-bold tracking-tight">Swing Analyzer</h2>
    </div>
    <div className="flex flex-1 justify-end gap-4 items-center">
      <button 
        onClick={() => alert('Settings panel opened.')}
        className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#0fbd2c]/10 hover:bg-[#0fbd2c]/20 transition-colors text-[#0fbd2c]"
      >
        <Settings size={20} />
      </button>
      <button 
        onClick={() => alert('No new notifications.')}
        className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#0fbd2c]/10 hover:bg-[#0fbd2c]/20 transition-colors text-[#0fbd2c]"
      >
        <Bell size={20} />
      </button>
      <div 
        className="h-10 w-10 rounded-full border-2 border-[#0fbd2c] bg-cover bg-center" 
        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbQ1gpE-RO9UvfoWlbhUinrUAtOi_yyfSc5z13HIJlKPRwMfgbmmfmvH0ULj983ifjl4SzLnpJCyEfcxboZ4-SZzmz-QIvcPvE4WaIgQD9H1YPRjwDvhVWMre3YYWQQ7eO1vwUND0OdlGWlAVC19OsAh4RlE83V050MnSV0sMniPkWLXUa45MqHMV0K93nfjm-C_3UTmebWfJwM5eXEybG1KXaNz_OQYAwg_Tmu_jN4Pl8gThT-Wk1omfo6s34franYXTaY0V0Cr0")' }}
      />
    </div>
  </header>
);

const CoachNotes = () => (
  <aside className="w-80 border-l border-[#0fbd2c]/10 bg-[#102213]/50 flex flex-col hidden xl:flex shrink-0">
    <div className="p-6 border-b border-[#0fbd2c]/10">
      <h3 className="font-bold flex items-center gap-2 text-white">
        <Brain size={20} className="text-[#0fbd2c]" />
        Coach's AI Insights
      </h3>
    </div>
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="bg-[#0fbd2c]/10 p-4 rounded-lg border border-[#0fbd2c]/20">
        <h4 className="text-[10px] font-bold text-[#0fbd2c] uppercase mb-2">Primary Observation</h4>
        <p className="text-sm leading-relaxed text-slate-300">Your club path is slightly outside-in compared to Rory's. At impact (Frame 124), your head has moved 2.4 inches forward. </p>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-slate-500 uppercase">Current Frame Notes (124)</h4>
        <div className="flex gap-3">
          <AlertCircle size={16} className="text-amber-500 mt-1 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-white">Head Position</p>
            <p className="text-slate-500">Stability is low. Circle shows 15% deviation from center at peak downswing.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <CheckCircle2 size={16} className="text-[#0fbd2c] mt-1 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-white">Swing Plane</p>
            <p className="text-slate-500">Excellent matching with the pro profile. Shaft angle is within 1.2°.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <CheckCircle2 size={16} className="text-[#0fbd2c] mt-1 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-white">Hip Rotation</p>
            <p className="text-slate-500">Cleared successfully. 42° vs 45° Pro standard.</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#0fbd2c]/10">
        <button 
          onClick={() => alert('Personalized drill plan generated based on Frame 124.')}
          className="w-full py-3 px-4 bg-[#0fbd2c]/20 text-[#0fbd2c] font-bold rounded-lg hover:bg-[#0fbd2c]/30 transition-colors flex items-center justify-center gap-2"
        >
          <Film size={18} />
          Generate Drill Plan
        </button>
      </div>
    </div>
  </aside>
);

export default function App() {
  const [view, setView] = useState<View>('dashboard');

  return (
    <div className="bg-[#102213] text-slate-100 min-h-screen font-sans selection:bg-[#0fbd2c] selection:text-[#102213]">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <Header />
        
        <main className="flex-1 flex flex-col lg:flex-row px-6 py-8 lg:px-20 gap-8 overflow-hidden">
          <Sidebar currentView={view} setView={setView} />
          
          <div className="flex-1 flex flex-col min-h-0">
            <AnimatePresence mode="wait">
              {view === 'dashboard' && (
                <DashboardView key="dashboard" onAnalyze={() => setView('analysis')} />
              )}
              {view === 'analysis' && (
                <div key="analysis" className="flex-1 flex h-full min-h-0 bg-[#102213]/30 rounded-2xl border border-[#0fbd2c]/10 overflow-hidden">
                  <AnalysisView />
                  <CoachNotes />
                </div>
              )}
              {view === 'insights' && (
                <InsightsView key="insights" />
              )}
            </AnimatePresence>
          </div>
        </main>

        <footer className="mt-auto py-6 px-6 lg:px-20 border-t border-[#0fbd2c]/10 bg-[#102213]/80 text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            © 2023 Swing Analyzer AI. High-performance metrics for every golfer.
          </p>
        </footer>
      </div>
    </div>
  );
}
